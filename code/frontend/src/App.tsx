import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch("/api/")
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}
export default App;
