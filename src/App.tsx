import { useEffect, useState } from "react";
import { Screen1 } from "./components/Screen1";
import { Screen2 } from "./components/Screen2";
// import { Screen3 } from "./components/Screen3";
import { Screen4 } from "./components/Screen4";
import { Screen5 } from "./components/Screen5";
import { Screen6 } from "./components/Screen6";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(1);

  useEffect(()=>{
    console.log(currentScreen, "1234")
  }, [currentScreen])

  return (
    <div className="min-h-screen bg-gray-50">
      {currentScreen === 1 && <Screen1 onNext={() => setCurrentScreen(2)} />}
      {currentScreen === 2 && (
        <Screen2 
          onCardPin={() => setCurrentScreen(2)} 
          onRefine={() => setCurrentScreen(5)}
        />
      )}
      {/* {currentScreen === 3 && (
        <Screen3 
          onViewPinned={() => setCurrentScreen(4)}
          onContinue={() => setCurrentScreen(2)}
        />
      )} */}
      {currentScreen === 4 && <Screen4 onBack={() => setCurrentScreen(2)} />}
      {currentScreen === 5 && <Screen5 onNext={() => setCurrentScreen(6)} />}
      {currentScreen === 6 && <Screen6 />}
    </div>
  );
}
