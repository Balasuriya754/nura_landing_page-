import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicyPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div style={styles.page}>
      <div style={styles.topBar}>
        <Link to="/" style={styles.backLink}>← Back to SixtyPlus Global</Link>
      </div>
      <div style={styles.container}>
        <div style={styles.docHeader}>
          <p style={styles.docMeta}>SixtyPlus Global &nbsp;·&nbsp; Effective Date: January 1, 2025</p>
          <h1 style={styles.docTitle}>Privacy Policy</h1>
          <p style={styles.docIntro}>
            Your privacy matters to us. This Privacy Policy explains how SixtyPlus Global collects,
            uses, discloses, and safeguards your information when you visit our website or use our services.
            Please read this policy carefully.
          </p>
          <div style={styles.divider} />
        </div>

        <Section title="1. Information We Collect">
          <p>When you purchase something from us or fill out a consultation form, as part of that process, we collect the personal information you give us such as your name, address, phone number and email address.</p>
          <p>When you browse our site, we also automatically receive your computer's internet protocol (IP) address in order to provide us with information that helps us learn about your browser and operating system.</p>
          <p>With your permission, we may send you emails about our services, care programmes and other updates.</p>
        </Section>

        <Section title="2. How We Use Your Information">
          <p>We use the information we collect in the following ways:</p>
          <ul style={styles.list}>
            <li>To process your enquiries and consultation requests</li>
            <li>To provide and improve our senior care services</li>
            <li>To communicate with you about your account, care plan, or enquiry</li>
            <li>To send you information about our services, if you have opted in</li>
            <li>To comply with applicable laws and regulations</li>
          </ul>
        </Section>

        <Section title="3. Consent">
          <p>When you provide us with personal information to complete a transaction, verify your payment, place an order, or request a service, we imply that you consent to our collecting it and using it for that specific reason only. If we ask for your personal information for a secondary reason, like marketing, we will either ask you directly for your expressed consent, or provide you with an opportunity to opt out.</p>
          <p><strong>How to withdraw consent:</strong> If after you opt-in, you change your mind, you may withdraw your consent for us to contact you, for the continued collection, use or disclosure of your information, at any time, by contacting us at <a href="mailto:info@sixtyplusglobal.com" style={styles.link}>info@sixtyplusglobal.com</a>.</p>
        </Section>

        <Section title="4. Disclosure of Information">
          <p>We may disclose your personal information if we are required by law to do so or if you violate our Terms of Service.</p>
          <p>In general, the third-party providers used by us will only collect, use and disclose your information to the extent necessary to allow them to perform the services they provide to us. However, certain third-party service providers, such as payment gateways and other payment transaction processors, have their own privacy policies in respect to the information we are required to provide to them for your purchase-related transactions.</p>
          <p>For these providers, we recommend that you read their privacy policies so you can understand the manner in which your personal information will be handled. Certain providers may be located in or have facilities in a different jurisdiction than either you or us, and your information may become subject to the laws of that jurisdiction.</p>
          <p>Once you leave our website or are redirected to a third-party website or application, you are no longer governed by this Privacy Policy or our website's Terms of Service.</p>
        </Section>

        <Section title="5. Analytics">
          <p>Our site uses Google Analytics to help us learn about site visits and the pages being viewed. Google Analytics collects data about your use of our site in an anonymised form. This data includes pages visited, time spent, and general location. You can opt out of Google Analytics tracking by using the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={styles.link}>Google Analytics opt-out browser add-on</a>.</p>
        </Section>

        <Section title="6. Security">
          <p>To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered or destroyed.</p>
          <p>If you provide us with your payment information, the information is encrypted using secure socket layer technology (SSL). Although no method of transmission over the Internet or electronic storage is 100% secure, we follow all applicable requirements and implement additional generally accepted industry standards.</p>
        </Section>

        <Section title="7. Cookies">
          <p>We use cookies to maintain session information and to improve your browsing experience. You can choose to disable cookies through your individual browser options. If you disable cookies, some features of our site may not function properly.</p>
          <p>By using our website, you agree to allow third parties to process your IP address, in order to determine your location for the purpose of currency conversion and relevant service display. You also agree to have that data stored in a session cookie in your browser (a temporary cookie which gets automatically removed when you close your browser).</p>
        </Section>

        <Section title="8. Age of Consent">
          <p>By using this site, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.</p>
        </Section>

        <Section title="9. Changes to This Privacy Policy">
          <p>We reserve the right to modify this privacy policy at any time, so please review it frequently. Changes and clarifications will take effect immediately upon their posting on the website. If we make material changes to this policy, we will notify you here that it has been updated, so that you are aware of what information we collect, how we use it, and under what circumstances, if any, we use and/or disclose it.</p>
          <p>If our company is acquired or merged with another company, your information may be transferred to the new owners so that we may continue to provide services to you.</p>
        </Section>

        <Section title="10. Your Rights">
          <p>You have the right to:</p>
          <ul style={styles.list}>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate personal information</li>
            <li>Request deletion of your personal information, subject to legal obligations</li>
            <li>Object to the processing of your personal information</li>
            <li>Withdraw consent at any time where we are relying on consent to process your personal data</li>
          </ul>
          <p>To exercise any of these rights, please contact us using the details below.</p>
        </Section>

        <Section title="11. Contact Us">
          <p>If you would like to access, correct, amend or delete any personal information we have about you, register a complaint, or simply want more information, please contact us:</p>
          <div style={styles.contactBox}>
            <p style={styles.contactLine}><strong>SixtyPlus Global</strong></p>
            <p style={styles.contactLine}>Chennai, Tamil Nadu — 600028, India</p>
            <p style={styles.contactLine}>Email: <a href="mailto:info@sixtyplusglobal.com" style={styles.link}>info@sixtyplusglobal.com</a></p>
            <p style={styles.contactLine}>Phone: <a href="tel:+919499944939" style={styles.link}>+91 94999 44939</a></p>
            <p style={styles.contactLine}>WhatsApp: <a href="https://wa.me/919499944939" style={styles.link}>+91 94999 44939</a></p>
          </div>
        </Section>

        <div style={styles.footer}>
          <p>© 2025 SixtyPlus Global. All rights reserved.</p>
          <div style={styles.footerLinks}>
            <Link to="/terms-and-conditions" style={styles.footerLink}>Terms &amp; Conditions</Link>
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
    marginBottom: '28px',
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
