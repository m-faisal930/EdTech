// utility/api.js
export const generateQuizFromMaterial = async (materialTitle, quizTitle) => {
    try {
      const accessToken = localStorage.getItem("access");
      if (!accessToken) throw new Error("Authentication token not found");
  
      const response = await fetch("http://localhost:8000/api/quiz/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          material_title: materialTitle,
          quiz_title: quizTitle,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.detail || "Quiz generation failed");
      }
  
      const quizData = await response.json();
      return quizData;
    } catch (err) {
      console.error("Quiz generation error:", err);
      throw err;
    }
  }
  