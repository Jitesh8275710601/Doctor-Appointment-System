import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import "../styles/FindDoctor.css";

// ── API Layer ──────────────────────────────────────────────────────────────────
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const doctorsAPI = {
  getAll: async (params = {}) => {
    const qs = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== ""))
    ).toString();
    const res = await fetch(`${API_BASE}/doctors${qs ? `?${qs}` : ""}`, {
      signal: params._signal,
    });
    if (!res.ok) throw new Error(`Server error ${res.status}`);
    return res.json();
  },
  getSpecialties: async () => {
    const res = await fetch(`${API_BASE}/doctors/specialties`);
    if (!res.ok) throw new Error("Failed to load specialties");
    return res.json();
  },
  getLocations: async () => {
    const res = await fetch(`${API_BASE}/doctors/locations`);
    if (!res.ok) throw new Error("Failed to load locations");
    return res.json();
  },
};

// ── Fallback mock data (when backend is not running) ───────────────────────────
const MOCK_DOCTORS = [
  {
    _id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    rating: 4.9,
    totalReviews: 234,
    bio: "Specialized in preventive cardiology and heart disease management.",
    experience: 15,
    totalPatients: "2500+",
    consultationFee: 150,
    location: "New York, NY",
    availability: "today",
    photo: null,
  },
  {
    _id: "2",
    name: "Dr. Michael Chen",
    specialty: "Neurologist",
    rating: 4.8,
    totalReviews: 189,
    bio: "Expert in treating neurological disorders and brain conditions.",
    experience: 12,
    totalPatients: "3200+",
    consultationFee: 180,
    location: "New York, NY",
    availability: "tomorrow",
    photo: null,
  },
  {
    _id: "3",
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
    rating: 5.0,
    totalReviews: 156,
    bio: "Compassionate care for children from infancy to adolescence.",
    experience: 10,
    totalPatients: "1800+",
    consultationFee: 120,
    location: "Boston, MA",
    availability: "today",
    photo: null,
  },
  {
    _id: "4",
    name: "Dr. James Wilson",
    specialty: "Dentist",
    rating: 4.7,
    totalReviews: 143,
    bio: "Comprehensive dental care with modern techniques.",
    experience: 8,
    totalPatients: "1500+",
    consultationFee: 130,
    location: "Chicago, IL",
    availability: "today",
    photo: null,
  },
  {
    _id: "5",
    name: "Dr. Amanda Foster",
    specialty: "Dermatologist",
    rating: 4.9,
    totalReviews: 198,
    bio: "Specialist in medical and cosmetic dermatology.",
    experience: 14,
    totalPatients: "2100+",
    consultationFee: 160,
    location: "Los Angeles, CA",
    availability: "tomorrow",
    photo: null,
  },
  {
    _id: "6",
    name: "Dr. Robert Martinez",
    specialty: "Orthopedic",
    rating: 4.8,
    totalReviews: 167,
    bio: "Expert in sports medicine and joint replacement surgery.",
    experience: 16,
    totalPatients: "1900+",
    consultationFee: 175,
    location: "Houston, TX",
    availability: "today",
    photo: null,
  },
];

const MOCK_SPECIALTIES = [
  "All Specialties",
  "Cardiologist",
  "Neurologist",
  "Pediatrician",
  "Dentist",
  "Dermatologist",
  "Orthopedic",
];

const MOCK_LOCATIONS = [
  "All Locations",
  "Mumbai, MH",
  "Pune, MH",
  "Hyderabad, TS",
  "Delhi, DL",
  "Lucknow, UP",
];

// ── Avatar Initials ────────────────────────────────────────────────────────────
const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

// ── Star Rating ────────────────────────────────────────────────────────────────
const Stars = ({ rating }) => {
  const full = Math.round(rating);
  return (
    <span className="fd-card__rating-row">
      <span className="fd-card__star">★</span>
      <span className="fd-card__rating-val">{rating.toFixed(1)}</span>
    </span>
  );
};

