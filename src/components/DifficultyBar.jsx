const DifficultyBar = ({ difficulty, setDifficulty }) => {
  return (
    <div className="flex gap-3">
      <label htmlFor="difficulty">Select difficulty</label>
      <select
        name="difficulty"
        id="difficulty"
        onChange={(e) => setDifficulty(Number(e.target.value))}
        value={difficulty}>
        <option value="0">Easy</option>
        <option value="1">Medium</option>
        <option value="2">Hard</option>
      </select>
    </div>
  );
};
export default DifficultyBar;
