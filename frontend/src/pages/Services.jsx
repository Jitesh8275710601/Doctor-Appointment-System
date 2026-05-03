import { useState, useCallback } from "react";
import { useNavigate }          from "react-router-dom";
import { useServices }          from "../hooks/useServices";
import "../styles/Services.css";

// ══════════════════════════════════════════════════════════════════════════════
// CONSTANTS
// ══════════════════════════════════════════════════════════════════════════════

const ICONS = {
  stethoscope : "🩺",
  heart       : "❤️",
  bone        : "🦴",
  brain       : "🧠",
  baby        : "👶",
  skin        : "✨",
  scan        : "🔬",
  ambulance   : "🚑",
  mental      : "🧘",
  wellness    : "🌿",
  default     : "⚕️",
};

const HERO_STATS = [
  { value: "50+",  label: "Services"        },
  { value: "200+", label: "Specialists"     },
  { value: "98k+", label: "Patients Served" },
  { value: "4.9★", label: "Average Rating"  },
];

const SORT_OPTIONS = [
  { value: "sortOrder", label: "Recommended"        },
  { value: "rating",    label: "Top Rated"          },
  { value: "name",      label: "Name A–Z"           },
  { value: "price",     label: "Price: Low to High" },
];

// ══════════════════════════════════════════════════════════════════════════════
// SUB-COMPONENTS
// ══════════════════════════════════════════════════════════════════════════════

// ── Star Rating ────────────────────────────────────────────────────────────────
const StarRating = ({ rating, reviews }) => (
  <div className="service-card__rating">
    <div className="stars">
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`star ${i < Math.round(rating) ? "filled" : "empty"}`}
        >
          ★
        </span>
      ))}
    </div>
    <span className="rating-value">{rating?.toFixed(1)}</span>
    <span className="rating-count">({reviews?.toLocaleString()})</span>
  </div>
);

// ── Skeleton Loading Card ──────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton skeleton-icon" />
    <div className="skeleton skeleton-title" />
    <div className="skeleton skeleton-text" />
    <div className="skeleton skeleton-text skeleton-text--short" />
    <div className="skeleton-tags">
      <div className="skeleton skeleton-tag" />
      <div className="skeleton skeleton-tag" />
      <div className="skeleton skeleton-tag" />
      <div className="skeleton skeleton-tag" />
    </div>
    <div className="skeleton skeleton-footer" />
  </div>
);

// ── Feature Check Item ─────────────────────────────────────────────────────────
const FeatureItem = ({ title }) => (
  <div
    className="feature-tag"
    style={{
      display       : "flex",
      alignItems    : "center",
      gap           : 6,
      fontSize      : 12,
      color         : "var(--clr-muted)",
      background    : "var(--clr-bg)",
      borderRadius  : "var(--radius-sm)",
      padding       : "6px 10px",
      marginBottom  : 6,
    }}
  >
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M2 6l3 3 5-5"
        stroke="var(--clr-accent)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    {title}
  </div>
);

// ── Service Card ───────────────────────────────────────────────────────────────
const ServiceCard = ({ service, onViewDetail, onBook }) => {
  const icon = ICONS[service.icon] || ICONS.default;

  return (
    <article
      className="service-card"
      onClick={() => onViewDetail(service)}
    >
      {/* ── Card Header ── */}
      <div className="service-card__header">
        <div className="service-card__icon-wrap">
          <span className="service-card__icon">{icon}</span>
        </div>

        <div className="service-card__badges">
          <span className="badge badge--category">{service.category}</span>
          {service.isFeatured && (
            <span className="badge badge--featured">⭐ Featured</span>
          )}
        </div>
      </div>

      {/* ── Card Body ── */}
      <div className="service-card__body">
        <h3 className="service-card__title">{service.name}</h3>

        {/* Specialist Avatars */}
        <div className="service-card__specialists">
          <div className="specialists-avatars">
            {["D", "M", "S"].map((letter, i) => (
              <div key={i} className="specialist-avatar">
                {letter}
              </div>
            ))}
          </div>
          <span>{service.specialistsCount}+ Specialists Available</span>
        </div>

        {/* Description */}
        <p className="service-card__desc">{service.shortDescription}</p>

        {/* Feature Tags */}
        {service.features?.slice(0, 4).map((feature, i) => (
          <FeatureItem key={i} title={feature.title} />
        ))}

        {/* Rating + Price */}
        <div className="service-card__meta">
          <StarRating
            rating={service.rating}
            reviews={service.totalReviews}
          />

          <div className="service-card__price">
            <span className="price-label">Starting from</span>
            <span className="price-value">
              {service.pricing?.isFree
                ? "Free"
                : `₹${service.pricing?.consultationFee}`}
            </span>
          </div>
        </div>
      </div>

      {/* ── Card Footer ── */}
      <div
        className="service-card__footer"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="btn btn--primary"
          onClick={() => onBook(service)}
        >
          📅 Book Now
        </button>
        <button
          className="btn btn--outline"
          onClick={() => onViewDetail(service)}
        >
          Details
        </button>
      </div>
    </article>
  );
};

