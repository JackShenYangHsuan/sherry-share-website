import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FaYoutube, FaInstagram, FaFacebook, FaLinkedin, FaSpotify } from 'react-icons/fa';

export const metadata: Metadata = {
  title: '關於Sherry 雪力',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#1B4B5A] text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1
                className="text-4xl md:text-5xl font-bold mb-6 tracking-wider"
                style={{ fontFamily: "'Architects Daughter', cursive" }}
              >
                FOUNDER
              </h1>
              <h2 className="text-xl font-semibold mb-4">夏瑄澧 Sherry Hsia</h2>
              <ul className="space-y-2 text-gray-200 mb-8">
                <li>• 組織心理學家 · 企業組織顧問 · 高階人才教練 · 作家 · 自媒體創作者</li>
                <li>• 想要打造多元共融(DEI) 社會，並正在進行中的心理人</li>
              </ul>
              <div className="flex flex-wrap gap-4 mb-8">
                <a href="#credentials" className="border border-white text-white px-6 py-2.5 rounded text-sm hover:bg-white hover:text-[#1B4B5A] transition">
                  完整學經歷
                </a>
                <Link href="/contact" className="border border-white text-white px-6 py-2.5 rounded text-sm hover:bg-white hover:text-[#1B4B5A] transition">
                  合作與演講邀約
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <a href="https://pse.is/SherrysNotesYT" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition"><FaYoutube size={24} /></a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition"><FaSpotify size={24} /></a>
                <a href="https://pse.is/SherrysNotesIG" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition"><FaInstagram size={24} /></a>
                <a href="https://pse.is/SherrysNotesFB" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition"><FaFacebook size={24} /></a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition"><FaLinkedin size={24} /></a>
              </div>
            </div>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/images/about-speaking.jpg"
                alt="Sherry speaking"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-3xl md:text-4xl font-bold mb-10 tracking-wider"
            style={{ fontFamily: "'Architects Daughter', cursive" }}
          >
            STORY
          </h2>
          <div className="space-y-6 text-[#4A4A4A] leading-relaxed">
            <p>
              夏瑄澧（AKA 雪力）出生於台灣，13 歲時移民澳洲，曾在台灣就讀高中兩年，隨後前往美國哥倫比亞大學巴納德學院（Barnard College of Columbia University）就讀。畢業後於美國累積七年國際職場經驗，最終選擇返台定居。
            </p>
            <p>
              從小經歷東西文化的碰撞，引發自身對於不同文化深入了解的動機，也從中找到及奠定了自己的職業使命——協助企業建立多元共融文化，培養跨文化素養（Intercultural Competency），讓個人與組織在全球化環境中茁壯成長。
            </p>
          </div>
        </div>
      </section>

      {/* About Sherry Detail */}
      <section className="bg-gray-50 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            關於雪力｜跨文化領域專家、企業講師、作家
          </h2>
          <div className="space-y-6 text-[#4A4A4A] leading-relaxed">
            <p>
              「我一直以來都以自己的努力為傲，但在職涯發展到高階主管的階段，我發現不管工作性質，總會遇到類似的瓶頸。這是我的運氣不好？還是自己在哪裡做錯了？這種無力感時常讓我感到迷惘與挫折。」
            </p>
            <p>
              「直到學習組織心理學後，我才意識到，這些職涯瓶頸並非單純來自外在環境，而是源於對自身理解的不足，以及缺乏對團隊動能的洞察。這讓我體悟到，光靠努力是不夠的，唯有深入了解自己與組織運作的核心動能，才能真正突破職涯與企業發展的限制。」
            </p>
            <p>
              如今，雪力將自身的經驗與專業知識結合，透過企業培訓、專題演講及書籍分享，幫助個人與組織找到突破現狀的關鍵，實現更深層次的成長與轉變。
            </p>
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Baiyan Global Consulting 百彥國際發展顧問</h3>
            <p className="text-[#4A4A4A] leading-relaxed">
              2020 年，雪力創立 Baiyan Global Consulting 百彥國際發展顧問有限公司，融合東西方學術研究與文化智慧，並以心理學與社會學為基礎，致力於協助企業與組織提升跨文化管理能力，推動多元共融（DEI）文化，讓人才與組織能夠在全球化的競爭環境中持續成長，開創嶄新未來。
            </p>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section id="credentials" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">完整學經歷</h2>

          <div className="mb-10">
            <h3 className="text-lg font-bold text-gray-900 mb-4">主要身份與經歷</h3>
            <ul className="space-y-2 text-[#4A4A4A]">
              <li>• 百彥國際發展顧問有限公司 Baiyan Global Consulting 創辦人/ CEO</li>
              <li>• 台灣女董事協會 (WOB) 第三屆理事</li>
              <li>• 台灣女董事協會 女董學院 (WOB Academy) - 第二屆女性菁英領導人培訓專案 企業導師</li>
              <li>• 自媒體《Sherry&apos;s Notes 雪力的心理學筆記》YouTube頻道主持人</li>
              <li>• VOGUE TAIWAN 網路專欄作家</li>
              <li>• 作家，著有《MBTI 我，和我的使用說明書》(2023)、《內在自癒：設計我想要的人生》(2024)、《MBTI 我，和我的愛情說明書》(2025) 等書</li>
            </ul>
          </div>

          <div className="mb-10">
            <h3 className="text-lg font-bold text-gray-900 mb-4">學歷及專業領域</h3>
            <ul className="space-y-2 text-[#4A4A4A]">
              <li>• 哥倫比亞大學教師學院 高階管理人 組織心理學碩士</li>
              <li>• 哥倫比亞大學 Barnard 學院 心理學 & 社會學雙學士</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">國際認證執照</h3>
            <ul className="space-y-2 text-[#4A4A4A]">
              <li>• MBTI 施測師及講師認證 (Myers-Briggs Certified)</li>
              <li>• HOGAN霍根測評施測師認證 (Hogan Advance Interpretation Certification)</li>
              <li>• IDI跨文化敏感度施測師認證 (Intercultural Development Inventory Certification)</li>
              <li>• 職場多元共融實踐師認證 (Diversity, Equity and Inclusion in the Workplace Certificate)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative bg-gray-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-6 tracking-wider"
            style={{ fontFamily: "'Architects Daughter', cursive" }}
          >
            CONTACT
          </h2>
          <p className="text-gray-300 mb-8">
            合作或演講邀約，歡迎透過{' '}
            <Link href="/contact" className="text-[#DCA54A] underline">聯絡我們</Link>
            {' '}留下相關資訊，我們會盡速與您聯繫。
          </p>
          <Link
            href="/contact"
            className="inline-block border border-white text-white px-8 py-3 rounded text-sm hover:bg-white hover:text-gray-900 transition"
          >
            合作與演講邀約
          </Link>
        </div>
      </section>
    </>
  );
}
