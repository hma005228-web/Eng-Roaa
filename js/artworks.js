/* =====================================================================
   artworks.js — قائمة اللوحات (المصدر الأساسي لكل لوحات الموقع)
   ---------------------------------------------------------------------
   لإضافة لوحة جديدة:
   1) ضع الصورة داخل المجلد  images/artworks/
   2) انسخ أي Object من الأسفل وألصقه في نهاية القائمة (لا تنس الفاصلة ,)
   3) غيّر id ليكون رقمًا جديدًا غير مكرر، وعدّل باقي البيانات.
   ===================================================================== */

const artworks = [
  {
    id: 1,
    title: "Golden Hour Portrait",
    description: "A study of light and warmth, capturing a quiet moment at dusk. Replace this text with your own description.",
    image: "images/artworks/artwork-1.svg",
    category: "Portrait",
    date: "2026-11-24",
    featured: true
  },
  {
    id: 2,
    title: "Tangled Lines",
    description: "An exploration of movement using nothing but ink and instinct.",
    image: "images/artworks/artwork-2.svg",
    category: "Sketch",
    date: "2026-11-20",
    featured: false
  },
  {
    id: 3,
    title: "Mountains at Dawn",
    description: "Layered ridges fading into a soft morning sky.",
    image: "images/artworks/artwork-3.svg",
    category: "Landscape",
    date: "2026-11-15",
    featured: true
  },
  {
    id: 4,
    title: "Orbit",
    description: "A digital composition built from overlapping translucent circles.",
    image: "images/artworks/artwork-4.svg",
    category: "Digital Art",
    date: "2026-11-10",
    featured: true
  },
  {
    id: 5,
    title: "Earth Strokes",
    description: "Broad, textured brush strokes in warm earth tones.",
    image: "images/artworks/artwork-5.svg",
    category: "Painting",
    date: "2026-11-02",
    featured: false
  },
  {
    id: 6,
    title: "Quiet Face",
    description: "A minimal line sketch focused on expression.",
    image: "images/artworks/artwork-6.svg",
    category: "Sketch",
    date: "2026-10-25",
    featured: false
  }

  // ↓ أضف لوحتك الجديدة هنا (لا تنس وضع فاصلة , بعد القوس } السابق)
  // ,{
  //   id: 7,
  //   title: "New Artwork",
  //   description: "Description here",
  //   image: "images/artworks/artwork-7.jpg",
  //   category: "Sketch",
  //   date: "2026-11-24",
  //   featured: false
  // }
];
