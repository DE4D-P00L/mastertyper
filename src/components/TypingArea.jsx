import { useEffect, useRef } from "react";

const TypingArea = () => {
  const taRef = useRef(null);

  const handleBackspace = (event) => {
    event.preventDefault();
  };

  const handleKeyPress = (event) => {
    if (event.key === "Backspace") {
      handleBackspace(event);
    } else if (event.key === " ") {
      console.log(event.key);
    } else {
      console.log("Else");
    }
  };

  useEffect(() => {
    // if(taRef.current) taRef.current.
  }, []);
  return (
    <div className="w-full">
      <textarea
        name=""
        onKeyDown={handleKeyPress}
        id=""
        className="w-full border-2"
        ref={taRef}></textarea>
    </div>
  );
};
export default TypingArea;
