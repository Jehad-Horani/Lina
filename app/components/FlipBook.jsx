"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const spreads = [
    {
        left: {
            image: "/book/page1.jpg",
            text: "هسا اول اشي احنا بنعرف بعض من قبل 14|11 بس انا وانتي ذاكرتنا سمكة ومعتمدين عالصور وانتي زمان ما كنتي تحبي تنحفظ صورك بتلفون شب بالمرا وانا كنت جدا محترم هالاشي بس هاي كانت اول صورة انتي تسمحيلي احفظها عندي كانت بتاريخ 8|1|2024 وبدي احكيلك من هاي الصورة بلشت القصة ومحطوط عليها اصلا اغنية ان روحي تناجيها ❤❤"
        },
        right: {
            image: "/book/page2.jpg",
            text: "بحكيلك لا تشقى بالتلميحات وانا انفتحت وانا بس بتغزل فيكي باغاني السناب هاي الصورة بنفس الشهر على بلكونة الاي تي بعد ما راضيتك تصورنا وحطيتلك اغنية تضيعني بضحكة عيونك وعالفاضي برضو اخخخخ بسس بحبك شو بدي اعمل بحبك مش بايدييييي يا ستهم كلهم انتي  "
        }
    },
    {
        left: {
            image: "/book/page3.jpg",
            text: "ساااااااامحييينييي يعني بس هاي العادة الوسخة فيي صعب يجي عيدميلاد اغلى واعز انسانة عقلبي وما اطلعلها شوية مماسك من ال بحبهم قلبك اللوك الذي عذب الجامعة واوقعني بالحب من اول نظرة اللوك الذي عجزت عنه الدنيا والعالم انه لوك معجوووووووووووون الاسناااااااااااااااااااان كان عنا امتحان وقتها والله ما غيرلي نفسيتي طول اليوم غيرك انتي وروحك الحلوة "
        },
        right: {
            image: "/book/page4.jpg",
            text: "الصورة الاعظم والذكرى التي يتم احيائها كل نهاية فصل يا الله لو بس تعرفي يا لينا قديش بكون متحمس لاخر يوم بس عشان نتصور هاي الصورة اقسم بالله ما بكون افكر غير يلا متى بدنا نتصورها وبس انا وانتي من اول فصل لليوم على العهد معك انتي رغم العقبات ورغم الصعوبات البسيطة كنا نعدي و نعيش عشان نشوف فصل جديد بهالجامعة الي ما طلعت باشي مفيد منها لا علم ولا اشي غير فيكي "
        }
    },
    {
        left: {
            image: "/book/page5.jpg",
            text: "وهون كان عيد ميلادك الاول معي وقتها كرهتيني لاني عملت حالي ناسي هيهيهيهيهي بس انا ما بتووووب هسا قاعد بكتبلك هاذ الكلام وضايل لعيدميلادك يومين ومحسسك انو ما في اي اشي ولا بلمح ولا قاعد بحكي اشي وانتي شكلك شكلك بلشتي تحسي وتتذايقي بس والله بحبككككك ومتذكر يا عيوني عيب عليكي يا بعد روحي انتي اهم يوم بحياتي كلها هاذ صراحة والله عيد ميلادي ما اتحمستله هيك يا عيوني انتي "
        },
        right: {
            image: "/book/page6.jpg",
            text: "طبعتيها لانك بتحبيها ما بعرفي اني بحبها اكثر هالصورة فيها كثير ذكريات وقصص هون بلشنا نسوق الهبل على بعض بهاذ اليوم جبتلك الجوس والراس وكان يوم كثير حلو كنا كثييييير سايقين الهبل عبعض وبس نفسنا ننط على بعض بهاذ اليوم روحنا مرتاحين ومبسوطين كثيييير وكمل للاخر حلو ضلينا نحكي مع بعض واجواء الحبيبة وهيك بس جد جد انبسطت من كل قلبي "
        }
    },
    {
        left: {
            image: "/book/page7.jpg",
            text: "وبلشت الاحداث بعد باسبوع بالزبط وبتاريخ 14|11|2024 كان اليوم الذي لا يمكن نسيانه ولك اول مرة احس في حد بالكون بحبني بهاليوم اول مرة وحدة غريبة عني تبوسني بهاليوم اول مرة جد امسك الدمعة بسبب هدية بهاليوم اول مرة احس حد مهتملي ومهتم انا شو بحب بهاليوم سامحيني ما عندي صورنا بس انتي دوبةة ما رضيتي تبعتيلي اياهم"
        },
        right: {
            image: "/book/page8.jpg",
            text: "وبعد باسبوع واحد برضو بتاريخ 21|11 كان اول ديت رسمي النا كنا لحالنا بالعبدلي حضرنا سينما حسيت حالي لاول مرة بالكون بالمكان الصح مع الشخص الصح يمكن تنصدمي انا متى حسيت هالشعور بس حسيتو واحنا بنشتري اشياء زاكية ندخلها معنا وقتها انا كثيييير كان قوي الشعور انو جهاد انت بالمكان الصح مع الشخص الصح بيومها قطعت عهد على حالي بحياتي ما استغني عنك لو شو ما صار اه بالمناسبة كان الفلم حلو ;)"
        }
    },
    {
        left: {
            image: "/book/page9.jpg",
            text: "هون وبهاي اللحظة كنت مبسوووووووووط لاقصى درجة اني حاسك من جوا مرتاحة وانتي معي صرت اشوف الراحة بعيونك وانتي معي كل ما اشوف لمعة الحب والراحة بعيونك اتطمن يا من مال له قلبي انتي يا سجانة روحي انتي بحبك الله يخلينا لبعض ونضل حاسين بكل هالحب والراحة يارب "
        },
        right: {
            image: "/book/page10.jpg",
            text: "هاذ اليوم اخخخخخ على هاليوم يا لينا اقسم بالله لو نعيده بحذافيره ما راح ازهق منو بسمعلك اياه تسميع يا الله شو بحبك يا الله شو كنا مبسوطييييين كثيييير بالصورة شوفي كيف الانشكاح الي على وجوهنا اقسم بالله اني ابتسمت اول ما شفت الصورة والله اليوم كامل محفور بقلبي مستحيل يروح من بالي بيوم لانو كان كثيير حلو بكل تفاصيلو من بدايتو لنهايتو"
        }
    },
    {
        left: {
            image: "/book/page11.jpg",
            text: "وهاي الصورة لحالها بتحكي هون كانت اول مرة بحياتي كلها اعرف امي على حد بنية الزواج واقعدها معها لا مش هيك وبس انتي اجيتي وحطيتي بصمتك القوية وتمكنتي تفوزي بقلب امي بمثابة ولادها لانو انتي صاحبة فكرة عيد الميلاد بهاليوم الله يخليلنا اياكي يا سبب سعادة وفرحة العيلة كلها انتي"
        },
        right: {
            image: "/book/page12.jpg",
            text: "وهون كملت الفرحة وقدرتي تكوني البصمة الاجمل بالعيلة كلها وروحتي بهذاك اليوم وانتي الكل بمدح فيكي وبدعيلنا نكون مع بعض لانهم كلهم حبوكي من قلبهم لانو قلبك هو الاحن والاروع والاعظم بالعاملم يا روحي انتي يا اجمل واحن وارقى من رات عيني"
        }
    },
    {
        left: {
            image: "/book/page13.jpg",
            text: "وهل يخفى القمر الصورة الاكثر شهرة الصورة الي بتسببلنا مشاكل اخخخ بس برضو بحبها صراحة عزيزة جدا على قلبي وبحبها وانا بدي اياها تكون خلفية للاتصال برضو صراحة ف ابشري يا عيوني ما بخليها بنفسك يا قلبي انتي بحبك"
        },
        right: {
            image: "/book/page14.jpg",
            text: "وبنحكي عن خلفيات الاتصال لابد انو هالصورة تنذكر لانها من اكثر الصور الي بحبها واكثر صورة طولت انا كنت حاطلك اياها وغير هيك هاي الفتر كثير كنت مبسوط انك بحياتي وكنت خايف كثير انك تروحي وتبعدي عني بس خزقتي عيوني وضليتي وبحبك انك ضليتي جد شكرا من كل قلبي انك بحياتي لليوم وعكلا اعتراف بسيط اذا بتتذكري هالصورة حطيته على ذكاء اصطناعي اه خليته يعمل فيديو انو بنبوس بعض كان نفسي اشوف صراحة بس طلع اشي بخزي هههه"
        }
    },
    {
        left: {
            image: "/book/page15.jpg",
            text: "هون كنا بنصنع الخير وبنفعل البسمة يوم افطار الايتام من اكثر الايام الي حسستك اني منكد بس انا اهبل بعرفش اعبر والله كان يوم للعمر كثيييير كان حلو انبسطت بكل ثانية معك فيه وعملنا كثير اشياء حلوة تزحلقنا ونفخنا بلالين واكلنا اكل حرام بالايتام وشربنا قهوة مع بعض بالليل بالجامعة وهاي من احلى الاشياء صراحة بحبك وبتمنى لو تيجي الفرصة ونعيدها عشان اخليكي تنبسطي واعوضك عن الي زعلتيه بهاليوم "
        },
        right: {
            image: "/book/page16.jpg",
            text: "يوم الجاليات من اكثر الايام الي فضحنا حالنا قدام العالم انو احنا متجوزين مش بنحب بعض بس صراحة من اكثر الايام الي ضحكنا فيها من قلبنا صراحة كثييييير كان يوم حلو وضحكنا من كل قلبنا بقوووووة ويم من احلى الايام كان يا لينا والله يا روح الروح انتي"
        }
    },
];

