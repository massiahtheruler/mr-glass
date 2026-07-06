"use client";

import Image from "next/image";
import {
  ArrowRight,
  Car,
  CheckCircle2,
  Clock3,
  Home,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Upload,
  Wrench,
} from "lucide-react";
import { useMemo, useState } from "react";

const CONTACT = {
  phoneDisplay: "(201) 877-1720",
  phoneHref: "tel:+12018771720",
  email: "misterglass201@gmail.com",
  instagram: "misterglass201",
  facebook: "misterglass",
};

const INITIAL_FORM = {
  serviceType: "windshield-repair",
  jobContext: "",
  zipCode: "",
  urgency: "soon",
  contactName: "",
  phone: "",
  email: "",
  notes: "",
  photoPlaceholder: "",
};

const ESTIMATE_COPY = {
  "windshield-repair": {
    label: "Windshield repair",
    range: "$95 - $185",
    note: "Good fit for small chips, star breaks, and surface damage that has not spread too far.",
  },
  "auto-glass-replacement": {
    label: "Auto glass replacement",
    range: "$245 - $650",
    note: "Depends on vehicle model, glass location, sensors, tint, and calibration needs.",
  },
  "home-glass-repair": {
    label: "Home glass repair",
    range: "$175 - $850",
    note: "Depends on pane size, glass type, frame condition, access, and whether custom ordering is needed.",
  },
  "materials-custom": {
    label: "Materials or custom glass",
    range: "Requires confirmation",
    note: "Custom cuts, specialty materials, tempered glass, insulated units, and hardware need a direct quote.",
  },
};

const SERVICES = [
  {
    icon: Car,
    title: "Windshield Repair",
    image: "/images/services/windshield-damage.jpg",
    alt: "Cracked windshield needing repair",
    description:
      "Chip and crack repair for drivers who want the cleanest save before replacement becomes the only option.",
  },
  {
    icon: Wrench,
    title: "Auto Glass Replacement",
    image: "/images/services/auto-glass-replacement.jpg",
    alt: "Technician replacing an auto windshield",
    description:
      "Side glass, back glass, and windshield replacement with mobile service and clear scheduling.",
  },
  {
    icon: Home,
    title: "Home Glass Repair",
    image: "/images/services/home-window-replacement.jpg",
    alt: "Contractor replacing a home window",
    description:
      "Residential glass, windows, panes, and door glass repairs with room for custom material notes.",
  },
  {
    icon: Sparkles,
    title: "Materials & Custom Work",
    image: "/images/services/glass-cutting.jpg",
    alt: "Glazier cutting glass on a work table",
    description:
      "A flexible lane for tempered glass, specialty panes, measurements, and quote-only requests.",
  },
];

function GlassPanel({ children, className = "" }) {
  return <div className={`glass-panel ${className}`}>{children}</div>;
}

function GlassButton({
  children,
  href,
  type = "button",
  variant = "primary",
  className = "",
  onClick,
}) {
  const classes = `glass-button glass-button--${variant} ${className}`;

  if (href) {
    return (
      <a className={classes} href={href}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} type={type} onClick={onClick}>
      {children}
    </button>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand-lockup" href="#top" aria-label="Mister Glass home">
        <span className="brand-mark brand-mark--logo">
          <Image
            src="/images/brand/logos/nav-logo.png"
            alt=""
            width={426}
            height={282}
            priority
          />
        </span>
        <span>
          <strong>Mister Glass</strong>
          <small>Home & Auto Glass</small>
        </span>
      </a>

      <nav className="desktop-nav" aria-label="Primary navigation">
        <a href="#services">Services</a>
        <a href="#estimate">Estimate</a>
        <a href="#reviews">Reviews</a>
        <a href="#contact">Contact</a>
      </nav>

      <div className="header-actions">
        <a className="phone-link" href={CONTACT.phoneHref}>
          <Phone size={17} aria-hidden="true" />
          {CONTACT.phoneDisplay}
        </a>
        <GlassButton href="#estimate" className="header-cta">
          Request Estimate
        </GlassButton>
      </div>
    </header>
  );
}

