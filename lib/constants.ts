export const SITE_NAME = 'SherryShare';
export const SITE_URL = 'https://sherryshare.com';
export const SITE_DESCRIPTION = '這是一個用心嘗試新事物、體驗美好、並且誠實分享給你的地方。';

export const CATEGORIES = [
  { slug: 'all', label: '所有文章', labelEn: 'All Articles' },
  { slug: 'interview', label: '人物專訪', labelEn: 'Interviews' },
  { slug: 'applied-psychology', label: '應用心理學', labelEn: 'Applied Psychology' },
  { slug: 'organizational-psychology', label: '組織心理學', labelEn: 'Organizational Psychology' },
  { slug: 'books', label: '讀好書', labelEn: 'Books' },
] as const;

export const NAV_ITEMS = [
  { label: '首頁', href: '/' },
  { label: '關於Sherry 雪力', href: '/about' },
  {
    label: '文章',
    href: '/blog',
    children: [
      { label: '人物專訪', href: '/category/interview' },
      { label: '讀好書', href: '/category/books' },
      { label: '應用心理學', href: '/category/applied-psychology' },
      { label: '組織心理學', href: '/category/organizational-psychology' },
    ],
  },
  { label: '選好物', href: '/category/sherryshare' },
  {
    label: '聯絡我們',
    href: '/contact',
    children: [
      { label: '企業顧問服務', href: 'https://pse.is/bconsulting', external: true },
    ],
  },
] as const;

export const SOCIAL_LINKS = [
  { name: 'Facebook', url: 'https://pse.is/SherrysNotesFB', icon: 'FaFacebook' },
  { name: 'Instagram', url: 'https://pse.is/SherrysNotesIG', icon: 'FaInstagram' },
  { name: 'YouTube', url: 'https://pse.is/SherrysNotesYT', icon: 'FaYoutube' },
  { name: 'Podcast', url: 'https://pse.is/SherrysNotesPodcast', icon: 'FaPodcast' },
  { name: 'Threads', url: 'https://pse.is/SherrysNotesThreads', icon: 'FaThreads' },
] as const;

export const CONTACT_INFO = {
  address: '2477 Briercliff Road, New York 10001',
  phone: '+1 212-203-7540',
  email: 'Support@Okawarisushi.com',
};

export const HOMEPAGE_CATEGORY_CARDS = [
  {
    title: '飲食',
    subtitle: '健康和味蕾的雙重滿足',
    image: '/images/category-food.jpg',
    href: '/category/food',
  },
  {
    title: '健康生活',
    subtitle: '由內而外，原地升級',
    image: '/images/category-wellness.jpg',
    href: '/category/wellness',
  },
  {
    title: '生活選物',
    subtitle: '一切，從好好生活開始',
    image: '/images/category-lifestyle.jpg',
    href: '/category/sherryshare',
  },
  {
    title: '讀本好書',
    subtitle: '閱讀，永遠是最好的投資',
    image: '/images/category-books.jpg',
    href: '/category/books',
  },
] as const;

export const TAGS = [
  '個體化', '劉若英', '勇氣', '家庭', '教育',
  '父女關係', '職場', '腦神經科學', '腦科學',
  '自戀', '自戀型人格', '自我覺察',
] as const;
