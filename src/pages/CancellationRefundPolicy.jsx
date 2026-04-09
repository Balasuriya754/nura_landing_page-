import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CancellationRefundPolicy() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div style={styles.page}>
      <div style={styles.topBar}>
        <Link to="/" style={styles.backLink}>← Back to SixtyPlus Global</Link>
      </div>
      <div style={styles.container}>
        <div style={styles.docHeader}>
          <p style={styles.docMeta}>Effective Date: 9 April 2026</p>
          <h1 style={styles.docTitle}>Cancellation, Rescheduling &amp; Refund Policy</h1>
          <p style={styles.docIntro}>
            This Cancellation, Rescheduling &amp; Refund Policy applies to all bookings, consultations, visits, subscriptions, packages, support services, and payments made to SixtyPlus Global through our website, links, invoices, payment gateway, support team, or authorized communication channels.
          </p>
          <p style={styles.docIntro}>
            By making a booking or payment, you agree to this Policy.
          </p>
          <div style={styles.divider} />
        </div>

        <Section title="1. General Principles">
          <p>We aim to provide fair and transparent cancellation and refund handling. Refund outcomes depend on:</p>
          <ul style={styles.list}>
            <li>the nature of the service booked</li>
            <li>whether the service was scheduled, assigned, or already initiated</li>
            <li>whether a provider was dispatched or time was reserved</li>
            <li>whether the request concerns duplicate payment, technical failure, provider unavailability, or customer cancellation</li>
            <li>applicable law and payment partner rules</li>
          </ul>
        </Section>

        <Section title="2. Rescheduling by Customer">
          <p>Customers may request a reschedule by contacting us through our official support channels.</p>

          <h3 style={styles.subsectionTitle}>Standard rule</h3>
          <ul style={styles.list}>
            <li><strong>Reschedule request made at least 6 hours before the scheduled service time:</strong> one reschedule is permitted at no additional charge, subject to provider availability.</li>
            <li><strong>Reschedule request made less than 6 hours before the scheduled service time:</strong> rescheduling may be permitted subject to operational feasibility and may attract an administrative or provider-blocking charge, if disclosed at the time of confirmation.</li>
          </ul>
          <p>Where the service is urgent, same-day, or on-demand, rescheduling is always subject to availability.</p>
        </Section>

        <Section title="3. Cancellation by Customer">
          <h3 style={styles.subsectionTitle}>A. Cancellation at least 6 hours before the scheduled service time</h3>
          <p>If you cancel at least 6 hours before the confirmed service time, you are eligible for:</p>
          <ul style={styles.list}>
            <li>a full refund, or</li>
            <li>one no-cost reschedule, if preferred by you and operationally feasible</li>
          </ul>

          <h3 style={styles.subsectionTitle}>B. Cancellation less than 6 hours before the scheduled service time</h3>
          <p>If you cancel less than 6 hours before the confirmed service time but before service commencement, you are eligible for:</p>
          <ul style={styles.list}>
            <li>a 50% refund, and</li>
            <li>the remaining amount may be retained toward administrative, coordination, and provider allocation costs</li>
          </ul>

          <h3 style={styles.subsectionTitle}>C. Cancellation after service commencement or provider dispatch</h3>
          <p>If the service has already commenced, or if a provider has already been dispatched to the service location, no refund will ordinarily be available, except where required by law or where we determine that the service could not be delivered due to reasons solely attributable to us.</p>

          <h3 style={styles.subsectionTitle}>D. No-show / Patient unavailable / Access denied</h3>
          <p>No refund will ordinarily be available if:</p>
          <ul style={styles.list}>
            <li>the patient or authorized contact is unavailable at the scheduled time</li>
            <li>the address or access details provided are materially incorrect</li>
            <li>the provider is unable to render the booked service because access was denied or conditions at the location made delivery impossible despite reasonable efforts</li>
          </ul>
        </Section>

        <Section title="4. Cancellation by SixtyPlus">
          <p>If we cancel a confirmed booking due to provider unavailability, operational inability, internal error, location constraints, or other reasons attributable to us, you will be offered:</p>
          <ul style={styles.list}>
            <li>a full refund, or</li>
            <li>a rescheduled slot, at your choice, subject to availability</li>
          </ul>
        </Section>

        <Section title="5. Service Not Delivered / Material Service Failure">
          <p>You may be eligible for a full or partial refund if:</p>
          <ul style={styles.list}>
            <li>a confirmed service was not delivered at all for reasons attributable to us</li>
            <li>the wrong service was delivered due to our clear operational error</li>
            <li>there was duplicate billing</li>
            <li>a payment was captured but the booking was not confirmed and no service was provided</li>
            <li>there was a demonstrable technical or processing error resulting in wrongful charge</li>
          </ul>
          <p>Refunds for dissatisfaction that do not involve non-delivery or material service failure are assessed case by case, but are not automatic.</p>
        </Section>

        <Section title="6. Subscription Plans / Packages">
          <p>If you are enrolled in a subscription, care plan, or package:</p>
          <ul style={styles.list}>
            <li>you may cancel future renewals at any time before the next billing date</li>
            <li>cancellation stops future billing but does not automatically entitle you to a refund for the current billing cycle</li>
            <li>amounts for already-consumed services, completed visits, used credits, or elapsed subscription periods are non-refundable unless otherwise required by law</li>
            <li>where a package is partially used, any refund may be adjusted for services already consumed, benefits already availed, taxes, gateway charges where legally permissible, and non-recoverable third-party costs</li>
          </ul>
        </Section>

        <Section title="7. Non-Refundable Items">
          <p>Unless required by law or expressly approved by us, the following are ordinarily non-refundable once incurred or consumed:</p>
          <ul style={styles.list}>
            <li>completed consultations or visits</li>
            <li>provider dispatch costs after dispatch</li>
            <li>charges for services already rendered</li>
            <li>charges relating to no-show or failed customer-side access</li>
            <li>taxes or statutory levies already remitted, where not recoverable</li>
            <li>any clearly disclosed non-refundable administrative or convenience fee</li>
          </ul>
        </Section>

        <Section title="8. Duplicate / Failed / Pending Payments">
          <h3 style={styles.subsectionTitle}>Duplicate payment</h3>
          <p>If the same transaction is charged more than once for the same order or booking, the excess amount will be refunded after verification.</p>

          <h3 style={styles.subsectionTitle}>Failed payment with debit</h3>
          <p>If your bank account is debited but the booking is not confirmed, the amount may either:</p>
          <ul style={styles.list}>
            <li>be automatically reversed by the bank/payment network, or</li>
            <li>be refunded after reconciliation and verification</li>
          </ul>
        </Section>

        <Section title="9. How to Request a Cancellation or Refund">
          <p>To request cancellation, rescheduling, or refund, contact:</p>
          <div style={styles.contactBox}>
            <p style={styles.contactLine}><strong>Email:</strong> <a href="mailto:info@sixtyplusglobal.com" style={styles.link}>info@sixtyplusglobal.com</a></p>
            <p style={styles.contactLine}><strong>Phone / WhatsApp:</strong> <a href="tel:+919499944939" style={styles.link}>+91 94999 44939</a></p>
          </div>
          <p>Please include:</p>
          <ul style={styles.list}>
            <li>customer name</li>
            <li>patient name, if different</li>
            <li>booking ID / order ID / invoice number</li>
            <li>payment date and amount</li>
            <li>registered mobile number / email</li>
            <li>reason for cancellation or refund request</li>
            <li>supporting screenshots or proof, if relevant</li>
          </ul>
        </Section>

        <Section title="10. Refund Processing Timelines">
          <p>Where a refund is approved:</p>
          <ul style={styles.list}>
            <li>we aim to initiate the refund within 3 business days of approval and verification</li>
            <li>once initiated, the refund typically reflects in the original payment source within 5 to 10 working days, depending on the payment mode, issuing bank, and payment network</li>
          </ul>
          <p>Refunds will generally be credited back to the original payment instrument unless otherwise required by law or specifically agreed by us.</p>
        </Section>

        <Section title="11. Abuse Prevention">
          <p>We reserve the right to deny refund or rescheduling requests that are fraudulent, abusive, repetitive, inconsistent with records, or otherwise violate our Terms &amp; Conditions.</p>
        </Section>

        <Section title="12. Chargebacks and Payment Disputes">
          <p>We encourage customers to contact us first for a faster resolution of cancellation, refund, or service issues. Initiating a chargeback without first seeking resolution may delay final settlement while the dispute is reviewed by the payment ecosystem.</p>
        </Section>

        <Section title="13. Policy Changes">
          <p>We may update this Policy from time to time. The updated version will be posted on our website with the revised effective date.</p>
        </Section>

        <Section title="14. Contact">
          <div style={styles.contactBox}>
            <p style={styles.contactLine}><strong>SixtyPlus Global</strong></p>
            <p style={styles.contactLine}>Chennai, Tamil Nadu – 600028, India</p>
            <p style={styles.contactLine}>Email: <a href="mailto:info@sixtyplusglobal.com" style={styles.link}>info@sixtyplusglobal.com</a></p>
            <p style={styles.contactLine}>Phone / WhatsApp: <a href="tel:+919499944939" style={styles.link}>+91 94999 44939</a></p>
          </div>
        </Section>

        <div style={styles.footer}>
          <p>© 2026 SixtyPlus Global. All rights reserved.</p>
          <div style={styles.footerLinks}>
            <Link to="/terms-and-conditions" style={styles.footerLink}>Terms &amp; Conditions</Link>
            <Link to="/privacy-policy" style={styles.footerLink}>Privacy Policy</Link>
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
  subsectionTitle: {
    fontSize: '15px',
    fontWeight: '700',
    color: '#000',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    marginTop: '18px',
    marginBottom: '8px',
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
    gap: '16px',
  },
  footerLink: {
    color: '#555',
    textDecoration: 'none',
    fontSize: '12px',
  },
};