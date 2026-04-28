// School information constants
export const SCHOOL = {
  name: 'সিরাজিয়া শিশু নিকেতন',
  nameEn: 'Sirajia Shishu Niketan',
  address: 'P9QV+G3V, Guyadaha, West Bengal 721253',
  addressBn: 'গুয়াদাহা, পশ্চিমবঙ্গ ৭২১২৫৩',
  phone: '7318778321',
  whatsapp: '917318778321',
  udise: '19200505206',
  founded: 2011,
  medium: 'বাংলা মাধ্যম',
  classes: 'Pre-Nursery থেকে Class 4',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3660!2d87.85!3d23.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDE1JzAwLjAiTiA4N8KwNTEnMDAuMCJF!5e0!3m2!1sbn!2sin!4v1700000000000!5m2!1sbn!2sin',
};

export const STATS = {
  teachers: 7,
  students: 124,
  foundedYear: 2011,
};

export const NAV_LINKS = [
  { label: 'হোম', href: '#home' },
  { label: 'ক্লাস', href: '#classes' },
  { label: 'শিক্ষক', href: '#teachers' },
  { label: 'গ্যালারি', href: '#gallery' },
  { label: 'ভর্তি', href: '#admission' },
  { label: 'যোগাযোগ', href: '#contact' },
];

export const CLASSES_LIST = [
  { id: 'pre-nursery', name: 'Pre-Nursery', nameBn: 'প্রি-নার্সারি', color: '#FF6B6B' },
  { id: 'nursery', name: 'Nursery', nameBn: 'নার্সারি', color: '#4ECDC4' },
  { id: 'class-1', name: 'Class 1', nameBn: 'প্রথম শ্রেণী', color: '#45B7D1' },
  { id: 'class-2', name: 'Class 2', nameBn: 'দ্বিতীয় শ্রেণী', color: '#96CEB4' },
  { id: 'class-3', name: 'Class 3', nameBn: 'তৃতীয় শ্রেণী', color: '#FFEAA7' },
  { id: 'class-4', name: 'Class 4', nameBn: 'চতুর্থ শ্রেণী', color: '#DDA0DD' },
];

// Demo fees data
export const FEES_DATA = [
  { class: 'Pre-Nursery', age: '৩-৪ বছর', admission: '৫০০', monthly: '২০০', annual: '২,৫০০' },
  { class: 'Nursery', age: '৪-৫ বছর', admission: '৫০০', monthly: '২৫০', annual: '৩,০০০' },
  { class: 'Class 1', age: '৫-৬ বছর', admission: '৬০০', monthly: '৩০০', annual: '৩,৬০০' },
  { class: 'Class 2', age: '৬-৭ বছর', admission: '৬০০', monthly: '৩০০', annual: '৩,৬০০' },
  { class: 'Class 3', age: '৭-৮ বছর', admission: '৭০০', monthly: '৩৫০', annual: '৪,২০০' },
  { class: 'Class 4', age: '৮-৯ বছর', admission: '৭০০', monthly: '৩৫০', annual: '৪,২০০' },
];

// Demo teachers
export const TEACHERS_DATA = [
  { id: 1, name: 'প্রধান শিক্ষক', designation: 'প্রধান শিক্ষক', subject: 'সকল বিষয়', emoji: '👨‍🏫' },
  { id: 2, name: 'শিক্ষক ২', designation: 'সহকারী শিক্ষক', subject: 'বাংলা', emoji: '👩‍🏫' },
  { id: 3, name: 'শিক্ষক ৩', designation: 'সহকারী শিক্ষক', subject: 'গণিত', emoji: '👨‍🏫' },
  { id: 4, name: 'শিক্ষক ৪', designation: 'সহকারী শিক্ষক', subject: 'ইংরেজি', emoji: '👩‍🏫' },
  { id: 5, name: 'শিক্ষক ৫', designation: 'সহকারী শিক্ষক', subject: 'পরিবেশ বিদ্যা', emoji: '👨‍🏫' },
  { id: 6, name: 'শিক্ষক ৬', designation: 'সহকারী শিক্ষক', subject: 'অঙ্কন', emoji: '👩‍🏫' },
  { id: 7, name: 'শিক্ষক ৭', designation: 'সহকারী শিক্ষক', subject: 'শারীরশিক্ষা', emoji: '👨‍🏫' },
];

// Demo notices
export const NOTICES_DATA = [
  { id: 1, text: 'আগামী ১৫ তারিখ থেকে বার্ষিক পরীক্ষা শুরু হবে।' },
  { id: 2, text: 'নতুন শিক্ষাবর্ষের ভর্তি চলছে — যোগাযোগ করুন।' },
  { id: 3, text: 'আগামীকাল বিদ্যালয় বন্ধ থাকবে।' },
];

// Gallery categories
export const GALLERY_CATEGORIES = [
  { id: 'all', label: 'সব' },
  { id: 'annual', label: 'বার্ষিক অনুষ্ঠান' },
  { id: 'picnic', label: 'বনভোজন' },
  { id: 'classroom', label: 'ক্লাস' },
];

// Demo gallery images
export const GALLERY_DATA = [
  { id: 1, src: '/images/gallery/unnamed.webp', category: 'annual', caption: 'বার্ষিক অনুষ্ঠান' },
  { id: 2, src: '/images/gallery/unnamed (1).webp', category: 'annual', caption: 'বার্ষিক অনুষ্ঠান' },
  { id: 3, src: '/images/gallery/unnamed (2).webp', category: 'picnic', caption: 'বনভোজন' },
  { id: 4, src: '/images/gallery/unnamed (3).webp', category: 'picnic', caption: 'বনভোজন' },
  { id: 5, src: '/images/gallery/unnamed (4).webp', category: 'classroom', caption: 'ক্লাসরুম' },
  { id: 6, src: '/images/gallery/unnamed (5).webp', category: 'classroom', caption: 'ক্লাসরুম' },
  { id: 7, src: '/images/gallery/unnamed (6).webp', category: 'annual', caption: 'অনুষ্ঠান' },
  { id: 8, src: '/images/gallery/unnamed (7).webp', category: 'picnic', caption: 'বনভোজন' },
  { id: 9, src: '/images/gallery/unnamed (8).webp', category: 'classroom', caption: 'ক্লাসরুম' },
];

// Demo alumni
export const ALUMNI_DATA = [
  { id: 1, name: 'ছাত্র ১', achievement: 'মাধ্যমিকে জেলায় প্রথম', year: '২০২০', emoji: '🎓' },
  { id: 2, name: 'ছাত্রী ২', achievement: 'জাতীয় বৃত্তি প্রাপ্ত', year: '২০২১', emoji: '🏆' },
  { id: 3, name: 'ছাত্র ৩', achievement: 'বিজ্ঞান অলিম্পিয়াড পদক', year: '২০২২', emoji: '🥇' },
];
