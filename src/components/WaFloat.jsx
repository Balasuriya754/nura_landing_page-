// components/WaFloat.jsx
// Reads --sb-h from <body> (set by StickyBanner) and lifts itself above the
// banner with a smooth spring transition. No prop-drilling needed.

import { useState, useEffect } from 'react';
import { trackCtaClick } from '../lib/firebase';

const WaFloat = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        /*
          Lift .wa-fab above the sticky banner.
          --sb-h is 0px by default; StickyBanner sets it to the banner height
          when it slides in, and resets it to 0px when it hides.
          The transition ensures the button slides up/down smoothly.
        */
        .wa-fab {
          bottom: calc(var(--sb-h, 0px) + 24px) !important;
          transition:
            bottom    0.42s cubic-bezier(0.22, 1, 0.36, 1),
            opacity   0.35s ease,
            transform 0.35s ease !important;
        }
      `}</style>

      <a
        href="https://wa.me/919499944939?text=Welcome%20to%2060%20plus%20community%21%20How%20can%20I%20help%20you%20%21"
        className={`wa-fab ${visible ? 'wa-fab--on' : ''}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        onClick={() => trackCtaClick('whatsapp_float_click')}
      >
        <span className="wa-ring r1" />
        <span className="wa-ring r2" />
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.85L.057 23.885l6.233-1.633A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.359-.214-3.7.97.988-3.607-.234-.37A9.818 9.818 0 1112 21.818z" />
        </svg>
      </a>
    </>
  );
};

export default WaFloat;