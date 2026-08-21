import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight, Check, ChevronDown, ChevronRight, Globe2, Menu, Quote,
  ShieldCheck, Sparkles, Star, X, Calculator, Clock3, Send, Search
} from "lucide-react";
import { Link, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import api from "./api";
import { fallbackServices, getCurrency, regions } from "./data";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } }
};

// Handles all in-page navigation: scrolls smoothly to a section when the
// URL has a #hash (e.g. /#about), and resets scroll to the top when
// navigating to a plain route (e.g. clicking "Services" or "Home").
function ScrollToHashElement() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, left: 0 });
      return;
    }

    const id = location.hash.slice(1);
    let attempts = 0;
    let frame;

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        const navbarOffset = 90;
        const top = el.getBoundingClientRect().top + window.pageYOffset - navbarOffset;
        window.scrollTo({ top, behavior: "smooth" });
      } else if (attempts < 30) {
        attempts += 1;
        frame = requestAnimationFrame(tryScroll);
      }
    };

    tryScroll();
    return () => cancelAnimationFrame(frame);
  }, [location.pathname, location.hash]);

  return null;
}

function useServices() {
  const [services, setServices] = useState(fallbackServices);
  useEffect(() => {
    api.get("/services").then((res) => {
      if (Array.isArray(res.data) && res.data.length) setServices(res.data);
    }).catch(() => {});
  }, []);
  return services;
}

function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const links = [
    ["Home", "/"],
    ["About Us", "/#about"],
    ["Services", "/services"],
    ["How It Works", "/#how-it-works"],
    ["Reviews", "/#reviews"],
    ["Track Request", "/track-request"]
  ];

  return (
    <div className="site-shell">
      <header className="navbar">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <img src="/assets/safex-logo.svg" alt="SafeX Solutions" />
        </Link>

        <button className="mobile-menu" onClick={() => setOpen(!open)} aria-label="Toggle navigation">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={open ? "nav-links open" : "nav-links"}>
          {links.map(([label, href]) => (
            <Link key={label} to={href} onClick={() => setOpen(false)}>{label}</Link>
          ))}
          <Link className="gradient-btn nav-cta" to="/services" onClick={() => setOpen(false)}>
            Get Estimate <ArrowRight size={16} />
          </Link>
        </nav>
      </header>
      {children}
      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <img className="footer-logo" src="/assets/safex-logo.svg" alt="SafeX Solutions" />
            <p>Securing technology. Powering growth. Creating impact.</p>
          </div>
          <div>
            <h4>Explore</h4>
            <Link to="/about">About</Link>
            <Link to="/services">Services</Link>
            <Link to="/track-request">Track Request</Link>
          </div>
          <div>
            <h4>Services</h4>
            <Link to="/services">Technology & IT</Link>
            <Link to="/services">Digital Growth</Link>
            <Link to="/services">Creative Media</Link>
            <Link to="/services">Training</Link>
          </div>
        </div>
        <div className="footer-bottom">© {new Date().getFullYear()} SafeX Solutions. All rights reserved.</div>
      </footer>
    </div>
  );
}

