import Card from "./components/Note";
import { useState } from "react";
import Button from "./components/Button";
import "./App.css";
import NavBar from "./components/NavBar";

export default function App() {
  const [currentIndex, changeIndex] = useState(0);
  const [showNext, setVisibility] = useState(true);
  const [showPrev, setPrev] = useState(true);

  const card_titles = ["Playing with ReactJS", "Page 2 !", "Page 3!"];
  const card_content = ["Your are on Page 1", "Your are on Page 2", "Page 3"];

  const toggleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < card_titles.length) {
      changeIndex(nextIndex);
      setPrev(true);
      setVisibility(nextIndex !== card_titles.length - 1);
    }
  };

  const togglePrev = () => {
    const nextIndex = currentIndex - 1;
    if (nextIndex >= 0) {
      changeIndex(nextIndex);
      setVisibility(true);
      setPrev(nextIndex !== 0);
    }
  };

  return (
    <>
      <div className="h-screen bg-cyan-800">
        <div className="flex justify-center h-13">
          <h1 className="text-center text-emerald-400 mt-3 text-5xl w-1/2">
            React Notes
          </h1>
        </div>

        <NavBar />
        <Card />

      </div>
    </>
  );
}
