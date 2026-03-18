export default function HeroSection() {
  return (
    <section className="bg-black text-white py-20 md:py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-5xl md:text-7xl font-bold mb-6 text-[#DCA54A]"
          style={{ fontFamily: "'Architects Daughter', cursive" }}
        >
          40+ CARE
        </h1>
        <p className="text-base md:text-lg text-gray-300 max-w-3xl leading-relaxed mb-2">
          這是一個用心嘗試新事物、體驗美好、並且誠實分享給你的地方。
        </p>
        <p className="text-base md:text-lg text-gray-300 max-w-3xl leading-relaxed">
          我們可以一起，每一天，做一點點微小但重要的選擇，讓生活開花，讓心情安定，讓自己溫柔地與世界連結。
        </p>
      </div>
    </section>
  );
}
