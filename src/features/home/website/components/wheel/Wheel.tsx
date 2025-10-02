import { useState } from "react";

const names = ["ايلا", "غالية", "توالا"];

export default function Wheel() {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<string | null>(null);

  const spinWheel = () => {
    if (spinning) return;

    setWinner(null);
    setSpinning(true);

    const extraSpins = 360 * (3 + Math.floor(Math.random() * 3));
    const sliceAngle = 360 / names.length;
    const randomSlice = Math.floor(Math.random() * names.length);

    const finalRotation =
      extraSpins + randomSlice * sliceAngle + sliceAngle / 2;
    setRotation(finalRotation);

    setTimeout(() => {
      setSpinning(false);
      const index = (names.length - 1 - randomSlice) % names.length;
      setWinner(names[index]);
    }, 4000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-purple-200 p-4">
      <div className="relative w-72 h-72 rounded-full overflow-hidden border-4 border-purple-600 shadow-xl">
        <div
          className="w-full h-full transition-transform duration-[4000ms] ease-out"
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {names.map((name, i) => {
            const sliceAngle = 360 / names.length;
            return (
              <div
                key={i}
                className="absolute w-1/2 h-1/2 origin-bottom-right flex items-center justify-center text-white font-bold text-lg"
                style={{
                  backgroundColor: i % 2 === 0 ? "#ec4899" : "#a855f7",
                  transform: `rotate(${i * sliceAngle}deg) skewY(-${
                    90 - sliceAngle
                  }deg)`,
                }}
              >
                <span
                  style={{
                    transform: `skewY(${90 - sliceAngle}deg) rotate(${
                      sliceAngle / 2
                    }deg)`,
                  }}
                  className="block text-center w-24"
                >
                  {name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={spinWheel}
        disabled={spinning}
        className="mt-10 px-6 py-3 rounded-2xl bg-purple-600 text-white font-bold shadow-lg hover:bg-purple-700 disabled:opacity-50"
      >
        {spinning ? "جاري الدوران..." : "Spinnnn"}
      </button>

      {winner && (
        <div className="mt-6 text-2xl font-extrabold text-purple-700 animate-bounce">
          الاسم المختار هو: {winner} 🎉
        </div>
      )}
    </div>
  );
}
