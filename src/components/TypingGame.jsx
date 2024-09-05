import React, { useState, useEffect, useRef } from "react";

function TypingGame() {
  const [text, setText] = useState("");
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [speed, setSpeed] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    const randomText = getRandomText();
    setText(randomText);
    setInput("");
    setStartTime(Date.now());
  }, []);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const checkResult = () => {
    setEndTime(Date.now());
    const timeTaken = (endTime - startTime) / 1000;
    const correctChars = text
      .split(" ")
      .filter(
        (word) => word === input.split(" ")[input.split(" ").length - 1]
      )[0];
    const totalChars = input.length;
    const accuracy = (correctChars.length / totalChars) * 100;
    const wordsPerMinute = (input.split(" ").length / timeTaken) * 60;
    setAccuracy(accuracy);
    setSpeed(wordsPerMinute);
  };

  const getRandomText = () => {
    const texts = [
      "The quick brown fox jumps over the lazy dog.",
      "Hello, world!",
      "This is a random text for typing practice.",
      // Add more texts here
    ];
    return texts[Math.floor(Math.random() * texts.length)];
  };

  return (
    <div>
      <p>{text}</p>
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={handleInputChange}
        autoFocus
      />
      <button onClick={checkResult}>Check Result</button>
      <p>Accuracy: {accuracy}%</p>
      <p>Speed: {speed} WPM</p>
    </div>
  );
}

export default TypingGame;
