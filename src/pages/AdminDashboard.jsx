import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formsApi } from '../services/api';
import {
  LayoutDashboard,
  FileText,
  LogOut,
  Menu,
  X,
  Search,
  Download,
  Eye,
  RefreshCw,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Activity,
  Heart,
  Clock,
  Lock,
  AlertCircle,
  Loader2,
  ListFilter,
  Play,
  Pause,
  EyeOff,
  ShieldCheck,
  ShieldAlert,
} from 'lucide-react';
import '../admin.css';
import '../index.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8300';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

const TOKEN_KEY = 'admin_token';
const getStoredToken = () => localStorage.getItem(TOKEN_KEY);
const setStoredToken = (token) => localStorage.setItem(TOKEN_KEY, token);
const clearStoredToken = () => localStorage.removeItem(TOKEN_KEY);
const getAuthHeaders = () => {
  const token = getStoredToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ─── Login Page ─────────────────────────────────────────────────────────────
const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');
    setPasswordError('');
    setLoading(true);
    setError('');

    // Validate email
    if (!email.trim()) {
      setEmailError('Email is required');
      setLoading(false);
      return;
    }
    if (!validateEmail(email)) {
      setEmailError('Invalid email address');
      setLoading(false);
      return;
    }

    // Validate password
    if (!password.trim()) {
      setPasswordError('Password is required');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/v1/forms/admin/login', { email, password });
      if (response.data.status === 'success') {
        setStoredToken(response.data.data.access_token);
        onLogin();
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Invalid email or password';
      // Extract specific error from FastAPI validation
      if (err.response?.status === 422 && err.response?.data?.detail) {
        setError('Invalid email or password');
      } else {
        setError(errorMsg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-card">
          <div className="login-logo">
            <div className="login-logo-icon">60+</div>
            <span className="login-logo-text">60Plus Global</span>
          </div>
          <h1 className="login-title">Welcome back</h1>
          <p className="login-subtitle">Sign in to your admin dashboard</p>

          {error && (
            <div className="login-error">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="login-field">
              <label>Email address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('');
                }}
                required
                className={emailError ? 'input-error' : ''}
              />
              {emailError && <span className="field-error">{emailError}</span>}
            </div>
            <div className="login-field">
              <label>Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError('');
                  }}
                  required
                  className={passwordError ? 'input-error' : ''}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <ShieldCheck size={18} />}
                </button>
              </div>
              {passwordError && <span className="field-error">{passwordError}</span>}
            </div>
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? <><Loader2 size={18} className="spin" /> Signing in...</> : 'Sign in'}
            </button>
          </form>
        </div>
      </div>

      {/* <div className="login-right">
        <div className="login-right-content">
          <div className="login-right-icon">&#127793;</div>
          <h2>Care starts here</h2>
          <p>Manage senior care applications, track mobility status, and connect families with the right support.</p>
          <div className="login-stats">
            <div className="login-stat"><div className="login-stat-value">500+</div><div className="login-stat-label">Families</div></div>
            <div className="login-stat"><div className="login-stat-value">12</div><div className="login-stat-label">Cities</div></div>
            <div className="login-stat"><div className="login-stat-value">80+</div><div className="login-stat-label">Partners</div></div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

// ─── Sidebar ─────────────────────────────────────────────────────────────────
const Sidebar = ({ active, setActive, collapsed, setCollapsed, onLogout, submissionsCount, formsCount }) => {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'submissions', label: 'Submissions', icon: FileText, badge: submissionsCount },
    { id: 'forms', label: 'Forms', icon: FileText, badge: formsCount },
  ];

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">60+</div>
          {!collapsed && <span className="sidebar-brand-text">60Plus Admin</span>}
        </div>
        <button className="sidebar-toggle" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <Menu size={18} /> : <X size={18} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {!collapsed && <div className="nav-section-label">Main Menu</div>}
        <div className="nav-items-container">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`nav-item ${active === item.id ? 'active' : ''}`}
                onClick={() => setActive(item.id)}
              >
                <Icon size={20} className="nav-icon" />
                {!collapsed && <span className="nav-text">{item.label}</span>}
                {item.badge != null && !collapsed && <span className="nav-badge">{item.badge}</span>}
              </button>
            );
          })}
        </div>
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item logout" onClick={onLogout}>
          <LogOut size={20} className="nav-icon" />
          {!collapsed && <span className="nav-text">Log out</span>}
        </button>
      </div>
    </aside>
  );
};

// ─── Stat Card ──────────────────────────────────────────────────────────────
const StatCard = ({ label, value, icon: Icon, variant = 'primary', trend, subtitle }) => (
  <div className="stat-card">
    <div className="stat-header">
      <div className={`stat-icon ${variant}`}><Icon size={22} /></div>
      {trend !== undefined && trend !== null && (
        <div className={`stat-trend ${trend >= 0 ? 'up' : 'down'}`}>
          {trend >= 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {Math.abs(trend)}%
        </div>
      )}
    </div>
    <div className="stat-value">{value}</div>
    <div className="stat-label">{label}</div>
    {subtitle && <div className="stat-subtitle">{subtitle}</div>}
  </div>
);

// ─── Badge ───────────────────────────────────────────────────────────────────
const Badge = ({ children, variant = 'default' }) => (
  <span className={`badge ${variant}`}>{children}</span>
);

// ─── Dashboard ───────────────────────────────────────────────────────────────
const DashboardView = ({ submissions }) => {
  const total = submissions.length;
  const today = new Date().toDateString();
  const todayCount = submissions.filter((s) => new Date(s.createdAt).toDateString() === today).length;
  const thisWeek = submissions.filter((s) => {
    const submitDate = new Date(s.createdAt);
    const weekAgo = new Date(); weekAgo.setDate(weekAgo.getDate() - 7);
    return submitDate >= weekAgo;
  }).length;

  const mobility = submissions.reduce((acc, s) => {
    acc[s.mobilityStatus] = (acc[s.mobilityStatus] || 0) + 1;
    return acc;
  }, {});

  const recent = [...submissions].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 6);

  const mobilityData = [
    { label: 'Independent and Active', count: mobility['Independent and Active'] || 0, color: 'success' },
    { label: 'Needs Partial Assistance', count: mobility['Needs Partial Assistance'] || 0, color: 'warning' },
    { label: 'Requires Full-time Care', count: mobility['Requires full-time care'] || 0, color: 'danger' },
  ];

  return (
    <div className="dashboard-container">
      {/* Stats Section */}
      <section className="stats-section">
        <h2 className="section-title">Overview</h2>
        <div className="stats-grid">
          <StatCard
            label="Total Submissions"
            value={total}
            icon={FileText}
            variant="primary"
            trend={total > 0 ? 12 : 0}
            subtitle="All time"
          />
          <StatCard
            label="Today"
            value={todayCount}
            icon={Calendar}
            variant="success"
            subtitle="New today"
          />
          <StatCard
            label="This Week"
            value={thisWeek}
            icon={Activity}
            variant="warning"
            subtitle="Last 7 days"
          />
          <StatCard
            label="Needs Care"
            value={(mobility['Needs Partial Assistance'] || 0) + (mobility['Requires full-time care'] || 0)}
            icon={Heart}
            variant="danger"
            subtitle="Assistance required"
          />
        </div>
      </section>

      {/* Charts Section */}
      <section className="charts-section">
        <div className="card card-wide">
          <div className="card-header">
            <h3 className="card-title">Mobility Distribution</h3>
          </div>
          <div className="card-body">
            <div className="progress-list">
              {mobilityData.map((item) => (
                <div key={item.label} className="progress-item">
                  <div className="progress-header">
                    <span className="progress-label">{item.label}</span>
                    <span className="progress-value">{item.count}</span>
                  </div>
                  <div className="progress-bar">
                    <div
                      className={`progress-fill ${item.color}`}
                      style={{ width: total > 0 ? `${(item.count / total) * 100}%` : '0%' }}
                    />
                  </div>
                  <span className="progress-percent">
                    {total > 0 ? Math.round((item.count / total) * 100) : 0}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Recent Submissions</h3>
            <button className="card-action">
              View all <ChevronRight size={16} />
            </button>
          </div>
          <div className="card-body">
            {recent.length === 0 ? (
              <div className="empty-state-small">
                <FileText size={32} />
                <p>No submissions yet</p>
              </div>
            ) : (
              <div className="recent-list">
                {recent.map((s, i) => (
                  <div key={i} className="recent-item">
                    <div className="recent-avatar">{s.name?.charAt(0).toUpperCase() || '?'}</div>
                    <div className="recent-info">
                      <div className="recent-name">{s.name}</div>
                      <div className="recent-email">{s.emailId}</div>
                    </div>
                    <div className="recent-meta">
                      <span className="recent-date">{new Date(s.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

// ─── Submissions Table ──────────────────────────────────────────────────────
const SubmissionsView = ({ submissions, forms, formFilter, setFormFilter, loading, onViewDetails }) => {
  const [search, setSearch] = useState('');
  const [mobilityFilter, setMobilityFilter] = useState('');
  const [ageCategory, setAgeCategory] = useState('');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [sort, setSort] = useState('newest');

  // Get current date for date filter options
  const today = new Date().toISOString().split('T')[0];
  const thisWeekStart = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const thisMonthStart = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  // Filter submissions
  const filtered = submissions
    .filter((s) => {
      const q = search.toLowerCase();
      const matchSearch = !q ||
        s.name.toLowerCase().includes(q) ||
        s.emailId.toLowerCase().includes(q) ||
        s.phoneNumber.includes(search) ||
        s.locationOfParent.toLowerCase().includes(q);
      const matchMobility = !mobilityFilter || s.mobilityStatus === mobilityFilter;
      const matchForm = !formFilter || s.formId === formFilter;

      // Age category filter
      if (ageCategory) {
        const age = s.ageOfParent;
        if (ageCategory === '40-50' && (age < 40 || age > 50)) return false;
        if (ageCategory === '51-60' && (age < 51 || age > 60)) return false;
        if (ageCategory === '61-70' && (age < 61 || age > 70)) return false;
        if (ageCategory === '71+' && age < 71) return false;
      }

      // Age range filter
      if (minAge && s.ageOfParent < parseInt(minAge)) return false;
      if (maxAge && s.ageOfParent > parseInt(maxAge)) return false;

      // Date filter
      const submissionDate = new Date(s.createdAt).toISOString().split('T')[0];
      if (dateFilter === 'today' && submissionDate !== today) return false;
      if (dateFilter === 'week' && submissionDate < thisWeekStart) return false;
      if (dateFilter === 'month' && submissionDate < thisMonthStart) return false;

      return matchSearch && matchMobility && matchForm;
    })
    .sort((a, b) => {
      if (sort === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sort === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      if (sort === 'age-asc') return a.ageOfParent - b.ageOfParent;
      if (sort === 'age-desc') return b.ageOfParent - a.ageOfParent;
      return 0;
    });

  const getVariant = (status) => {
    if (status === 'Independent and Active') return 'success';
    if (status === 'Needs Partial Assistance') return 'warning';
    return 'danger';
  };

  const exportCSV = () => {
    const headers = ['Name', 'Phone', 'Email', 'Location', 'Age', 'Mobility', 'Submitted'];
    const rows = filtered.map((s) => [
      s.name, s.phoneNumber, s.emailId, s.locationOfParent, s.ageOfParent,
      s.mobilityStatus, new Date(s.createdAt).toLocaleString()
    ]);
    const csv = [headers, ...rows].map((r) => r.join(',')).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
    a.download = `submissions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="submissions-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Submissions</h1>
          <p className="page-subtitle">{submissions.length} total responses</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={exportCSV}>
          <Download size={14} /> Export CSV
        </button>
      </div>

      <div className="filters">
        <div className="search-box">
          <Search size={16} className="search-icon" />
          <input
            placeholder="Search by name, email, phone, location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select className="filter-select" value={formFilter} onChange={(e) => setFormFilter(e.target.value)}>
          <option value="">All Forms</option>
          {forms.map((form) => (
            <option key={form.id} value={form.id}>
              {form.form_name || form.id}
            </option>
          ))}
        </select>
        <select className="filter-select" value={mobilityFilter} onChange={(e) => setMobilityFilter(e.target.value)}>
          <option value="">All Mobility</option>
          <option value="Independent and Active">Independent</option>
          <option value="Needs Partial Assistance">Partial Care</option>
          <option value="Requires full-time care">Full-time Care</option>
        </select>
        <select className="filter-select" value={ageCategory} onChange={(e) => setAgeCategory(e.target.value)}>
          <option value="">All Ages</option>
          <option value="40-50">40-50 Years</option>
          <option value="51-60">51-60 Years</option>
          <option value="61-70">61-70 Years</option>
          <option value="71+">71+ Years</option>
        </select>
        <div className="filter-select" style={{ display: 'flex', gap: 4 }}>
          <input
            type="number"
            placeholder="Min Age"
            value={minAge}
            onChange={(e) => setMinAge(e.target.value)}
            style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4, fontSize: 14 }}
            min="0"
            max="150"
          />
          <input
            type="number"
            placeholder="Max Age"
            value={maxAge}
            onChange={(e) => setMaxAge(e.target.value)}
            style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: 4, fontSize: 14 }}
            min="0"
            max="150"
          />
        </div>
        <select className="filter-select" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)}>
          <option value="all">All Time</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
        <select className="filter-select" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="age-asc">Age: Low to High</option>
          <option value="age-desc">Age: High to Low</option>
        </select>
      </div>

      <div className="results-count">
        Showing <strong>{filtered.length}</strong> of {submissions.length} submissions
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner large" />
          <p>Loading submissions...</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Location</th>
                <th>Age</th>
                <th>Mobility</th>
                <th>Submitted</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s, i) => (
                <tr key={i}>
                  <td>
                    <div className="table-user">
                      <div className="table-avatar">{s.name?.charAt(0).toUpperCase()}</div>
                      <span className="table-user-name">{s.name}</span>
                    </div>
                  </td>
                  <td>
                    <div className="table-contact">
                      <span className="table-email">{s.emailId}</span>
                      <span className="table-phone">{s.phoneNumber}</span>
                    </div>
                  </td>
                  <td>{s.locationOfParent}</td>
                  <td>{s.ageOfParent} yrs</td>
                  <td>
                    <Badge variant={getVariant(s.mobilityStatus)}>{s.mobilityStatus}</Badge>
                  </td>
                  <td>{new Date(s.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-ghost" onClick={() => onViewDetails(s)} title="View Details">
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// ─── Forms View ──────────────────────────────────────────────────────────────
const FormsView = ({ forms, onActivate, onDeactivate }) => {
  return (
    <div className="submissions-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">Manage Forms</h1>
          <p className="page-subtitle">{forms.length} total forms</p>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Form Name</th>
              <th>Status</th>
              <th>Created</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {forms.map((form, i) => (
              <tr key={i}>
                <td>
                  <div className="table-user">
                    <div className="table-avatar">{form.form_name?.charAt(0).toUpperCase() || 'F'}</div>
                    <span className="table-user-name">{form.form_name || form.id}</span>
                  </div>
                </td>
                <td>
                  <span
                    className={`badge ${
                      form.status === 'active'
                        ? 'success'
                        : 'danger'
                    }`}
                  >
                    {form.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td>{new Date(form.created_at || form.createdAt).toLocaleDateString()}</td>
                <td>
                  {form.status === 'active' ? (
                    <button
                      className="btn btn-ghost"
                      onClick={() => onDeactivate(form.id)}
                      title="Deactivate form"
                    >
                      <Pause size={16} />
                    </button>
                  ) : (
                    <button
                      className="btn btn-ghost"
                      onClick={() => onActivate(form.id)}
                      title="Activate form"
                    >
                      <Play size={16} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ─── Detail Modal ────────────────────────────────────────────────────────────
const DetailModal = ({ data, onClose }) => {
  if (!data) return null;

  const fields = [
    { icon: User, label: 'Name', value: data.name },
    { icon: Phone, label: 'Phone', value: data.phoneNumber },
    { icon: Mail, label: 'Email', value: data.emailId },
    { icon: MapPin, label: 'Location', value: data.locationOfParent },
    { icon: Calendar, label: 'Age', value: `${data.ageOfParent} years` },
    { icon: Heart, label: 'Mobility', value: data.mobilityStatus, badge: true },
    { icon: Clock, label: 'Submitted', value: new Date(data.createdAt).toLocaleString() },
  ];

  const getVariant = (status) => {
    if (status === 'Independent and Active') return 'success';
    if (status === 'Needs Partial Assistance') return 'warning';
    return 'danger';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Submission Details</span>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="modal-body">
          <div className="detail-grid">
            {fields.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.label} className="detail-row">
                  <div className="detail-icon"><Icon size={18} /></div>
                  <div className="detail-content">
                    <div className="detail-label">{f.label}</div>
                    <div className="detail-value">
                      {f.badge ? <Badge variant={getVariant(f.value)}>{f.value}</Badge> : f.value}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

// ─── Main App ────────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [isAuth, setIsAuth] = useState(false);
  const [checking, setChecking] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [forms, setForms] = useState([]);
  const [formFilter, setFormFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selected, setSelected] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check screen size for mobile responsiveness
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const token = getStoredToken();
    if (token && token.trim() && token !== 'null' && token !== 'undefined') {
      api.get('/v1/forms/admin/validate', { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => { if (res.data.status === 'success') setIsAuth(true); })
        .catch(() => clearStoredToken())
        .finally(() => setChecking(false));
    } else {
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    if (isAuth) {
      fetchSubmissions();
      fetchForms();
    }
  }, [isAuth]);

  const fetchSubmissions = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      // Add cache-busting timestamp for refresh
      const url = '/v1/core/landing-page-users';
      const res = await api.get(url, {
        headers: getAuthHeaders(),
        params: isRefresh ? { _t: Date.now() } : {}
      });

      if (res.data.status === 'success') {
        setSubmissions(res.data.data.users || []);
      }
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        handleLogout();
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchForms = async () => {
    try {
      const res = await formsApi.listForms();
      if (res.status === 'success') {
        setForms(res.data.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch forms:', err);
    }
  };

  const handleRefresh = () => {
    fetchSubmissions(true);
  };

  const handleLogout = () => {
    clearStoredToken();
    setIsAuth(false);
    setSubmissions([]);
    setForms([]);
  };

  const activateForm = async (formId) => {
    try {
      await formsApi.activateForm(formId);
      fetchForms();
    } catch (err) {
      console.error('Failed to activate form:', err);
    }
  };

  const deactivateForm = async (formId) => {
    try {
      await formsApi.deactivateForm(formId);
      fetchForms();
    } catch (err) {
      console.error('Failed to deactivate form:', err);
    }
  };

  if (checking) {
    return (
      <div className="auth-loading">
        <div className="spinner large" />
      </div>
    );
  }

  if (!isAuth) {
    return <LoginPage onLogin={() => setIsAuth(true)} />;
  }

  return (
    <div className="admin-layout">
      <Sidebar
        active={activeTab}
        setActive={setActiveTab}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        onLogout={handleLogout}
        submissionsCount={submissions.length}
        formsCount={forms.length}
      />

      <div className="main-content">
        <header className="header">
          <div className="header-left">
            {isMobile && !mobileMenuOpen && (
              <button
                className="sidebar-toggle mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu size={18} />
              </button>
            )}
            {collapsed && !isMobile && <div className="header-brand-small">60+</div>}
            <h1 className="header-title">
              {activeTab === 'dashboard' ? 'Dashboard' : activeTab === 'submissions' ? 'Submissions' : 'Forms'}
            </h1>
          </div>
          <div className="header-actions">
            <button
              className={`header-btn ${refreshing ? 'spinning' : ''}`}
              onClick={handleRefresh}
              title="Refresh data"
              disabled={refreshing}
            >
              <RefreshCw size={16} />
            </button>
            <div className="header-user">
              <div className="header-avatar">A</div>
              <span className="header-user-name">Admin</span>
            </div>
          </div>
        </header>

        {/* Mobile Sidebar Overlay */}
        {isMobile && mobileMenuOpen && (
          <div className="mobile-sidebar-overlay" onClick={() => setMobileMenuOpen(false)}>
            <Sidebar
              active={activeTab}
              setActive={(tab) => {
                setActiveTab(tab);
                setMobileMenuOpen(false);
              }}
              collapsed={false}
              setCollapsed={setCollapsed}
              onLogout={handleLogout}
              submissionsCount={submissions.length}
              formsCount={forms.length}
            />
          </div>
        )}

        <main className="page-content">
          {activeTab === 'dashboard' && <DashboardView submissions={submissions} />}
          {activeTab === 'submissions' && (
            <SubmissionsView
              submissions={submissions}
              forms={forms}
              formFilter={formFilter}
              setFormFilter={setFormFilter}
              loading={loading}
              onViewDetails={setSelected}
            />
          )}
          {activeTab === 'forms' && <FormsView forms={forms} onActivate={activateForm} onDeactivate={deactivateForm} />}
        </main>
      </div>

      <DetailModal data={selected} onClose={() => setSelected(null)} />
    </div>
  );
}