function Home() {
  const services = useServices();
  const featured = services.slice(0, 4);
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    api.get("/reviews").then((res) => setReviews(res.data || [])).catch(() => {});
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-orb orb-one" />
        <div className="hero-orb orb-two" />
        <div className="container hero-grid">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className="eyebrow"><Sparkles size={15} /> Digital solutions with purpose</span>
            <h1>Securing <span>Technology.</span><br />Powering <span>Growth.</span><br />Creating <span>Impact.</span></h1>
            <p className="hero-copy">
              SafeX Solutions delivers technology, digital growth, creative media and workforce solutions built around real business needs.
            </p>
            <div className="hero-actions">
              <Link className="gradient-btn" to="/services">Explore Services <ArrowRight size={17} /></Link>
              <Link className="outline-btn" to="/services">Get Free Estimate</Link>
            </div>
            <div className="hero-stats">
              <div><strong>15+</strong><span>Countries served</span></div>
              <div><strong>150+</strong><span>Happy clients</span></div>
              <div><strong>4</strong><span>Core domains</span></div>
            </div>
          </motion.div>

          <motion.div className="hero-visual" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
            <div className="visual-glow" />
            <div className="mock-window">
              <div className="window-top"><span /><span /><span /></div>
              <div className="mock-content">
                <div className="mock-title">Project overview</div>
                <div className="mock-bars"><i /><i /><i /><i /></div>
                <div className="mock-card-row">
                  <div><small>Client satisfaction</small><b>98%</b></div>
                  <div><small>Active projects</small><b>24</b></div>
                </div>
                <div className="mock-progress"><span style={{ width: "72%" }} /></div>
              </div>
            </div>
            <div className="float-card card-a"><Check size={16} /><span>Secure & reliable</span></div>
            <div className="float-card card-b"><Calculator size={16} /><span>Live estimates</span></div>
          </motion.div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="container trust-content">
          <span>Technology · Growth · Creativity · People</span>
          <div className="soft-pills"><b>Trusted</b><b>Responsive</b><b>Client-focused</b><b>Secure</b></div>
        </div>
      </section>

      <section id="about" className="section">
        <div className="container split">
          <motion.div whileInView="visible" initial="hidden" viewport={{ once: true }} variants={fadeUp}>
            <span className="eyebrow"><ShieldCheck size={15} /> About SafeX</span>
            <h2>Technology with a <span>human purpose.</span></h2>
            <p>
              SafeX Solutions brings together technology, digital growth, creative services and workforce development to help organizations move forward with confidence.
            </p>
            <p>
              The platform you are using is designed around that same principle: make complex services easier to understand, estimate and request.
            </p>
            <Link className="text-link" to="/services">Explore our services <ArrowRight size={16} /></Link>
          </motion.div>
          <motion.div className="about-card" whileInView="visible" initial="hidden" viewport={{ once: true }} variants={fadeUp}>
            <div className="about-icon"><Globe2 /></div>
            <div><strong>Global reach</strong><p>Solutions designed for clients across regions and industries.</p></div>
            <div className="about-icon"><Sparkles /></div>
            <div><strong>Purpose-driven growth</strong><p>Practical digital solutions with a focus on meaningful outcomes.</p></div>
          </motion.div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <SectionHeading eyebrow="What we do" title="Our core services" text="Explore the areas where SafeX can help your business grow, operate and stand out." />
          <div className="service-grid">
            {featured.map((service, index) => <ServiceCard key={service._id} service={service} index={index} />)}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section">
        <div className="container">
          <SectionHeading eyebrow="Simple process" title="From idea to request in minutes" text="Configure what you need, see an estimated price and send a structured project brief." />
          <div className="steps">
            {[
              ["01", "Choose a service", "Pick the service that matches your goal."],
              ["02", "Select your region", "Choose the region and currency for your estimate."],
              ["03", "Configure", "Select features and requirements."],
              ["04", "Request", "Submit your details and receive a request ID."],
              ["05", "Track", "Privately follow the progress of your request."]
            ].map(([n, title, text]) => (
              <motion.div className="step" key={n} whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} viewport={{ once: true }}>
                <span>{n}</span><div><h3>{title}</h3><p>{text}</p></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="section section-soft">
        <div className="container">
          <SectionHeading eyebrow="Client feedback" title="What our clients say" text="Only approved reviews are displayed publicly." />
          <div className="review-grid">
            {reviews.length ? reviews.slice(0, 6).map((review, i) => <ReviewCard key={review._id} review={review} index={i} />) : (
              <div className="empty-review"><Quote /><p>Approved client reviews will appear here.</p></div>
            )}
          </div>
          <div className="review-form-wrap">
            <ReviewForm />
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="container cta-card">
          <div><span className="eyebrow">Ready when you are</span><h2>Let's build something <span>meaningful.</span></h2><p>Get an estimate based on your actual project requirements.</p></div>
          <Link className="white-btn" to="/services">Get Your Estimate <ArrowRight size={17} /></Link>
        </div>
      </section>
    </>
  );
}

function SectionHeading({ eyebrow, title, text }) {
  return (
    <motion.div className="section-heading" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{text}</p>
    </motion.div>
  );
}

function ServiceCard({ service, index = 0 }) {
  return (
    <motion.div className="service-card" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} viewport={{ once: true }} whileHover={{ y: -6 }}>
      <div className="service-image">
        <div className="service-image-glow" />
        <img src={service.image || "/assets/safex-logo.svg"} alt="" />
      </div>
      <span className="category">{service.category}</span>
      <h3>{service.name}</h3>
      <p>{service.description}</p>
      <Link to={`/services/${service.slug || service._id}`} className="text-link">Get Estimate <ArrowRight size={15} /></Link>
    </motion.div>
  );
}

