export const fallbackServices = [
  {
    _id: "web-development",
    category: "Technology & IT",
    name: "Web Development & Application Design",
    slug: "web-development",
    description: "Responsive websites and custom web applications designed around your business goals.",
    image: "/assets/safex-logo.svg",
    basePrice: 1000,
    features: [
      { id: "pages-1-5", name: "1–5 pages", price: 0 },
      { id: "pages-6-10", name: "6–10 pages", price: 250 },
      { id: "pages-11-20", name: "11–20 pages", price: 500 },
      { id: "custom-ui", name: "Custom UI/UX", price: 250 },
      { id: "responsive", name: "Responsive design", price: 100 },
      { id: "auth", name: "User authentication", price: 200 },
      { id: "payment", name: "Payment gateway", price: 250 },
      { id: "admin", name: "Admin dashboard", price: 300 },
      { id: "api", name: "API integration", price: 200 },
      { id: "seo", name: "SEO setup", price: 120 },
      { id: "analytics", name: "Analytics", price: 80 }
    ]
  },
  {
    _id: "network-it",
    category: "Technology & IT",
    name: "Network Infrastructure & IT Management",
    slug: "network-it",
    description: "Reliable infrastructure, IT management and operational technology support.",
    image: "/assets/safex-logo.svg",
    basePrice: 900,
    features: [
      { id: "audit", name: "Infrastructure audit", price: 150 },
      { id: "monitoring", name: "24/7 monitoring", price: 300 },
      { id: "backup", name: "Backup strategy", price: 180 },
      { id: "documentation", name: "Technical documentation", price: 100 },
      { id: "onsite", name: "On-site support", price: 250 }
    ]
  },
  {
    _id: "cloud",
    category: "Technology & IT",
    name: "Cloud Solutions & System Integration",
    slug: "cloud",
    description: "Cloud architecture and integrations that improve scalability, reliability and efficiency.",
    image: "/assets/safex-logo.svg",
    basePrice: 1200,
    features: [
      { id: "migration", name: "Cloud migration", price: 400 },
      { id: "architecture", name: "Cloud architecture", price: 300 },
      { id: "integration", name: "System integration", price: 250 },
      { id: "backup", name: "Cloud backup", price: 150 },
      { id: "monitoring", name: "Monitoring", price: 150 }
    ]
  },
  {
    _id: "cybersecurity",
    category: "Technology & IT",
    name: "Cybersecurity & Data Protection",
    slug: "cybersecurity",
    description: "Security-focused assessments and protection strategies for modern organizations.",
    image: "/assets/safex-logo.svg",
    basePrice: 1100,
    features: [
      { id: "assessment", name: "Security assessment", price: 250 },
      { id: "vulnerability", name: "Vulnerability review", price: 300 },
      { id: "policy", name: "Security policy setup", price: 180 },
      { id: "training", name: "Security awareness training", price: 150 },
      { id: "report", name: "Executive security report", price: 120 }
    ]
  },
  {
    _id: "it-consulting",
    category: "Technology & IT",
    name: "IT Consulting & Digital Transformation",
    slug: "it-consulting",
    description: "Technology strategy and digital transformation guidance aligned with business priorities.",
    image: "/assets/safex-logo.svg",
    basePrice: 750,
    features: [
      { id: "discovery", name: "Discovery workshop", price: 100 },
      { id: "roadmap", name: "Digital roadmap", price: 250 },
      { id: "architecture", name: "Solution architecture", price: 250 },
      { id: "strategy", name: "Technology strategy", price: 200 }
    ]
  },
  {
    _id: "seo",
    category: "Digital Marketing & Brand Growth",
    name: "SEO & Performance Marketing",
    slug: "seo",
    description: "Search visibility and performance marketing strategies focused on measurable growth.",
    image: "/assets/safex-logo.svg",
    basePrice: 600,
    features: [
      { id: "audit", name: "SEO audit", price: 100 },
      { id: "keywords", name: "Keyword strategy", price: 100 },
      { id: "onpage", name: "On-page optimization", price: 180 },
      { id: "content", name: "Content strategy", price: 150 },
      { id: "reporting", name: "Monthly reporting", price: 100 }
    ]
  },
  {
    _id: "social-media",
    category: "Digital Marketing & Brand Growth",
    name: "Social Media Management & Content Strategy",
    slug: "social-media",
    description: "Consistent social presence, content planning and audience-focused digital strategy.",
    image: "/assets/safex-logo.svg",
    basePrice: 500,
    features: [
      { id: "strategy", name: "Content strategy", price: 120 },
      { id: "design", name: "Creative post design", price: 180 },
      { id: "calendar", name: "Monthly content calendar", price: 80 },
      { id: "community", name: "Community management", price: 160 },
      { id: "reporting", name: "Monthly analytics", price: 80 }
    ]
  },
  {
    _id: "branding",
    category: "Digital Marketing & Brand Growth",
    name: "Branding, Identity Design & Creative Direction",
    slug: "branding",
    description: "Cohesive visual identities that communicate your brand with clarity and consistency.",
    image: "/assets/safex-logo.svg",
    basePrice: 700,
    features: [
      { id: "logo", name: "Logo identity", price: 180 },
      { id: "guidelines", name: "Brand guidelines", price: 250 },
      { id: "stationery", name: "Business stationery", price: 100 },
      { id: "social-kit", name: "Social media kit", price: 150 },
      { id: "art-direction", name: "Creative direction", price: 180 }
    ]
  },
  {
    _id: "lead-generation",
    category: "Digital Marketing & Brand Growth",
    name: "Lead Generation & Marketing Automation",
    slug: "lead-generation",
    description: "Lead-generation systems and automation workflows designed to improve conversion efficiency.",
    image: "/assets/safex-logo.svg",
    basePrice: 800,
    features: [
      { id: "landing", name: "Campaign landing page", price: 180 },
      { id: "crm", name: "CRM integration", price: 220 },
      { id: "automation", name: "Automation workflow", price: 250 },
      { id: "email", name: "Email sequence", price: 120 },
      { id: "analytics", name: "Conversion analytics", price: 100 }
    ]
  },
  {
    _id: "analytics",
    category: "Digital Marketing & Brand Growth",
    name: "Analytics & Growth Optimization",
    slug: "analytics",
    description: "Analytics implementation and growth insights that turn data into better decisions.",
    image: "/assets/safex-logo.svg",
    basePrice: 450,
    features: [
      { id: "tracking", name: "Tracking setup", price: 100 },
      { id: "dashboard", name: "Analytics dashboard", price: 180 },
      { id: "funnels", name: "Funnel analysis", price: 150 },
      { id: "reporting", name: "Growth report", price: 100 }
    ]
  },
  {
    _id: "photography",
    category: "Creative Media",
    name: "Photography & Commercial Shoots",
    slug: "photography",
    description: "Professional photography and commercial shoots for brands, products and campaigns.",
    image: "/assets/safex-logo.svg",
    basePrice: 500,
    features: [
      { id: "half-day", name: "Half-day shoot", price: 200 },
      { id: "full-day", name: "Full-day shoot", price: 450 },
      { id: "retouching", name: "Professional retouching", price: 150 },
      { id: "product", name: "Product photography", price: 200 }
    ]
  },
  {
    _id: "videography",
    category: "Creative Media",
    name: "Videography & Corporate Films",
    slug: "videography",
    description: "Corporate, promotional and branded video production from concept to delivery.",
    image: "/assets/safex-logo.svg",
    basePrice: 900,
    features: [
      { id: "concept", name: "Creative concept", price: 150 },
      { id: "shoot", name: "Professional shoot", price: 400 },
      { id: "editing", name: "Post-production", price: 250 },
      { id: "motion", name: "Motion graphics", price: 200 }
    ]
  },
  {
    _id: "post-production",
    category: "Creative Media",
    name: "Post Production & Creative Editing",
    slug: "post-production",
    description: "Polished editing, motion and post-production for commercial and digital content.",
    image: "/assets/safex-logo.svg",
    basePrice: 450,
    features: [
      { id: "editing", name: "Professional editing", price: 200 },
      { id: "color", name: "Color grading", price: 100 },
      { id: "sound", name: "Sound cleanup", price: 80 },
      { id: "motion", name: "Motion graphics", price: 180 }
    ]
  },
  {
    _id: "training",
    category: "Training & Workforce Development",
    name: "Technical Skills Training & Certification",
    slug: "training",
    description: "Practical technical learning experiences designed around modern workforce needs.",
    image: "/assets/safex-logo.svg",
    basePrice: 300,
    features: [
      { id: "beginner", name: "Beginner track", price: 0 },
      { id: "advanced", name: "Advanced track", price: 150 },
      { id: "certificate", name: "Certificate pathway", price: 100 },
      { id: "custom", name: "Custom curriculum", price: 180 }
    ]
  },
  {
    _id: "workshops",
    category: "Training & Workforce Development",
    name: "Digital Marketing & Creative Workshops",
    slug: "workshops",
    description: "Focused workshops for teams and learners covering digital, creative and business skills.",
    image: "/assets/safex-logo.svg",
    basePrice: 350,
    features: [
      { id: "half-day", name: "Half-day workshop", price: 0 },
      { id: "full-day", name: "Full-day workshop", price: 200 },
      { id: "materials", name: "Learning materials", price: 80 },
      { id: "certificate", name: "Certificate", price: 60 }
    ]
  },
  {
    _id: "mentorship",
    category: "Training & Workforce Development",
    name: "Internships, Mentorship & Career Pathways",
    slug: "mentorship",
    description: "Structured mentorship and career-development experiences for emerging professionals.",
    image: "/assets/safex-logo.svg",
    basePrice: 250,
    features: [
      { id: "one-to-one", name: "One-to-one mentorship", price: 120 },
      { id: "portfolio", name: "Portfolio guidance", price: 80 },
      { id: "career", name: "Career planning", price: 100 },
      { id: "interview", name: "Interview preparation", price: 80 }
    ]
  }
];

const categoryArt = {
  "Technology & IT": "/assets/services/tech.svg",
  "Digital Marketing & Brand Growth": "/assets/services/growth.svg",
  "Creative Media": "/assets/services/creative.svg",
  "Training & Workforce Development": "/assets/services/training.svg"
};

fallbackServices.forEach((service) => { service.image = categoryArt[service.category] || "/assets/safex-logo.svg"; });

export const regions = [
  { value: "Pakistan", currency: "PKR", symbol: "₨", rate: 280 },
  { value: "United States", currency: "USD", symbol: "$", rate: 1 },
  { value: "United Kingdom", currency: "GBP", symbol: "£", rate: 0.78 },
  { value: "United Arab Emirates", currency: "AED", symbol: "د.إ", rate: 3.67 },
  { value: "Europe", currency: "EUR", symbol: "€", rate: 0.92 },
  { value: "Other", currency: "USD", symbol: "$", rate: 1 }
];

export function getCurrency(region) {
  return regions.find((item) => item.value === region) || regions[1];
}
