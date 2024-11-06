import buttonStyles from "../../styles/sortSensei/Button.module.css";
import { useState } from "react";
import { useSortContext } from "../../hooks/sortContextHooks";

const GenerateButtons = () => {
  const [customArray, setCustomArray] = useState<string>("");
  const { setStep, fetchStepsList } = useSortContext();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomArray(event.target.value);
  };

  const submitCustomArray = () => {
    setStep(1);
    const array = customArray
    .split(/[,\s]+/) // split by (many) commas, #;- or whitespace
    .map(num => parseInt(num, 10)) // convert the string to an Integer number
    .filter(num => !isNaN(num) );
    console.log(array);
    const outOfRangeNumbers = array.filter((num) => num <= 0 || num > 40);
    
    if (outOfRangeNumbers.length > 0) {
      alert("Please enter numbers only in the range 1 to 40.");
      return;
    }

    if (array.length < 2) { //! what is min array length
      alert("Please enter at least 2 numbers.");
      return;
    }
    if(array.length >15){
      alert("Please enter at most 15 numbers");
      return;
    }

    fetchStepsList(array);
    setCustomArray("");
  };

  const generateRandomArray = (length=7, max=40)=>{
    return Array.from({length}, () => Math.floor(Math.random() * ( max + 1) +1));
  };

  const handleRandomArray = () =>{
    setStep(1);
    const array = generateRandomArray();
    fetchStepsList(array);
  }

  return (
    <div className={buttonStyles["generate-buttons"]}>
      <button>
        New custom array
      </button>

      <input 
        type="text" 
        placeholder="4 10 7 20 15 30 25" 
        value={customArray} 
        onChange={handleInputChange} 
        className={buttonStyles["custom-array-input"]}
        onKeyDown={(e) => e.key === "Enter" && submitCustomArray()}
      />

      <button onClick={handleRandomArray}>
        New random array
      </button>
    </div>
  );
};

export default GenerateButtons;
