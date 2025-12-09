import { useState, useEffect } from "react";

export default function DropTextRotator() {
  const words = [
    "Today's Trends",
    "Sales Data",
    "Buyer Behaviour",
    "In Demand Items",
  ];
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(false); // trigger dropOut

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setAnimate(true); // trigger dropIn
      }, 600); // match animation duration
    }, 5000); // time between word changes

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      key={index}
      className={`bg-[linear-gradient(120deg,#8d72ff,#ce10b4,#a20dff)] bg-clip-text text-transparent absolute text-center h-full text-6xl drop-text ${
        animate ? "animate-dropIn" : "animate-dropOut"
      }`}
    >
      {words[index]}
    </div>
  );
}
