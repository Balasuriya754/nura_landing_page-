import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import useContactForm from './hooks/useContactForm';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';

const heroBgImages = [
  'public/hero_caretender.jpg',
  'public/hero/Mahadevan_Sitting2_LJ_India.jpg',
  'public/hero_old_person6.jpg',
  'public/hero_physio1.jpg',
];

// Images that scroll inside the collage layout
const collageScrollImages = [
  'public/hero_old_person6.jpg',
  'public/hero_caretender.jpg',
  'public/hero_physio1.jpg',
  'public/hand_in_hand.jpg',
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&family=Noto+Sans+Tamil:wght@400;600;700&display=swap');

  :root {
    --purple: #5B2D8E;
    --purple-dark: #301252;
    --purple-hero: #300e50;
    --pink: #C47DC0;
    --pink-light: #f0d8ef;
    --pale: #f3ecfb;
    --cream: #FEF3C7;
    --cream-text: #78350F;
    --white: #ffffff;
    --gray-dark: #1e1e2e;
    --gray-mid: #5a5a70;
    --gray-light: #f5f4f9;
    --border: #dccdf0;
    --green-wa: #25D366;
    --teal: #1eb8a0;
    --teal-dark: #1a8a8a;
    --footer-bg: #140a23;
  }

  * { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior:smooth; }
  body { font-family:'Inter',sans-serif; color:var(--gray-dark); background:#fff; overflow-x:hidden; }
  .tamil { font-family:'Noto Sans Tamil',sans-serif; }

  .section-header { text-align:center; margin-bottom:48px; }
  .section-tag { display:inline-block; background:var(--pale); color:var(--purple); font-size:12px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; padding:5px 16px; border-radius:20px; border:1px solid var(--border); margin-bottom:14px; }
  .tag-light { background:rgba(255,255,255,0.15); color:rgba(255,255,255,0.9); border-color:rgba(255,255,255,0.25); }
  .section-title { font-family:'Lora',serif; font-size:34px; color:var(--purple); line-height:1.25; }
  .section-sub { font-size:15px; color:var(--gray-mid); margin-top:10px; }
  .section-line { width:52px; height:4px; background:var(--pink); border-radius:2px; margin:16px auto 0; }
  .accent-line { width:52px; height:4px; background:var(--pink); border-radius:2px; margin-bottom:18px; }

  /* NAV */
  nav { position:sticky; top:0; z-index:100; display:flex; align-items:center; justify-content:space-between; padding:0 40px; height:79px; background:rgba(255,255,255,0.97); border-bottom:1px solid var(--border); box-shadow:0 2px 12px rgba(91,45,142,0.06); transition:box-shadow 0.3s; }
  nav.nav-scrolled { box-shadow:0 4px 24px rgba(91,45,142,0.12); }
  .nav-logo { display:flex; align-items:center; gap:10px; }
  .nav-logo img { height:120px; width:auto; object-fit:contain; }
  .nav-logo span { font-size:20px; font-weight:700; color:var(--purple); }
  .nav-links { display:flex; gap:28px; }
  .nav-links a { font-size:14px; color:var(--gray-mid); text-decoration:none; font-weight:500; padding:5px 8px; border-radius:7px; transition:color 0.2s, background 0.2s; }
  .nav-links a:hover { color:var(--purple); background:var(--pale); }
  .nav-cta { background:var(--purple); color:#fff; padding:9px 22px; border-radius:50px; font-size:14px; font-weight:700; cursor:pointer; text-decoration:none; display:inline-block; transition:all 0.3s ease; box-shadow:0 4px 14px rgba(91,45,142,0.25); }
  .nav-cta:hover { background:var(--purple-dark); transform:translateY(-2px); }
  .hamburger { display:none; flex-direction:column; gap:5px; cursor:pointer; padding:8px; }
  .hamburger span { width:22px; height:2px; background:var(--purple); border-radius:2px; transition:all 0.3s; }
  .hamburger.open span:nth-child(1) { transform:rotate(45deg) translate(5px,5px); }
  .hamburger.open span:nth-child(2) { opacity:0; }
  .hamburger.open span:nth-child(3) { transform:rotate(-45deg) translate(5px,-5px); }
  .mobile-menu { display:none; position:fixed; top:68px; left:0; right:0; z-index:99; background:#fff; border-bottom:1px solid var(--border); box-shadow:0 8px 24px rgba(91,45,142,0.1); padding:12px 20px 20px; flex-direction:column; gap:4px; }
  .mobile-menu.open { display:flex; }
  .mobile-menu a { font-size:15px; color:var(--gray-dark); text-decoration:none; font-weight:600; padding:12px 14px; border-radius:9px; transition:background 0.2s; }
  .mobile-menu a:hover { background:var(--pale); color:var(--purple); }
  .mobile-menu .mob-cta { margin-top:6px; background:var(--purple); color:#fff; text-align:center; padding:13px; border-radius:50px; font-weight:700; }

  /* HERO */
  .hero { position:relative; overflow:hidden; height:calc(100vh - 68px); max-height:760px; min-height:560px; display:flex; align-items:center; justify-content:center; }
  .hero-bg-slide { position:absolute; inset:0; z-index:0; background-size:cover; background-position:center top; opacity:0; transition:opacity 2s cubic-bezier(0.4,0,0.2,1); }
  .hero-bg-slide.active { opacity:1; }
  .hero-vignette { position:absolute; inset:0; z-index:1; background:linear-gradient(105deg, rgba(15,3,28,0.96) 0%, rgba(48,14,80,0.88) 32%, rgba(48,14,80,0.60) 55%, rgba(20,5,40,0.22) 78%, rgba(0,0,0,0.05) 100%); }
  .hero-glow { position:absolute; inset:0; z-index:1; background:radial-gradient(ellipse at 16% 60%, rgba(196,125,192,0.18) 0%, transparent 52%); }
  .hero-inner { position:relative; z-index:2; width:100%; max-width:1120px; padding:0 64px; display:flex; align-items:center; }
  .hero-left { width:100%; max-width:640px; display:flex; flex-direction:column; }
  .hero-eyebrow { display:inline-flex; align-items:center; gap:7px; background:rgba(196,125,192,0.15); border:1px solid rgba(196,125,192,0.35); color:var(--pink-light); font-size:11px; font-weight:700; letter-spacing:1.8px; text-transform:uppercase; padding:6px 14px; border-radius:28px; margin-bottom:20px; width:fit-content; animation:fadeSlideUp 0.9s ease-out both; }
  .hero-eyebrow-dot { width:5px; height:5px; border-radius:50%; background:var(--pink); animation:blink 2s ease-in-out infinite; }
  @keyframes blink { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
  .hero-headline { font-family:'Lora',serif; font-size:46px; font-weight:700; color:#fff; line-height:1.12; margin-bottom:0; animation:fadeSlideUp 0.9s ease-out 0.12s both; }
  .hero-headline em { font-style:italic; color:var(--pink-light); }
  .hero-rule { width:44px; height:2px; background:linear-gradient(90deg, var(--pink), transparent); margin:16px 0; animation:fadeSlideUp 0.9s ease-out 0.22s both; }
  .hero-quote-wrap { border-left:3px solid rgba(196,125,192,0.5); padding:8px 0 8px 18px; margin-bottom:16px; animation:fadeSlideUp 0.9s ease-out 0.32s both; }
  .hero-quote-tamil { font-family:'Noto Sans Tamil',sans-serif; font-size:15px; font-weight:700; color:rgba(255,255,255,0.92); line-height:1.85; display:block; margin-bottom:4px; }
  .hero-quote-eng { font-family:'Lora',serif; font-size:12px; font-style:italic; color:rgba(210,180,240,0.65); letter-spacing:0.2px; }
  .hero-body { font-size:15px; line-height:1.72; color:rgba(215,195,255,0.76); margin-bottom:22px; max-width:480px; animation:fadeSlideUp 0.9s ease-out 0.42s both; }
  .hero-stats { display:flex; gap:0; margin-bottom:24px; animation:fadeSlideUp 0.9s ease-out 0.52s both; }
  .hero-stat { padding-right:20px; margin-right:20px; }
  .hero-stat:not(:last-child) { border-right:1px solid rgba(255,255,255,0.15); }
  .hero-stat .num { font-size:22px; font-weight:700; color:#fff; line-height:1; }
  .hero-stat .lbl { font-size:10px; color:rgba(196,170,230,0.7); margin-top:3px; letter-spacing:0.2px; }
  .hero-cta-row { display:flex; gap:10px; flex-wrap:wrap; animation:fadeSlideUp 0.9s ease-out 0.62s both; }
  .cta-btn-primary { display:inline-block; background:var(--cream); color:var(--cream-text); padding:13px 28px; border-radius:50px; font-size:15px; font-weight:700; text-decoration:none; transition:all 0.3s ease; box-shadow:0 5px 24px rgba(255,204,0,0.3); border:2px solid #f0d8ef; }
  .cta-btn-primary:hover { transform:translateY(-2px); box-shadow:0 12px 36px rgba(255,204,0,0.45); background:#fff8e1; }
  .cta-btn-wa { display:inline-flex; align-items:center; gap:7px; background:var(--green-wa); color:#fff; padding:13px 22px; border-radius:50px; font-size:14px; font-weight:700; text-decoration:none; transition:all 0.3s ease; box-shadow:0 5px 20px rgba(37,211,102,0.28); }
  .cta-btn-wa:hover { transform:translateY(-2px); box-shadow:0 10px 30px rgba(37,211,102,0.4); }
  .hero-dots { position:absolute; bottom:20px; left:50%; transform:translateX(-50%); z-index:3; display:flex; gap:7px; align-items:center; }
  .hero-dot { width:5px; height:5px; border-radius:50%; background:rgba(255,255,255,0.3); cursor:pointer; transition:all 0.35s; border:none; }
  .hero-dot.active { background:#fff; width:18px; border-radius:3px; }

  /* SERVICES */
  .services-section { padding:72px 40px; background:#fff; }
  .services-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:20px; max-width:1120px; margin:0 auto; }
  .service-card { background:var(--pale); border:1px solid var(--border); border-radius:16px; overflow:hidden; transition:transform 0.18s ease, box-shadow 0.18s ease; }
  .service-card:hover { transform:translateY(-8px); box-shadow:0 16px 40px rgba(91,45,142,0.16); }
  .service-image-wrapper { height:160px; overflow:hidden; }
  .service-image { width:100%; height:100%; object-fit:cover; transition:transform 0.22s ease; }
  .service-card:hover .service-image { transform:scale(1.06); }
  .service-content { padding:16px; }
  .service-content h4 { font-size:14px; font-weight:700; color:var(--purple); margin-bottom:6px; }
  .service-content p { font-size:12px; color:var(--gray-mid); line-height:1.52; }

  /* EMOTIONAL STRIP */
  .emotional-strip { display:grid; grid-template-columns:1fr 1fr; gap:0; max-width:1120px; margin:0 auto 48px; border-radius:20px; overflow:hidden; box-shadow:0 16px 56px rgba(48,14,80,0.24); position:relative; }
  .emotion-panel { position:relative; height:280px; overflow:hidden; }
  .emotion-panel img { width:100%; height:100%; object-fit:cover; object-position:center 25%; transition:transform 0.7s ease; }
  .emotion-panel:hover img { transform:scale(1.05); }
  .emotion-overlay { position:absolute; inset:0; display:flex; flex-direction:column; justify-content:flex-end; padding:24px; }
  .emotion-overlay-dark { background:linear-gradient(to top, rgba(10,1,22,0.97) 0%, rgba(20,4,38,0.62) 45%, transparent 100%); }
  .emotion-overlay-hope { background:linear-gradient(to top, rgba(48,14,80,0.95) 0%, rgba(74,24,120,0.52) 55%, transparent 100%); }
  .emotion-label { font-size:9px; font-weight:700; letter-spacing:2.5px; text-transform:uppercase; color:var(--pink); margin-bottom:6px; }
  .emotion-quote { font-family:'Lora',serif; font-size:16px; color:#fff; line-height:1.52; font-style:italic; }
  .emotion-quote span { display:block; font-family:'Noto Sans Tamil',sans-serif; font-size:13px; color:rgba(210,180,240,0.82); font-style:normal; margin-top:6px; line-height:1.65; }
  .emotion-divider { position:absolute; left:50%; top:10%; bottom:10%; width:2px; z-index:5; background:linear-gradient(to bottom, transparent 0%, rgba(196,125,192,0.65) 30%, rgba(196,125,192,0.65) 70%, transparent 100%); transform:translateX(-50%); }

  /* WHY + FORM */
  .why-form-section { padding:72px 40px; background:var(--pale); }
  .why-form-inner { display:grid; grid-template-columns:1fr 1fr; gap:48px; max-width:1120px; margin:0 auto; align-items:start; }
  .why-left h2 { font-family:'Lora',serif; font-size:30px; color:var(--purple); line-height:1.3; margin-bottom:14px; }
  .why-left p { font-size:14px; color:var(--gray-mid); line-height:1.72; margin-bottom:24px; }
  .benefit-list { margin-bottom:28px; display:flex; flex-direction:column; gap:12px; }
  .benefit-item { display:flex; align-items:flex-start; gap:10px; }
  .benefit-check { width:24px; height:24px; min-width:24px; background:var(--purple); border-radius:7px; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:700; font-size:12px; }
  .benefit-item span { font-size:14px; color:var(--gray-dark); line-height:1.5; }
  .wa-btn { display:inline-flex; align-items:center; gap:9px; background:var(--green-wa); color:#fff; padding:13px 24px; border-radius:50px; font-weight:700; font-size:15px; text-decoration:none; transition:all 0.25s; box-shadow:0 4px 18px rgba(37,211,102,0.28); }
  .wa-btn:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(37,211,102,0.42); }
  .wa-num { font-size:18px; font-weight:700; color:var(--purple); margin-top:10px; }

  /* Form */
  .form-box { background:#fff; border-radius:20px; border:1px solid var(--border); overflow:hidden; box-shadow:0 10px 40px rgba(91,45,142,0.1); }
  .form-header { background:var(--purple); padding:20px 24px; }
  .form-header h3 { color:#fff; font-size:20px; font-weight:700; }
  .form-header p { color:rgba(255,255,255,0.72); font-size:12px; margin-top:4px; }
  .form-body { padding:24px; }
  .form-grid { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:14px; }
  .form-group label { display:block; font-size:10px; font-weight:700; color:var(--gray-mid); margin-bottom:6px; text-transform:uppercase; letter-spacing:0.5px; }
  .form-group input, .form-group select { width:100%; padding:11px 13px; border:1.5px solid var(--border); border-radius:9px; font-size:13px; color:var(--gray-dark); background:var(--gray-light); outline:none; transition:border-color 0.2s, background 0.2s; font-family:'Inter',sans-serif; }
  .form-group input:focus, .form-group select:focus { border-color:var(--purple); background:#fff; box-shadow:0 0 0 3px rgba(91,45,142,0.07); }
  .form-group input.input-error, .form-group select.input-error { border-color:#e11d48; }
  .error-msg { font-size:10px; color:#e11d48; margin-top:4px; display:block; }
  .phone-wrap { display:flex; align-items:center; }
  .phone-prefix { background:var(--purple); color:#fff; padding:11px 11px; font-size:13px; font-weight:700; border-radius:9px 0 0 9px; border:1.5px solid var(--purple); white-space:nowrap; }
  .phone-wrap input { border-radius:0 9px 9px 0; border-left:none; }
  .form-submit { width:100%; padding:14px; background:var(--purple); color:#fff; border:none; border-radius:50px; font-size:15px; font-weight:700; cursor:pointer; margin-top:5px; transition:all 0.25s; box-shadow:0 5px 20px rgba(91,45,142,0.22); font-family:'Inter',sans-serif; }
  .form-submit:hover { background:var(--purple-dark); transform:translateY(-2px); }
  .form-note { text-align:center; font-size:11px; color:var(--gray-mid); margin-top:10px; }
  .form-success { padding:40px 24px; text-align:center; }
  .form-success-icon { width:56px; height:56px; border-radius:50%; background:var(--purple); color:#fff; font-size:24px; font-weight:700; display:flex; align-items:center; justify-content:center; margin:0 auto 16px; }
  .form-success h4 { font-size:20px; color:var(--purple); margin-bottom:6px; }
  .form-success p { color:var(--gray-mid); font-size:14px; }

  /* HAPPY PARENTS */
  .happy-section { background:linear-gradient(135deg, var(--purple-hero), #4a1878); padding:72px 40px; }
  .happy-header { text-align:center; margin-bottom:40px; }
  .happy-section h2 { font-family:'Lora',serif; font-size:36px; color:#fff; margin-bottom:10px; line-height:1.3; }
  .happy-section .happy-header p { font-size:15px; color:rgba(210,180,240,0.85); }
  .happy-big-stats { display:flex; align-items:center; justify-content:center; gap:0; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.14); border-radius:18px; padding:28px 40px; max-width:640px; margin:0 auto 44px; backdrop-filter:blur(8px); }
  .hbs-item { text-align:center; flex:1; }
  .hbs-num { font-size:36px; font-weight:700; color:#fff; line-height:1; }
  .hbs-label { font-size:12px; color:rgba(210,180,240,0.78); margin-top:5px; }
  .hbs-div { width:1px; height:52px; background:rgba(255,255,255,0.18); }
  .happy-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; max-width:1120px; margin:0 auto; }
  .happy-card { background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.14); border-radius:16px; overflow:hidden; backdrop-filter:blur(6px); transition:transform 0.3s, box-shadow 0.3s; }
  .happy-card:hover { transform:translateY(-6px); box-shadow:0 16px 40px rgba(0,0,0,0.28); }
  .happy-card-img { height:150px; position:relative; overflow:hidden; }
  .happy-card-img img { width:100%; height:100%; object-fit:cover; transition:transform 0.4s; }
  .happy-card:hover .happy-card-img img { transform:scale(1.07); }
  .happy-card-overlay { position:absolute; inset:0; background:linear-gradient(to top, rgba(48,14,80,0.68) 0%, transparent 58%); }
  .happy-card-badge { position:absolute; bottom:9px; left:9px; background:var(--pink); color:#fff; font-size:10px; font-weight:700; padding:3px 9px; border-radius:10px; }
  .happy-card-info { padding:12px 14px; }
  .happy-card-info h4 { font-size:13px; font-weight:700; color:#fff; margin-bottom:3px; }
  .happy-card-info p { font-size:11px; color:rgba(210,180,240,0.72); }

  /* ══ STATISTICS — white bg always, no transparency on mobile ══ */
  .stats-section { padding:72px 40px; position:relative; overflow:hidden; background:#ffffff; }
  .stats-bg-img { position:absolute; inset:0; z-index:0; background-image:url('public/lonely_old_man.jpg'); background-size:cover; background-position:center 30%; opacity:0.35; pointer-events:none; }
  .stats-section .section-header { position:relative; z-index:1; }
  .stats-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; max-width:1020px; margin:0 auto; position:relative; z-index:1; }
  .stat-card { position:relative; background:#ffffff; border:1px solid var(--border); border-radius:18px; padding:28px 24px; transition:transform 0.3s, box-shadow 0.3s; z-index:2; }
  .stat-card:hover { transform:translateY(-5px); box-shadow:0 14px 40px rgba(91,45,142,0.1); }
  .stat-card-header { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:14px; }
  .stat-card .big-num { font-size:40px; font-weight:700; color:var(--purple); line-height:1; }
  .stat-card .region { font-size:13px; font-weight:700; color:var(--purple); }
  .stat-desc { font-size:13px; color:var(--gray-mid); margin-bottom:18px; line-height:1.52; }
  .mini-chart { display:flex; align-items:flex-end; gap:7px; height:72px; margin-bottom:8px; }
  .bar { flex:1; border-radius:5px 5px 0 0; background:var(--purple); opacity:0.32; }
  .bar.highlight { background:var(--pink); opacity:1; }
  .bar-labels { display:flex; gap:7px; margin-bottom:12px; }
  .bar-labels span { flex:1; font-size:9px; color:var(--gray-mid); text-align:center; }
  .stat-note { font-size:11px; color:var(--gray-mid); font-style:italic; }
  .stats-quote-banner { position:relative; z-index:1; max-width:1020px; margin:40px auto 0; background:linear-gradient(135deg, var(--purple-hero) 0%, #4a1878 100%); border-radius:16px; padding:28px 36px; display:flex; align-items:center; gap:24px; overflow:hidden; }
  .stats-quote-banner::before { content:''; position:absolute; top:-36px; right:-36px; width:180px; height:180px; border-radius:50%; background:radial-gradient(circle, rgba(196,125,192,0.25) 0%, transparent 70%); }
  .stats-quote-banner-img { flex:0 0 68px; width:68px; height:68px; border-radius:50%; overflow:hidden; border:2px solid rgba(196,125,192,0.45); flex-shrink:0; }
  .stats-quote-banner-img img { width:100%; height:100%; object-fit:cover; object-position:center 20%; }
  .stats-quote-text { flex:1; }
  .stats-quote-text blockquote { font-family:'Lora',serif; font-size:15px; color:#fff; font-style:italic; line-height:1.62; margin-bottom:6px; }
  .stats-quote-text cite { font-size:10px; color:rgba(210,180,240,0.6); letter-spacing:0.5px; text-transform:uppercase; font-style:normal; }
  .stats-quote-cta { flex-shrink:0; }
  .stats-quote-cta a { display:inline-block; background:var(--pink); color:#fff; padding:10px 20px; border-radius:50px; font-weight:700; font-size:13px; text-decoration:none; transition:all 0.25s; white-space:nowrap; }
  .stats-quote-cta a:hover { background:#b56ab0; transform:translateY(-2px); }

  /* ══════════════════════════════════════════════════════════
     ALL SERVICES — balanced collage with centered images
  ══════════════════════════════════════════════════════════ */
  .all-services { padding:72px 40px; background:#fff; }
  .allsvc-inner { display:grid; grid-template-columns:1fr 1fr; gap:56px; max-width:1120px; margin:0 auto; align-items:center; }

  /* ── Collage wrapper: balanced layout with centered images ── */
  .allsvc-collage {
    position: relative;
    height: 500px;
    background: linear-gradient(135deg, var(--purple-hero) 0%, #4a1878 100%);
    border-radius: 24px;
    overflow: hidden;
    flex-shrink: 0;
    box-shadow: 0 20px 60px rgba(91,45,142,0.2);
  }

  /* L-shaped decorative corners - opposite corners, sharp edges forming frame, facing inward toward image center */
  .collage-l-corner {
    position: absolute;
    z-index: 1;
  }
  .collage-l-corner.bottom-left {
    bottom: 0;
    left: 0;
    width: 80px;
    height: 200px;
  }
  .collage-l-corner.bottom-left::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 80px;
    height: 200px;
    background: var(--teal-dark);
  }
  .collage-l-corner.bottom-left::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 200px;
    height: 80px;
    background: var(--teal-dark);
  }
  .collage-l-corner.top-right {
    top: 0;
    right: 0;
    width: 80px;
    height: 200px;
  }
  .collage-l-corner.top-right::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 80px;
    height: 200px;
    background: var(--teal-dark);
  }
  .collage-l-corner.top-right::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 200px;
    height: 80px;
    background: var(--teal-dark);
  }

  /* Badge — top-center, floating above */
  .allsvc-badge {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    background: rgba(255,255,255,0.95);
    color: var(--purple);
    border-radius: 40px;
    padding: 10px 24px;
    box-shadow: 0 8px 28px rgba(0,0,0,0.2);
    text-align: center;
    white-space: nowrap;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .allsvc-badge strong { font-size:22px; font-weight:800; line-height:1; color:var(--purple); }
  .allsvc-badge span { font-size:13px; font-weight:600; }

  /* Photo frame - centered in the collage */
  .collage-photo-frame {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 92%;
    height: 72%;
    z-index: 5;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0,0,0,0.45);
    border: 4px solid rgba(255,255,255,0.15);
  }

  /* Scrolling images inside the frame - centered */
  .collage-img-track {
    display: flex;
    height: 100%;
    transition: transform 0.8s cubic-bezier(0.4,0,0.2,1);
    will-change: transform;
  }

  .collage-img-slide {
    flex: 0 0 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
  }

  .collage-img-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }

  /* Dot navigation - centered at bottom */
  .collage-dots {
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    padding: 8px 16px;
    background: rgba(0,0,0,0.2);
    backdrop-filter: blur(8px);
    border-radius: 30px;
  }

  .collage-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: rgba(255,255,255,0.35);
    border: none;
    cursor: pointer;
    transition: all 0.3s;
    padding: 0;
  }

  .collage-dot:hover { background: rgba(255,255,255,0.6); }
  .collage-dot.active { background: #fff; width: 20px; border-radius: 3px; box-shadow: 0 2px 8px rgba(0,0,0,0.3); }

  /* Services checklist — always 2 cols */
  .services-list { display:grid; grid-template-columns:1fr 1fr; gap:11px; }
  .svc-item { display:flex; align-items:center; gap:11px; background:var(--pale); border:1px solid var(--border); border-radius:11px; padding:13px 15px; transition:all 0.22s; }
  .svc-item:hover { border-color:var(--purple); background:#ede0f8; transform:translateX(4px); }
  .svc-icon-check { width:26px; height:26px; min-width:26px; background:var(--purple); border-radius:50%; display:flex; align-items:center; justify-content:center; color:#fff; font-size:11px; font-weight:700; }
  .svc-item span { font-size:13px; font-weight:600; color:var(--gray-dark); }

  /* Services checklist — always 2 cols */
  .services-list { display:grid; grid-template-columns:1fr 1fr; gap:11px; }
  .svc-item { display:flex; align-items:center; gap:11px; background:var(--pale); border:1px solid var(--border); border-radius:11px; padding:13px 15px; transition:all 0.22s; }
  .svc-item:hover { border-color:var(--purple); background:#ede0f8; transform:translateX(4px); }
  .svc-icon-check { width:26px; height:26px; min-width:26px; background:var(--purple); border-radius:50%; display:flex; align-items:center; justify-content:center; color:#fff; font-size:11px; font-weight:700; }
  .svc-item span { font-size:13px; font-weight:600; color:var(--gray-dark); }

  /* COMPETITIVE ADVANTAGE */
  .adv-section { padding:72px 40px; position:relative; overflow:hidden; background:var(--pale); }
  .adv-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:18px; max-width:1120px; margin:0 auto; position:relative; z-index:1; }
  .adv-card { background:#fff; border:1px solid var(--border); border-radius:18px; overflow:hidden; box-shadow:0 3px 16px rgba(91,45,142,0.05); transition:transform 0.32s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.32s; }
  .adv-card:hover { transform:translateY(-9px); box-shadow:0 14px 36px rgba(91,45,142,0.14); }
  .adv-top { background:var(--purple); padding:24px; text-align:center; }
  .adv-tag { display:inline-block; background:rgba(255,255,255,0.14); color:#fff; font-size:18px; font-weight:900; padding:7px 16px; border-radius:9px; margin-bottom:10px; letter-spacing:1px; }
  .adv-title { font-family:'Noto Sans Tamil',sans-serif; font-size:15px; font-weight:700; color:#fff; line-height:1.38; }
  .adv-body { padding:18px; }
  .adv-body p { font-size:12px; color:var(--gray-mid); line-height:1.62; }
  .adv-testimonial { position:relative; z-index:1; max-width:1120px; margin:36px auto 0; display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
  .adv-testi-card { background:#fff; border:1px solid var(--border); border-radius:14px; padding:18px; display:flex; gap:12px; align-items:flex-start; }
  .adv-testi-avatar { width:44px; height:44px; border-radius:50%; overflow:hidden; flex-shrink:0; border:2px solid var(--border); }
  .adv-testi-avatar img { width:100%; height:100%; object-fit:cover; object-position:center 15%; }
  .adv-testi-body p { font-size:12px; color:var(--gray-mid); line-height:1.62; font-style:italic; }

  /* PRICING */
  .package-section { padding:72px 40px; position:relative; overflow:hidden; }
  .pkg-bg-img { position:absolute; inset:0; z-index:0; background-image:url('public/hand_in_hand.jpg'); background-size:cover; background-position:center 40%; }
  .pkg-bg-overlay { position:absolute; inset:0; z-index:1; background:linear-gradient(135deg, rgba(15,3,28,0.97) 0%, rgba(48,14,80,0.95) 50%, rgba(74,24,120,0.9) 100%); }
  .package-section .section-header { position:relative; z-index:2; }
  .pkg-card { max-width:660px; margin:0 auto; background:#fff; border-radius:24px; overflow:hidden; box-shadow:0 20px 72px rgba(0,0,0,0.48); position:relative; z-index:2; }
  .pkg-header { background:var(--purple); padding:32px 36px; display:flex; justify-content:space-between; align-items:center; }
  .pkg-header h3 { font-size:24px; font-weight:700; color:#fff; }
  .pkg-price .amount { font-size:50px; font-weight:700; color:var(--cream); line-height:1; }
  .pkg-price .period { font-size:14px; color:rgba(255,255,255,0.68); }
  .pkg-body { padding:32px 36px; }
  .pkg-features { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:28px; }
  .pkg-feat { display:flex; align-items:center; gap:9px; font-size:13px; color:var(--gray-dark); }
  .pkg-feat-check { width:20px; height:20px; min-width:20px; background:var(--purple); border-radius:50%; display:flex; align-items:center; justify-content:center; color:#fff; font-size:11px; }
  .pkg-cta { width:100%; padding:16px; background:var(--purple); color:#fff; border:none; border-radius:50px; font-size:17px; font-weight:700; cursor:pointer; text-decoration:none; display:block; text-align:center; transition:all 0.3s ease; box-shadow:0 7px 28px rgba(91,45,142,0.28); }
  .pkg-cta:hover { background:var(--purple-dark); transform:translateY(-2px); }
  .pkg-sub-cta { text-align:center; margin-top:14px; font-size:13px; color:var(--gray-mid); }
  .pkg-sub-cta a { color:var(--green-wa); font-weight:700; text-decoration:none; }

  /* FAQ */
  .faq-section { padding:72px 40px; background:#fff; }
  .faq-list { max-width:840px; margin:0 auto; display:flex; flex-direction:column; gap:12px; }
  .faq-item { border:1.5px solid var(--border); border-radius:14px; overflow:hidden; transition:border-color 0.25s; }
  .faq-item.open { border-color:var(--purple); }
  .faq-q { display:flex; align-items:center; padding:18px 22px; cursor:pointer; background:var(--pale); transition:background 0.2s; }
  .faq-q:hover { background:#ede0f8; }
  .faq-num { width:30px; height:30px; min-width:30px; background:var(--purple); color:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:13px; margin-right:14px; }
  .faq-q-text { font-family:'Noto Sans Tamil',sans-serif; font-size:16px; font-weight:700; color:var(--purple); flex:1; }
  .faq-arrow { font-size:18px; color:var(--purple); transition:transform 0.3s; }
  .faq-item.open .faq-arrow { transform:rotate(180deg); }
  .faq-a { display:none; padding:18px 22px; background:#fff; border-top:1px solid var(--border); }
  .faq-item.open .faq-a { display:block; }
  .faq-a p { font-family:'Noto Sans Tamil',sans-serif; font-size:15px; color:var(--gray-mid); line-height:1.82; }

  /* FOOTER */
  footer { background:var(--footer-bg); }
  .footer-top { padding:48px 40px; display:grid; grid-template-columns:2fr 1fr 1fr; gap:40px; border-bottom:1px solid rgba(255,255,255,0.07); }
  .footer-logo-row { display:flex; align-items:center; gap:14px; margin-bottom:14px; }
  .footer-logo-row img { height:120px; width:auto; object-fit:contain; }
  .footer-brand-col h4 { font-size:18px; font-weight:700; color:var(--pink); }
  .footer-brand-col p { font-size:12px; color:rgba(160,140,190,0.72); margin-top:2px; }
  .footer-tagline { font-size:14px; color:rgba(200,170,230,0.58); font-style:italic; margin-top:7px; }
  .footer-links-col h5, .footer-contact-col h5 { font-size:12px; font-weight:700; color:rgba(255,255,255,0.48); letter-spacing:1px; text-transform:uppercase; margin-bottom:14px; }
  .footer-links-col a, .footer-contact-col a { display:block; font-size:13px; color:rgba(200,170,230,0.78); text-decoration:none; margin-bottom:9px; transition:color 0.2s; }
  .footer-links-col a:hover, .footer-contact-col a:hover { color:#fff; }
  .footer-social { display:flex; gap:16px; margin-top:18px; flex-wrap:wrap; align-items:center; }
  .social-icon { width:24px; height:24px; background:transparent; border:none; color:rgba(200,170,230,0.6); display:flex; align-items:center; justify-content:center; text-decoration:none; transition:all 0.2s ease; }
  .social-icon svg { width:20px; height:20px; }
  .social-icon:hover { color:#fff; transform:translateY(-3px); }
  .social-wa:hover { color:var(--green-wa); }
  .footer-bottom { padding:18px 40px; display:flex; align-items:center; justify-content:space-between; }
  .footer-bottom p { font-size:12px; color:rgba(160,140,190,0.48); }
  .footer-bottom-links { display:flex; gap:22px; }
  .footer-link-btn { background:none; border:none; cursor:pointer; font-size:12px; color:rgba(160,140,190,0.58); transition:color 0.2s; font-family:'Inter',sans-serif; padding:0; }
  .footer-link-btn:hover { color:var(--pink); }

  /* TERMS MODAL */
  .terms-overlay { position:fixed; inset:0; z-index:9999; background:rgba(0,0,0,0.62); backdrop-filter:blur(4px); display:flex; align-items:center; justify-content:center; padding:20px; }
  .terms-modal { background:#fff; border-radius:22px; max-width:600px; width:100%; max-height:80vh; overflow-y:auto; padding:36px; position:relative; }
  .terms-close { position:absolute; top:18px; right:18px; background:var(--pale); border:1px solid var(--border); border-radius:50%; width:32px; height:32px; cursor:pointer; font-size:14px; color:var(--gray-mid); transition:all 0.2s; display:flex; align-items:center; justify-content:center; }
  .terms-close:hover { background:#e11d48; color:#fff; border-color:#e11d48; }
  .terms-modal h2 { font-family:'Lora',serif; font-size:26px; color:var(--purple); margin-bottom:20px; }
  .terms-content h4 { font-size:14px; font-weight:700; color:var(--gray-dark); margin:18px 0 7px; }
  .terms-content p { font-size:13px; color:var(--gray-mid); line-height:1.68; }

  /* WA FLOAT */
  .wa-float-wrapper { position:fixed; z-index:999; }
  .floating-whatsapp { width:54px; height:54px; background:var(--green-wa); border-radius:50%; display:flex; align-items:center; justify-content:center; text-decoration:none; opacity:0; transform:scale(0.6); transition:opacity 0.4s, transform 0.4s; cursor:grab; position:absolute; }
  .floating-whatsapp.visible { opacity:1; transform:scale(1); }
  .floating-whatsapp:hover { transform:scale(1.08); }
  .floating-whatsapp:active { cursor:grabbing; }
  .wa-ring { position:absolute; border-radius:50%; border:1.5px solid rgba(37,211,102,0.68); animation:waRing 2.2s ease-out infinite; opacity:0; pointer-events:none; }
  .wa-ring-1 { width:64px; height:64px; animation-delay:0s; }
  .wa-ring-2 { width:80px; height:80px; animation-delay:0.65s; }
  .wa-ring-3 { width:96px; height:96px; animation-delay:1.3s; }
  @keyframes waRing { 0%{transform:scale(0.85);opacity:0.52;} 100%{transform:scale(1.35);opacity:0;} }

  /* ANIMATIONS */
  @keyframes fadeSlideUp { from{opacity:0;transform:translateY(24px);} to{opacity:1;transform:translateY(0);} }
  @keyframes pulse { 0%,100%{box-shadow:0 0 0 0 rgba(37,211,102,0.5);} 50%{box-shadow:0 0 0 6px rgba(37,211,102,0);} }

  /* HORIZONTAL SCROLL */
  .h-scroll-wrap { overflow-x:auto; -webkit-overflow-scrolling:touch; scrollbar-width:none; padding-bottom:10px; }
  .h-scroll-wrap::-webkit-scrollbar { display:none; }
  .h-scroll-inner { display:flex; gap:14px; width:max-content; padding:0 16px 6px; }
  .services-h-scroll, .stats-h-scroll, .adv-h-scroll, .happy-h-scroll { display:none; }

  /* ════════ RESPONSIVE ════════ */
  @media (max-width:1100px) {
    .adv-grid { grid-template-columns:repeat(2,1fr); }
    .adv-testimonial { grid-template-columns:1fr 1fr; }
    .footer-top { grid-template-columns:1fr 1fr; }
    .footer-brand-col { grid-column:1/3; }
    .services-grid { grid-template-columns:repeat(2,1fr); }
    .happy-grid { grid-template-columns:repeat(2,1fr); }
    .allsvc-collage { height:420px; }
  }

  @media (max-width:900px) {
    .hero-inner { padding:0 32px; }
    .hero-headline { font-size:38px; }
    .hero-dots { left:50%; transform:translateX(-50%); bottom:16px; }
    .why-form-inner { grid-template-columns:1fr; gap:36px; }
    .pkg-features { grid-template-columns:1fr; }
    .adv-testimonial { display:none; }
    .allsvc-inner { grid-template-columns:1fr; gap:32px; }
    .allsvc-collage { height:380px; }
    .stats-quote-banner { flex-direction:column; text-align:center; align-items:center; gap:16px; }
    .stats-quote-cta { width:100%; text-align:center; }
  }

  @media (max-width:768px) {
    nav { padding:0 14px; }
    .nav-links { display:none; }
    .nav-cta { display:none; }
    .hamburger { display:flex; }

    .hero { height:auto; min-height:auto; max-height:none; }
    .hero-inner { padding:56px 20px 64px; justify-content:flex-start; }
    .hero-left { max-width:100%; }
    .hero-headline { font-size:30px; }
    .hero-quote-tamil { font-size:14px; }
    .hero-body { font-size:13px; max-width:100%; }
    .hero-stat .num { font-size:20px; }
    .hero-stat { padding-right:14px; margin-right:14px; }
    .hero-dots { bottom:16px; }
    .cta-btn-primary { font-size:14px; padding:12px 22px; }
    .cta-btn-wa { font-size:13px; padding:12px 18px; }

    .emotional-strip { grid-template-columns:1fr; border-radius:14px; margin-bottom:24px; }
    .emotion-panel { height:190px; }
    .emotion-divider { display:none; }

    .services-section, .why-form-section, .happy-section,
    .stats-section, .all-services, .adv-section, .package-section, .faq-section { padding:52px 16px; }

    /* Stats section — white bg cards, bg image visible but not affecting card transparency */
    .stats-section { background:#ffffff !important; }
    .stats-bg-img { display:block; opacity:0.15; }

    /* Services h-scroll on mobile */
    .services-grid { display:none; }
    .services-h-scroll { display:block !important; }
    .services-h-card { width:220px; flex:0 0 220px; background:var(--pale); border:1px solid var(--border); border-radius:16px; overflow:hidden; }
    .services-h-card .service-image-wrapper { height:140px; }
    .services-h-card .service-image { width:100%; height:100%; object-fit:cover; }
    .services-h-card .service-content { padding:14px; }
    .services-h-card h4 { font-size:13px; font-weight:700; color:var(--purple); margin-bottom:5px; }
    .services-h-card p { font-size:11px; color:var(--gray-mid); line-height:1.48; }

    /* Stats h-scroll */
    .stats-grid { display:none; }
    .stats-h-scroll { display:block !important; }
    .stat-card-mob { width:260px; flex:0 0 260px; background:#ffffff; position:relative; z-index:2; }
    .stats-quote-banner { display:none; }

    /* Happy h-scroll */
    .happy-grid { display:none; }
    .happy-h-scroll { display:block !important; }
    .happy-card-mob { width:190px; flex:0 0 190px; }
    .happy-section { padding:52px 14px; }
    .happy-section h2 { font-size:24px; }
    .happy-big-stats { padding:18px 14px; flex-wrap:wrap; gap:14px; }
    .hbs-num { font-size:26px; }
    .hbs-div { display:none; }

    /* Adv h-scroll */
    .adv-grid { display:none; }
    .adv-h-scroll { display:block !important; }
    .adv-card-mob { width:240px; flex:0 0 240px; }

    /* All services — mobile: full-width collage then list */
    .allsvc-inner { grid-template-columns:1fr; gap:24px; }
    .allsvc-collage {
      height:280px;
      border-radius:16px;
      width:100%;
    }
    .collage-l-corner.bottom-left {
      bottom: 0;
      left: 0;
      width: 70px;
      height: 140px;
    }
    .collage-l-corner.bottom-left::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 70px;
      height: 140px;
      background: var(--teal-dark);
    }
    .collage-l-corner.bottom-left::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 140px;
      height: 70px;
      background: var(--teal-dark);
    }
    .collage-l-corner.top-right {
      top: 0;
      right: 0;
      width: 70px;
      height: 140px;
    }
    .collage-l-corner.top-right::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 70px;
      height: 140px;
      background: var(--teal-dark);
    }
    .collage-l-corner.top-right::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 140px;
      height: 70px;
      background: var(--teal-dark);
    }
    .collage-l-corner.bottom-left::before,
    .collage-l-corner.bottom-left::after,
    .collage-l-corner.top-right::before,
    .collage-l-corner.top-right::after {
      border-radius: 0;
    }
    .collage-photo-frame {
      border-radius:12px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 90%;
      height: 70%;
    }
    .allsvc-badge {
      top: 15px;
      padding: 8px 18px;
      font-size: 12px;
      border-radius: 30px;
    }
    .allsvc-badge strong { font-size: 18px; }
    /* checklist — 2-column on mobile, bigger cards */
    .services-list { grid-template-columns:1fr 1fr !important; gap:10px; }
    .svc-item { padding:14px 12px; min-height:52px; }
    .svc-item span { font-size:12px; line-height:1.4; }
    .svc-icon-check { width:24px; height:24px; min-width:24px; font-size:11px; }

    /* Pkg */
    .pkg-header { flex-direction:column; text-align:center; gap:14px; }
    .pkg-body { padding:24px 18px; }
    .pkg-features { grid-template-columns:1fr; }

    /* FAQ */
    .faq-q-text { font-size:14px; }

    /* Footer */
    .footer-top { padding:32px 16px; grid-template-columns:1fr; gap:24px; }
    .footer-brand-col { grid-column:auto; }
    .footer-bottom { flex-direction:column; gap:10px; padding:16px; text-align:center; }
    .footer-logo-row img { height:120px; }

    .section-title { font-size:24px; }
    .why-left h2 { font-size:24px; }
    .form-grid { grid-template-columns:1fr; }

    .floating-whatsapp { width:48px; height:48px; }
    .wa-ring-1 { width:58px; height:58px; }
    .wa-ring-2 { width:72px; height:72px; }
    .wa-ring-3 { width:86px; height:86px; }
  }

  @media (max-width:480px) {
    .hero-headline { font-size:26px; }
    .hero-stat .num { font-size:18px; }
    .section-title { font-size:20px; }
    .allsvc-collage { height:250px; }
    .collage-l-corner.bottom-left {
      bottom: 0;
      left: 0;
      width: 60px;
      height: 120px;
    }
    .collage-l-corner.bottom-left::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 60px;
      height: 120px;
      background: var(--teal-dark);
    }
    .collage-l-corner.bottom-left::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 120px;
      height: 60px;
      background: var(--teal-dark);
    }
    .collage-l-corner.top-right {
      top: 0;
      right: 0;
      width: 60px;
      height: 120px;
    }
    .collage-l-corner.top-right::before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 60px;
      height: 120px;
      background: var(--teal-dark);
    }
    .collage-l-corner.top-right::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 120px;
      height: 60px;
      background: var(--teal-dark);
    }
    .collage-l-corner.bottom-left::before,
    .collage-l-corner.bottom-left::after,
    .collage-l-corner.top-right::before,
    .collage-l-corner.top-right::after {
      border-radius: 0;
    }
    .collage-photo-frame {
      width: 88%;
      height: 68%;
    }
    .services-list { grid-template-columns:1fr 1fr !important; }
    .svc-item { padding:12px 10px; min-height:48px; }
    .svc-item span { font-size:11px; }
  }
`;

/* ── WA FLOAT ── */
const WaFloat = () => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ bottom: 28, right: 20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const wrapperRef = useRef(null);

  useEffect(() => { const t = setTimeout(() => setVisible(true), 1000); return () => clearTimeout(t); }, []);

  useEffect(() => {
    const savedPos = localStorage.getItem('waFloatPosition');
    if (savedPos) {
      setPosition(JSON.parse(savedPos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('waFloatPosition', JSON.stringify(position));
  }, [position]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setDragOffset({ x: 0, y: 0 });
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setDragStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
    setDragOffset({ x: 0, y: 0 });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStart.x + dragOffset.x;
      const dy = e.clientY - dragStart.y + dragOffset.y;

      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const maxX = window.innerWidth - 80;
      const maxY = window.innerHeight - 80;
      const minX = 20;
      const minY = 20;

      const newX = Math.max(minX, Math.min(dx, maxX));
      const newY = Math.max(minY, Math.min(dy, maxY));

      // Calculate position from edges
      const newRight = Math.max(20, window.innerWidth - newX - 54);
      const newBottom = Math.max(20, window.innerHeight - newY - 54);

      setPosition({ right: newRight, bottom: newBottom });
    };

    const handleMouseMoveTouch = (e) => {
      if (!isDragging) return;
      const dx = e.touches[0].clientX - dragStart.x + dragOffset.x;
      const dy = e.touches[0].clientY - dragStart.y + dragOffset.y;

      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const maxX = window.innerWidth - 80;
      const maxY = window.innerHeight - 80;
      const minX = 20;
      const minY = 20;

      const newX = Math.max(minX, Math.min(dx, maxX));
      const newY = Math.max(minY, Math.min(dy, maxY));

      const newRight = Math.max(20, window.innerWidth - newX - 54);
      const newBottom = Math.max(20, window.innerHeight - newY - 54);

      setPosition({ right: newRight, bottom: newBottom });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setDragOffset({ x: 0, y: 0 });
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleMouseMoveTouch);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleMouseMoveTouch);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  return (
    <div ref={wrapperRef} className="wa-float-wrapper" style={{ position: 'fixed', bottom: `${position.bottom}px`, right: `${position.right}px`, zIndex: 999, cursor: isDragging ? 'grabbing' : 'grab' }}>
      <a href="https://wa.me/919499944939?text=Welcome%20to%2060%20plus%20community%21%20How%20can%20I%20help%20you%20%21" className={`floating-whatsapp ${visible ? 'visible' : ''}`} onMouseDown={handleMouseDown} onTouchStart={handleTouchStart} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        <span className="wa-ring wa-ring-1"></span><span className="wa-ring wa-ring-2"></span><span className="wa-ring wa-ring-3"></span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.85L.057 23.885l6.233-1.633A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.359-.214-3.7.97.988-3.607-.234-.37A9.818 9.818 0 1112 21.818z"/></svg>
      </a>
    </div>
  );
};

/* ── NAV ── */
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const links = ['Services','Why Us','Statistics','Pricing','FAQ'];
  const hrefs = ['#services','#why','#stats','#pricing','#faq'];
  return (
    <>
      <nav className={scrolled ? 'nav-scrolled' : ''}>
        <div className="nav-logo"><img src="/so.png" alt="SixtyPlus Global" /><span>SixtyPlus Global</span></div>
        <div className="nav-links">{links.map((l,i) => <a key={l} href={hrefs[i]}>{l}</a>)}</div>
        <a href="#consult" className="nav-cta">Talk to Us</a>
        <div className={`hamburger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}><span></span><span></span><span></span></div>
      </nav>
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {links.map((l,i) => (<a key={l} href={hrefs[i]} onClick={() => setMenuOpen(false)}>{l}</a>))}
        <a href="#consult" className="mob-cta" onClick={() => setMenuOpen(false)}>Talk to Us</a>
      </div>
    </>
  );
};

/* ── HERO ── */
const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActiveSlide(s => (s + 1) % heroBgImages.length), 6000);
    return () => clearInterval(t);
  }, []);
  return (
    <section className="hero">
      {heroBgImages.map((img, i) => (
        <div key={i} className={`hero-bg-slide ${i === activeSlide ? 'active' : ''}`} style={{ backgroundImage: `url(${img})` }} />
      ))}
      <div className="hero-vignette"></div>
      <div className="hero-glow"></div>
      <div className="hero-inner">
        <div className="hero-left">
          <div className="hero-eyebrow"><span className="hero-eyebrow-dot"></span>India's #1 Emerging Senior Care Platform</div>
          <h1 className="hero-headline">Your Parents Might Be <em>Hiding Something From You.</em></h1>
          <div className="hero-rule"></div>
          <div className="hero-quote-wrap">
            <span className="hero-quote-tamil tamil">"அம்மா வாய்ல 'நல்லா இருக்கேன்'னு சொல்றாங்க… கண்ணு வேற ஒண்ணு சொல்லுது."</span>
            <span className="hero-quote-eng">"Mom says she's fine… but her eyes tell a different story."</span>
          </div>
          <p className="hero-body">Silence, withdrawal, or irritation are often signs of emotional stress. We care before it becomes a crisis — from your parents' own home.</p>
          <div className="hero-stats">
            {[['50,000+','Families'],['600+','Doctors'],['100+','Tests']].map(([n,l]) => (
              <div className="hero-stat" key={l}><div className="num">{n}</div><div className="lbl">{l}</div></div>
            ))}
          </div>
          <div className="hero-cta-row">
            <a href="#consult" className="cta-btn-primary">Get Free Consultation</a>
            <a href="https://wa.me/919499944939?text=Welcome%20to%2060%20plus%20community%21%20How%20can%20I%20help%20you%20%21" className="cta-btn-wa" target="_blank" rel="noopener noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.85L.057 23.885l6.233-1.633A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.359-.214-3.7.97.988-3.607-.234-.37A9.818 9.818 0 1112 21.818z"/></svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
      <div className="hero-dots">
        {heroBgImages.map((_,i) => (
          <button key={i} className={`hero-dot ${i === activeSlide ? 'active' : ''}`} onClick={() => setActiveSlide(i)} aria-label={`Slide ${i+1}`} />
        ))}
      </div>
    </section>
  );
};

/* ── TRUST BAR — removed ── */

/* ── SERVICES ── */
const servicesData = [
  { img:'public/doctor2.jpg', title:'Doctor Home Visits', desc:'Qualified doctors visit your parents at home.' },
  { img:'public/physio_3.jpg', title:'Physiotherapy & Rehab', desc:'Professional physiotherapists for recovery.' },
  { img:'public/home_nurse_4.jpg', title:'Nurse Assistance', desc:'Trained nurses for daily care at home.' },
  { img:'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80', title:'24x7 Emergency Support', desc:'Round-the-clock emergency response.' },
  { img:'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&q=80', title:'Medicine Management', desc:'Timely reminders and medication tracking.' },
  { img:'public/ai-companion.jpg', title:'Companion AI', desc:'AI-powered engagement and safety monitoring.' },
  { img:'public/online_doctor.jpg', title:'Online Consultations', desc:'Video consultations with specialists.' },
  { img:'public/grabbar.jpg', title:'Senior Friendly Home', desc:'Home modifications for safety and ease.' },
];
const Services = () => (
  <section className="services-section" id="services">
    <div className="section-header">
      <div className="section-tag">What We Offer</div>
      <h2 className="section-title">Everything Your Parents Need</h2>
      <p className="section-sub">One plan. Complete care, delivered home.</p>
      <div className="section-line"></div>
    </div>
    <div className="services-grid">
      {servicesData.map((svc,i) => (
        <div className="service-card" key={i}>
          <div className="service-image-wrapper"><img src={svc.img} alt={svc.title} className="service-image" /></div>
          <div className="service-content"><h4>{svc.title}</h4><p>{svc.desc}</p></div>
        </div>
      ))}
    </div>
    <div className="services-h-scroll h-scroll-wrap">
      <div className="h-scroll-inner">
        {servicesData.map((svc,i) => (
          <div className="services-h-card" key={i}>
            <div className="service-image-wrapper"><img src={svc.img} alt={svc.title} className="service-image" /></div>
            <div className="service-content"><h4>{svc.title}</h4><p>{svc.desc}</p></div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ── WHY + FORM ── */
const WhyAndForm = () => {
  const { formData, errors, submitted, loading, showV2, handleChange, submitForm, handleV2Submit, resetForm, setFormData } = useContactForm();
  return (
    <section className="why-form-section" id="why">
      <div id="consult"></div>
      <div className="emotional-strip">
        <div className="emotion-panel">
          <img src="public/lonely_old_man.jpg" alt="Elderly man alone" />
          <div className="emotion-overlay emotion-overlay-dark">
            <div className="emotion-label">Right Now — This Moment</div>
            <div className="emotion-quote">He's waiting by the window.<span>உங்கள் அப்பா உங்களுக்காக காத்திருக்கிறார்.</span></div>
          </div>
        </div>
        <div className="emotion-divider"></div>
        <div className="emotion-panel">
          <img src="public/errands1.jpg" alt="Caretaker with elderly woman" style={{objectPosition:'center 20%'}} />
          <div className="emotion-overlay emotion-overlay-hope">
            <div className="emotion-label">After You Call Us</div>
            <div className="emotion-quote">She smiles again. Every single day.<span>அவங்க முகத்துல சிரிப்பு திரும்பும்.</span></div>
          </div>
        </div>
      </div>
      <div className="why-form-inner">
        <div className="why-left">
          <div className="section-tag">Why Choose Us</div>
          <h2>Why Families Trust<br />60Plus Global</h2>
          <div className="accent-line"></div>
          <p>Silence and withdrawal are signs. We help before it's too late. Our specialists provide emotional and medical support right at your parents' doorstep.</p>
          <div className="benefit-list">
            {['Psychologist & Psychiatrist Consultations','Emotional Support for Ageing Parents','Online & In-Person Sessions Available','Dedicated Care Manager for Your Family','Tamil-speaking Care Professionals','Trusted by NRI Families Globally'].map((item,i) => (
              <div className="benefit-item" key={i}><div className="benefit-check">✓</div><span>{item}</span></div>
            ))}
          </div>
          <a href="https://wa.me/919499944939?text=Welcome%20to%2060%20plus%20community%21%20How%20can%20I%20help%20you%20%21" className="wa-btn" target="_blank" rel="noopener noreferrer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.85L.057 23.885l6.233-1.633A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.359-.214-3.7.97.988-3.607-.234-.37A9.818 9.818 0 1112 21.818z"/></svg>
            WhatsApp Us Now
          </a>
          <div className="wa-num">+91 94999 44939</div>
        </div>
        <div id="consult">
          <div className="form-box">
            <div className="form-header"><h3>Get a Free Consultation</h3><p>Our care manager will call you within 24 hours</p></div>
            {submitted ? (
              <div className="form-success"><div className="form-success-icon">✓</div><h4>Thank you!</h4><p>Our care manager will reach out within 24 hours.</p></div>
            ) : (
              <form className="form-body" onSubmit={submitForm} noValidate>
                <div className="form-grid">
                  {[{field:'name',label:'Name *',type:'text',placeholder:'Your full name'},{field:'email',label:'Email ID *',type:'email',placeholder:'your@email.com'},{field:'location',label:'Location of Parent *',type:'text',placeholder:'City, Tamil Nadu'},{field:'age',label:'Age of Parent *',type:'number',placeholder:'e.g. 68'}].map(({field,label,type,placeholder}) => (
                    <div className="form-group" key={field}>
                      <label>{label}</label>
                      <input type={type} placeholder={placeholder} value={formData[field]} onChange={e => handleChange(field, e.target.value)} className={errors[field] ? 'input-error' : ''} min={field==='age'?40:undefined} max={field==='age'?120:undefined} />
                      {errors[field] && <span className="error-msg">{errors[field]}</span>}
                    </div>
                  ))}
                </div>
                <div className="form-group" style={{marginBottom:13}}>
                  <label>Phone Number *</label>
                  <div className="phone-wrap">
                    <span className="phone-prefix">+91</span>
                    <input type="tel" placeholder="10-digit number" maxLength={10} value={formData.phone} onChange={e => handleChange('phone', e.target.value.replace(/\D/g,''))} className={errors.phone ? 'input-error' : ''} />
                  </div>
                  {errors.phone && <span className="error-msg">{errors.phone}</span>}
                </div>
                <div className="form-group" style={{marginBottom:13}}>
                  <label>Mobility Status *</label>
                  <select value={formData.mobility} onChange={e => handleChange('mobility', e.target.value)} className={errors.mobility ? 'input-error' : ''}>
                    <option value="">Select status</option>
                    <option>Independent & Active</option>
                    <option>Needs Partial Assistance</option>
                    <option>Requires Full-time Care</option>
                  </select>
                  {errors.mobility && <span className="error-msg">{errors.mobility}</span>}
                </div>
                {showV2 && (
                  <div className="recaptcha-container" style={{marginBottom:13}}>
                    {import.meta.env.VITE_RECAPTCHA_V2_KEY ? (
                      <div>
                        <div className="g-recaptcha" data-sitekey={import.meta.env.VITE_RECAPTCHA_V2_KEY}></div>
                        <script async src="https://www.google.com/recaptcha/api.js"></script>
                      </div>
                    ) : (
                      <div style={{color: 'red', fontSize: '12px'}}>
                        ReCAPTCHA V2 key not configured. Contact admin.
                      </div>
                    )}
                    {errors.recaptcha && <span className="error-msg">{errors.recaptcha}</span>}
                  </div>
                )}
                {!showV2 && <button type="submit" className="form-submit" disabled={loading}>Talk to a Care Expert Today</button>}
                {showV2 && <button type="button" className="form-submit" onClick={handleV2Submit} disabled={loading}>Submit</button>}
                {loading && <span className="form-loading">Submitting...</span>}
                <p className="form-note">No spam. No pressure. 100% confidential.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── HAPPY PARENTS ── */
const happyFamilies = [
  { city:'Kolathur, Chennai', since:'2022', count:'520+', img:'public/errands1.jpg' },
  { city:'Kumbakonam', since:'2023', count:'210+', img:'https://images.unsplash.com/photo-1571772996211-2f02c9727629?w=400&q=80' },
  { city:'Thiruthuraipoondi', since:'2024', count:'95+', img:'public/old_person8.jpg' },
  { city:'Rameshwaram', since:'2023', count:'130+', img:'public/hand_in_hand.jpg' },
  { city:'Besant Nagar, Chennai', since:'2022', count:'340+', img:'public/caretender.jpg' },
  { city:'Vaniyampadi', since:'2024', count:'85+', img:'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80' },
  { city:'Chinna Salem', since:'2024', count:'70+', img:'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&q=80' },
  { city:'Uraiyur, Trichy', since:'2023', count:'160+', img:'public/physio1.jpg' },
];
const HappyParents = () => (
  <section className="happy-section">
    <div className="happy-header">
      <div className="section-tag tag-light">Our Reach</div>
      <h2>Our Parents Are Happy.<br />Their Families Are at Peace.</h2>
      <p>Trusted by families across Tamil Nadu — from Chennai to the smallest towns</p>
    </div>
    <div className="happy-big-stats">
      {[['50,000+','Families Supported'],['32','Districts Covered'],['4+ Yrs','Serving Tamil Nadu']].map(([n,l],i,arr) => (
        <span key={n} style={{display:'contents'}}>
          <div className="hbs-item"><div className="hbs-num">{n}</div><div className="hbs-label">{l}</div></div>
          {i < arr.length-1 && <div className="hbs-div"></div>}
        </span>
      ))}
    </div>
    <div className="happy-grid">
      {happyFamilies.map((loc,i) => (
        <div className="happy-card" key={i}>
          <div className="happy-card-img"><img src={loc.img} alt={loc.city} /><div className="happy-card-overlay"></div><div className="happy-card-badge">{loc.count} families</div></div>
          <div className="happy-card-info"><h4>{loc.city}</h4><p>Active since {loc.since}</p></div>
        </div>
      ))}
    </div>
    <div className="happy-h-scroll h-scroll-wrap">
      <div className="h-scroll-inner">
        {happyFamilies.map((loc,i) => (
          <div className="happy-card happy-card-mob" key={i}>
            <div className="happy-card-img"><img src={loc.img} alt={loc.city} /><div className="happy-card-overlay"></div><div className="happy-card-badge">{loc.count} families</div></div>
            <div className="happy-card-info"><h4>{loc.city}</h4><p>Active since {loc.since}</p></div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ── STATISTICS ── */
const statsData = [
  { region:'India', num:'138M', desc:'seniors live alone today. Projected to reach 300 million by 2050.', bars:[35,50,65,80,100] },
  { region:'South India', num:'34%', desc:'of seniors report living without regular family support. Rising 8% every 5 years.', bars:[30,44,58,72,90] },
  { region:'Tamil Nadu', num:'1 in 3', desc:'seniors lives alone. Tamil Nadu has the highest ageing population index in India.', bars:[38,52,65,80,100] },
];
const StatCard = ({stat}) => (
  <div className="stat-card stat-card-mob">
    <div className="stat-card-header"><div className="region">{stat.region}</div><div className="big-num">{stat.num}</div></div>
    <div className="stat-desc">{stat.desc}</div>
    <div className="mini-chart">{stat.bars.map((h,j) => (<div className={`bar ${j===stat.bars.length-1?'highlight':''}`} style={{height:h+'%'}} key={j}></div>))}</div>
    <div className="bar-labels">{['2010','2015','2020','2025','2030'].map(y=><span key={y}>{y}</span>)}</div>
    <p className="stat-note">Source: Census of India / UN Population Division</p>
  </div>
);
const Statistics = () => (
  <section className="stats-section" id="stats">
    <div className="stats-bg-img"></div>
    <div className="section-header">
      <div className="section-tag">The Reality</div>
      <h2 className="section-title">The Silent Crisis No One Is Talking About</h2>
      <p className="section-sub">Senior citizens living alone — the numbers are growing every year.</p>
      <div className="section-line"></div>
    </div>
    <div className="stats-grid">{statsData.map((s,i)=><StatCard stat={s} key={i}/>)}</div>
    <div className="stats-h-scroll h-scroll-wrap">
      <div className="h-scroll-inner">{statsData.map((s,i)=><StatCard stat={s} key={i}/>)}</div>
    </div>
    <div className="stats-quote-banner">
      <div className="stats-quote-banner-img"><img src="public/lonely_old_man.jpg" alt="Senior" /></div>
      <div className="stats-quote-text">
        <blockquote>"In Tamil Nadu, 1 in 3 elders lives alone. Their silence is not peace — it's the absence of someone to call."</blockquote>
        <cite>— Geriatric Care Research, Tamil Nadu 2024</cite>
      </div>
      <div className="stats-quote-cta"><a href="#why">Be That Someone →</a></div>
    </div>
  </section>
);

/* ── ALL SERVICES — exact reference collage with scrolling images ── */
const allSvcList = [
  'Doctor Home Visits','Emotional & Mental Health Support',
  'Medicine Management & Reminders','Blood Tests at Home',
  '24x7 Emergency Response','Companion AI — Always On',
  'Senior Citizen Medical Insurance','Digitalisation of Medical Records',
  'Home Safety Modifications','Free Senior Community',
];

const CollageSlider = () => {
  const [activeImg, setActiveImg] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveImg(s => (s + 1) % collageScrollImages.length);
    }, 3500);
    return () => clearInterval(intervalRef.current);
  }, []);

  const goTo = (i) => {
    setActiveImg(i);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveImg(s => (s + 1) % collageScrollImages.length);
    }, 3500);
  };

  return (
    <div className="allsvc-collage">
      {/* L-shaped corners with images */}
      <div className="collage-l-corner bottom-left"></div>
      <div className="collage-l-corner top-right"></div>

      {/* Badge — centered above the photo */}
      <div className="allsvc-badge">
        <strong>10+</strong>
        <span>Services Included</span>
      </div>

      {/* Photo frame - centered in the collage */}
      <div className="collage-photo-frame">
        <div
          className="collage-img-track"
          style={{ transform: `translateX(-${activeImg * 100}%)` }}
        >
          {collageScrollImages.map((src, i) => (
            <div className="collage-img-slide" key={i}>
              <img src={src} alt={`Care ${i+1}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Dot nav - centered at bottom */}
      <div className="collage-dots">
        {collageScrollImages.map((_,i) => (
          <button
            key={i}
            className={`collage-dot ${i === activeImg ? 'active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Image ${i+1}`}
          />
        ))}
      </div>
    </div>
  );
};

const AllServices = () => (
  <section className="all-services">
    <div className="section-header">
      <div className="section-tag">Complete Care</div>
      <h2 className="section-title">All Services by 60Plus Global</h2>
      <p className="section-sub">One membership. Everything your parent deserves.</p>
      <div className="section-line"></div>
    </div>
    <div className="allsvc-inner">
      {/* Collage — left column */}
      <CollageSlider />
      {/* Services checklist — right column, always 2-col */}
      <div className="allsvc-content-col">
        <div className="services-list">
          {allSvcList.map((svc,i) => (
            <div className="svc-item" key={i}>
              <div className="svc-icon-check">✓</div>
              <span>{svc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ── COMPETITIVE ADVANTAGE ── */
const advData = [
  { tag:'TN', title:'உங்கள் மொழியில் சேவை', desc:"We speak Tamil. Our care managers communicate in your language, not just English." },
  { tag:'24/7', title:'24x7 Care, No Holidays', desc:"Emergencies don't follow office hours. Neither do we. Always available, always ready." },
  { tag:'NRI', title:'Trusted by Tamil Families Globally', desc:'NRIs across USA, UK, Canada & Australia trust us to care for their parents back home.' },
  { tag:'1:1', title:'One Family. One Care Manager.', desc:'Not a call centre. A dedicated person who knows your parent by name, history, and heart.' },
];
const AdvCard = ({adv}) => (
  <div className="adv-card adv-card-mob">
    <div className="adv-top"><div className="adv-tag">{adv.tag}</div><div className="adv-title tamil">{adv.title}</div></div>
    <div className="adv-body"><p>{adv.desc}</p></div>
  </div>
);
const CompetitiveAdvantage = () => (
  <section className="adv-section">
    <div className="section-header">
      <div className="section-tag">Our Difference</div>
      <h2 className="section-title">Why 60Plus Global. Not Anyone Else.</h2>
      <div className="section-line"></div>
    </div>
    <div className="adv-grid">{advData.map((a,i)=><AdvCard adv={a} key={i}/>)}</div>
    <div className="adv-h-scroll h-scroll-wrap">
      <div className="h-scroll-inner">{advData.map((a,i)=><AdvCard adv={a} key={i}/>)}</div>
    </div>
    <div className="adv-testimonial">
      {[
        { img:'public/errands1.jpg', quote:'I live in London. 60Plus made me feel like I\'m right there with my parents in Chennai. They call every day.' },
        { img:'public/hero_old_person6.jpg', quote:'அம்மா இப்போ மருத்துவர் வீட்டுக்கு வருவாங்க. நான் கவலைப்பட வேண்டியதில்லை.' },
        { img:'public/caretender.jpg', quote:'The care manager knows my father\'s name, his habits, his medicines. That level of personal care is rare.' },
      ].map((t,i) => (
        <div className="adv-testi-card" key={i}>
          <div className="adv-testi-avatar"><img src={t.img} alt="Parent" /></div>
          <div className="adv-testi-body"><p>"{t.quote}"</p></div>
        </div>
      ))}
    </div>
  </section>
);

/* ── PRICING ── */
const Pricing = () => {
  const features = ['Doctor Home Visits','24x7 Emergency Support','Companion AI','Medicine Reminders','Blood Tests at Home','Emotional & Mental Health Support','Medical Records Digitalisation','Home Safety Assessment','Senior Medical Insurance Guidance','Free Senior Community Access'];
  return (
    <section className="package-section" id="pricing">
      <div className="pkg-bg-img"></div>
      <div className="pkg-bg-overlay"></div>
      <div className="section-header">
        <div className="section-tag tag-light">Pricing</div>
        <h2 className="section-title" style={{color:'#fff'}}>Simple. Transparent. One Plan.</h2>
        <p className="section-sub" style={{color:'rgba(210,180,240,0.85)'}}>Everything your parent needs. No hidden charges.</p>
        <div className="section-line"></div>
      </div>
      <div className="pkg-card">
        <div className="pkg-header">
          <h3>60Plus Care Plan</h3>
          <div className="pkg-price"><div className="amount">$50</div><div className="period">per month</div></div>
        </div>
        <div className="pkg-body">
          <div className="pkg-features">
            {features.map((feat,i)=>(
              <div className="pkg-feat" key={i}><div className="pkg-feat-check">✓</div>{feat}</div>
            ))}
          </div>
          <a href="#consult" className="pkg-cta">Enroll Now — $50/month</a>
          <p className="pkg-sub-cta">Or <a href="https://wa.me/919499944939?text=Welcome%20to%2060%20plus%20community%21%20How%20can%20I%20help%20you%20%21" target="_blank" rel="noopener noreferrer">WhatsApp us: +91 94999 44939</a></p>
        </div>
      </div>
    </section>
  );
};

/* ── FAQ ── */
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = [
    { q:'நீங்கள் எந்த மாவட்டங்களில் சேவை செய்கிறீர்கள்?', a:'தமிழ்நாட்டில் உள்ள அனைத்து மாவட்டங்களிலும் எங்கள் சேவை கிடைக்கிறது — சென்னை, கோயம்புத்தூர், மதுரை, திருச்சி, சேலம், வேலூர், திருநெல்வேலி உட்பட அனைத்து மாவட்டங்களிலும்.' },
    { q:'எந்த வயதிலிருந்து உங்கள் சேவையை பெறலாம்?', a:'55 வயதுக்கு மேற்பட்ட அனைவரும் 60Plus Global சேவையை பயன்படுத்திக்கொள்ளலாம்.' },
    { q:'நீங்கள் ஒரு முதியோர் இல்லமா?', a:'இல்லை. நாங்கள் உங்கள் அம்மா அப்பாவை அவர்களின் சொந்த வீட்டிலேயே கவனித்துக்கொள்கிறோம்.' },
    { q:'சேவை எவ்வளவு விரைவாக தொடங்கும்?', a:'நீங்கள் எங்களிடம் பதிவு செய்த 24 மணி நேரத்திற்குள் ஒரு கேர் மேனேஜர் உங்களை தொடர்பு கொள்வார்.' },
    { q:'உடல்நலம் சரியாக இருக்கும்போதும் சேர்வது அவசியமா?', a:'கண்டிப்பாக ஆம். 60Plus என்பது நோய் வந்த பிறகு செய்யும் சேவை அல்ல — நோய் வருவதற்கு முன்பே தடுக்கும் preventive care.' },
  ];
  return (
    <section className="faq-section" id="faq">
      <div className="section-header">
        <div className="section-tag">FAQ</div>
        <h2 className="section-title tamil">உங்கள் கேள்விகளுக்கு பதில் இங்கே</h2>
        <div className="section-line"></div>
      </div>
      <div className="faq-list">
        {faqs.map((faq,i)=>(
          <div className={`faq-item ${openIndex===i?'open':''}`} key={i} onClick={()=>setOpenIndex(openIndex===i?null:i)}>
            <div className="faq-q"><div className="faq-num">{i+1}</div><div className="faq-q-text tamil">{faq.q}</div><div className="faq-arrow">▾</div></div>
            <div className="faq-a"><p className="tamil">{faq.a}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ── FOOTER ── */
const Footer = () => {
  return (
    <>
      <footer>
        <div className="footer-top">
          <div className="footer-brand-col">
            <div className="footer-logo-row"><img src="/so.png" alt="SixtyPlus Global" /><div><h4>SixtyPlus Global</h4><p>India's #1 Emerging Senior Preventive Care Platform</p></div></div>
            <p className="footer-tagline">Caring for the ones who cared for you.</p>
          </div>
          <div className="footer-links-col">
            <h5>Quick Links</h5>
            {[['Services','#services'],['Why Us','#why'],['Statistics','#stats'],['Pricing','#pricing'],['FAQ','#faq']].map(([l,h])=>(<a key={l} href={h}>{l}</a>))}
          </div>
          <div className="footer-contact-col">
            <h5>Contact</h5>
            <a href="tel:+919499944939">+91 94999 44939</a>
            <a href="https://wa.me/919499944939?text=Welcome%20to%2060%20plus%20community%21%20How%20can%20I%20help%20you%20%21" target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
            <div className="footer-social">
              <a href="https://www.instagram.com/life_after_sixty_tamil" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
              <a href="https://m.youtube.com/@LifeAfterSixty-Tamil" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="social-icon"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.376.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.376-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg></a>
              <a href="https://wa.me/919499944939?text=Welcome%20to%2060%20plus%20community%21%20How%20can%20I%20help%20you%20%21" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="social-icon social-wa"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173-.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.85L.057 23.885l6.233-1.633A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.359-.214-3.7.97.988-3.607-.234-.37A9.818 9.818 0 1112 21.818z"/></svg></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 SixtyPlus Global. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="/terms-and-conditions" className="footer-link-btn">Terms & Conditions</a>
            <a href="/privacy-policy" className="footer-link-btn">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </>
  );
};

/* ── APP ── */
export default function App() {
  return (
    <>
      <style>{styles}</style>
      <Routes>
        <Route path="/" element={
          <>
            <Nav />
            <WaFloat />
            <main>
              <Hero />
              <Services />
              <WhyAndForm />
              {/* <HappyParents /> */}
              <Statistics />
                <AllServices />
              <CompetitiveAdvantage />
              <Pricing />
              <FAQ />
            </main>
            <Footer />
          </>
        } />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      </Routes>
    </>
  );
}
