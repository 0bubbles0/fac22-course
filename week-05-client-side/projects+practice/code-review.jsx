import {useState, useEffect} from "react";

function App() {
  const [count, setCount] = useState(0);

  // constantly making&resetting timers
  useEffect(() => {
    const id = setInterval(()=> {
      console.log("tick");
      setCount((c) => c + 1);
    }, 1000);
    //need to clean up! -> each time this component runs, want a whole new effect
    return () => {
      console.log("Cleaning up effect!");
      clearInterval(id);
    }
  }, [])

  //actually only want 1 interval

  return <div>{count}</div>;
}

export default App

// function setCount(newValue) {
//   const value = typeof newValue === "function"
//    ? newValue(oldState)
//    : newValue;
//   updateState(value);
//   reRenderComponent();
// }