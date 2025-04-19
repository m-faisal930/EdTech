// // 📁 client/src/context/AuthContext.js
// import { createContext, useState } from 'react';
// import axios from 'axios';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   const login = async (credentials) => {
//     try {
//         console.log('Logging in with credentials:', credentials);
//       const res = await axios.post(
//         `${process.env.REACT_APP_API_URL}/auth/login`,
//         credentials
//       );
//       setUser(res.data.user);
//       console.log(user);
//       localStorage.setItem('token', res.data.token);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('token');
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };



import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true); // NEW

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    setLoading(false); // done checking localStorage
  }, []);

  const login = async (credentials) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        credentials
      );
      setUser(res.data.user);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${res.data.token}`;
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
