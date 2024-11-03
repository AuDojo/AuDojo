import buttonStyles from "../../styles/sortSensei/Button.module.css";
const GenerateButtons = () => {
  return (
    <div className={buttonStyles["generate-buttons"]}>
      <button>New custom array</button>
      <button>New random array</button>

    </div>
  );
};

export default GenerateButtons;
