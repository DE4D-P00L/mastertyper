import { useEffect, useRef, useState } from "react";
import { paragraphs } from "./data/dataSource.js";

function App() {
  const [difficulty, setDifficulty] = useState(0);
  const inputRef = useRef(null);
  const charRef = useRef([]);
  const [para, setPara] = useState("");
  const [accuracy, setAccuracy] = useState(0.0);
  const [maxTime, setMaxTime] = useState(60);
  const [totalTime, setTotalTime] = useState(60);
  const [mistakes, setMistakes] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [finished, setFinished] = useState(false);
  const [isCorrectOrWrong, setIsCorrectOrWrong] = useState([]);

  useEffect(() => {
    inputRef.current.focus();
    const randomIndex = Math.round(
      (Math.random() * 10) % (paragraphs[difficulty].paragraphs.length - 1)
    );
    setPara(paragraphs[difficulty].paragraphs[randomIndex]);
    setMaxTime(paragraphs[difficulty].maxTime);
    setTotalTime(paragraphs[difficulty].maxTime);
    setIsCorrectOrWrong(Array(charRef.current.length).fill(""));
  }, []);

  useEffect(() => {
    let interval;
    if (isTyping && maxTime > 0) {
      interval = setInterval(() => {
        setMaxTime((t) => t - 1);
      }, 1000);
    } else if (maxTime <= 0) {
      clearInterval(interval);
      setIsTyping(false);
    }
    return () => clearInterval(interval);
  }, [maxTime, isTyping]);

  useEffect(() => {
    const randomIndex = Math.round(
      (Math.random() * 10) % (paragraphs[difficulty].paragraphs.length - 1)
    );
    setPara(paragraphs[difficulty].paragraphs[randomIndex]);
    setMaxTime(paragraphs[difficulty].maxTime);
    setTotalTime(paragraphs[difficulty].maxTime);
    resetGame();
  }, [difficulty]);

  const handleChange = (e) => {
    const characters = charRef.current;
    let currentChar = charRef.current[charIndex];
    let typedChar = e.target.value.slice(-1);
    if (charIndex < characters.length && maxTime > 0) {
      if (!isTyping) {
        setIsTyping(true);
      }

      if (typedChar === currentChar.textContent) {
        setCharIndex((i) => i + 1);
        isCorrectOrWrong[charIndex] = "correct";
        setCorrectChars((p) => p + 1);
      } else {
        setCharIndex((i) => i + 1);
        setMistakes((m) => m + 1);
        isCorrectOrWrong[charIndex] = "incorrect";
      }
      if (charIndex === characters.length - 1) {
        setIsTyping(false);
        setFinished(true);
        const countWords = para?.trim().split(" ").length - 1;
        setWpm(countWords / ((totalTime - maxTime) / 60));
        let calcAccuracy = correctChars / (characters.length - 1);
        setAccuracy(calcAccuracy);
      }
    } else {
      setIsTyping(false);
    }
  };

  const resetGame = () => {
    setIsTyping(false);
    setMaxTime(paragraphs[difficulty].maxTime);
    setTotalTime(0);
    setCharIndex(0);
    setMistakes(0);
    setCorrectChars(0);
    setIsCorrectOrWrong(Array(charRef.current.length).fill(""));
    setFinished(false);
    inputRef.current.focus();
  };

  return (
    <main className="max-w-[1280px] mx-auto p-3 bg-slate-800 text-white min-h-screen">
      <h1 className="text-center font-bold text-3xl">MasterTyper</h1>
      <div className="min-h-[calc(100dvh-150px)] grid place-content-center">
        <div className="mt-auto w-full">
          <div className="flex gap-3 mt-10 mb-5 mx-auto w-fit">
            <label htmlFor="difficulty">Select difficulty</label>
            <select
              name="difficulty"
              id="difficulty"
              className="border border-white w-[150px] text-black"
              onChange={(e) => {
                setDifficulty(Number(e.target.value));
              }}
              value={difficulty}>
              <option value="0">Easy</option>
              <option value="1">Medium</option>
              <option value="2">Hard</option>
            </select>
          </div>
          <div className="flex justify-between items-center flex-wrap">
            <span className="">Time Left: {maxTime} seconds</span>
            <button
              className="bg-white text-black px-5 py-1.5 rounded-md"
              onClick={resetGame}>
              Reset
            </button>
          </div>
          <div
            className="max-w-[600px] mx-auto mt-4 border border-slate-500 p-2 select-none font-mono text-xl relative rounded-md"
            onClick={() => inputRef.current.focus()}>
            <input
              type="text"
              className="opacity-0 -z-10 absolute"
              ref={inputRef}
              onChange={handleChange}
            />
            {para.split("").map((char, i) => (
              <span
                key={i}
                className={`select-none cursor-text ${
                  i === charIndex && "border-b-[3px] border-blue-500"
                } ${
                  isCorrectOrWrong[i] === "correct"
                    ? "text-green-500"
                    : isCorrectOrWrong[i] === "incorrect"
                    ? "text-red-500"
                    : ""
                }`}
                ref={(e) => (charRef.current[i] = e)}>
                {char}
              </span>
            ))}
          </div>
        </div>
        {finished && (
          <div className="mt-6 w-fit p-2">
            <div className="flex flex-col mt-2">
              <span>Time Taken: {totalTime - maxTime} seconds</span>
              <span>WPM: {wpm.toFixed(2)}</span>
              <span>Accuracy: {(accuracy * 100).toFixed(2)}%</span>
            </div>
          </div>
        )}
      </div>
      <div></div>
    </main>
  );
}

export default App;