// ── Skeleton Card ──────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="fd-skeleton-card">
    <div className="fd-skeleton-card__row">
      <div className="fd-skeleton fd-skeleton-card__avatar" />
      <div className="fd-skeleton-card__lines">
        <div className="fd-skeleton fd-skeleton-card__line-a" />
        <div className="fd-skeleton fd-skeleton-card__line-b" />
        <div className="fd-skeleton fd-skeleton-card__line-c" />
      </div>
    </div>
    <div className="fd-skeleton fd-skeleton-card__bio" />
    <div className="fd-skeleton fd-skeleton-card__stat" />
    <div className="fd-skeleton fd-skeleton-card__stat" />
    <div className="fd-skeleton fd-skeleton-card__stat" />
    <div className="fd-skeleton fd-skeleton-card__badge" />
    <div className="fd-skeleton-card__footer">
      <div className="fd-skeleton fd-skeleton-card__btn" />
      <div className="fd-skeleton fd-skeleton-card__btn" />
    </div>
  </div>
);

// ── Doctor Card ────────────────────────────────────────────────────────────────
const DoctorCard = ({ doctor, onBook }) => {
  const navigate = useNavigate();
  const initials = getInitials(doctor.name);

  return (
    <div class="fd-results-grid">
      <article className="fd-card-main">
        <div className="fd-card__top">
          {/* Profile Row */}
          <div className="fd-card__profile-row">
            {doctor.photo ? (
              <img
                src={doctor.photo}
                alt={doctor.name}
                className="fd-card__avatar"
                onError={(e) => { e.target.style.display = "none"; }}
              />
            ) : (
              <div className="fd-card__avatar-placeholder">{initials}</div>
            )}
            <div className="fd-card__info">
              <h3 className="fd-card__name">{doctor.name}</h3>
              <p className="fd-card__specialty">{doctor.specialty}</p>
              <div className="fd-card__rating-row">
                <span className="fd-card__star">★</span>
                <span className="fd-card__rating-val">{doctor.rating?.toFixed(1)}</span>
                <span className="fd-card__reviews">({doctor.totalReviews})</span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <p className="fd-card__bio">{doctor.bio}</p>

          {/* Stats */}
          <div className="fd-card__stats">
            <div className="fd-card__stat-row">
              <span className="fd-card__stat-label">Experience:</span>
              <span className="fd-card__stat-value">{doctor.experience} years</span>
            </div>
            <div className="fd-card__stat-row">
              <span className="fd-card__stat-label">Patients:</span>
              <span className="fd-card__stat-value">{doctor.totalPatients}</span>
            </div>
            <div className="fd-card__stat-row">
              <span className="fd-card__stat-label">Fee:</span>
              <span className="fd-card__stat-value fd-card__stat-value--fee">
                rupees {doctor.consultationFee}
              </span>
            </div>
          </div>

          {/* Location */}
          <div className="fd-card__location">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {doctor.location}
          </div>

          {/* Availability */}
          <div
            className={`fd-card__availability ${doctor.availability === "today"
                ? "fd-card__availability--today"
                : "fd-card__availability--tomorrow"
              }`}
          >
            {doctor.availability === "today" ? "Available Today" : "Available Tomorrow"}
          </div>
        </div>

        {/* Actions */}
        <div className="fd-card__actions">
          <button
            className="fd-btn fd-btn--outline"
            onClick={() => navigate(`/doctors/${doctor._id}`)}
          >
            View Profile
          </button>
          <button
            className="fd-btn fd-btn--primary"
            onClick={() => onBook(doctor)}
          >
            Book Now
          </button>
        </div>
      </article>
    </div>
  );
};

// ── Navbar ─────────────────────────────────────────────────────────────────────
const Navbar = () => (
  <nav className="fd-navbar">
    <Link to="/" className="fd-navbar__brand">
      <svg className="fd-navbar__brand-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      HealthCare+
    </Link>
    <button className="fd-navbar__menu-btn" aria-label="Menu">
      <span /><span /><span />
    </button>
  </nav>
);

