import { useEffect, useState } from "react";

export default function CChatTitle() {
  const target = "cardona"; // the word that types/deletes
  const suffix = "chat"; // static word in separate span

  const typingSpeed = 120;
  const deletingSpeed = 80;
  const pauseTime = 800;

  const [word, setWord] = useState("");
  const [direction, setDirection] = useState("forward");
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    let index = word.length;

    const interval = setInterval(
      () => {
        if (direction === "forward") {
          index++;
          setWord(target.substring(0, index));

          if (index === target.length) {
            // pause at full word
            setIsPaused(true);
            setTimeout(() => {
              setDirection("backward");
              setIsPaused(false);
            }, pauseTime);
          }
        } else {
          index--;
          setWord(target.substring(0, index));

          if (index === 1) {
            // stop at "c"
            setIsPaused(true);
            setTimeout(() => {
              setDirection("forward");
              setIsPaused(false);
            }, pauseTime);
          }
        }
      },
      direction === "forward" ? typingSpeed : deletingSpeed
    );

    return () => clearInterval(interval);
  }, [word, direction, isPaused]);

  return (
    <div className="text-3xl font-bold text-green-500 flex">
      <span className="opacity-50">{word}</span>
      <span>{suffix}</span>
    </div>
  );
}
