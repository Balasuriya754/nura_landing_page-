// components/Services.jsx
import { trackCtaClick } from '../lib/firebase';

const servicesGroups = [
  {
    title: 'Daily Support',
    items: [
      { icon: 'heart',  title: 'Assisted Daily Care',        desc: 'Scheduled visits for hygiene, mobility, and basic care' },
      { icon: 'pill',   title: 'Medication Support',         desc: 'Reminders and tracking to ensure medicines are taken on time' },
      { icon: 'phone',  title: 'Regular Well-being Check-ins', desc: 'Periodic calls or visits to stay updated on well-being' },
    ],
  },
  {
    title: 'Medical Support',
    items: [
      { icon: 'doctor',   title: 'Doctor Visits at Home',   desc: 'Arrange consultations at home based on availability' },
      { icon: 'activity', title: 'Physiotherapy',           desc: 'Guided sessions from certified professionals' },
      { icon: 'video',    title: 'Online Consultation',     desc: 'Connect with doctors remotely for quick medical advice' },
    ],
  },
  {
    title: 'Safety & Monitoring',
    items: [
      { icon: 'alert', title: '24/7 Emergency Support',   desc: 'Round-the-clock assistance coordination for urgent needs' },
      { icon: 'home',  title: 'Home Safety Guidance',     desc: 'Recommendations to make your home safer and reduce risks' },
      { icon: 'bell',  title: 'Well-being Alerts',        desc: "Get regular updates on your parents' well-being" },
    ],
  },
];

const ICONS = {
  heart:    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>,
  pill:     <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" /><path d="m8.5 8.5 7 7" /></svg>,
  phone:    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6.17-6.17 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>,
  doctor:   <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /><path d="M12 5 9.04 17h1.92L12 5Z" /></svg>,
  activity: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>,
  video:    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 8-6 4 6 4V8Z" /><rect width="14" height="12" x="2" y="6" rx="2" ry="2" /></svg>,
  alert:    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>,
  home:     <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
  bell:     <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>,
};

const Services = () => (
  <section className="services-section" id="services">
    <div className="section-header">
      <div className="section-tag">Everything Your Parents Need — In One Place</div>
      <h2 className="section-title">Complete Care for Your Parents — At Home</h2>
      <p className="section-sub">Flexible support based on your parents' needs — from daily assistance to medical help.</p>
      <div className="section-line" />
    </div>

    <div className="services-groups">
      {servicesGroups.map((group) => (
        <div className="services-group" key={group.title}>
          <h3 className="services-group-title">{group.title}</h3>
          <div className="services-grid-group">
            {group.items.map((item, i) => (
              <div className="service-card-icon" key={i}>
                <div className="svc-icon-wrap">{ICONS[item.icon]}</div>
                <div className="svc-body-icon">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>

    <div className="services-closing">
      <p>
        We take care of everything — with attention, coordination, and regular follow-ups.<br />
        <span className="services-closing-sub">So you can stay reassured.</span>
      </p>
      <a
        href="#consult-form"
        className="services-cta"
        onClick={() => trackCtaClick('services_section_cta_click')}
      >
        See How It Works →
      </a>
    </div>
  </section>
);

export default Services;