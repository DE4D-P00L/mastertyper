import { useEffect, useState } from "react";
import { paragraphs } from "../data/dataSource.js";

const ParagraphDisplay = ({ difficulty }) => {
  const [para, setPara] = useState("");
  const randomIndex = Math.round((Math.random() * 10) % 2);
  useEffect(() => {
    console.log(paragraphs[difficulty].paragraphs[randomIndex]);
    setPara(paragraphs[difficulty].paragraphs[randomIndex]);
  }, [difficulty]);
  return (
    <div>
      <p>{para}</p>
    </div>
  );
};
export default ParagraphDisplay;