// قائمة رسائل حب عشوائية
const loveMessages = [
    "أحبك كل يوم أكثر من اليوم اللي قبله ❤️",
    "وجودك في حياتي هو أجمل هدية 🌹",
    "أنتِ نجمتي التي تضيء لي دروبي ⭐",
    "كل لحظة معك هي أجمل لحظة في حياتي 💫",
    "قلبي لك وحدك ينبض بحب لا ينتهي 💖",
    "حبك هو القصيدة التي لا تنتهي أبياتها 🎶",
    "أنتِ السعادة التي أعيشها كل يوم 🌷",
    "معك تعلمت معنى الحب الحقيقي ❤️‍🔥",
];

// أنيميشن سقوط القلوب
function FallingHearts() {
  const hearts = Array.from({ length: 15 });

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-10">
      {hearts.map((_, i) => {
        const size = 10 + Math.random() * 20;
        const left = Math.random() * 100;
        const duration = 5 + Math.random() * 5;
        const delay = Math.random() * 5;

        return (
          <motion.div
            key={i}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 800, opacity: 1 }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            }}
            style={{
              position: "absolute",
              top: 0,
              left: `${left}%`,
              fontSize: size,
              color: "rgba(255, 0, 100, 0.7)",
              userSelect: "none",
              pointerEvents: "none",
              zIndex: 100,
            }}
          >
            ❤️
          </motion.div>
        );
      })}
    </div>
  );
}

