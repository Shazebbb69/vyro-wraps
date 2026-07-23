export const productData = {
  id: "vw-straps-01",
  name: "Vyro Wraps Self-Applying Lifting Straps",
  price: 1999,
  originalPrice: 2499,
  description: "Experience maximum support and enhanced grip with our premium self-applying lifting straps. Designed for heavy lifters, these straps are built to last and engineered for comfort.",
  stockStatus: "In Stock",
  images: [
    "/placeholder/product-1.jpg",
    "/placeholder/product-2.jpg",
    "/placeholder/product-3.jpg",
    "/placeholder/product-4.jpg"
  ],
  variants: [
    { id: "v1", name: "Classic Black", color: "#000000" },
    { id: "v2", name: "Vyro Gold", color: "#D69E2E" }
  ],
  specifications: [
    { label: "Material", value: "High-density premium cotton with neoprene padding" },
    { label: "Length", value: "24 inches" },
    { label: "Weight", value: "150g per pair" },
    { label: "Compatibility", value: "Olympic barbells, dumbbells, pull-up bars" },
    { label: "Care Instructions", value: "Hand wash cold, air dry. Do not machine wash." }
  ],
  benefits: [
    { title: "Maximum Support", description: "Locks your grip securely so you can focus on the pull." },
    { title: "Enhanced Grip", description: "Textured surface prevents slipping during max effort sets." },
    { title: "Self Applying", description: "Innovative design allows for quick one-handed setup." },
    { title: "Built To Last", description: "Reinforced stitching withstands over 500lbs of tension." }
  ],
  howToUse: [
    { step: 1, title: "Loop", description: "Pass the end of the strap through the loop to create a circle." },
    { step: 2, title: "Wear", description: "Slide your hand through the circle so the strap rests on your wrist." },
    { step: 3, title: "Wrap", description: "Wrap the loose end around the bar in the opposite direction of your fingers." },
    { step: 4, title: "Twist", description: "Twist the bar to tighten the strap securely before lifting." }
  ]
};

export const reviewsData = [
  {
    id: "r1",
    author: "Rahul S.",
    rating: 5,
    date: "2023-10-15",
    title: "Game changer for deadlifts",
    content: "These straps are incredible. The self-applying feature saves so much time between sets. Highly recommend to any serious lifter."
  },
  {
    id: "r2",
    author: "Amit P.",
    rating: 5,
    date: "2023-09-22",
    title: "Premium quality",
    content: "You can feel the quality right out of the box. The neoprene padding makes heavy shrugs completely pain-free for my wrists."
  },
  {
    id: "r3",
    author: "Vikram K.",
    rating: 4,
    date: "2023-08-10",
    title: "Very durable",
    content: "I've been using these for 6 months heavily and there is zero sign of fraying. The grip is solid."
  }
];

export const faqData = [
  {
    question: "How do self-applying straps work?",
    answer: "Our straps feature a specialized reinforced loop that stays open, allowing you to easily slide the end through and wrap it around the bar with one hand."
  },
  {
    question: "Are they suitable for beginners?",
    answer: "Yes! While designed for heavy lifting, beginners can benefit from using straps to isolate back muscles without grip failure."
  },
  {
    question: "How do I clean my Vyro Wraps?",
    answer: "We recommend hand washing in cold water with mild detergent. Do not machine wash or tumble dry as it may compromise the stitching."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 7-day no-questions-asked return policy for unused items in original packaging."
  }
];

export const userProfileData = {
  name: "Arjun Kumar",
  email: "arjun.k@example.com",
  phone: "+91 9876543210",
  memberSince: "2023-01-15",
  addresses: [
    {
      id: "a1",
      type: "Home",
      street: "123 Fitness Ave, Block A",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      isDefault: true
    }
  ]
};

export const ordersData = [
  {
    id: "ORD-59281",
    date: "2023-11-05",
    total: 1999,
    status: "Delivered",
    items: [
      { name: "Vyro Wraps - Classic Black", quantity: 1, price: 1999 }
    ]
  },
  {
    id: "ORD-48192",
    date: "2023-05-12",
    total: 1999,
    status: "Delivered",
    items: [
      { name: "Vyro Wraps - Vyro Gold", quantity: 1, price: 1999 }
    ]
  }
];
