
import buttonStyles from "../../styles/sortSensei/Button.module.css";
const SolveButton = () => {
  return (
    <div className={buttonStyles["solve-button"]}>
        <button >Solve All</button>
        <button>Solve Line</button>
        <button>Try Again</button>
    </div>
  )
}

export default SolveButton