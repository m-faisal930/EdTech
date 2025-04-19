// 📁 client/src/pages/ChatRoom.jsx
import { useEffect, useState, useContext } from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const socket = io('http://localhost:5000');

const ChatRoom = () => {
  const { courseId } = useParams();
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [openChats, setOpenChats] = useState([]);
  const [receiver, setReceiver] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const msgRes = await axios.get(
          `http://localhost:5000/api/messages/${courseId}`
        );
        const usersRes = await axios.get(
          `http://localhost:5000/api/courses/${courseId}/users`
        );
        setMessages(msgRes.data);
        setUsers(
          [usersRes.data.tutor, ...usersRes.data.students].filter(Boolean)
        );
        setLoading(false);
      } catch (error) {
        console.error('Error fetching chat data:', error);
      }
    };

    if (user) {
      fetchInitialData();
      socket.emit('joinRoom', { courseId, user });
      socket.on('message', (msg) => setMessages((prev) => [...prev, msg]));
      socket.on('activeUsers', setActiveUsers);
    }

    return () => socket.disconnect();
  }, [courseId, user]);

  const handleOpenChat = (user) => {
    if (!openChats.find((c) => c._id === user._id)) {
      setOpenChats([...openChats, user]);
    }
  };

  const sendMessage = (e, receiver) => {
    e.preventDefault();
    if (message.trim() && receiver) {
      socket.emit('sendMessage', {
        courseId,
        message,
        senderId: user._id,
        receiverId: receiver._id,
      });
      setMessage('');
    }
  };

  const getMessagesWith = (receiverId) =>
    messages.filter((m) => {
      const sender = m.senderId?._id || m.senderId;
      const receiver = m.receiverId?._id || m.receiverId;
      return (
        (sender === user._id && receiver === receiverId) ||
        (sender === receiverId && receiver === user._id)
      );
    });

  if (loading) return <div className="p-4 text-center">Loading chat...</div>;

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-full md:w-64 border-r bg-white p-4 space-y-4 overflow-y-auto shadow-md">
        <h2 className="text-xl font-semibold mb-3 text-indigo-700">
          Participants
        </h2>
        {users.map(
          (u) =>
            u &&
            u._id !== user._id && (
              <button
                key={u._id}
                onClick={() => handleOpenChat(u)}
                className="w-full text-left p-3 rounded-lg bg-gray-100 hover:bg-indigo-100 transition"
              >
                <div className="flex justify-between items-center">
                  <span className="text-gray-800 font-medium">{u.name}</span>
                  {activeUsers.includes(u._id) && (
                    <span className="text-green-500 text-xs">● Online</span>
                  )}
                </div>
              </button>
            )
        )}
      </div>

      {/* Chat Boxes */}
      <div className="flex-1 flex flex-wrap gap-4 p-4 overflow-y-auto">
        {openChats.length === 0 && (
          <div className="text-gray-500 m-auto text-center text-lg">
            Select a user to start chatting
          </div>
        )}

        {openChats.map((chatUser) => (
          <div
            key={chatUser._id}
            className="flex flex-col border rounded-xl shadow-md w-full md:w-80 bg-white"
          >
            <div className="bg-indigo-600 text-white p-3 rounded-t-xl text-center font-semibold">
              {chatUser.name}
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2 h-64">
              {getMessagesWith(chatUser._id).map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-lg text-sm max-w-[85%] break-words ${
                    (msg.senderId?._id || msg.senderId) === user._id
                      ? 'bg-blue-500 text-white self-end ml-auto'
                      : 'bg-gray-200 text-gray-800 self-start mr-auto'
                  }`}
                >
                  <div className="text-xs mb-1 font-medium">
                    {msg.senderId?.name || 'You'}
                  </div>
                  {msg.message}
                </div>
              ))}
            </div>
            <form
              onSubmit={(e) => sendMessage(e, chatUser)}
              className="flex items-center p-3 border-t gap-2"
            >
              <input
                type="text"
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={receiver?._id === chatUser._id ? message : ''}
                onChange={(e) => {
                  setReceiver(chatUser);
                  setMessage(e.target.value);
                }}
                placeholder="Type a message..."
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
              >
                Send
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatRoom;
