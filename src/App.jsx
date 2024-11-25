import axios from "axios";
import React, { useState } from "react";

const App = () => {
  const [answer, setAnswer] = useState(" ");
  const [question, setQuestion] = useState(" ");

  async function getAnswer() {
    setAnswer("loading...");

    const apiUrl = import.meta.env.VITE_API_KEY;
    console.log("API URL:", apiUrl);

    try {
      const response = await axios({
        url: apiUrl,
        method: "post",
        data: {
          contents: [
            {
              parts: [{ text: question }],
            },
          ],
        },
      });

      console.log("Response:", response.data);
      const rawAnswer = response.data.candidates[0].content.parts[0].text || "No answer";
      setAnswer(rawAnswer);
    } catch (error) {
      console.error("Error", error.response?.status, error.response?.data);
      setAnswer("Failed to generate an answer");
    }
  }

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-[80%] "><p>{answer}</p></div>

      <div className="flex justify-center gap-3 bg-slate-300 bottom-0 fixed w-full items-center">
        <input
          value={question}
          className="border-2 border-black border-solid"
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button onClick={getAnswer} className="bg-slate-900 px-4 py-2 text-white">
          Generate Answer
        </button>
      </div>
    </div>
  );
};

export default App;
