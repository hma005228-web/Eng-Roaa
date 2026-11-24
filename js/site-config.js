/* =====================================================================
   site-config.js — نصوص الموقع ومعلومات الفنان والتواصل
   عدّل أي نص هنا وسيتغير في كل الصفحات تلقائيًا.
   ===================================================================== */

const siteConfig = {
  siteName: "My Art Gallery",
  tagline: "A personal collection of drawings & paintings",

  home: {
    heroImage: "images/backgrounds/hero.svg",
    heroTitle: "My Art Gallery",
    heroSubtitle: "Where every stroke tells a story.",
    // الصورة الكبيرة في الواجهة (اتركها فارغة "" لاستخدام أول لوحة مميزة)
    heroArtwork: "",
    intro: "Welcome to my personal gallery — a curated space showcasing my drawings, paintings and digital work. Every piece is a small window into how I see the world.",
    featuredTitle: "Featured Artworks",
    featuredSubtitle: "A selection of pieces I'm most proud of"
  },

  about: {
    title: "About the Artist",
    name: "Your Name",
    photo: "images/artist/artist.svg",       // غيّر الصورة الشخصية من هنا
    paragraphs: [
      "Hello, I'm an artist who loves turning quiet moments into visual stories. Replace this paragraph with your own introduction.",
      "My work moves between portraits, sketches, landscapes and digital art, always searching for the balance between light, emotion and simplicity."
    ],
    style: {
      title: "Style & Interests",
      items: [
        "Portrait and figure drawing",
        "Ink and pencil sketching",
        "Warm, earthy colour palettes",
        "Digital illustration"
      ]
    },
    facts: [
      { label: "Artworks", value: "auto" },       // "auto" = عدد اللوحات تلقائيًا
      { label: "Since", value: "2020" },
      { label: "Based in", value: "Cairo, Egypt" }
    ]
  },

  contact: {
    title: "Get in Touch",
    intro: "For commissions, collaborations or just to say hello, feel free to reach out.",
    email: "hello@example.com",
    phone: "+20 100 000 0000",
    location: "Cairo, Egypt",
    socials: [
      { name: "Instagram", url: "https://instagram.com/" },
      { name: "Facebook",  url: "https://facebook.com/" },
      { name: "Behance",   url: "https://behance.net/" },
      { name: "X",         url: "https://x.com/" }
    ]
  },

  footerText: "All artworks are the property of the artist."
};
