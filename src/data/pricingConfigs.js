// src/data/pricingConfigs.js
// Pricing configurations for different service routes

export const pricingConfigs = {
  // Default route (/) - Doctor Home Visit
  default: {
    planName: 'DOCTOR HOME VISIT',
    tagline: 'Professional medical care at your parents\' doorstep',
    price: '20',
    period: '/ month',
    ctaLabel: 'Book Doctor Visit — $20/mo',
    ctaTrackingKey: 'pricing_default_cta_click',
    features: [
      {
        category: 'Medical Care',
        items: [
          'Monthly Doctor Home Visits',
          'Health Check-ups & Vitals Monitoring',
          'Prescription Management',
          'Blood Tests at Home',
          'Medical Records Digitization',
        ],
      },
      {
        category: 'Consultation',
        items: [
          '24/7 Phone Consultation',
          'Emergency Coordination',
          'Specialist Referrals',
        ],
      },
    ],
    highlights: [
      'Qualified doctors visit your parents at home',
      'No travel hassles for elderly parents',
      'Regular health monitoring & reports',
      'Trusted by 50,000+ families',
    ],
    urgencyText: 'Limited doctor slots available this month',
    // Sticky banner content
    stickyBanner: {
      text: 'Your parents deserve expert medical care at home.',
      subtext: 'Limited doctor slots this month.',
      ctaLabel: 'Book Doctor Visit — $20/mo',
    },
  },

  // /making-home-senior-friendly - Making Home Senior Friendly
  'making-home-senior-friendly': {
    planName: 'MAKING HOME SENIOR FRIENDLY',
    tagline: 'Making homes safer for independent senior living',
    price: '20',
    period: '/ month',
    ctaLabel: 'Make Home Safe — $20/month',
    ctaTrackingKey: 'pricing_home_safety_cta_click',
    features: [
      {
        category: 'Home Assessment',
        items: [
          'Complete Home Safety Audit',
          'Bathroom Safety Evaluation',
          'Fall Risk Assessment',
          'Emergency Exit Planning',
        ],
      },
      {
        category: 'Safety Modifications',
        items: [
          'Grab Bar Installation Guidance',
          'Non-slip Flooring Recommendations',
          'Lighting Optimization',
          'Furniture Rearrangement for Mobility',
          '24/7 Emergency Helpline',
        ],
      },
    ],
    highlights: [
      'Certified safety experts assess your home',
      'Prevent falls and accidents',
      'Recommendations tailored to your parent\'s needs',
      'Affordable peace of mind',
    ],
    urgencyText: 'Book your safety assessment today',
    // Sticky banner content
    stickyBanner: {
      text: 'Make your parents\' home safe and accessible.',
      subtext: 'Prevent falls before they happen.',
      ctaLabel: 'Get Home Safety — $20/mo',
    },
  },

  // /companion - Companion Support for Elders
  'companion-support-for-elders': {
    planName: 'COMPANION SUPPORT FOR ELDERS',
    tagline: 'Daily companionship and emotional support for your parents',
    price: '20',
    period: '/ month',
    ctaLabel: 'Get Companion Support — $20/month',
    ctaTrackingKey: 'pricing_companion_cta_click',
    features: [
      {
        category: 'Daily Support',
        items: [
          'Daily Phone Check-ins',
          'Medicine Reminders',
          'Companion AI Chatbot Access',
          'Emotional Support Calls',
        ],
      },
      {
        category: 'Weekly Engagement',
        items: [
          'Weekly In-Person Visits',
          'Activity Planning',
          'Family Update Reports',
          'Hobby & Interest Support',
        ],
      },
    ],
    highlights: [
      'Trained companions who speak Tamil',
      'Combat loneliness and isolation',
      'Keep your parents engaged and happy',
      'Regular updates to family abroad',
    ],
    urgencyText: 'Limited companion slots this month',
    // Sticky banner content
    stickyBanner: {
      text: 'Your parents shouldn\'t feel alone.',
      subtext: 'Daily companionship available now.',
      ctaLabel: 'Get Companion — $20/mo',
    },
  },

  // /therapy - Psychologist and Psychiatrist Support
  'psychologist-and-psychiatrist-support': {
    planName: 'PSYCHOLOGIST AND PSYCHIATRIST SUPPORT',
    tagline: 'Professional psychological support for senior mental wellness',
    price: '20',
    period: '/ month',
    ctaLabel: 'Get Mental Health Support — $20/month',
    ctaTrackingKey: 'pricing_mental_health_cta_click',
    features: [
      {
        category: 'Psychiatric Care',
        items: [
          'Monthly Psychiatrist Consultation',
          'Medication Management',
          'Mental Health Assessments',
          'Depression & Anxiety Screening',
        ],
      },
      {
        category: 'Therapy & Support',
        items: [
          'Weekly Therapy Sessions',
          'Cognitive Wellness Programs',
          'Family Counseling Sessions',
          '24/7 Crisis Support Line',
        ],
      },
    ],
    highlights: [
      'Licensed psychiatrists and psychologists',
      'Confidential and compassionate care',
      'Support for depression, anxiety, memory issues',
      'Family-inclusive approach',
    ],
    urgencyText: 'Prioritize your parent\'s mental health today',
    // Sticky banner content
    stickyBanner: {
      text: 'Mental health matters at every age.',
      subtext: 'Professional support available.',
      ctaLabel: 'Get Therapy Support — $20/mo',
    },
  },
};

// Helper to get config by path
export const getPricingConfig = (pathname) => {
  const path = pathname.replace('/', '').replace(/\/$/, '');
  return pricingConfigs[path] || pricingConfigs.default;
};