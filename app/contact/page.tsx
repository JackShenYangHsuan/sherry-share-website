import type { Metadata } from 'next';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: '聯絡我們',
};

export default function ContactPage() {
  return (
    <div className="bg-[#FDF6EC] min-h-[70vh]">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left: Text */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Contact Us</h1>
            <p className="text-gray-600 mb-2">歡迎透過表單與我們聯繫，一起探索任何機會與可能性!</p>
            <p className="text-gray-500 text-sm">
              We would love to speak with you.<br />
              Feel free to reach out using the below details.
            </p>
          </div>

          {/* Right: Form */}
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
