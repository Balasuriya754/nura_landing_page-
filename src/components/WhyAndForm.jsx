// components/WhyAndForm.jsx
import useContactForm from '../hooks/useContactForm';
import { trackCtaClick } from '../lib/firebase';

const WhyAndForm = () => {
  const { formData, errors, submitted, loading, handleChange, submitForm } = useContactForm();

  return (
    <section className="why-section" id="why">
      <span id="consult" style={{ display: 'block', visibility: 'hidden', height: 0 }} />

      {/* Before / After strip */}
      <div className="ba-strip">
        <div className="ba-panel">
          <img src="lonely_old_man.jpg" alt="Elderly man alone" />
          <div className="ba-overlay ba-dark">
            <p className="ba-quote">He sits by the window.<br />Counting hours. Counting days.</p>
            <p className="ba-tamil tamil">அவர்கள் ஜன்னலருகே அமைதியாக காத்திருக்கிறார்கள்… யாராவது வருவார்களா என்று.</p>
          </div>
        </div>
        <div className="ba-arrow">→</div>
        <div className="ba-panel">
          <img src="errands1.jpg" alt="Caretaker with elderly" style={{ objectPosition: 'center 20%' }} />
          <div className="ba-overlay ba-hope">
            <p className="ba-quote">She smiles again.<br />Feels cared for every day.</p>
            <p className="ba-tamil tamil">அவர்கள் மீண்டும் சிரிக்க ஆரம்பிக்கிறார்கள்… யாரோ அக்கறையுடன் இருக்கிறார்கள்.</p>
          </div>
        </div>
      </div>

      <div className="ba-connector">
        <p>We make sure your parents are never alone.</p>
      </div>

      <div className="why-inner">
        {/* Benefits */}
        <div className="why-left">
          <div className="section-tag">Why Choose Us</div>
          <h2>Trusted by Tamil Families, Built for Their Care</h2>
          <p>Caring for parents isn't just about services — it's about consistency, trust, and knowing someone is always there when you can't be.</p>
          <div className="benefit-list">
            {[
              'Dedicated care coordinator for your family',
              'Verified and trusted care professionals',
              'Regular updates so you stay informed',
              'Flexible support based on changing needs',
              'Tamil-speaking team for clear communication',
              'Trusted by families across Tamil Nadu and beyond',
            ].map((item, i) => (
              <div className="benefit-item" key={i}>
                <div className="benefit-check">✓</div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact form */}
        <div className="form-box" id="consult-form">
          <div className="form-header">
            <h3>Speak with a Care Expert</h3>
            <p>Get personalized guidance within 24 hours</p>
          </div>

          {submitted ? (
            <div className="form-success">
              <div className="form-success-icon">✓</div>
              <h4>Thank you!</h4>
              <p>Our care manager will reach out within 24 hours.</p>
            </div>
          ) : (
            <form className="form-body" onSubmit={submitForm} noValidate>
              <div className="form-grid">
                {[
                  { field: 'name',     label: 'Name *',               type: 'text',   placeholder: 'Your full name'       },
                  { field: 'email',    label: 'Email ID *',            type: 'email',  placeholder: 'your@email.com'       },
                  { field: 'location', label: 'Location of Parent *',  type: 'text',   placeholder: 'City, Tamil Nadu'     },
                  { field: 'age',      label: 'Age of Parent *',       type: 'number', placeholder: 'e.g. 68'              },
                ].map(({ field, label, type, placeholder }) => (
                  <div className="form-group" key={field}>
                    <label>{label}</label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      value={formData[field]}
                      onChange={e => handleChange(field, e.target.value)}
                      className={errors[field] ? 'input-error' : ''}
                    />
                    {errors[field] && <span className="error-msg">{errors[field]}</span>}
                  </div>
                ))}
              </div>

              <div className="form-group" style={{ marginBottom: 13 }}>
                <label>Phone Number *</label>
                <div className="phone-wrap">
                  <span className="phone-prefix">+91</span>
                  <input
                    type="tel"
                    placeholder="10-digit number"
                    maxLength={10}
                    value={formData.phone}
                    onChange={e => handleChange('phone', e.target.value.replace(/\D/g, ''))}
                    className={errors.phone ? 'input-error' : ''}
                  />
                </div>
                {errors.phone && <span className="error-msg">{errors.phone}</span>}
              </div>

              <div className="form-group" style={{ marginBottom: 13 }}>
                <label>Mobility Status *</label>
                <select
                  value={formData.mobility}
                  onChange={e => handleChange('mobility', e.target.value)}
                  className={errors.mobility ? 'input-error' : ''}
                >
                  <option value="">Select status</option>
                  <option value="Independent and Active">Independent and Active</option>
                  <option value="Needs Partial Assistance">Needs Partial Assistance</option>
                  <option value="Requires full-time care">Requires full-time care</option>
                </select>
                {errors.mobility && <span className="error-msg">{errors.mobility}</span>}
              </div>

              <button type="submit" className="form-submit" disabled={loading}>
                {loading ? 'Submitting...' : 'Talk to a Care Expert Today'}
              </button>
              <p className="form-note">
                No spam. No pressure. 100% confidential.<br />
                Protected by reCAPTCHA —{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>Privacy</a>
                {' & '}
                <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>Terms</a>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default WhyAndForm;