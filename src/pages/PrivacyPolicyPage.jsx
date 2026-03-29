import { Link } from 'react-router-dom';

const PrivacyPolicyPage = () => {
  return (
    <div className="terms-page">
      <div className="terms-page-header">
        <div className="terms-page-header-content">
          <h1>Privacy Policy</h1>
          <p>Last Updated: January 2025</p>
        </div>
      </div>

      <div className="terms-page-content">
        <div className="terms-page-body">
          <p className="terms-page-intro">
            At 60Plus Global, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our services.
          </p>

          <div className="terms-section">
            <h2 className="terms-section-title">1. Information We Collect</h2>
            <p className="terms-section-desc">
              When you use our services, we collect information such as your name, phone number, email address, location, and age of your loved one. This helps us provide personalized care coordination services.
            </p>
          </div>

          <div className="terms-section">
            <h2 className="terms-section-title">2. How We Use Your Information</h2>
            <p className="terms-section-desc">
              Your information is used to:
            </p>
            <ul className="terms-bullet-list">
              <li>Coordinate care services with licensed professionals</li>
              <li>communicate with you regarding your parents' care</li>
              <li>Improve our services and customer experience</li>
              <li>Comply with legal obligations</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2 className="terms-section-title">3. Data Security</h2>
            <p className="terms-section-desc">
              We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. All data is stored securely and access is restricted to authorized personnel only.
            </p>
          </div>

          <div className="terms-section">
            <h2 className="terms-section-title">4. Data Sharing</h2>
            <p className="terms-section-desc">
              We do not sell or rent your personal information to third parties. We only share your data with:
            </p>
            <ul className="terms-bullet-list">
              <li>Licensed healthcare professionals providing care services</li>
              <li>Third-party service providers who assist us in delivering services</li>
              <li>As required by law or legal process</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2 className="terms-section-title">5. Your Rights</h2>
            <p className="terms-section-desc">
              You have the right to:
            </p>
            <ul className="terms-bullet-list">
              <li>Access your personal information</li>
              <li>Request corrections to your data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </div>

          <div className="terms-section">
            <h2 className="terms-section-title">6. Contact Us</h2>
            <p className="terms-section-desc">
              For any privacy-related inquiries or to exercise your rights, contact us at:
            </p>
            <p className="terms-section-desc">
              <strong>Email:</strong> sixtyplus@care.in<br/>
              <strong>Phone:</strong> +91 94999 44939
            </p>
          </div>

          <div className="terms-page-footer">
            <Link to="/" className="terms-page-back-btn">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .terms-page {
          min-height: calc(100vh - 68px);
          background: #f8f9fa;
          padding: 40px 20px;
        }
        .terms-page-header {
          background: linear-gradient(135deg, #5B2D8E 0%, #301252 100%);
          color: white;
          padding: 60px 20px;
          text-align: center;
        }
        .terms-page-header-content h1 {
          font-size: 48px;
          font-weight: 700;
          margin-bottom: 10px;
          font-family: 'Lora', serif;
        }
        .terms-page-header-content p {
          font-size: 16px;
          opacity: 0.8;
        }
        .terms-page-content {
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 0;
        }
        .terms-page-body {
          background: white;
          border-radius: 16px;
          padding: 40px;
          box-shadow: 0 4px 24px rgba(91, 45, 142, 0.08);
        }
        .terms-page-intro {
          font-size: 16px;
          line-height: 1.8;
          color: #4a5568;
          margin-bottom: 40px;
          padding-bottom: 30px;
          border-bottom: 2px solid #e2e8f0;
        }
        .terms-section {
          margin-bottom: 30px;
        }
        .terms-section-title {
          font-size: 22px;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 12px;
          padding-left: 20px;
          border-left: 4px solid #5B2D8E;
        }
        .terms-section-desc {
          font-size: 16px;
          line-height: 1.7;
          color: #4a5568;
        }
        .terms-bullet-list {
          margin: 15px 0 0 20px;
          color: #4a5568;
        }
        .terms-bullet-list li {
          margin-bottom: 10px;
          line-height: 1.6;
        }
        .terms-page-footer {
          margin-top: 40px;
          text-align: center;
        }
        .terms-page-back-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          background: #5B2D8E;
          color: white;
          text-decoration: none;
          border-radius: 50px;
          font-weight: 600;
          font-size: 15px;
          transition: all 0.3s;
        }
        .terms-page-back-btn:hover {
          background: #301252;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(91, 45, 142, 0.2);
        }
        @media (max-width: 768px) {
          .terms-page-header-content h1 {
            font-size: 32px;
          }
          .terms-page-body {
            padding: 24px;
          }
          .terms-section-title {
            font-size: 18px;
          }
          .terms-section-desc {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default PrivacyPolicyPage;
