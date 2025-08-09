"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import confetti from "canvas-confetti";


export default function QuizPage() {
const router = useRouter();

  const [step, setStep] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const noBtnRef = useRef(null);
  const [accessGranted, setAccessGranted] = useState(false);

  // بيانات لعبة البازل
  const size = 3; // حجم البازل
  const [tiles, setTiles] = useState([]);
  const [emptyIndex, setEmptyIndex] = useState(8);

  // إعداد البازل لما نوصل للخطوة 4
  useEffect(() => {
    if (step === 4) {
      const arr = Array.from({ length: size * size }, (_, i) => i);
      let shuffled = shuffleArray(arr);
      while (!isSolvable(shuffled)) {
        shuffled = shuffleArray(arr);
      }
      setTiles(shuffled);
      setEmptyIndex(shuffled.indexOf(size * size - 1));
    }
  }, [step]);

  // دالة خلط
  function shuffleArray(array) {
    let arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // دالة تحقق من الحل
  function isSolvable(arr) {
    let invCount = 0;
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        if (
          arr[i] !== size * size - 1 &&
          arr[j] !== size * size - 1 &&
          arr[i] > arr[j]
        ) {
          invCount++;
        }
      }
    }
    return invCount % 2 === 0;
  }

  // تحريك القطع
  function moveTile(index) {
    const validMoves = [
      emptyIndex - size,
      emptyIndex + size,
      emptyIndex - 1,
      emptyIndex + 1,
    ];
    if (validMoves.includes(index)) {
      const newTiles = [...tiles];
      [newTiles[emptyIndex], newTiles[index]] = [
        newTiles[index],
        newTiles[emptyIndex],
      ];
      setTiles(newTiles);
      setEmptyIndex(index);

      // تحقق من الفوز
      if (newTiles.every((val, idx) => val === idx)) {
        setTimeout(() => {
          setStep(5);
          setAccessGranted(true);
        }, 500);

        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
      }
    }
  }

  // قلوب متساقطة بعد الفوز
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

  // زر "لا" الهارب
  useEffect(() => {
    if (step === 1 || step === 2) {
      const btn = noBtnRef.current;
      if (!btn) return;

      const handleMouseMove = (e) => {
        const rect = btn.getBoundingClientRect();
        const distanceX = Math.abs(
          e.clientX - (rect.left + rect.width / 2)
        );
        const distanceY = Math.abs(
          e.clientY - (rect.top + rect.height / 2)
        );

        if (distanceX < 100 && distanceY < 60) {
          const maxX = window.innerWidth - rect.width - 20;
          const maxY = window.innerHeight - rect.height - 20;
          const randomX = Math.floor(Math.random() * maxX);
          const randomY = Math.floor(Math.random() * maxY);
          btn.style.position = "fixed";
          btn.style.left = randomX + "px";
          btn.style.top = randomY + "px";
        }
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        if (btn) {
          btn.style.position = "static";
          btn.style.left = null;
          btn.style.top = null;
        }
      };
    }
  }, [step]);

  const handleNextStep = () => {
    setError("");
    if (step === 3) {
      if (inputValue.trim() === "2711") {
        setStep(4);
      } else {
        setError(" حاول مرة ثانية... فكري خارج الصندوق فكري بتفاهتي يا لينا");
      }
    } else {
      setStep(step + 1);
    }
  };
  return (
    <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center p-4 text-center">
      {step === 1 && (
        <>
          <h1 className="text-3xl font-bold text-pink-700 mb-6">
            هل بتحبيني؟ وما تحكي الله بعين يا نعم يا لا يلا اتفضلي خاوة
          </h1>
          <div className="flex justify-center gap-8">
            <button
              onClick={() => setStep(2)}
              className="bg-pink-600 cursor-pointer text-white px-6 py-3 rounded-lg shadow hover:bg-pink-700 transition"
            >
              نعم
            </button>

            <button
              ref={noBtnRef}
              className="bg-pink-300 text-pink-800 px-6 py-3 rounded-lg shadow cursor-not-allowed select-none"
              disabled
            >
              لا
            </button>
          </div>
          <p className="mt-4 text-pink-600 italic">جربي تضغطي على "لا" لو تقدري</p>
        </>
      )}

      {step === 2 && (
        <>
          <h1 className="text-3xl font-bold text-pink-700 mb-6">
            هل بتكرهيني؟ اخيرا وغصبا عنك هتحكي لا خاوة احكي نعم لو انك لينا وقد حالك
          </h1>
          <div className="flex justify-center gap-8">
            <button
              ref={noBtnRef}
              className="bg-pink-300 text-pink-800 px-6 py-3 rounded-lg shadow cursor-not-allowed select-none"
              disabled
            >
              نعم
            </button>

            <button
              onClick={() => setStep(3)}
              className="bg-pink-600 cursor-pointer text-white px-6 py-3 rounded-lg shadow hover:bg-pink-700 transition"
            >
              لا
            </button>
          </div>
          <p className="mt-4 text-pink-600 italic">جربي تضغطي على "نعم" لو تقدري</p>
        </>
      )}

      {step === 3 && (
        <>
          <h1 className="text-3xl font-bold text-pink-700 mb-6">
            أيش أحلى شهر بحياتك؟ <br />
            <span className="text-sm font-normal">(فكري خارج الصندوق)</span>
          </h1>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="اكتبي رقم الشهر الصحيح"
            className="p-3 rounded-lg border-2 text-black border-pink-400 focus:outline-none focus:border-pink-600 text-center text-lg w-64"
          />
          {error && <p className="text-red-600 mt-2 font-semibold animate-shake">{error}</p>}
          <button
            onClick={handleNextStep}
            className="mt-6 bg-pink-600 cursor-pointer text-white px-6 py-3 rounded-lg shadow hover:bg-pink-700 transition"
          >
            تأكيد
          </button>
        </>
      )}

      {step === 4 && (
        <>
          <h1 className="text-3xl font-bold text-pink-700 mb-6">🎯 رتبي الصورة لتشوفي المفاجأة</h1>
          <div
            className="grid gap-1"
            style={{
              gridTemplateColumns: `repeat(${size}, 100px)`,
              gridTemplateRows: `repeat(${size}, 100px)`,
            }}
          >
            {tiles.map((tile, idx) => (
              <div
                key={idx}
                onClick={() => moveTile(idx)}
                className="bg-pink-200 cursor-pointer flex items-center justify-center"
                style={{
                  backgroundImage:
                    tile === size * size - 1
                      ? "none"
                      : `url('/lina.jpg')`, // ضع صورة لينا هنا
                  backgroundSize: `${size * 100}px ${size * 100}px`,
                  backgroundPosition: `${-(tile % size) * 100
                    }px ${-Math.floor(tile / size) * 100}px`,
                }}
              >
                {tile === size * size - 1 ? "" : ""}
              </div>
            ))}
          </div>
          <p className="mt-4 text-pink-600">اضغطي على المربعات لتكملي الصورة 💖</p>
        </>
      )}

      {step === 5 && (
        <>
          <h1 className="text-3xl font-bold text-pink-700 mb-6"> مبرووووك اخيرا عديتي هالتحدي التافه</h1>
          <p className="text-pink-800 mb-8 max-w-md">
            شكراً لأنك جاوبتي بكل حب شكراً لانك استحملتيني شكرا لانك متحملاني من زمان كثير شكرا انك معي بحياتي يا لينا كل عام وانتي بالف خير يا احلى واغلى وارقى واحن انسانة بالكون كل عام وانتي الخير للعام الجديد كل سنة وانتي فرحتي وحياتي وقلبي وروحي كل عام وانتي حبيبتي ومرتي وام ولادي ان شاء الله يا حياتي انتي احلى مين يصير عشرين بالكون كلو اقسم بالله ولك كبرتي وصرتي عشرينية جادة الله يخليلي اياكي يا لينا يا مصدر طاقتي وسعادتي بكل هاي الدنيا انتي جد من كل قلبي بقلك شكرا انك بحياتي وشكرا انك بحياة اهلي برضو لانهم كلهم غيرو نظرتهم عني بسببك كلهم صارو يحبوني بسببك امي بحياتها ما هتعطيني السيارة عالجامعة اعطتني اياها بسببك اخواني بحياتهم ما حبو يقعدو عندي صارو اول ما يشوفوني بحكي معك عالسريع يتجمعو عندي بسببك انتي مصدر سعادتنا كلنا يا لينا اقسم بالله حياتي انتي ويارب انو على طول العمر كل سنة واحنا مع بعض وبنتزانخ على بعض وبنتهبل يارب كل سنة واحنا نكون هيك مرتاحين ومبسوطين مع بعض بعرفش بس بحسك مرتاحة يعني انا مرتاح وهاذ الي اجاكي والله بدك ترتاحي خاوة ما الي دخل المهم يا سندي وروحي وعيوني انتي الله يخليلي اياكي وما يحرمني منك يا حياتي انتي بعيد عن الهبل عملتلك هيك اشي بسيط تتسلي عليه وتضحكي وتحسي بفراشات شوي شوفي جهاد كما لم تريه من قبل روحي شوفي الجانب الرومنسي مني يا حياتي واعرفي اني جد بحبك من كل قلبي يا لينا بس والله ما بعرف اعبر جد والله بحبك وما بدي اكمل حياتي غير معك يا سندي انتي وجد كل الكلام من جوا جوا قلبي وجد ما راح اقراه حتى خليه ببركتو وبحلاتو زي ما هو          </p>
          <button
            onClick={() => router.push("/book")}
            className="bg-pink-600 cursor-pointer text-white px-6 py-3 rounded-lg shadow hover:bg-pink-700 transition"
          >
            افتحي الهدية 🎀
          </button>

          <p className="text-pink-800 mt-8 max-w-md">
            هون في اكم من شغلة اهداء مني الك بس لازم بالاول تدوري على اسم يوم مميز بالهدية الي فوق يوم كان فيه كثير من المناسبات هاذ اعتبريه تلميح
          </p>
          <Link href="/hidden-gifts">
            <button className="bg-pink-400 cursor-pointer text-white px-6 py-3 rounded-lg shadow-lg hover:bg-pink-500 transition">
              مفاجآت سرية 🎉
            </button>
          </Link>
        </>
      )}
    </div>
  );
}