// ── Footer ─────────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="fd-footer">
    <div className="fd-footer__brand">
      <svg className="fd-footer__brand-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      HealthCare+
    </div>
    <p className="fd-footer__tagline">
      Quality healthcare made accessible for everyone. Your health, our priority.
    </p>

    {/* Social Icons */}
    <div className="fd-footer__social">
      {[
        { label: "Facebook", icon: "f" },
        { label: "Twitter", icon: "𝕏" },
        { label: "Instagram", icon: "⬡" },
        { label: "LinkedIn", icon: "in" },
      ].map((s) => (
        <a key={s.label} href="#" className="fd-footer__social-link" aria-label={s.label}>
          {s.icon}
        </a>
      ))}
    </div>

    {/* Sections */}
    <div className="fd-footer__sections">
      {/* Quick Links */}
      <div>
        <h4 className="fd-footer__section-title">Quick Links</h4>
        <ul className="fd-footer__links">
          {["About Us", "Services", "Find Doctors", "Patient Portal", "Doctor Portal"].map((l) => (
            <li key={l}><a href="#">{l}</a></li>
          ))}
        </ul>
      </div>

      {/* Support */}
      <div>
        <h4 className="fd-footer__section-title">Support</h4>
        <ul className="fd-footer__links">
          {["FAQ", "Contact Us", "Help Center", "Terms & Conditions", "Privacy Policy"].map((l) => (
            <li key={l}><a href="#">{l}</a></li>
          ))}
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h4 className="fd-footer__section-title">Contact</h4>
        <ul className="fd-footer__contact-list">
          <li className="fd-footer__contact-item">
            <span className="fd-footer__contact-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
              Email
            </span>
            <span className="fd-footer__contact-val">contact@healthcare.com</span>
          </li>
          <li className="fd-footer__contact-item">
            <span className="fd-footer__contact-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.38 2 2 0 0 1 3.57 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.1a16 16 0 0 0 6 6l.9-.9a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
              Phone
            </span>
            <span className="fd-footer__contact-val">+1 (555) 123-4567</span>
          </li>
          <li className="fd-footer__contact-item">
            <span className="fd-footer__contact-label">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
              Address
            </span>
            <span className="fd-footer__contact-val">123 Medical Center, NY 10001</span>
          </li>
        </ul>
      </div>
    </div>

    <hr className="fd-footer__divider" />
    <div className="fd-footer__bottom">
      <p className="fd-footer__copyright">© 2026 HealthCare+. All rights reserved.</p>
      <div className="fd-footer__legal">
        {["Terms of Service", "Privacy Policy", "Cookie Policy"].map((l) => (
          <a key={l} href="#">{l}</a>
        ))}
      </div>
    </div>
  </footer>
);

