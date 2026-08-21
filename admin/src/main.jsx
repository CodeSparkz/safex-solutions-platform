import React, { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { Check, ClipboardList, Eye, LogOut, MessageSquare, RefreshCw, Trash2, UserRound, X, ShieldCheck } from "lucide-react";
import "./styles.css";

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api", timeout: 15000 });

function App() {
  const [token, setToken] = useState(() => sessionStorage.getItem("safex_admin_token") || "");
  const [page, setPage] = useState("requests");
  const [loginError, setLoginError] = useState("");

  if (!token) return <Login onLogin={(t) => { sessionStorage.setItem("safex_admin_token", t); setToken(t); }} error={loginError} setError={setLoginError} />;

  return <Dashboard token={token} page={page} setPage={setPage} onLogout={() => { sessionStorage.removeItem("safex_admin_token"); setToken(""); }} />;
}

function Login({ onLogin, error, setError }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault(); setBusy(true); setError("");
    try {
      const res = await api.post("/auth/login", { email, password });
      onLogin(res.data.token);
    } catch (err) { setError(err.response?.data?.message || "Login failed."); }
    finally { setBusy(false); }
  }

  return <main className="login-page"><div className="login-card"><img src="/safex-logo.svg" alt="SafeX Solutions" /><div className="login-icon"><ShieldCheck /></div><span className="eyebrow">Protected area</span><h1>Admin Portal</h1><p>Authorized SafeX administrators only.</p>{error && <div className="error">{error}</div>}<form onSubmit={submit}><label>Email<input type="email" value={email} required onChange={(e) => setEmail(e.target.value)} /></label><label>Password<input type="password" value={password} required onChange={(e) => setPassword(e.target.value)} /></label><button disabled={busy}>{busy ? "Signing in..." : "Sign in"}</button></form><small>Credentials are never stored in this frontend.</small></div></main>;
}

function Dashboard({ token, page, setPage, onLogout }) {
  const [requests, setRequests] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");

  const config = useMemo(() => ({ headers: { Authorization: `Bearer ${token}` } }), [token]);

  async function load() {
    setError("");
    try {
      const [reqRes, reviewRes] = await Promise.all([api.get("/requests/admin", config), api.get("/reviews/admin", config)]);
      setRequests(reqRes.data || []);
      setReviews(reviewRes.data || []);
    } catch (err) {
      if (err.response?.status === 401) onLogout();
      else setError(err.response?.data?.message || "Unable to load dashboard.");
    }
  }

  useEffect(() => { load(); }, [token]);

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === "pending").length,
    in_progress: requests.filter(r => r.status === "in_progress").length,
    completed: requests.filter(r => r.status === "completed").length,
    rejected: requests.filter(r => r.status === "rejected").length,
    reviews: reviews.filter(r => r.status === "pending").length
  };

  async function updateStatus(id, status) {
    try { await api.patch(`/requests/admin/${id}/status`, { status }, config); await load(); }
    catch (err) { setError(err.response?.data?.message || "Status update failed."); }
  }

  async function deleteRequest(id) {
    if (!window.confirm("Delete this rejected request permanently?")) return;
    try { await api.delete(`/requests/admin/${id}`, config); await load(); }
    catch (err) { setError(err.response?.data?.message || "Delete failed."); }
  }

  async function updateReview(id, status) {
    try { await api.patch(`/reviews/admin/${id}`, { status }, config); await load(); }
    catch (err) { setError(err.response?.data?.message || "Review update failed."); }
  }

  async function deleteReview(id) {
    if (!window.confirm("Delete this review permanently?")) return;
    try { await api.delete(`/reviews/admin/${id}`, config); await load(); }
    catch (err) { setError(err.response?.data?.message || "Delete failed."); }
  }

  return <div className="admin-shell">
    <aside className="sidebar">
      <img src="/safex-logo.svg" alt="SafeX Solutions" />
      <div className="admin-label"><ShieldCheck size={15}/> Admin</div>
      <nav>
        <button className={page === "requests" ? "active" : ""} onClick={() => setPage("requests")}><ClipboardList size={17}/> Requests <b>{stats.pending}</b></button>
        <button className={page === "reviews" ? "active" : ""} onClick={() => setPage("reviews")}><MessageSquare size={17}/> Reviews <b>{stats.reviews}</b></button>
      </nav>
      <button className="logout" onClick={onLogout}><LogOut size={17}/> Sign out</button>
    </aside>
    <main className="admin-main">
      <header className="admin-header"><div><span className="eyebrow">SafeX Solutions</span><h1>{page === "requests" ? "Request Management" : "Review Moderation"}</h1></div><button className="refresh" onClick={load}><RefreshCw size={16}/> Refresh</button></header>
      {error && <div className="error">{error}</div>}
      {page === "requests" ? <Requests requests={requests} stats={stats} updateStatus={updateStatus} deleteRequest={deleteRequest} /> : <Reviews reviews={reviews} updateReview={updateReview} deleteReview={deleteReview} />}
    </main>
  </div>;
}

