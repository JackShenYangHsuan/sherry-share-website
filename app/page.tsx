import HeroSection from '@/components/HeroSection';
import CategoryCards from '@/components/CategoryCards';
import AboutSection from '@/components/AboutSection';
import ArticleGrid from '@/components/ArticleGrid';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryCards />
      <hr className="max-w-7xl mx-auto border-gray-200" />
      <AboutSection />
      <hr className="max-w-7xl mx-auto border-gray-200" />
      <ArticleGrid />
    </>
  );
}
