import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ServiceFulfilmentPolicy() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div style={styles.page}>
      <div style={styles.topBar}>
        <Link to="/" style={styles.backLink}>← Back to SixtyPlus Global</Link>
      </div>
      <div style={styles.container}>
        <div style={styles.docHeader}>
          <p style={styles.docMeta}>Effective Date: 9 April 2026</p>
          <h1 style={styles.docTitle}>Service Fulfilment Policy</h1>
          <p style={styles.docIntro}>
            SixtyPlus Global provides senior care support, coordinated services, and related support offerings directly and/or through partner professionals and providers.
          </p>
          <div style={styles.divider} />
        </div>

        <Section title="1. Booking Confirmation">
          <p>A service request is treated as confirmed only after:</p>
          <ul style={styles.list}>
            <li>we receive the required details,</li>
            <li>applicable payment or authorization is completed, and</li>
            <li>a confirmation is sent by email, SMS, WhatsApp, phone, or another official channel</li>
          </ul>
        </Section>

        <Section title="2. Service Windows">
          <p>Service times are scheduled based on provider availability, city coverage, patient requirements, and operational conditions. Any timeline communicated before final confirmation is indicative only.</p>
        </Section>

        <Section title="3. Location Coverage">
          <p>Service availability may vary by city, locality, distance, and partner availability. Some services may be restricted to selected serviceable pin codes or cities.</p>
        </Section>

        <Section title="4. Delivery of Service">
          <p>Depending on the service booked, fulfilment may include:</p>
          <ul style={styles.list}>
            <li>appointment scheduling</li>
            <li>home visit coordination</li>
            <li>consultation coordination</li>
            <li>assessment or support visits</li>
            <li>care program activation</li>
            <li>support follow-up and related coordination</li>
          </ul>
        </Section>

        <Section title="5. Delays and Reassignment">
          <p>We may need to delay, reassign, or reschedule a service due to weather, traffic, provider availability, patient condition, force majeure, safety concerns, or other operational reasons. Where reasonably possible, we will inform you promptly.</p>
        </Section>

        <Section title="6. Customer Cooperation">
          <p>Timely fulfilment requires accurate address details, patient readiness, and reasonable access to the location. Delays caused by incorrect or incomplete customer-side information may affect service delivery and refund eligibility.</p>
        </Section>

        <Section title="7. Proof of Fulfilment">
          <p>Fulfilment may be evidenced by booking confirmations, provider assignment logs, call records, service notes, timestamps, invoices, payment records, visit confirmation, or communication records.</p>
        </Section>

        <Section title="8. Support">
          <p>For fulfilment-related support, contact:</p>
          <div style={styles.contactBox}>
            <p style={styles.contactLine}><strong>Email:</strong> <a href="mailto:info@sixtyplusglobal.com" style={styles.link}>info@sixtyplusglobal.com</a></p>
            <p style={styles.contactLine}><strong>Phone / WhatsApp:</strong> <a href="tel:+919499944939" style={styles.link}>+91 94999 44939</a></p>
          </div>
        </Section>

        <div style={styles.footer}>
          <p>© 2026 SixtyPlus Global. All rights reserved.</p>
          <div style={styles.footerLinks}>
            <Link to="/terms-and-conditions" style={styles.footerLink}>Terms &amp; Conditions</Link>
            <Link to="/privacy-policy" style={styles.footerLink}>Privacy Policy</Link>
            <Link to="/cancellation-refund-policy" style={styles.footerLink}>Cancellation &amp; Refund</Link>
            <Link to="/" style={styles.footerLink}>Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={styles.section}>
      <h2 style={styles.sectionTitle}>{title}</h2>
      <div style={styles.sectionBody}>{children}</div>
    </div>
  );
}

const styles = {
  page: {
    backgroundColor: '#ffffff',
    minHeight: '100vh',
    fontFamily: "'Georgia', 'Times New Roman', serif",
    color: '#111111',
  },
  topBar: {
    borderBottom: '1px solid #e0e0e0',
    padding: '14px 40px',
    backgroundColor: '#fafafa',
  },
  backLink: {
    fontSize: '13px',
    color: '#444',
    textDecoration: 'none',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    letterSpacing: '0.01em',
  },
  container: {
    maxWidth: '760px',
    margin: '0 auto',
    padding: '56px 24px 80px',
  },
  docHeader: {
    marginBottom: '48px',
  },
  docMeta: {
    fontSize: '12px',
    color: '#888',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    marginBottom: '12px',
  },
  docTitle: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#000',
    margin: '0 0 18px 0',
    letterSpacing: '-0.5px',
    lineHeight: 1.15,
  },
  docIntro: {
    fontSize: '15px',
    color: '#444',
    lineHeight: 1.75,
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    marginBottom: '12px',
  },
  divider: {
    borderTop: '2px solid #111',
    width: '48px',
    marginTop: '4px',
  },
  section: {
    marginBottom: '40px',
    paddingBottom: '40px',
    borderBottom: '1px solid #ebebeb',
  },
  sectionTitle: {
    fontSize: '13px',
    fontWeight: '700',
    color: '#000',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: '14px',
  },
  sectionBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  list: {
    paddingLeft: '20px',
    margin: '4px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '7px',
  },
  contactBox: {
    border: '1px solid #ddd',
    borderRadius: '6px',
    padding: '18px 22px',
    marginTop: '10px',
    backgroundColor: '#fafafa',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  contactLine: {
    fontSize: '14px',
    color: '#333',
    margin: '3px 0',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
  },
  link: {
    color: '#111',
    textDecoration: 'underline',
  },
  footer: {
    marginTop: '60px',
    paddingTop: '24px',
    borderTop: '1px solid #ddd',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: '12px',
    color: '#999',
  },
  footerLinks: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  footerLink: {
    color: '#555',
    textDecoration: 'none',
    fontSize: '12px',
  },
};