function Requests({ requests, stats, updateStatus, deleteRequest }) {
  const [viewing, setViewing] = useState(null);
  return <div><div className="stat-grid">
    <Stat label="Total" value={stats.total}/><Stat label="Pending" value={stats.pending}/><Stat label="In Progress" value={stats.in_progress}/><Stat label="Completed" value={stats.completed}/><Stat label="Rejected" value={stats.rejected}/>
  </div><div className="panel"><div className="panel-top"><h2>Client requests</h2><span>{requests.length} records</span></div><div className="table-wrap"><table><thead><tr><th>Request</th><th>Client</th><th>Service</th><th>Estimate</th><th>Status</th><th>Actions</th></tr></thead><tbody>{requests.length ? requests.map(r => <tr key={r._id}><td><strong>{r.requestId}</strong><small>{new Date(r.createdAt).toLocaleString()}</small></td><td><strong>{r.name}</strong><small>{r.email}</small></td><td>{r.serviceName}<small>{r.region} · {r.currency}</small></td><td>{r.currency} {Number(r.estimatedPrice || 0).toLocaleString()}</td><td><StatusSelect value={r.status} onChange={(v) => updateStatus(r._id, v)} /></td><td className="action-cell"><button className="icon" title="View full details" onClick={() => setViewing(r)}><Eye size={15}/></button>{r.status === "rejected" ? <button className="icon danger" title="Delete rejected request" onClick={() => deleteRequest(r._id)}><Trash2 size={15}/></button> : null}</td></tr>) : <tr><td colSpan="6" className="empty">No requests yet.</td></tr>}</tbody></table></div></div>
    {viewing && <RequestModal request={viewing} onClose={() => setViewing(null)} updateStatus={updateStatus} />}
  </div>;
}

function Detail({ label, value }) {
  return <div className="detail"><span>{label}</span><b>{value ?? "—"}</b></div>;
}

function RequestModal({ request, onClose, updateStatus }) {
  return <div className="modal-overlay" onClick={onClose}>
    <div className="modal-card" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <div><span className="eyebrow">{request.requestId}</span><h2>{request.name}</h2></div>
        <button className="icon" onClick={onClose}><X size={18}/></button>
      </div>
      <div className="modal-body">
        <div className="modal-section">
          <h3><UserRound size={14}/> Client information</h3>
          <div className="modal-grid">
            <Detail label="Full name" value={request.name} />
            <Detail label="Email" value={request.email} />
            <Detail label="Phone" value={request.phone} />
            <Detail label="Company" value={request.company} />
            <Detail label="Region" value={request.region} />
            <Detail label="Preferred contact" value={request.communication} />
          </div>
        </div>
        <div className="modal-section">
          <h3>Service &amp; estimate</h3>
          <div className="modal-grid">
            <Detail label="Service" value={request.serviceName} />
            <Detail label="Currency" value={request.currency} />
            <Detail label="Calculator estimate" value={`${request.currency} ${Number(request.estimatedPrice || 0).toLocaleString()}`} />
            <Detail label="Stated budget" value={request.budget} />
            <Detail label="Timeline" value={request.timeline} />
            <Detail label="Status" value={<StatusSelect value={request.status} onChange={(v) => updateStatus(request._id, v)} />} />
          </div>
        </div>
        <div className="modal-section">
          <h3>Selected features ({request.selectedFeatures?.length || 0})</h3>
          {request.selectedFeatures?.length ? <ul className="feature-list">{request.selectedFeatures.map((f, i) => <li key={i}>{f}</li>)}</ul> : <p className="muted">No features selected.</p>}
        </div>
        <div className="modal-section">
          <h3>Project description</h3>
          <p className="modal-text">{request.description || "—"}</p>
        </div>
        <div className="modal-section">
          <h3>Additional requirements</h3>
          <p className="modal-text">{request.additionalRequirements || "None provided."}</p>
        </div>
        <div className="modal-section">
          <h3>Record</h3>
          <div className="modal-grid">
            <Detail label="Submitted" value={new Date(request.createdAt).toLocaleString()} />
            <Detail label="Last updated" value={new Date(request.updatedAt).toLocaleString()} />
          </div>
        </div>
      </div>
    </div>
  </div>;
}

function StatusSelect({ value, onChange }) {
  return <select className={`status ${value}`} value={value} onChange={(e) => onChange(e.target.value)}>
    <option value="pending">Pending</option><option value="in_progress">In Progress</option><option value="completed">Completed</option><option value="rejected">Rejected</option>
  </select>;
}

function Stat({ label, value }) { return <div className="stat"><span>{label}</span><strong>{value}</strong></div>; }

function Reviews({ reviews, updateReview, deleteReview }) {
  return <div className="panel"><div className="panel-top"><h2>Reviews</h2><span>Moderate before publishing</span></div><div className="review-admin-grid">{reviews.length ? reviews.map(r => <article className="review-admin" key={r._id}><div className="review-head"><div><strong>{r.name}</strong><small>{r.email} · {r.company || "No company"}</small></div><span className={`review-status ${r.status}`}>{r.status}</span></div><div className="stars">{"★".repeat(r.rating)}{"☆".repeat(5-r.rating)}</div><p>{r.review}</p><div className="review-actions">{r.status !== "approved" && <button onClick={() => updateReview(r._id, "approved")}><Check size={15}/> Approve</button>}{r.status !== "rejected" && <button className="reject" onClick={() => updateReview(r._id, "rejected")}><X size={15}/> Reject</button>}<button className="delete" onClick={() => deleteReview(r._id)}><Trash2 size={15}/> Delete</button></div></article>) : <div className="empty">No reviews submitted.</div>}</div></div>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<React.StrictMode><App /></React.StrictMode>);
