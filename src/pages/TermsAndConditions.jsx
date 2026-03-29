import { useState } from 'react';
import { Link } from 'react-router-dom';

const TermsAndConditions = () => {
  const [showTerms, setShowTerms] = useState(false);

  const termsData = [
    {
      section: '1. Services',
      description: '60Plus Global provides senior care coordination services including doctor visits, nursing, physiotherapy, and companion support across Tamil Nadu.'
    },
    {
      section: '2. Eligibility',
      description: 'Services are available to individuals aged 55 and above residing within our service areas.'
    },
    {
      section: '3. Payments',
      description: 'Subscription fees are charged monthly. All fees are stated in USD and INR equivalent. No hidden charges apply.'
    },
    {
      section: '4. Privacy',
      description: 'All personal information shared with us is strictly confidential and used only for care coordination purposes. We never sell your data.'
    },
    {
      section: '5. Liability',
      description: '60Plus Global coordinates care services through licensed professionals. We are not liable for third-party service failures.'
    },
    {
      section: '6. Cancellation',
      description: 'You may cancel your subscription at any time with 30 days notice. Refunds are processed on a pro-rata basis.'
    },
    {
      section: '7. Contact',
      description: 'For queries: +91 94999 44939 | sixtyplus@care.in'
    }
  ];

  return (
    <div className="terms-page">
      <div className="terms-page-header">
        <div className="terms-page-header-content">
          <h1>Terms & Conditions</h1>
          <p>Last Updated: January 2025</p>
        </div>
      </div>

      <div className="terms-page-content">
        <div className="terms-page-body">
          <p className="terms-page-intro">
            Welcome to 60Plus Global. By accessing or using our services, you agree to be bound by these Terms and Conditions. Please read them carefully before using our platform.
          </p>

          {termsData.map((term, index) => (
            <div key={index} className="terms-section">
              <h2 className="terms-section-title">{term.section}</h2>
              <p className="terms-section-desc">{term.description}</p>
            </div>
          ))}

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

export default TermsAndConditions;