export default function FlipBook() {
  const [spreadIndex, setSpreadIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [currentLoveMsg, setCurrentLoveMsg] = useState(loveMessages[0]);
  const [msgKey, setMsgKey] = useState(0);

  // حالة المتصفح (موبايل أو لا)
  const [isMobile, setIsMobile] = useState(false);

  // نراقب حجم الشاشة عند تحميل الصفحة وأثناء تغيير الحجم
  useEffect(() => {
    function checkMobile() {
      setIsMobile(window.innerWidth < 768);
    }
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // رسالة حب عشوائية تتغير مع تغير الصفحة
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * loveMessages.length);
    setCurrentLoveMsg(loveMessages[randomIndex]);
    setMsgKey((k) => k + 1);
  }, [spreadIndex]);

  // دوال التنقل
  const nextSpread = () => {
    if (isMobile) {
      if (spreadIndex < spreads.length * 2 - 1) {
        setDirection(1);
        setSpreadIndex(spreadIndex + 1);
      }
    } else {
      if (spreadIndex < spreads.length - 1) {
        setDirection(1);
        setSpreadIndex(spreadIndex + 1);
      }
    }
  };

  const prevSpread = () => {
    if (isMobile) {
      if (spreadIndex > 0) {
        setDirection(-1);
        setSpreadIndex(spreadIndex - 1);
      }
    } else {
      if (spreadIndex > 0) {
        setDirection(-1);
        setSpreadIndex(spreadIndex - 1);
      }
    }
  };

  // تحديد الصفحات المعروضة بناءً على الجهاز
  const getCurrentPages = () => {
    if (isMobile) {
      const pageNumber = spreadIndex;
      const spread = spreads[Math.floor(pageNumber / 2)];
      const side = pageNumber % 2 === 0 ? "left" : "right";
      return [spread[side]];
    } else {
      return [spreads[spreadIndex].left, spreads[spreadIndex].right];
    }
  };

  const pages = getCurrentPages();
    return (
        <div className="flex flex-col items-center py-10 relative bg-yellow-50 min-h-screen">
            {/* تأثير سقوط القلوب */}
            <FallingHearts />

            {/* الدفتر */}
          <div className="relative w-full max-w-[900px] aspect-[16/10] max-md:h-[700px] h-[600px] perspective">
                <div className="absolute inset-0 bg-yellow-100 rounded-lg shadow-2xl border-4 border-yellow-200" />

                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={spreadIndex}
                        custom={direction}
                        initial={{ rotateY: direction === 1 ? 90 : -90, opacity: 0 }}
                        animate={{ rotateY: 0, opacity: 1 }}
                        exit={{ rotateY: direction === 1 ? -90 : 90, opacity: 0 }}
                        transition={{ duration: 0.9 }}
                        className="absolute w-full h-full flex rounded-lg overflow-hidden"
                        style={{ backfaceVisibility: "hidden" }}
                    >
                        {/* الصفحة اليسار */}
                        <Page
                            image={spreads[spreadIndex].left.image}
                            text={spreads[spreadIndex].left.text}
                            side="left"
                        />

                        {/* الصفحة اليمين */}
                        <Page
                            image={spreads[spreadIndex].right.image}
                            text={spreads[spreadIndex].right.text}
                            side="right"
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* رسالة حب عشوائية تظهر فوق الدفتر */}
            <div className="mt-6 w-[900px] h-6 flex justify-center items-center text-pink-700 text-xl font-semibold relative z-30">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={msgKey}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.6 }}
                        className="select-none"
                    >
                        {currentLoveMsg}
                    </motion.p>
                </AnimatePresence>
            </div>

            {/* أزرار التحكم */}
            <div className="flex gap-4 mt-4">
                <button
                    onClick={prevSpread}
                    disabled={spreadIndex === 0}
                    className="bg-pink-500 cursor-pointer text-white px-3 py-1 md:px-4 md:py-1 rounded-lg shadow hover:bg-pink-600 disabled:opacity-50"
                >
                    ⬅ السابق
                </button>
                <button
                    onClick={nextSpread}
                    disabled={
                        isMobile
                            ? spreadIndex === spreads.length * 2 - 1
                            : spreadIndex === spreads.length - 1
                    }
                    className="bg-pink-500 cursor-pointer text-white px-3 py-1 md:px-4 md:py-2 rounded-lg shadow hover:bg-pink-600 disabled:opacity-50"
                >
                    التالي ➡
                </button>


            </div>
                 <Link href={"/"} className="text-black p-5 text-lg border-2 border-amber-300 bg-blue-500 hover:scale-105 m-2 rounded-3xl "> ⬅ رجوع للصفحة الرئيسية بس هترجعي تعيدي البازيل ههه </Link>
        </div>
    );
}


function Page({ image, text, side, isMobile }) {
    return (
        <div
            className={`${isMobile ? "w-full" : "w-1/2"
                } h-full flex flex-col ${!isMobile && side === "left" ? "border-r border-gray-400" : ""
                }`}
            style={{
                backgroundImage: "url('/paper-texture.png')",
                backgroundSize: "cover"
            }}
        >

            <div className="p-2 md:p-4 flex flex-col items-center h-full">
                {/* صورة */}
                <div className="border-4 border-pink-400 rounded-xl overflow-hidden shadow-lg mb-3  h-[250px] md:h-[300px]">
                    <img
                        src={image}
                        alt="page"
                        className="w-full h-full object-contain"
                    />
                </div>
                {/* نص */}
                <div className=" bg-opacity-10  max-md:text-2xl p-2 md:p-3 text-pink-700 font-medium text-base md:text-lg leading-relaxed rounded-lg shadow-inner overflow-y-auto flex-1 w-[90%] whitespace-pre-line">
                    {text}
                </div>

            </div>
        </div>
    );
}