function EstimateForm({ form, setForm, estimate, onSubmit, submitted }) {
  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  return (
    <GlassPanel className="estimate-card" id="estimate">
      <div className="estimate-heading">
        <p>Fast preliminary quote</p>
        <h2>Start the estimate</h2>
      </div>

      <form className="estimate-form" onSubmit={onSubmit}>
        <label>
          <span>Service type</span>
          <select
            value={form.serviceType}
            onChange={(event) => updateField("serviceType", event.target.value)}
          >
            <option value="windshield-repair">Windshield repair</option>
            <option value="auto-glass-replacement">Auto glass replacement</option>
            <option value="home-glass-repair">Home glass repair</option>
            <option value="materials-custom">Materials / custom glass</option>
          </select>
        </label>

        <label className="span-2">
          <span>Vehicle or home details</span>
          <input
            value={form.jobContext}
            onChange={(event) => updateField("jobContext", event.target.value)}
            placeholder="Year/make/model, window size, room, or glass issue"
          />
        </label>

        <label>
          <span>ZIP code</span>
          <input
            inputMode="numeric"
            value={form.zipCode}
            onChange={(event) => updateField("zipCode", event.target.value)}
            placeholder="07030"
          />
        </label>

        <label>
          <span>Urgency</span>
          <select
            value={form.urgency}
            onChange={(event) => updateField("urgency", event.target.value)}
          >
            <option value="today">Today if possible</option>
            <option value="soon">Next few days</option>
            <option value="scheduled">Scheduled job</option>
          </select>
        </label>

        <label>
          <span>Name</span>
          <input
            value={form.contactName}
            onChange={(event) => updateField("contactName", event.target.value)}
            placeholder="Your name"
          />
        </label>

        <label>
          <span>Phone</span>
          <input
            inputMode="tel"
            value={form.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            placeholder="Best callback number"
          />
        </label>

        <label>
          <span>Email</span>
          <input
            type="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            placeholder="Optional email"
          />
        </label>

        <label className="span-2">
          <span>Notes</span>
          <textarea
            value={form.notes}
            onChange={(event) => updateField("notes", event.target.value)}
            placeholder="Tell us what happened, what glass is damaged, and any timing details."
          />
        </label>

        <button
          className="upload-placeholder span-2"
          type="button"
          onClick={() => updateField("photoPlaceholder", "Photo upload noted")}
        >
          <Upload size={18} aria-hidden="true" />
          <span>
            Photo upload placeholder
            <small>
              {form.photoPlaceholder ||
                "Ready for the real upload step once storage is connected."}
            </small>
          </span>
        </button>

        <SoftEstimateRange estimate={estimate} />

        <GlassButton className="span-2 submit-button" type="submit">
          Send estimate request <ArrowRight size={18} aria-hidden="true" />
        </GlassButton>

        {submitted ? (
          <p className="success-message" role="status">
            <CheckCircle2 size={18} aria-hidden="true" />
            Request staged. The live email/database handoff can plug into
            /api/lead next.
          </p>
        ) : null}
      </form>
    </GlassPanel>
  );
}

function SoftEstimateRange({ estimate }) {
  return (
    <div className="soft-range span-2" aria-live="polite">
      <div>
        <span>Preliminary range</span>
        <strong>{estimate.range}</strong>
      </div>
      <p>
        <b>{estimate.label}:</b> {estimate.note}
      </p>
    </div>
  );
}

function ServiceCard({ service }) {
  const Icon = service.icon;

  return (
    <article className="service-card">
      <div className="service-image">
        <Image
          src={service.image}
          alt={service.alt}
          width={612}
          height={408}
          sizes="(max-width: 640px) 100vw, (max-width: 980px) 50vw, 25vw"
        />
      </div>
      <span className="service-icon">
        <Icon size={24} aria-hidden="true" />
      </span>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
    </article>
  );
}

function HeroMedia() {
  return (
    <div className="hero-media" aria-label="Mister Glass service preview">
      <div className="hero-image hero-image--main">
        <Image
          src="/images/services/windshield-install.jpg"
          alt="Technician handling windshield glass with suction cups"
          width={612}
          height={408}
          priority
          sizes="(max-width: 980px) 100vw, 46vw"
        />
      </div>
      <div className="hero-image hero-image--home">
        <Image
          src="/images/services/home-window-replacement.jpg"
          alt="Home window replacement service"
          width={612}
          height={502}
          sizes="(max-width: 980px) 48vw, 18vw"
        />
      </div>
      <div className="hero-image hero-image--glass">
        <Image
          src="/images/services/glass-sheets.jpg"
          alt="Stacks of glass sheets for custom glass work"
          width={612}
          height={408}
          sizes="(max-width: 980px) 48vw, 18vw"
        />
      </div>
      <GlassPanel className="hero-proof-card">
        <strong>Mobile glass service</strong>
        <span>Auto, home, and custom glass estimates with real job details.</span>
      </GlassPanel>
    </div>
  );
}

function LogoBanner() {
  return (
    <section className="logo-banner" id="reviews" aria-label="Mister Glass contact banner">
      <div className="banner-copy">
        <p>Current field identity</p>
        <h2>Known locally, getting a cleaner digital front door.</h2>
        <span>
          This banner keeps the existing business recognition while the new site
          carries the polished glass repair look.
        </span>
      </div>
      <div className="sticker-frame">
        <Image
          src="/images/mister-glass-sticker.jpg"
          alt="Mister Glass current logo sticker with phone, email, and social handles"
          width={1200}
          height={640}
          priority={false}
        />
      </div>
    </section>
  );
}

export default function HomePage() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  const estimate = useMemo(
    () => ESTIMATE_COPY[form.serviceType] || ESTIMATE_COPY["windshield-repair"],
    [form.serviceType],
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main id="top">
      <Header />

      <section className="hero-section">
        <div className="hero-copy">
          <h1>Windshield, Auto & Home Glass Repair That Comes To You</h1>
          <p>
            Fast mobile glass service, clear preliminary estimates, and a clean
            path from first call to confirmed repair.
          </p>

          <div className="hero-actions">
            <GlassButton href="#estimate">
              Get My Estimate <ArrowRight size={18} aria-hidden="true" />
            </GlassButton>
            <GlassButton href={CONTACT.phoneHref} variant="secondary">
              Call {CONTACT.phoneDisplay}
            </GlassButton>
          </div>
        </div>

        <HeroMedia />

        <div className="trust-row" aria-label="Service promises">
          <span>
            <ShieldCheck size={18} aria-hidden="true" /> Mobile service
          </span>
          <span>
            <Clock3 size={18} aria-hidden="true" /> Same-day friendly
          </span>
          <span>
            <MapPin size={18} aria-hidden="true" /> North Jersey area
          </span>
        </div>
      </section>

      <section className="estimate-section" aria-label="Estimate request form">
        <div className="estimate-intro">
          <p>Estimate request</p>
          <h2>Tell us what glass needs work and we’ll stage the quote.</h2>
          <span>
            The first screen stays clean. The form lives right underneath so the
            customer can commit once the service is clear.
          </span>
        </div>
        <EstimateForm
          form={form}
          setForm={setForm}
          estimate={estimate}
          onSubmit={handleSubmit}
          submitted={submitted}
        />
      </section>

      <section className="services-section" id="services">
        <div className="section-heading">
          <p>Services and materials</p>
          <h2>Room to list the exact services now, and refine pricing later.</h2>
        </div>
        <div className="services-grid">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </section>

      <section className="materials-section">
        <GlassPanel className="materials-panel">
          <div>
            <p>Estimate logic</p>
            <h2>Soft ranges first. Locked pricing when the job details are real.</h2>
          </div>
          <div className="materials-photo" aria-hidden="true">
            <Image
              src="/images/services/glass-sheets.jpg"
              alt=""
              width={612}
              height={408}
              sizes="(max-width: 980px) 100vw, 38vw"
            />
          </div>
          <div className="materials-list">
            <span>Tempered glass</span>
            <span>Door glass</span>
            <span>Side glass</span>
            <span>Back glass</span>
            <span>Insulated units</span>
            <span>Custom measurements</span>
          </div>
        </GlassPanel>
      </section>

      <LogoBanner />

      <section className="retention-section" id="contact">
        <GlassPanel className="retention-panel">
          <div>
            <p>Retention</p>
            <h2>Follow up after the estimate, not after they forget.</h2>
            <span>
              Capture email or phone for quote updates, service reminders,
              review requests, and seasonal glass check-ins once the real lead
              system is connected.
            </span>
          </div>
          <form className="retention-form">
            <input aria-label="Email or phone" placeholder="Email or phone for follow-up" />
            <GlassButton type="button">Keep me posted</GlassButton>
          </form>
        </GlassPanel>
      </section>

      <footer className="site-footer">
        <strong>Mister Glass</strong>
        <div>
          <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          <span>IG: @{CONTACT.instagram}</span>
          <span>FB: {CONTACT.facebook}</span>
        </div>
      </footer>
    </main>
  );
}