// ══════════════════════════════════════════════════════════════════════════════
// MAIN FIND DOCTOR PAGE
// ══════════════════════════════════════════════════════════════════════════════
const FindDoctor = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // State
  const [doctors, setDoctors] = useState([]);
  const [specialties, setSpecialties] = useState(MOCK_SPECIALTIES);
  const [locations, setLocations] = useState(MOCK_LOCATIONS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [useMock, setUseMock] = useState(false);

  // Filters
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [specialty, setSpecialty] = useState(searchParams.get("specialty") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");

  const abortRef = useRef(null);

  // ── Fetch helpers ─────────────────────────────────────────────────────────
  const fetchMeta = useCallback(async () => {
    try {
      const [specRes, locRes] = await Promise.all([
        doctorsAPI.getSpecialties(),
        doctorsAPI.getLocations(),
      ]);
      setSpecialties(["All Specialties", ...(specRes.data || [])]);
      setLocations(["All Locations", ...(locRes.data || [])]);
    } catch {
      // keep mock defaults
    }
  }, []);

  const fetchDoctors = useCallback(async (filters) => {
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const res = await doctorsAPI.getAll({
        search: filters.search || undefined,
        specialty: filters.specialty || undefined,
        location: filters.location || undefined,
        _signal: abortRef.current.signal,
      });
      setDoctors(res.data || []);
      setTotal(res.total ?? res.data?.length ?? 0);
      setUseMock(false);
    } catch (err) {
      if (err.name === "AbortError") return;
      // Fallback to mock data
      let filtered = MOCK_DOCTORS;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        filtered = filtered.filter(
          (d) =>
            d.name.toLowerCase().includes(q) ||
            d.specialty.toLowerCase().includes(q)
        );
      }
      if (filters.specialty && filters.specialty !== "All Specialties") {
        filtered = filtered.filter((d) => d.specialty === filters.specialty);
      }
      if (filters.location && filters.location !== "All Locations") {
        filtered = filtered.filter((d) => d.location === filters.location);
      }
      setDoctors(filtered);
      setTotal(filtered.length);
      setUseMock(true);
    } finally {
      setLoading(false);
    }
  }, []);

  // ── Effects ───────────────────────────────────────────────────────────────
  useEffect(() => {
    fetchMeta();
  }, [fetchMeta]);

  useEffect(() => {
    fetchDoctors({ search, specialty, location });
    // Sync URL params
    const params = {};
    if (search) params.search = search;
    if (specialty) params.specialty = specialty;
    if (location) params.location = location;
    setSearchParams(params, { replace: true });
  }, [search, specialty, location, fetchDoctors]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleBook = useCallback(
    (doctor) => navigate(`/appointment?doctorId=${doctor._id}`),
    [navigate]
  );

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") fetchDoctors({ search, specialty, location });
  };

  const handleClear = () => {
    setSearch("");
    setSpecialty("");
    setLocation("");
  };

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="fd-page">
      <Navbar />

      {/* ── Hero / Search ── */}
      <section className="fd-hero">
        <h1 className="fd-hero__title">Find Your Doctor</h1>
        <p className="fd-hero__subtitle">
          Search from 500+ verified medical professionals across various specialties
        </p>

        <div className="fd-search-box">
          {/* Text Search */}
          <div className="fd-search-input-wrap">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              className="fd-search-input"
              type="text"
              placeholder="Search by doctor name or specialty..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearchSubmit}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", fontSize: 16, lineHeight: 1 }}
                aria-label="Clear search"
              >✕</button>
            )}
          </div>

          {/* Specialty Dropdown */}
          <select
            className="fd-search-select"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value === "All Specialties" ? "" : e.target.value)}
          >
            {specialties.map((s) => (
              <option key={s} value={s === "All Specialties" ? "" : s}>{s}</option>
            ))}
          </select>

          {/* Location Dropdown */}
          <select
            className="fd-search-select"
            value={location}
            onChange={(e) => setLocation(e.target.value === "All Locations" ? "" : e.target.value)}
          >
            {locations.map((l) => (
              <option key={l} value={l === "All Locations" ? "" : l}>{l}</option>
            ))}
          </select>
        </div>
      </section>

      {/* ── Results ── */}
      <main className="fd-results">
        {/* Header */}
        {!loading && !error && (
          <div className="fd-results__header">
            <h2 className="fd-results__count">{total} Doctor{total !== 1 ? "s" : ""} Found</h2>
            <p className="fd-results__sub">
              {useMock ? "Showing sample data — connect your backend to see live results" : "Showing results for your search"}
            </p>
          </div>
        )}

        {/* Loading Skeletons */}
        {loading &&
          Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}

        {/* Error */}
        {!loading && error && (
          <div className="fd-empty">
            <span className="fd-empty__icon">⚠️</span>
            <h3 className="fd-empty__title">Failed to Load Doctors</h3>
            <p className="fd-empty__sub">{error}</p>
          </div>
        )}

        {/* Doctor Cards */}
        {!loading &&
          !error &&
          (doctors.length > 0 ? (
            doctors.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} onBook={handleBook} />
            ))
          ) : (
            <div className="fd-empty">
              <span className="fd-empty__icon">🔍</span>
              <h3 className="fd-empty__title">No Doctors Found</h3>
              <p className="fd-empty__sub">
                Try adjusting your search or filter to find available doctors.
              </p>
              <button
                className="fd-btn fd-btn--primary"
                style={{ margin: "16px auto 0", maxWidth: 200, flex: "none" }}
                onClick={handleClear}
              >
                Clear Filters
              </button>
            </div>
          ))}
      </main>

      <Footer />

      {/* Floating Help FAB */}
      <button className="fd-fab" aria-label="Help">?</button>
    </div>
  );
};

export default FindDoctor;
