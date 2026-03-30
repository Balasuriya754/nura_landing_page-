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
          <p style={styles.docMeta}>SixtyPlus Global &nbsp;·&nbsp; Effective Date: January 1, 2025</p>
          <h1 style={styles.docTitle}>Terms &amp; Conditions</h1>
          <p style={styles.docIntro}>
            Please read these Terms of Service carefully before accessing or using our website.
            By accessing or using any part of the site, you agree to be bound by these Terms.
          </p>
          <div style={styles.divider} />
        </div>

        <Section title="Overview">
          <p>This website is operated by SixtyPlus Global. Throughout the site, the terms "we", "us" and "our" refer to SixtyPlus Global. SixtyPlus Global offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.</p>
          <p>By visiting our site and/or purchasing something from us, you engage in our "Service" and agree to be bound by the following terms and conditions ("Terms of Service", "Terms"), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content.</p>
          <p>If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service. Any new features or tools which are added to the current platform shall also be subject to the Terms of Service. We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our website. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.</p>
        </Section>

        <Section title="Section 1 — Online Platform Terms">
          <p>By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority and have given us your consent to allow any of your minor dependents to use this site.</p>
          <p>You may not use our products or services for any illegal or unauthorized purpose, nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws). You must not transmit any worms, viruses, or any code of a destructive nature. A breach or violation of any of the Terms will result in immediate termination of your Services.</p>
        </Section>

        <Section title="Section 2 — General Conditions">
          <p>We reserve the right to refuse service to anyone for any reason at any time. You understand that your content (not including payment information) may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of connecting networks or devices. Payment information is always encrypted during transfer over networks.</p>
          <p>You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any contact on the website through which the service is provided, without express written permission by us.</p>
        </Section>

        <Section title="Section 3 — Accuracy, Completeness and Timeliness of Information">
          <p>We are not responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely sources of information. Any reliance on the material on this site is at your own risk.</p>
          <p>We reserve the right to modify the contents of this site at any time, but we have no obligation to update any information on our site. You agree that it is your responsibility to monitor changes to our site.</p>
        </Section>

        <Section title="Section 4 — Modifications to the Service and Prices">
          <p>Prices for our services are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time. We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.</p>
        </Section>

        <Section title="Section 5 — Services">
          <p>Certain services may be available exclusively through the website and may have limited availability, subject to our Service Policy. We have made every effort to accurately describe our services on this site. We cannot guarantee that the description of any service will be fully accurate. We reserve the right, but are not obligated, to limit the provision of our services to any person, geographic region or jurisdiction. We may exercise this right on a case-by-case basis.</p>
          <p>All descriptions of services or service pricing are subject to change at any time without notice, at the sole discretion of SixtyPlus Global. We reserve the right to discontinue any service at any time. Any offer for any service made on this site is void where prohibited.</p>
        </Section>

        <Section title="Section 6 — Accuracy of Billing and Account Information">
          <p>We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities of services purchased per person or per household. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e-mail and/or phone number provided at the time the order was made.</p>
          <p>You agree to provide current, complete and accurate purchase and account information for all purchases made through our platform. You agree to promptly update your account and other information, including your email address, so that we can complete your transactions and contact you as needed.</p>
        </Section>

        <Section title="Section 7 — Third-Party Tools">
          <p>We may provide you with access to third-party tools over which we neither monitor nor have any control nor input. You acknowledge and agree that we provide access to such tools "as is" and "as available" without any warranties, representations or conditions of any kind and without any endorsement. We shall have no liability whatsoever arising from or relating to your use of optional third-party tools.</p>
        </Section>

        <Section title="Section 8 — Third-Party Links">
          <p>Certain content, products and services available via our Service may include materials from third-parties. Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining or evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party materials or websites, or for any other materials, products, or services of third-parties.</p>
          <p>We are not liable for any harm or damages related to the purchase or use of goods, services, resources, content, or any other transactions made in connection with any third-party websites. Please review carefully the third-party's policies and practices and make sure you understand them before you engage in any transaction.</p>
        </Section>

        <Section title="Section 9 — User Comments, Feedback and Submissions">
          <p>If, at our request, you send certain specific submissions or without a request from us you send creative ideas, suggestions, proposals, plans, or other materials, whether online, by email, by postal mail, or otherwise (collectively, 'comments'), you agree that we may, at any time, without restriction, edit, copy, publish, distribute, translate and otherwise use in any medium any comments that you forward to us. We are under no obligation to maintain any comments in confidence, pay compensation for any comments, or respond to any comments.</p>
          <p>You agree that your comments will not violate any right of any third-party, including copyright, trademark, privacy, personality or other personal or proprietary right. You are solely responsible for any comments you make and their accuracy.</p>
        </Section>

        <Section title="Section 10 — Personal Information">
          <p>Your submission of personal information through our platform is governed by our Privacy Policy. Please review our Privacy Policy, which is incorporated into these Terms of Service by this reference.</p>
        </Section>

        <Section title="Section 11 — Errors, Inaccuracies and Omissions">
          <p>Occasionally there may be information on our site or in the Service that contains typographical errors, inaccuracies or omissions that may relate to service descriptions, pricing, promotions, offers, and availability. We reserve the right to correct any errors, inaccuracies or omissions, and to change or update information or cancel orders if any information in the Service or on any related website is inaccurate at any time without prior notice.</p>
        </Section>

        <Section title="Section 12 — Prohibited Uses">
          <p>In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content:</p>
          <ul style={styles.list}>
            <li>For any unlawful purpose or to solicit others to perform or participate in any unlawful acts</li>
            <li>To violate any international, federal, provincial or state regulations, rules, laws, or local ordinances</li>
            <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
            <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability</li>
            <li>To submit false or misleading information</li>
            <li>To upload or transmit viruses or any other type of malicious code</li>
            <li>To collect or track the personal information of others</li>
            <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
            <li>For any obscene or immoral purpose</li>
            <li>To interfere with or circumvent the security features of the Service or any related website</li>
          </ul>
          <p>We reserve the right to terminate your use of the Service or any related website for violating any of the prohibited uses.</p>
        </Section>

        <Section title="Section 13 — Disclaimer of Warranties; Limitation of Liability">
          <p>We do not guarantee, represent or warrant that your use of our service will be uninterrupted, timely, secure or error-free. We do not warrant that the results that may be obtained from the use of the service will be accurate or reliable.</p>
          <p>You expressly agree that your use of, or inability to use, the service is at your sole risk. The service and all products and services delivered to you through the service are (except as expressly stated by us) provided 'as is' and 'as available' for your use, without any representation, warranties or conditions of any kind, either express or implied.</p>
          <p>In no case shall SixtyPlus Global, our directors, officers, employees, affiliates, agents, contractors, suppliers, service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation lost profits, lost revenue, lost savings, loss of data, replacement costs, or any similar damages, whether based in contract, tort (including negligence), strict liability or otherwise, arising from your use of any of the service or any products or services procured using the service.</p>
        </Section>

        <Section title="Section 14 — Indemnification">
          <p>You agree to indemnify, defend and hold harmless SixtyPlus Global and our parent, subsidiaries, affiliates, partners, officers, directors, agents, contractors, licensors, service providers, subcontractors, suppliers, and employees, harmless from any claim or demand, including reasonable attorneys' fees, made by any third-party due to or arising out of your breach of these Terms of Service or the documents they incorporate by reference, or your violation of any law or the rights of a third-party.</p>
        </Section>

        <Section title="Section 15 — Severability">
          <p>In the event that any provision of these Terms of Service is determined to be unlawful, void or unenforceable, such provision shall nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed to be severed from these Terms of Service. Such determination shall not affect the validity and enforceability of any other remaining provisions.</p>
        </Section>

        <Section title="Section 16 — Termination">
          <p>The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement for all purposes. These Terms of Service are effective unless and until terminated by either you or us. You may terminate these Terms of Service at any time by notifying us that you no longer wish to use our Services, or when you cease using our site.</p>
          <p>If in our sole judgment you fail, or we suspect that you have failed, to comply with any term or provision of these Terms of Service, we also may terminate this agreement at any time without notice and you will remain liable for all amounts due up to and including the date of termination.</p>
        </Section>

        <Section title="Section 17 — Entire Agreement">
          <p>These Terms of Service and any policies or operating rules posted by us on this site or in respect to The Service constitute the entire agreement and understanding between you and us and govern your use of the Service, superseding any prior or contemporaneous agreements, communications and proposals, whether oral or written, between you and us (including, but not limited to, any prior versions of the Terms of Service).</p>
        </Section>

        <Section title="Section 18 — Governing Law">
          <p>These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of India, and any disputes shall be subject to the exclusive jurisdiction of the courts located in Chennai, Tamil Nadu — 600028.</p>
        </Section>

        <Section title="Section 19 — Changes to Terms of Service">
          <p>You can review the most current version of the Terms of Service at any time on this page. We reserve the right, at our sole discretion, to update, change or replace any part of these Terms of Service by posting updates and changes to our website. It is your responsibility to check our website periodically for changes. Your continued use of or access to our website or the Service following the posting of any changes to these Terms of Service constitutes acceptance of those changes.</p>
        </Section>

        <Section title="Section 20 — Contact Information">
          <p>Questions about the Terms of Service should be sent to us at:</p>
          <div style={styles.contactBox}>
            <p style={styles.contactLine}><strong>SixtyPlus Global</strong></p>
            <p style={styles.contactLine}>Chennai, Tamil Nadu — 600028, India</p>
            <p style={styles.contactLine}>Email: <a href="mailto:info@sixtyplusglobal.com" style={styles.link}>info@sixtyplusglobal.com</a></p>
            <p style={styles.contactLine}>Phone: <a href="tel:+919499944939" style={styles.link}>+91 94999 44939</a></p>
          </div>
        </Section>

        <div style={styles.footer}>
          <p>© 2025 SixtyPlus Global. All rights reserved.</p>
          <div style={styles.footerLinks}>
            <Link to="/privacy-policy" style={styles.footerLink}>Privacy Policy</Link>
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