// ── Service Detail Modal ───────────────────────────────────────────────────────
const ServiceModal = ({ service, onClose, onBook }) => {
  if (!service) return null;

  const icon = ICONS[service.icon] || ICONS.default;

  return (
    <div
      className="service-modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="service-modal" role="dialog" aria-modal="true">

        {/* ── Modal Header ── */}
        <div className="service-modal__header">
          <div className="service-modal__icon">{icon}</div>

          <div className="service-modal__title-wrap">
            <h2 className="service-modal__title">{service.name}</h2>

            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "6px" }}>
              <span className="badge badge--category">{service.category}</span>
              {service.isFeatured && (
                <span className="badge badge--featured">⭐ Featured</span>
              )}
            </div>

            <div style={{ marginTop: "10px" }}>
              <StarRating
                rating={service.rating}
                reviews={service.totalReviews}
              />
            </div>
          </div>

          <button
            className="service-modal__close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* ── Modal Body ── */}
        <div className="service-modal__body">

          {/* Description */}
          <p style={{ fontSize: "14px", color: "var(--clr-text-2)", lineHeight: 1.75 }}>
            {service.description}
          </p>

          {/* Info Cards Row */}
          <div className="service-modal__info-row">
            <div className="info-card">
              <span className="info-card__value">
                {service.pricing?.isFree
                  ? "Free"
                  : `$${service.pricing?.consultationFee}`}
              </span>
              <div className="info-card__label">Consultation Fee</div>
            </div>
            <div className="info-card">
              <span className="info-card__value">{service.specialistsCount}+</span>
              <div className="info-card__label">Specialists</div>
            </div>
            <div className="info-card">
              <span className="info-card__value">{service.averageDuration}m</span>
              <div className="info-card__label">Avg Duration</div>
            </div>
          </div>

          {/* Features Grid */}
          {service.features?.length > 0 && (
            <>
              <p className="service-modal__section-title">What's Included</p>
              <div className="service-modal__features-grid">
                {service.features.map((feature, i) => (
                  <div key={i} className="modal-feature">
                    <div className="modal-feature__title">
                      <span style={{ color: "var(--clr-accent)" }}>✓</span>
                      {feature.title}
                    </div>
                    {feature.description && (
                      <p className="modal-feature__desc">{feature.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Availability */}
          {service.availability?.daysAvailable?.length > 0 && (
            <>
              <p className="service-modal__section-title">Availability</p>
              <div style={{ fontSize: "13px", color: "var(--clr-muted)", marginBottom: "10px" }}>
                {service.availability.startTime} – {service.availability.endTime}
              </div>
              <div className="service-modal__availability">
                {service.availability.daysAvailable.map((day) => (
                  <span key={day} className="day-chip">
                    {day.slice(0, 3)}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        {/* ── Modal CTA ── */}
        <div className="service-modal__cta">
          <button
            className="btn btn--primary"
            style={{ flex: 1 }}
            onClick={() => onBook(service)}
          >
            📅 Book Appointment
          </button>
          <button
            className="btn btn--outline"
            onClick={onClose}
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Pagination ─────────────────────────────────────────────────────────────────
const Pagination = ({ pagination, onPageChange }) => {
  if (!pagination || pagination.totalPages <= 1) return null;

  const { page, totalPages } = pagination;

  // Build page number array with ellipsis
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <nav className="pagination" aria-label="Pagination">
      {/* Prev */}
      <button
        className="pagination__btn"
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
      >
        ‹
      </button>

      {/* Page Numbers */}
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="pagination__ellipsis">
            …
          </span>
        ) : (
          <button
            key={p}
            className={`pagination__btn ${p === page ? "active" : ""}`}
            onClick={() => onPageChange(p)}
            aria-current={p === page ? "page" : undefined}
          >
            {p}
          </button>
        )
      )}

      {/* Next */}
      <button
        className="pagination__btn"
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        ›
      </button>
    </nav>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ══════════════════════════════════════════════════════════════════════════════
const Services = () => {
  const navigate = useNavigate();

  const [selectedService, setSelectedService] = useState(null);
  const [searchInput,     setSearchInput]     = useState("");

  const {
    services,
    categories,
    pagination,
    loading,
    error,
    params,
    updateParams,
    setPage,
  } = useServices({ limit: 9 });

  // ── Handlers ───────────────────────────────────────────────────────────────

  const handleSearch = useCallback(() => {
    updateParams({ search: searchInput.trim() || undefined });
  }, [searchInput, updateParams]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleCategoryFilter = useCallback(
    (cat) => updateParams({ category: cat === "All" ? undefined : cat }),
    [updateParams]
  );

  const handleBook = useCallback(
    (service) => navigate(`/doctors?service=${service.slug}`),
    [navigate]
  );

  const handleClearFilters = () => {
    setSearchInput("");
    updateParams({ search: undefined, category: undefined });
  };

  const handleModalBook = (service) => {
    setSelectedService(null);
    handleBook(service);
  };

  const activeCategory = params.category || "All";

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="services-page">

      {/* ════════════════════════════════════
          HERO SECTION
      ════════════════════════════════════ */}
      <section className="services-hero">
        <div className="services-hero__inner">

          {/* Badge */}
          <div className="services-hero__badge">
            <span className="services-hero__badge-dot" />
            Medical Excellence
          </div>

          {/* Title */}
          <h1 className="services-hero__title">
            Healthcare Services
            <br />
            <span>Designed for You</span>
          </h1>

          {/* Subtitle */}
          <p className="services-hero__sub">
            From routine check-ups to specialized care, our expert team delivers
            world-class medical services tailored to your individual needs.
          </p>

          {/* Search Bar */}
          <div className="services-search-wrap">
            <div className="services-search">
              <svg
                className="services-search__icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                className="services-search__input"
                type="text"
                placeholder="Search services — cardiology, pediatrics…"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                className="services-search__btn"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="services-hero__stats">
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className="stat-item">
                <span className="stat-item__value">{stat.value}</span>
                <span className="stat-item__label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════
          MAIN CONTENT
      ════════════════════════════════════ */}
      <main className="services-main">

        {/* ── Filter Bar ── */}
        <div className="services-filter-bar">

          {/* Category Chips */}
          <div className="services-filter-bar__categories">
            {categories.map((cat) => (
              <button
                key={cat._id}
                className={`filter-chip ${activeCategory === cat._id ? "active" : ""}`}
                onClick={() => handleCategoryFilter(cat._id)}
              >
                {cat._id}
                {cat.count && (
                  <span className="filter-chip__count">{cat.count}</span>
                )}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="services-filter-bar__sort">
            <span className="sort-label">Sort by</span>
            <select
              className="sort-select"
              value={params.sort || "sortOrder"}
              onChange={(e) => updateParams({ sort: e.target.value })}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ── Results Count ── */}
        {!loading && !error && (
          <div className="services-results-info">
            <p className="results-count">
              Showing{" "}
              <strong>{services.length}</strong>
              {pagination?.total ? ` of ${pagination.total}` : ""} services
              {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
              {params.search        ? ` for "${params.search}"` : ""}
            </p>
          </div>
        )}

        {/* ── Error State ── */}
        {error && (
          <div className="services-error">
            <span className="services-error__icon">⚠️</span>
            <h3 className="services-error__title">Unable to Load Services</h3>
            <p className="services-error__sub">{error}</p>
            <button
              className="btn btn--primary"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        )}

        {/* ── Services Grid ── */}
        {!error && (
          <div className="services-grid">
            {loading ? (
              /* Skeleton placeholders */
              Array.from({ length: 9 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))
            ) : services.length > 0 ? (
              /* Service cards */
              services.map((service) => (
                <ServiceCard
                  key={service._id}
                  service={service}
                  onViewDetail={setSelectedService}
                  onBook={handleBook}
                />
              ))
            ) : (
              /* Empty state */
              <div
                className="services-empty"
                style={{ gridColumn: "1 / -1" }}
              >
                <span className="services-empty__icon">🔍</span>
                <h3 className="services-empty__title">No Services Found</h3>
                <p className="services-empty__sub">
                  Try adjusting your search or filters to find what you're
                  looking for.
                </p>
                <button
                  className="btn btn--primary"
                  onClick={handleClearFilters}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── Pagination ── */}
        {!loading && !error && (
          <Pagination
            pagination={pagination}
            onPageChange={setPage}
          />
        )}

        {/* ── Bottom CTA Section ── */}
        <section className="services-cta">
          <div className="services-cta__content">
            <h2 className="services-cta__title">
              Can't find what you're looking for?
            </h2>
            <p className="services-cta__sub">
              Our care coordinators are here to help match you with the right
              specialist and service.
            </p>
            <div className="services-cta__actions">
              <button
                className="btn btn--cta-primary"
                onClick={() => navigate("/doctors")}
              >
                Browse All Doctors
              </button>
              <button
                className="btn btn--cta-ghost"
                onClick={() => navigate("/contact")}
              >
                Contact Us
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* ════════════════════════════════════
          DETAIL MODAL (conditional)
      ════════════════════════════════════ */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onBook={handleModalBook}
        />
      )}
    </div>
  );
};

export default Services;
