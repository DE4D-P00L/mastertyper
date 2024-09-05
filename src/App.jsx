import { useEffect, useRef, useState } from "react";
import ParagraphDisplay from "./components/ParagraphDIsplay";
import TypingArea from "./components/TypingArea";
import { paragraphs } from "./data/dataSource.js";
import TypingGame from "./components/TypingGame.jsx";

function App() {
  const [difficulty, setDifficulty] = useState(0);
  const taRef = useRef(null);
  const [para, setPara] = useState("");
  const [paraArray, setParaArray] = useState([]);
  const randomIndex = Math.round((Math.random() * 10) % 2);
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [textValue, setTextValue] = useState("");
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const randomPara = paragraphs[difficulty].paragraphs[randomIndex];
    setPara(randomPara);
    setParaArray(randomPara.split(" "));
  }, [difficulty]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isRunning) {
        setTime((prevTime) => prevTime + 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleBackspace = (event) => {
    event.preventDefault();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Backspace") {
      handleBackspace(event);
    } else if (event.key === " ") {
      console.log(event.key);
      event.preventDefault();

      // Check
      if (paraArray[index] == text) {
        console.log("Success");
      } else {
        console.log("Failure");
      }
      setTextValue(text + " ");
      setIndex((prev) => prev + 1);
      setText("");
    } else {
      console.log("Else");
      setText(text + event.key);
    }
  };

  return (
    <main className="max-w-[1280px] mx-auto p-3 bg-slate-800 text-white min-h-screen">
      <h1 className="text-center font-bold text-3xl">MasterTyper</h1>
      <div className="flex gap-3 mt-10">
        <label htmlFor="difficulty">Select difficulty</label>
        <select
          name="difficulty"
          id="difficulty"
          className="border border-white w-[150px] text-black"
          onChange={(e) => setDifficulty(Number(e.target.value))}
          value={difficulty}>
          <option value="0">Easy</option>
          <option value="1">Medium</option>
          <option value="2">Hard</option>
        </select>
      </div>
      <div className="min-h-[calc(100dvh-150px)] grid place-content-center">
        <div className="mt-auto">
          <h2 className="font-semibold text-center">
            Type the given Paragraph below
          </h2>
          <p className="max-w-[600px] mx-auto mt-4 border border-slate-500 p-2">
            {para}
          </p>
        </div>
        <div className="w-full max-w-[600px] mx-auto mt-6">
          <textarea
            name=""
            value={textValue}
            onKeyDown={handleKeyPress}
            id=""
            rows={10}
            className="w-full border-2 text-black"
            ref={taRef}></textarea>
        </div>
        <h2 className="mt-3 underline-offset-2 underline">Performance stats</h2>
        <div className="flex flex-col mt-4">
          <span>Time: {time}</span>
          <span>Accuracy: 00.00%</span>
        </div>
        <button onClick={() => setIsRunning(!isRunning)}>Start</button>
      </div>
      <div></div>
    </main>
  );
}

export default App;
