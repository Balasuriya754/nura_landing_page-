import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function TermsAndConditions() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div style={styles.page}>
      <div style={styles.topBar}>
        <Link to="/" style={styles.backLink}>← Back to SixtyPlus Global</Link>
      </div>
      <div style={styles.container}>
        <div style={styles.docHeader}>
          <p style={styles.docMeta}>Effective Date: 9 April 2026</p>
          <h1 style={styles.docTitle}>Terms &amp; Conditions</h1>
          <p style={styles.docIntro}>
            These Terms &amp; Conditions ("Terms") govern your access to and use of the website, mobile interfaces, communication channels, and services made available by SixtyPlus Global ("SixtyPlus," "we," "us," or "our").
          </p>
          <p style={styles.docIntro}>
            By accessing our website, booking a service, making a payment, registering an account, subscribing to a plan, or otherwise using our services, you agree to be bound by these Terms, our Privacy Policy, and our Cancellation, Rescheduling &amp; Refund Policy. If you do not agree, do not use our website or services.
          </p>
          <div style={styles.divider} />
        </div>

        <Section title="1. About Us">
          <p>SixtyPlus Global provides senior care support, care coordination, wellness support services, and, where applicable, facilitation and scheduling of consultations, visits, assessments, or related support services through our internal team and/or independent partner professionals and service providers.</p>
          <div style={styles.contactBox}>
            <p style={styles.contactLine}><strong>Registered Business Name:</strong> SixtyPlus Global (Part of Nura AI Labs)</p>
            <p style={styles.contactLine}><strong>Registered Address:</strong> Chennai, Tamil Nadu – 600028, India</p>
            <p style={styles.contactLine}><strong>Email:</strong> <a href="mailto:info@sixtyplusglobal.com" style={styles.link}>info@sixtyplusglobal.com</a></p>
            <p style={styles.contactLine}><strong>Phone:</strong> <a href="tel:+919499944939" style={styles.link}>+91 94999 44939</a></p>
          </div>
        </Section>

        <Section title="2. Eligibility">
          <p>You may use our website and services only if:</p>
          <ul style={styles.list}>
            <li>you are at least 18 years old and legally capable of entering into a binding contract; or</li>
            <li>you are using the services on behalf of a patient, family member, dependent, or another person with valid authority to do so.</li>
          </ul>
          <p>You agree that all information provided by you is true, complete, and up to date.</p>
        </Section>

        <Section title="3. Scope of Services">
          <p>SixtyPlus may offer, directly or through partner providers, services including but not limited to:</p>
          <ul style={styles.list}>
            <li>senior care support and coordination</li>
            <li>home visit coordination</li>
            <li>consultations, assessments, and wellness support</li>
            <li>care plans, subscriptions, or service packages</li>
            <li>appointment scheduling and related support services</li>
          </ul>
          <p>The exact nature, scope, timing, pricing, and availability of services may vary by city, provider availability, patient condition, service category, and operational constraints.</p>
          <p>Nothing on the website shall be interpreted as a guarantee that every listed service is available at all times or in all locations.</p>
        </Section>

        <Section title="4. No Emergency Service">
          <p>Our platform and services are <strong>not emergency services</strong>. If you believe a patient is experiencing a medical emergency, immediately contact local emergency services or go to the nearest hospital.</p>
        </Section>

        <Section title="5. Independent Professional Judgment">
          <p>Where services are rendered by doctors, nurses, therapists, care staff, diagnostic providers, or other professionals, such professionals remain responsible for their own professional judgment, advice, and conduct within the scope of applicable law and professional standards.</p>
          <p>SixtyPlus may facilitate scheduling, coordination, communication, collection, and support, but does not override or control the independent medical or professional judgment of licensed providers.</p>
        </Section>

        <Section title="6. User Responsibilities">
          <p><strong>You agree to:</strong></p>
          <ul style={styles.list}>
            <li>provide accurate patient, booking, and contact information</li>
            <li>disclose material facts relevant to service delivery</li>
            <li>ensure that the patient and/or authorized representative is available at the scheduled time</li>
            <li>maintain respectful conduct toward our staff, partner providers, and support teams</li>
            <li>comply with all instructions reasonably required for safe service delivery</li>
            <li>use the website and services only for lawful purposes</li>
          </ul>
          <p><strong>You must not:</strong></p>
          <ul style={styles.list}>
            <li>misuse the platform</li>
            <li>submit false or misleading information</li>
            <li>interfere with platform security or functionality</li>
            <li>make fraudulent bookings or payments</li>
            <li>use abusive, threatening, defamatory, or unlawful language or conduct toward our staff or providers</li>
          </ul>
        </Section>

        <Section title="7. Bookings and Service Requests">
          <p>A booking or service request is treated as confirmed only after:</p>
          <ul style={styles.list}>
            <li>required information has been received,</li>
            <li>applicable payment or authorization has been completed, and</li>
            <li>we issue a confirmation by website, app, email, SMS, WhatsApp, phone, or other official communication channel.</li>
          </ul>
          <p>We reserve the right to decline, reschedule, modify, or cancel a booking where necessary due to provider unavailability, incomplete information, operational limitations, safety concerns, suspected fraud, legal restrictions, force majeure events, or other legitimate reasons.</p>
        </Section>

        <Section title="8. Pricing">
          <p>All prices displayed on the website or otherwise communicated by us are in <strong>Indian Rupees </strong> or <strong>USD</strong> unless expressly stated otherwise.</p>
          <p>Pricing may vary depending on:</p>
          <ul style={styles.list}>
            <li>service type</li>
            <li>duration</li>
            <li>location</li>
            <li>provider category</li>
            <li>urgency</li>
            <li>add-on services</li>
            <li>taxes and statutory levies</li>
            <li>subscription plan or package terms</li>
          </ul>
          <p>Applicable taxes, government levies, platform fees, or convenience fees, if any, will be disclosed at or before checkout.</p>
        </Section>

        <Section title="9. Payments">
          <p>Payments may be collected through third-party payment gateways, banking partners, UPI, cards, net banking, links, recurring mandates, or other approved payment methods.</p>
          <p><strong>By making a payment, you:</strong></p>
          <ul style={styles.list}>
            <li>authorize the applicable payment transaction</li>
            <li>confirm that you are legally entitled to use the chosen payment instrument</li>
            <li>agree to pay all charges, taxes, and applicable fees disclosed at checkout or otherwise agreed with us</li>
          </ul>
          <p>Payment authorization does not by itself guarantee service completion. Service remains subject to confirmation, provider availability, and these Terms.</p>
        </Section>

        <Section title="10. Recurring Plans and Auto-Renewals">
          <p>If you enroll in a recurring subscription, membership, package, or auto-renewal plan:</p>
          <ul style={styles.list}>
            <li>you authorize us or our payment partner to charge the recurring amount as disclosed at sign-up</li>
            <li>the billing frequency, plan benefits, and renewal terms will be displayed at the time of subscription</li>
            <li>you may cancel future renewals before the next billing date in accordance with the applicable plan rules</li>
            <li>cancellation of auto-renewal prevents future billing but does not automatically entitle you to a refund for the current billing cycle unless expressly stated in the applicable refund policy or required by law</li>
          </ul>
        </Section>

        <Section title="11. Cancellation, Rescheduling, and Refunds">
          <p>All cancellations, rescheduling requests, failed service cases, duplicate payments, and refunds are governed by our Cancellation, Rescheduling &amp; Refund Policy, which forms an integral part of these Terms.</p>
        </Section>

        <Section title="12. Service Fulfilment and Timelines">
          <p>Service timing is subject to operational conditions, provider availability, location, patient readiness, traffic, weather, and unforeseen events. Any time slot or ETA is an estimate unless explicitly guaranteed in writing.</p>
          <p>We will make commercially reasonable efforts to deliver services within the confirmed slot or revised slot communicated to you.</p>
        </Section>

        <Section title="13. Third-Party Providers and Tools">
          <p>Our services may involve third-party providers, communication channels, software tools, logistics support, diagnostic partners, payment gateways, or other service partners. We are not responsible for the independent policies, systems, downtime, or acts/omissions of third parties except to the extent required by law.</p>
        </Section>

        <Section title="14. Accuracy of Website Information">
          <p>We try to ensure that all information on the website is accurate and current. However, website content may contain errors, omissions, or outdated information relating to services, pricing, availability, or descriptions. We reserve the right to correct, update, suspend, or withdraw content or services without prior notice.</p>
        </Section>

        <Section title="15. Intellectual Property">
          <p>All content on the website, including text, graphics, logos, designs, service marks, software, media, and brand elements, is owned by or licensed to SixtyPlus and is protected by applicable intellectual property laws.</p>
          <p>You may not copy, reproduce, distribute, modify, reverse engineer, publish, or commercially exploit any content without our prior written permission.</p>
        </Section>

        <Section title="16. Privacy">
          <p>Your use of the website and services is also governed by our Privacy Policy. By using our services, you consent to the collection, use, storage, and disclosure of information as described in that policy.</p>
        </Section>

        <Section title="17. Disclaimers">
          <p>To the fullest extent permitted by law:</p>
          <ul style={styles.list}>
            <li>the website and services are provided on an "as is" and "as available" basis</li>
            <li>we do not guarantee uninterrupted, error-free, or always-available service</li>
            <li>we do not guarantee that every service will be suitable for every user or patient</li>
            <li>informational content on the website is for general informational purposes only and does not replace a direct professional evaluation where required</li>
          </ul>
        </Section>

        <Section title="18. Limitation of Liability">
          <p>To the fullest extent permitted by law, SixtyPlus, its affiliates, directors, officers, employees, contractors, agents, and partners shall not be liable for any indirect, incidental, special, consequential, punitive, or exemplary damages, including loss of profits, loss of data, business interruption, or loss arising out of or related to:</p>
          <ul style={styles.list}>
            <li>use or inability to use the website or services</li>
            <li>delays, rescheduling, or service interruptions</li>
            <li>actions or omissions of independent third-party providers</li>
            <li>unauthorized access, system failures, or third-party technical issues</li>
          </ul>
          <p>Nothing in these Terms excludes liability that cannot be excluded under applicable law.</p>
        </Section>

        <Section title="19. Indemnity">
          <p>You agree to indemnify and hold harmless SixtyPlus, its affiliates, personnel, and partners from claims, liabilities, losses, damages, costs, and expenses arising out of:</p>
          <ul style={styles.list}>
            <li>your breach of these Terms</li>
            <li>false information submitted by you</li>
            <li>your misuse of the website or services</li>
            <li>your violation of applicable law or third-party rights</li>
          </ul>
        </Section>

        <Section title="20. Suspension or Termination">
          <p>We may suspend, restrict, or terminate access to the website or services, or refuse a booking or user, at our discretion, where we reasonably believe there is:</p>
          <ul style={styles.list}>
            <li>fraud or payment risk</li>
            <li>abuse or misuse</li>
            <li>legal or compliance risk</li>
            <li>safety risk</li>
            <li>repeated cancellation or operational disruption</li>
            <li>breach of these Terms</li>
          </ul>
        </Section>

        <Section title="21. Force Majeure">
          <p>We shall not be liable for failure or delay caused by events beyond our reasonable control, including natural disasters, strikes, disease outbreaks, provider disruptions, transport failures, internet outages, government action, civil unrest, or other force majeure events.</p>
        </Section>

        <Section title="22. Governing Law and Jurisdiction">
          <p>These Terms shall be governed by the laws of India. Subject to applicable law, courts located in Chennai, Tamil Nadu shall have exclusive jurisdiction over disputes arising out of or relating to these Terms or our services.</p>
        </Section>

        <Section title="23. Changes to These Terms">
          <p>We may update these Terms from time to time. The revised version will be posted on this page with the updated effective date. Continued use of the website or services after such update constitutes acceptance of the revised Terms.</p>
        </Section>

        <Section title="24. Contact Us">
          <p>For questions, complaints, cancellations, support requests, or legal notices, contact:</p>
          <div style={styles.contactBox}>
            <p style={styles.contactLine}><strong>SixtyPlus Global</strong></p>
            <p style={styles.contactLine}>Chennai, Tamil Nadu – 600028, India</p>
            <p style={styles.contactLine}>Email: <a href="mailto:info@sixtyplusglobal.com" style={styles.link}>info@sixtyplusglobal.com</a></p>
            <p style={styles.contactLine}>Phone: <a href="tel:+919499944939" style={styles.link}>+91 94999 44939</a></p>
          </div>
        </Section>

        <div style={styles.footer}>
          <p>© 2026 SixtyPlus Global. All rights reserved.</p>
          <div style={styles.footerLinks}>
            <Link to="/privacy-policy" style={styles.footerLink}>Privacy Policy</Link>
            <Link to="/cancellation-refund-policy" style={styles.footerLink}>Cancellation & Refund</Link>
            <Link to="/service-fulfilment-policy" style={styles.footerLink}>Service Fulfilment</Link>
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
    margin: 0,
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
    gap: '24px',
  },
  footerLink: {
    color: '#555',
    textDecoration: 'none',
    fontSize: '12px',
  },
};