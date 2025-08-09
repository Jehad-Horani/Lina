"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

// كلمة السر
const secretPassword = "الخميس";

// قائمة الهدايا
const gifts = [
  {
    type: "audio",
    title: "اغنيتنا",
    url: "https://www.youtube.com/watch?v=19StO6rP_Q8&list=RD19StO6rP_Q8&start_radio=1",
  },
  {
    type: "audio",
    title: "اول اغنية غنيناها مع بعض",
    url: "https://www.youtube.com/watch?v=WnYGOX98Ma0&list=RDWnYGOX98Ma0&start_radio=1",
  },
  {
    type: "audio",
    title: "وهاي اهداء مني الك قدمي للثانية 0:40",
    url: "https://www.youtube.com/watch?v=6StGFf3ek-0&list=RD6StGFf3ek-0&start_radio=1",
  },
];

export default function HiddenGifts() {
  const [input, setInput] = useState("");
  const [accessGranted, setAccessGranted] = useState(false);
  const [error, setError] = useState("");

  // قلوب متساقطة في الخلفية
  useEffect(() => {
    if (!accessGranted) return;

    const createHeart = () => {
      const heart = document.createElement("div");
      heart.innerHTML = "❤️";
      heart.style.position = "fixed";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.top = "-20px";
      heart.style.fontSize = Math.random() * 20 + 20 + "px";
      heart.style.opacity = Math.random();
      heart.style.animation = `fall ${Math.random() * 3 + 2}s linear`;

      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 5000);
    };

    const heartInterval = setInterval(createHeart, 300);
    return () => clearInterval(heartInterval);
  }, [accessGranted]);

  // إضافة أنيميشن CSS للقلوب
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes fall {
        to {
          transform: translateY(100vh);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === secretPassword) {
      setAccessGranted(true);
      setError("");

      // كونفيتي
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

      // صوت ترحيب
     
    } else {
      setError("الكلمة غلط يا هبولة، جربي مرة ثانية");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50 p-6 relative overflow-hidden">
      {!accessGranted ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md z-10"
        >
          <h2 className="text-2xl font-bold mb-4 text-pink-700 text-center">
            أدخل كلمة السر لفتح المفاجآة (يوم من ايام الاسبوع) 🎁
          </h2>
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="كلمة السر"
            className="w-full text-black p-3 border-2 border-pink-300 rounded-md mb-3 focus:outline-none focus:border-pink-600"
          />
          {error && (
            <p className="text-red-500 mb-3 text-center font-semibold">{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition"
          >
            افتح المفاجآة
          </button>
        </form>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md z-10">
          <h2 className="text-2xl font-bold mb-6 text-pink-700 text-center">
            المفاجآة 🎉
          </h2>
          <p className="text-center text-pink-800 mb-6 font-semibold">
            يا أجمل ما في حياتي ❤️ هاي الأغاني إهداء مني إلك، كل وحدة بتحكي قصة حبنا.
          </p>
          <ul className="space-y-4">
            {gifts.map(({ type, title, url }, i) => (
              <motion.li
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.4 }}
              >
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:underline font-semibold"
                >
                  {title}
                  {type === "audio" && (
                    <p className="text-sm text-gray-500 mt-1">اضغط للاستماع 🎧</p>
                  )}
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
