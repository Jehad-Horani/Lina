"use client";

export default function BookPage({ children }) {
  return (
    <div
      className="w-full h-full flex items-center justify-center p-8 text-center"
      style={{
        backgroundImage: "url('/paper-texture.png')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="text-2xl text-pink-700 font-semibold leading-relaxed">
        {children}
      </div>
    </div>
  );
}
