
import "./ToggleAsideButton.css";
const ToggleAsideButton = ({ isOpened, setIsOpened }: { isOpened: boolean, setIsOpened: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const handleToggle = () => {
    setIsOpened(!isOpened);
  };

  return (
    <div id="menuToggle">
      <input
        id="checkbox"
        type="checkbox"
        checked={isOpened}
        onChange={handleToggle}
      />
      <label className="toggle" htmlFor="checkbox">
        <div className="bar bar--top"></div>
        <div className="bar bar--middle"></div>
        <div className="bar bar--bottom"></div>
      </label>
    </div>
  );
};

export default ToggleAsideButton;
