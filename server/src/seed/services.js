import Service from "../../src/models/Service.js";

const services = [
  ["Technology & IT","Web Development & Application Design","web-development","Responsive websites and custom web applications designed around your business goals.",1000],
  ["Technology & IT","Network Infrastructure & IT Management","network-it","Reliable infrastructure, IT management and operational technology support.",900],
  ["Technology & IT","Cloud Solutions & System Integration","cloud","Cloud architecture and integrations that improve scalability, reliability and efficiency.",1200],
  ["Technology & IT","Cybersecurity & Data Protection","cybersecurity","Security-focused assessments and protection strategies for modern organizations.",1100],
  ["Technology & IT","IT Consulting & Digital Transformation","it-consulting","Technology strategy and digital transformation guidance aligned with business priorities.",750],
  ["Digital Marketing & Brand Growth","SEO & Performance Marketing","seo","Search visibility and performance marketing strategies focused on measurable growth.",600],
  ["Digital Marketing & Brand Growth","Social Media Management & Content Strategy","social-media","Consistent social presence, content planning and audience-focused digital strategy.",500],
  ["Digital Marketing & Brand Growth","Branding, Identity Design & Creative Direction","branding","Cohesive visual identities that communicate your brand with clarity and consistency.",700],
  ["Digital Marketing & Brand Growth","Lead Generation & Marketing Automation","lead-generation","Lead-generation systems and automation workflows designed to improve conversion efficiency.",800],
  ["Digital Marketing & Brand Growth","Analytics & Growth Optimization","analytics","Analytics implementation and growth insights that turn data into better decisions.",450],
  ["Creative Media","Photography & Commercial Shoots","photography","Professional photography and commercial shoots for brands, products and campaigns.",500],
  ["Creative Media","Videography & Corporate Films","videography","Corporate, promotional and branded video production from concept to delivery.",900],
  ["Creative Media","Post Production & Creative Editing","post-production","Polished editing, motion and post-production for commercial and digital content.",450],
  ["Training & Workforce Development","Technical Skills Training & Certification","training","Practical technical learning experiences designed around modern workforce needs.",300],
  ["Training & Workforce Development","Digital Marketing & Creative Workshops","workshops","Focused workshops for teams and learners covering digital, creative and business skills.",350],
  ["Training & Workforce Development","Internships, Mentorship & Career Pathways","mentorship","Structured mentorship and career-development experiences for emerging professionals.",250]
];

const defaultFeatures = {
  "web-development": [["responsive","Responsive design",100],["custom-ui","Custom UI/UX",250],["auth","User authentication",200],["payment","Payment gateway",250],["admin","Admin dashboard",300],["api","API integration",200],["seo","SEO setup",120],["analytics","Analytics",80]],
  "network-it": [["audit","Infrastructure audit",150],["monitoring","24/7 monitoring",300],["backup","Backup strategy",180],["documentation","Technical documentation",100],["onsite","On-site support",250]],
  "cloud": [["migration","Cloud migration",400],["architecture","Cloud architecture",300],["integration","System integration",250],["backup","Cloud backup",150],["monitoring","Monitoring",150]],
  "cybersecurity": [["assessment","Security assessment",250],["vulnerability","Vulnerability review",300],["policy","Security policy setup",180],["training","Security awareness training",150],["report","Executive security report",120]],
  "it-consulting": [["discovery","Discovery workshop",100],["roadmap","Digital roadmap",250],["architecture","Solution architecture",250],["strategy","Technology strategy",200]],
  "seo": [["audit","SEO audit",100],["keywords","Keyword strategy",100],["onpage","On-page optimization",180],["content","Content strategy",150],["reporting","Monthly reporting",100]],
  "social-media": [["strategy","Content strategy",120],["design","Creative post design",180],["calendar","Monthly content calendar",80],["community","Community management",160],["reporting","Monthly analytics",80]],
  "branding": [["logo","Logo identity",180],["guidelines","Brand guidelines",250],["stationery","Business stationery",100],["social-kit","Social media kit",150],["art-direction","Creative direction",180]],
  "lead-generation": [["landing","Campaign landing page",180],["crm","CRM integration",220],["automation","Automation workflow",250],["email","Email sequence",120],["analytics","Conversion analytics",100]],
  "analytics": [["tracking","Tracking setup",100],["dashboard","Analytics dashboard",180],["funnels","Funnel analysis",150],["reporting","Growth report",100]],
  "photography": [["half-day","Half-day shoot",200],["full-day","Full-day shoot",450],["retouching","Professional retouching",150],["product","Product photography",200]],
  "videography": [["concept","Creative concept",150],["shoot","Professional shoot",400],["editing","Post-production",250],["motion","Motion graphics",200]],
  "post-production": [["editing","Professional editing",200],["color","Color grading",100],["sound","Sound cleanup",80],["motion","Motion graphics",180]],
  "training": [["beginner","Beginner track",0],["advanced","Advanced track",150],["certificate","Certificate pathway",100],["custom","Custom curriculum",180]],
  "workshops": [["half-day","Half-day workshop",0],["full-day","Full-day workshop",200],["materials","Learning materials",80],["certificate","Certificate",60]],
  "mentorship": [["one-to-one","One-to-one mentorship",120],["portfolio","Portfolio guidance",80],["career","Career planning",100],["interview","Interview preparation",80]]
};

export async function seedServices() {
  const count = await Service.countDocuments();
  if (count > 0) return;
  await Service.insertMany(services.map(([category,name,slug,description,basePrice]) => ({
    category, name, slug, description, basePrice,
    image: `/assets/services/${category.startsWith("Technology") ? "tech" : category.startsWith("Digital") ? "growth" : category.startsWith("Creative") ? "creative" : "training"}.svg`,
    features: defaultFeatures[slug]?.map(([id,n,p]) => ({ id, name:n, price:p })) || []
  })));
  console.log("Seeded SafeX services.");
}
