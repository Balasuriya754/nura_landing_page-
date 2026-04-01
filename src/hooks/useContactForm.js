import { useState, useRef, useEffect } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { trackFormSubmit } from '../lib/firebase';

const FORM_ID = import.meta.env.VITE_FORM_ID || '60plus_global_form';

const DEFAULT_INITIAL_VALUES = {
  name: '',
  phone: '',
  email: '',
  location: '',
  age: '',
  mobility: ''
};

const useContactForm = (initialValues = DEFAULT_INITIAL_VALUES) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showV2, setShowV2] = useState(false);

  // Backend API URL from environment
  const API_URL = import.meta.env.VITE_API_URL;

  const sendToBackend = async (payload) => {
    console.log('sendToBackend called with:', payload);
    console.log('Fetching from:', `${API_URL}/v1/core/landingPageFormSubmit`);

    try {
      const response = await fetch(`${API_URL}/v1/core/landingPageFormSubmit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      console.log('Response status:', response.status, response.ok);

      const result = await response.json().catch(e => {
        console.error('Failed to parse JSON:', e);
        return { detail: `Response parsing error: ${e.message}` };
      });

      if (!response.ok) {
        // Handle both single error and array of errors from backend
        let errorMsg = '';
        if (Array.isArray(result)) {
          errorMsg = result.map(err => `${err.field || 'Field'}: ${err.message || err.detail || 'Invalid'}`).join('; ');
        } else if (result.detail && Array.isArray(result.detail)) {
          // FastAPI style validation errors
          errorMsg = result.detail.map(err => `${err.loc?.[1] || err.type || 'Field'}: ${err.msg || err.detail || 'Invalid'}`).join('; ');
          console.error('FastAPI validation errors:', result.detail);
        } else {
          errorMsg = result.detail || result.message || 'Something went wrong.';
        }
        console.error('Backend error response:', result, errorMsg);
        throw new Error(errorMsg);
      }
      console.log('Backend success:', result);
      return result;
    } catch (err) {
      console.error('Network/fetch error:', err);
      throw err;
    }
  };

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = 'Name is required';

    if (!formData.phone.trim()) {
      e.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      e.phone = 'Enter valid 10-digit number';
    }

    if (!formData.email.trim()) {
      e.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      e.email = 'Enter valid email';
    }

    if (!formData.location.trim()) e.location = 'Location is required';

    if (!formData.age.trim()) {
      e.age = 'Age is required';
    } else if (isNaN(+formData.age) || +formData.age < 40 || +formData.age > 120) {
      e.age = 'Enter valid age (40-120)';
    }

    if (!formData.mobility) e.mobility = 'Please select mobility status';

    return e;
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    console.log('submitForm called!');
    const errs = validate();

    if (Object.keys(errs).length > 0) {
      console.log('Validation errors:', errs);
      setErrors(errs);
      return;
    }

    console.log('Validation passed, submitting...');
    setLoading(true);
    setErrors(prev => ({ ...prev, recaptcha: undefined }));

    try {
      if (!executeRecaptcha) {
        console.error('ReCAPTCHA not available');
        setErrors(prev => ({ ...prev, recaptcha: 'ReCAPTCHA not ready. Check configuration.' }));
        setLoading(false);
        return;
      }

      if (!import.meta.env.VITE_RECAPTCHA_V3_KEY || import.meta.env.VITE_RECAPTCHA_V3_KEY === 'your_recaptcha_v3_site_key_here') {
        console.error('ReCAPTCHA V3 key not configured');
        setErrors(prev => ({ ...prev, recaptcha: 'ReCAPTCHA V3 key not configured. Contact admin.' }));
        setLoading(false);
        return;
      }

      console.log('Executing reCAPTCHA...');
      const v3Token = await executeRecaptcha('contact_form_submit');
      console.log('reCAPTCHA token received:', v3Token?.substring(0, 20) + '...');

      try {
        // Map frontend field names to backend expected field names
        // Note: name, phoneNumber, emailId, locationOfParent should be strings
        const payload = {
          form_id: FORM_ID,
          name: formData.name,
          phoneNumber: formData.phone,  // Keep as string (backend expects string)
          emailId: formData.email,
          locationOfParent: formData.location,
          ageOfParent: +formData.age,   // age can be number
          mobilityStatus: formData.mobility,
          recaptcha_token: v3Token,
          captcha_type: 'v3',
        };

        console.log('Submitting to backend:', API_URL, payload);
        const response = await sendToBackend(payload);
        console.log('Form submission response:', response);

        // Track successful form submission in Firebase Analytics
        trackFormSubmit('contact_form', {
          form_id: FORM_ID,
          location: formData.location,
        });

        setSubmitted(true);
        setFormData(DEFAULT_INITIAL_VALUES);
      } catch (err) {
        console.error('Backend error:', err);
        if (err.message === 'require_v2') {
          setShowV2(true);
        } else {
          setErrors(prev => ({ ...prev, recaptcha: err.message }));
        }
      }
    } catch (err) {
      console.error('Unexpected error during submission:', err);
      setErrors(prev => ({ ...prev, recaptcha: err.message || 'Submission failed. Please try again.' }));
    } finally {
      setLoading(false);
    }
  };

  // For v2 fallback - window.grecaptcha is available globally after script loads
  const handleV2Submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors(prev => ({ ...prev, recaptcha: undefined }));

    try {
      if (!window.grecaptcha) {
        setErrors(prev => ({ ...prev, recaptcha: 'ReCAPTCHA script not loaded. Please reload page.' }));
        setLoading(false);
        return;
      }

      const v2Token = window.grecaptcha.getResponse();
      if (!v2Token) {
        setErrors(prev => ({ ...prev, recaptcha: 'Please complete the ReCAPTCHA' }));
        setLoading(false);
        return;
      }

      if (!import.meta.env.VITE_RECAPTCHA_V2_KEY) {
        setErrors(prev => ({ ...prev, recaptcha: 'ReCAPTCHA V2 key not configured. Contact admin.' }));
        setLoading(false);
        return;
      }

      const payload = {
        form_id: FORM_ID,
        ...formData,
        phone: +formData.phone,
        age: +formData.age,
        recaptcha_token: v2Token,
        captcha_type: 'v2',
      };

      console.log('Submitting with v2 token:', payload);
      const response = await sendToBackend(payload);
      console.log('Form submission response:', response);

      setSubmitted(true);
      setFormData(DEFAULT_INITIAL_VALUES);
      setShowV2(false);
      window.grecaptcha.reset();
    } catch (err) {
      setErrors(prev => ({ ...prev, recaptcha: err.message || 'Submission failed. Please try again.' }));
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(DEFAULT_INITIAL_VALUES);
    setErrors({});
    setSubmitted(false);
    setShowV2(false);
    if (window.grecaptcha) {
      window.grecaptcha.reset();
    }
  };

  return {
    formData,
    errors,
    submitted,
    loading,
    showV2,
    handleChange,
    submitForm,
    handleV2Submit,
    resetForm,
    setFormData,
  };
};

export default useContactForm;