function Services() {
  const services = useServices();
  const categories = [...new Set(services.map((s) => s.category))];
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? services : services.filter((s) => s.category === active);

  return (
    <main>
      <section className="page-hero"><div className="container"><span className="eyebrow"><Sparkles size={15} /> Explore SafeX</span><h1>Services designed around <span>your goals.</span></h1><p>Choose a service to configure your requirements and receive a live estimate.</p></div></section>
      <section className="section">
        <div className="container">
          <div className="filter-row">
            {["All", ...categories].map((category) => <button key={category} className={active === category ? "filter active" : "filter"} onClick={() => setActive(category)}>{category}</button>)}
          </div>
          <div className="service-grid service-grid-large">
            {filtered.map((service, index) => <ServiceCard key={service._id} service={service} index={index} />)}
          </div>
        </div>
      </section>
    </main>
  );
}

function Estimator() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const services = useServices();
  const service = services.find((s) => String(s._id) === serviceId || s.slug === serviceId);
  const [region, setRegion] = useState("");
  const [selected, setSelected] = useState([]);
  const [showRegion, setShowRegion] = useState(true);

  useEffect(() => {
    if (service?.features?.length) setSelected(service.features.filter((f) => f.price === 0).map((f) => f.id));
  }, [service?._id]);

  if (!service) return <main className="section"><div className="container empty-state"><h2>Service not found</h2><Link className="gradient-btn" to="/services">Back to services</Link></div></main>;

  const currency = getCurrency(region);
  const base = Number(service.basePrice || 0);
  const extra = service.features.filter((f) => selected.includes(f.id)).reduce((sum, f) => sum + Number(f.price || 0), 0);
  const usdTotal = base + extra;
  const converted = Math.round(usdTotal * currency.rate);
  const formatMoney = (value) => new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(value);

  function toggle(id) {
    setSelected((current) => current.includes(id) ? current.filter((x) => x !== id) : [...current, id]);
  }

  return (
    <main>
      <section className="page-hero compact"><div className="container"><Link className="back-link" to="/services">← All services</Link><span className="eyebrow">{service.category}</span><h1>{service.name}</h1><p>{service.description}</p></div></section>
      <section className="section estimator-section">
        <div className="container">
          <AnimatePresence mode="wait">
            {showRegion ? (
              <motion.div key="region" className="region-card" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
                <div className="region-icon"><Globe2 /></div>
                <h2>Where are you located?</h2>
                <p>We'll display your estimate in the currency most relevant to your region.</p>
                <select value={region} onChange={(e) => setRegion(e.target.value)}>
                  <option value="">Select your region</option>
                  {regions.map((r) => <option key={r.value} value={r.value}>{r.value} — {r.currency}</option>)}
                </select>
                <button className="gradient-btn" disabled={!region} onClick={() => setShowRegion(false)}>Continue <ArrowRight size={17} /></button>
              </motion.div>
            ) : (
              <motion.div key="calculator" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="calculator-layout">
                <div className="config-panel">
                  <div className="panel-heading"><div><span className="eyebrow">Configure project</span><h2>Tell us what you need</h2></div><button className="change-region" onClick={() => setShowRegion(true)}>Change region</button></div>
                  <div className="region-chip"><Globe2 size={15} /> {region} · {currency.currency}</div>
                  <div className="feature-list">
                    {service.features.map((feature) => (
                      <label className={selected.includes(feature.id) ? "feature selected" : "feature"} key={feature.id}>
                        <input type="checkbox" checked={selected.includes(feature.id)} onChange={() => toggle(feature.id)} />
                        <span className="check"><Check size={14} /></span>
                        <span className="feature-name">{feature.name}</span>
                        <span className="feature-price">{feature.price ? `+$${feature.price}` : "Included"}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <aside className="estimate-card">
                  <div className="estimate-icon"><Calculator /></div>
                  <span className="eyebrow">Live estimate</span>
                  <div className="estimate-price">{currency.symbol}{formatMoney(converted)}</div>
                  <div className="estimate-usd">≈ ${formatMoney(usdTotal)} USD</div>
                  <div className="estimate-lines"><div><span>Base service</span><b>${formatMoney(base)}</b></div><div><span>Selected extras</span><b>${formatMoney(extra)}</b></div><div className="line-total"><span>Estimated total</span><b>{currency.symbol}{formatMoney(converted)}</b></div></div>
                  <p className="disclaimer">This is an estimate, not a final quotation. Final pricing may change after reviewing your requirements.</p>
                  <button className="gradient-btn full" onClick={() => navigate(`/request/${service._id}`, { state: { service, region, currency, selected, usdTotal, converted } })}>Request This Service <ArrowRight size={17} /></button>
                </aside>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}

function RequestForm() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const services = useServices();
  const service = services.find((s) => String(s._id) === serviceId || s.slug === serviceId);
  const [state, setState] = useState({ name: "", email: "", phone: "", company: "", budget: "", timeline: "", description: "", additionalRequirements: "", communication: "Email" });
  const [region, setRegion] = useState("");
  const [currency, setCurrency] = useState(getCurrency(""));
  const [selected, setSelected] = useState([]);
  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const navState = location.state;
    if (navState) {
      setRegion(navState.region || "");
      setCurrency(navState.currency || getCurrency(""));
      setSelected(navState.selected || []);
      setEstimatedPrice(navState.converted || 0);
    }
  }, []);

  if (!service) return <main className="section"><div className="container empty-state"><h2>Service not found</h2></div></main>;

  async function submit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await api.post("/requests", {
        ...state,
        region,
        currency: currency.currency,
        serviceId: service._id,
        serviceName: service.name,
        selectedFeatures: selected,
        estimatedPrice
      });
      navigate("/request-success", { state: res.data });
    } catch (err) {
      setError(err.response?.data?.message || "Unable to submit your request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main>
      <section className="page-hero compact"><div className="container"><span className="eyebrow"><Send size={15} /> Final step</span><h1>Tell us about your <span>project.</span></h1><p>Your estimate and selected requirements will be attached automatically.</p></div></section>
      <section className="section"><div className="container request-layout">
        <form className="request-form" onSubmit={submit}>
          {error && <div className="error-box">{error}</div>}
          <div className="form-section"><h3>Contact information</h3><div className="form-grid">
            <Field label="Full name *" value={state.name} required onChange={(v) => setState({ ...state, name: v })} />
            <Field label="Email *" type="email" value={state.email} required onChange={(v) => setState({ ...state, email: v })} />
            <Field label="Phone" value={state.phone} onChange={(v) => setState({ ...state, phone: v })} />
            <Field label="Company" value={state.company} onChange={(v) => setState({ ...state, company: v })} />
          </div></div>
          <div className="form-section"><h3>Project information</h3><div className="form-grid">
            <Field label="Budget" value={state.budget} onChange={(v) => setState({ ...state, budget: v })} placeholder="e.g. $2,000–$4,000" />
            <Field label="Timeline" value={state.timeline} onChange={(v) => setState({ ...state, timeline: v })} placeholder="e.g. 4–6 weeks" />
            <div className="field full-field"><label>Project description *</label><textarea required rows="5" value={state.description} onChange={(e) => setState({ ...state, description: e.target.value })} /></div>
            <div className="field full-field"><label>Additional requirements</label><textarea rows="4" value={state.additionalRequirements} onChange={(e) => setState({ ...state, additionalRequirements: e.target.value })} /></div>
            <div className="field"><label>Preferred communication</label><select value={state.communication} onChange={(e) => setState({ ...state, communication: e.target.value })}><option>Email</option><option>Phone</option><option>WhatsApp</option></select></div>
          </div></div>
          <button className="gradient-btn full" disabled={submitting}>{submitting ? "Submitting..." : "Submit Request"} <Send size={16} /></button>
        </form>
        <aside className="request-summary"><span className="eyebrow">Your estimate</span><h2>{service.name}</h2><div className="summary-price">{currency.symbol}{new Intl.NumberFormat().format(estimatedPrice)}</div><div className="summary-row"><span>Region</span><b>{region || "Not selected"}</b></div><div className="summary-row"><span>Currency</span><b>{currency.currency}</b></div><div className="summary-row"><span>Selected features</span><b>{selected.length}</b></div><p>Final pricing is confirmed after SafeX reviews your project requirements.</p></aside>
      </div></section>
    </main>
  );
}

function Field({ label, value, onChange, type = "text", required = false, placeholder = "" }) {
  return <div className="field"><label>{label}</label><input type={type} required={required} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} /></div>;
}

function RequestSuccess() {
  const { state } = window.history;
  const data = state?.usr;
  if (!data) return <main className="section"><div className="container empty-state"><h2>Your request was submitted.</h2><Link className="gradient-btn" to="/track-request">Track Request</Link></div></main>;
  return <main className="section success-page"><div className="container"><div className="success-card"><div className="success-icon"><Check /></div><span className="eyebrow">Request submitted</span><h1>You're all set.</h1><p>Your request has been received and is now pending SafeX review.</p><div className="request-id"><small>Your Request ID</small><strong>{data.requestId}</strong><button onClick={() => navigator.clipboard?.writeText(data.requestId)}>Copy ID</button></div><p className="save-note">Save your Request ID and use your email to privately track your request.</p><Link className="gradient-btn" to="/track-request">Track Request <ArrowRight size={17} /></Link></div></div></main>;
}

function TrackRequest() {
  const [form, setForm] = useState({ requestId: "", email: "" });
  const [request, setRequest] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function track(e) {
    e.preventDefault();
    setError(""); setRequest(null); setLoading(true);
    try {
      const res = await api.post("/requests/track", form);
      setRequest(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Request not found. Please verify your Request ID and email.");
    } finally { setLoading(false); }
  }

  return <main><section className="page-hero compact"><div className="container"><span className="eyebrow"><Search size={15} /> Private tracking</span><h1>Track your <span>request.</span></h1><p>Your request details are private. Only matching Request ID and email credentials can retrieve it.</p></div></section>
    <section className="section"><div className="container track-layout">
      <form className="track-card" onSubmit={track}><div className="track-icon"><Search /></div><h2>Find your request</h2><Field label="Request ID *" required value={form.requestId} onChange={(v) => setForm({ ...form, requestId: v.toUpperCase() })} placeholder="SX-2026-00001" /><Field label="Email address *" type="email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} placeholder="you@example.com" />{error && <div className="error-box">{error}</div>}<button className="gradient-btn full" disabled={loading}>{loading ? "Checking..." : "Track Request"} <ArrowRight size={16} /></button></form>
      {request && <motion.div className="status-card" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}><span className="eyebrow">Request {request.requestId}</span><h2>{request.serviceName}</h2><div className="status-pill">{request.status.replace("_", " ")}</div><div className="timeline">{["pending", "in_progress", "completed"].map((status, i) => { const order = { pending: 0, in_progress: 1, completed: 2 }; const current = order[request.status] ?? 0; const done = order[status] < current || status === request.status; return <div className={done ? "timeline-item done" : "timeline-item"} key={status}><div className="timeline-dot">{done ? <Check size={13} /> : ""}</div><div><strong>{status === "in_progress" ? "In Progress" : status[0].toUpperCase() + status.slice(1)}</strong><small>{status === request.status ? "Current status" : done ? "Completed" : "Waiting"}</small></div></div>; })}{request.status === "rejected" && <div className="rejected-note">This request has been marked as rejected. Please contact SafeX if you need clarification.</div>}</div><div className="private-note"><ShieldCheck size={16} /> Private information shown only after verification.</div></motion.div>}
    </div></section></main>;
}

const REVIEW_PALETTE = [
  { bg: "#FFF3E0", border: "#F6D9A8", accent: "#C8862A", text: "#6B4E1C" },
  { bg: "#E7F1FF", border: "#BFDAFF", accent: "#4A7FD1", text: "#294B7A" },
  { bg: "#F4EAFF", border: "#E0C9FA", accent: "#9A63D6", text: "#5C3789" },
  { bg: "#E7FBF1", border: "#BEEDD3", accent: "#3FA873", text: "#256B47" },
  { bg: "#FFEAF3", border: "#FAC7DD", accent: "#DB6B9E", text: "#8C3D64" },
  { bg: "#FFFBE0", border: "#F3E7A8", accent: "#C6A61E", text: "#6E5A0F" }
];

function ReviewCard({ review, index = 0 }) {
  const palette = REVIEW_PALETTE[index % REVIEW_PALETTE.length];
  return <motion.article className="review-card" style={{ background: palette.bg, borderColor: palette.border }} whileHover={{ y: -4 }}>
    <Quote size={24} style={{ color: palette.accent }} />
    <div className="stars" style={{ color: palette.accent }}>{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />)}</div>
    <p style={{ color: palette.text }}>"{review.review}"</p>
    <strong style={{ color: palette.text }}>{review.name}</strong>
    <small>{review.company || "Client"}</small>
  </motion.article>;
}

function ReviewForm() {
  const [form, setForm] = useState({ name: "", email: "", company: "", rating: 5, review: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  async function submit(e) {
    e.preventDefault(); setError("");
    try { await api.post("/reviews", form); setSent(true); } catch (err) { setError(err.response?.data?.message || "Unable to submit review."); }
  }
  if (sent) return <div className="success-inline"><Check /> Thank you. Your review has been submitted for SafeX approval.</div>;
  return <form className="review-form" onSubmit={submit}><h2>Share your experience</h2><p>Your review will be published only after administrator approval.</p>{error && <div className="error-box">{error}</div>}<div className="form-grid"><Field label="Name *" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} /><Field label="Email *" type="email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} /><Field label="Company" value={form.company} onChange={(v) => setForm({ ...form, company: v })} /><div className="field"><label>Rating</label><select value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}>{[5,4,3,2,1].map(n => <option key={n} value={n}>{n} stars</option>)}</select></div><div className="field full-field"><label>Review *</label><textarea required rows="5" value={form.review} onChange={(e) => setForm({ ...form, review: e.target.value })} /></div></div><button className="gradient-btn">Submit Review <Send size={16} /></button></form>;
}

function About() {
  return <main><section className="page-hero"><div className="container"><span className="eyebrow">About SafeX</span><h1>People, technology and <span>purpose.</span></h1><p>SafeX Solutions brings together technology, digital growth, creative media and workforce development.</p></div></section><section className="section"><div className="container split"><div><h2>Built to help organizations move forward.</h2><p>SafeX combines practical technology expertise with creative and growth-focused services. This platform presents those capabilities through a simpler, more interactive client experience.</p><p>For the final production version, company achievements, statistics and descriptions should be reviewed against the latest official SafeX information.</p></div><div className="about-card large"><div className="about-stat"><strong>15+</strong><span>Countries</span></div><div className="about-stat"><strong>150+</strong><span>Clients</span></div><div className="about-stat"><strong>4</strong><span>Core domains</span></div></div></div></section><section className="section section-soft"><div className="container"><SectionHeading eyebrow="Leave feedback" title="Have you worked with SafeX?" text="Share your experience. Reviews are moderated before appearing publicly."/><ReviewForm /></div></section></main>;
}

export default function App() {
  return <Layout><ScrollToHashElement /><Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/services" element={<Services />} />
    <Route path="/services/:serviceId" element={<Estimator />} />
    <Route path="/request/:serviceId" element={<RequestForm />} />
    <Route path="/request-success" element={<RequestSuccess />} />
    <Route path="/track-request" element={<TrackRequest />} />
    <Route path="*" element={<main className="section"><div className="container empty-state"><h2>Page not found</h2><Link className="gradient-btn" to="/">Return Home</Link></div></main>} />
  </Routes></Layout>;
}
