import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Users,
  LogOut,
  Search,
  Filter,
  Download,
  Eye,
  RefreshCw,
  ChevronDown,
  TrendingUp,
  Calendar,
  Activity,
  Heart,
  Menu,
  X,
} from 'lucide-react';
import { Logo } from '../components/Logo';

// Use ngrok URL for production admin access
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://delaney-actinolitic-incapably.ngrok-free.dev';

const fetchSubmissions = async () => {
  const token = localStorage.getItem('admin_token');
  const response = await fetch(`${API_BASE_URL}/v1/core/landing-page-users`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!response.ok) throw new Error('Failed to fetch submissions');
  const data = await response.json();
  return data.data?.users || [];
};

// ==================== UI COMPONENTS ====================

const Avatar = ({ name, size = 'md' }) => {
  const initial = name ? name.charAt(0).toUpperCase() : 'U';
  const sizes = { sm: 'w-7 h-7 text-[10px]', md: 'w-8 h-8 text-[11px]', lg: 'w-10 h-10 text-[13px]' };
  return (
    <div className={`flex items-center justify-center rounded-full font-medium text-white bg-indigo-600 ${sizes[size]}`}>
      {initial}
    </div>
  );
};

const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    success: 'bg-green-100 text-green-700 border-green-200',
    warning: 'bg-amber-100 text-amber-700 border-amber-200',
    danger: 'bg-red-100 text-red-700 border-red-200',
    default: 'bg-slate-100 text-slate-600 border-slate-200',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant] || variants.default}`}>
      {children}
    </span>
  );
};

const StatCard = ({ title, value, subtitle, icon: Icon, trend }) => (
  <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2.5 bg-indigo-50 rounded-lg">
        <Icon size={20} className="text-indigo-600" />
      </div>
      {trend != null && trend > 0 && (
        <span className="flex items-center gap-1 text-xs font-medium text-green-600">
          <TrendingUp size={12} />{trend}%
        </span>
      )}
    </div>
    <div className="text-2xl font-bold text-slate-900 mb-1">{value}</div>
    <div className="text-sm text-slate-500 font-medium">{title}</div>
    {subtitle && <div className="text-xs text-slate-400 mt-1">{subtitle}</div>}
  </div>
);

const ProgressBar = ({ label, value, max, color = 'primary' }) => {
  const percentage = max > 0 ? (value / max) * 100 : 0;
  const colors = {
    success: 'bg-green-600',
    warning: 'bg-amber-500',
    danger: 'bg-red-600',
    primary: 'bg-indigo-600',
  };
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-slate-700">{label}</span>
        <span className="text-sm font-semibold text-slate-900">{value}</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-500 ${colors[color]}`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
};

// ==================== SIDEBAR ====================

const Sidebar = ({ activeTab, setActiveTab, collapsed, setCollapsed, onLogout }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'submissions', label: 'Submissions', icon: FileText },
    { id: 'users', label: 'Users', icon: Users },
  ];

  return (
    <aside className={`hidden md:block fixed left-0 top-0 bottom-0 bg-white border-r border-slate-200 transition-all duration-300 z-50 flex flex-col ${
      collapsed ? 'w-20' : 'w-64'
    }`}>
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 flex-shrink-0">
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
          <Logo size={collapsed ? 'sm' : 'md'} className={collapsed ? 'flex-1' : ''} />
          {!collapsed && <span className="font-bold text-slate-900 text-lg">60Plus Global</span>}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 transition-colors"
        >
          {collapsed ? <Menu size={18} /> : <X size={18} />}
        </button>
      </div>

      <nav className="p-3 space-y-1 overflow-y-auto flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              } ${collapsed ? 'justify-center' : ''}`}
            >
              <Icon size={20} className={isActive ? 'text-indigo-600' : 'text-slate-400'} />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="p-3 border-t border-slate-200 flex-shrink-0">
        <button
          onClick={onLogout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-all ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut size={20} />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

// ==================== MOBILE HEADER ====================

const MobileHeader = ({ onMenuClick, onLogout, title, onRefresh }) => (
  <div className="md:hidden h-16 border-b border-slate-200 bg-white px-4 flex items-center justify-between sticky top-0 z-40">
    <div className="flex items-center gap-3">
      <button onClick={onMenuClick} className="p-2 rounded-lg hover:bg-slate-100">
        <Menu size={24} />
      </button>
      <Logo size="sm" />
      <span className="font-bold text-slate-900">60Plus</span>
    </div>
    <div className="flex items-center gap-2">
      {title !== 'login' && (
        <button onClick={onRefresh} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500">
          <RefreshCw size={18} />
        </button>
      )}
      <button onClick={onLogout} className="p-2 rounded-lg hover:bg-red-50 text-red-600">
        <LogOut size={18} />
      </button>
    </div>
  </div>
);

// ==================== MOBILE SIDEBAR DRAWER ====================

const MobileSidebar = ({ isOpen, onClose, activeTab, setActiveTab, onLogout }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-xl flex flex-col">
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <Logo size="md" />
            <span className="font-bold text-slate-900">60Plus Global</span>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100">
            <X size={20} />
          </button>
        </div>
        <nav className="p-3 space-y-1 overflow-y-auto">
          {['dashboard', 'submissions', 'users'].map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); onClose(); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg ${
                activeTab === tab ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {tab === 'dashboard' && <LayoutDashboard size={20} />}
              {tab === 'submissions' && <FileText size={20} />}
              {tab === 'users' && <Users size={20} />}
              <span className="font-medium capitalize">{tab}</span>
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-slate-200">
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg">
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// ==================== TABS ====================

const DashboardTab = ({ submissions, onRefresh }) => {
  const totalSubmissions = submissions.length;
  const today = new Date().toDateString();
  const todaySubmissions = submissions.filter(s => new Date(s.createdAt).toDateString() === today).length;
  const avgAge = totalSubmissions > 0
    ? Math.round(submissions.reduce((sum, s) => sum + s.ageOfParent, 0) / totalSubmissions)
    : 0;
  const mobilityStats = submissions.reduce((acc, s) => {
    acc[s.mobilityStatus] = (acc[s.mobilityStatus] || 0) + 1;
    return acc;
  }, {});
  const recentSubmissions = submissions.slice(0, 5);

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1">Overview of your landing page performance</p>
        </div>
        <button
          onClick={onRefresh}
          className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 flex items-center justify-center gap-2"
        >
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      {/* Stats Cards - responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard title="Total Submissions" value={totalSubmissions.toLocaleString()} subtitle="All time" icon={FileText} />
        <StatCard title="Today's Submissions" value={todaySubmissions.toLocaleString()} subtitle="New today" icon={Calendar} trend={todaySubmissions > 0 ? 10 : undefined} />
        <StatCard title="Average Parent Age" value={`${avgAge} yrs`} subtitle="Across all submissions" icon={Activity} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mobility Distribution */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-200">
            <h2 className="font-semibold text-slate-900">Mobility Distribution</h2>
          </div>
          <div className="p-5 space-y-5">
            <ProgressBar
              label="Independent and Active"
              value={mobilityStats['Independent and Active'] || 0}
              max={totalSubmissions}
              color="success"
            />
            <ProgressBar
              label="Needs Partial Assistance"
              value={mobilityStats['Needs Partial Assistance'] || 0}
              max={totalSubmissions}
              color="warning"
            />
            <ProgressBar
              label="Requires Full-time Care"
              value={mobilityStats['Requires full-time care'] || 0}
              max={totalSubmissions}
              color="danger"
            />
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-200">
            <h2 className="font-semibold text-slate-900">Recent Submissions</h2>
          </div>
          <div className="p-5">
            {recentSubmissions.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-slate-500">No submissions yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentSubmissions.map((sub, i) => (
                  <div key={i} className="flex items-center gap-3 sm:gap-4 pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                    <Avatar name={sub.name} />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-slate-900 truncate">{sub.name}</div>
                      <div className="text-xs text-slate-500 truncate">{sub.emailId}</div>
                    </div>
                    <div className="text-xs text-slate-400 whitespace-nowrap">{new Date(sub.createdAt).toLocaleDateString()}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SubmissionsTab = ({ submissions, onRefresh }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMobility, setFilterMobility] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  const filtered = submissions
    .filter(s => {
      const q = searchTerm.toLowerCase();
      const matchesSearch = s.name.toLowerCase().includes(q) || s.emailId.toLowerCase().includes(q) ||
        s.phoneNumber.includes(searchTerm) || s.locationOfParent.toLowerCase().includes(q);
      return matchesSearch && (!filterMobility || s.mobilityStatus === filterMobility);
    })
    .sort((a, b) => {
      if (sortOrder === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortOrder === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      return 0;
    });

  const getMobilityBadge = (status) => {
    if (status === 'Independent and Active') return <Badge variant="success">Independent</Badge>;
    if (status === 'Needs Partial Assistance') return <Badge variant="warning">Partial</Badge>;
    return <Badge variant="danger">Full-time Care</Badge>;
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Phone', 'Email', 'Location', 'Age', 'Mobility Status', 'Submitted At'];
    const rows = filtered.map(s => [
      `"${s.name}"`, s.phoneNumber, s.emailId, s.locationOfParent,
      s.ageOfParent, `"${s.mobilityStatus}"`, new Date(s.createdAt).toLocaleString()
    ]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const a = Object.assign(document.createElement('a'), {
      href: URL.createObjectURL(new Blob([csv], { type: 'text/csv' })),
      download: `submissions-${new Date().toISOString().split('T')[0]}.csv`,
    });
    a.click();
  };

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Form Submissions</h1>
          <p className="text-slate-500 mt-1">View and manage all form submissions</p>
        </div>
        <button onClick={exportToCSV} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 flex items-center justify-center gap-2">
          <Download size={16} /> Export CSV
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Search and Filters */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search name, email, phone, location..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <select
              className="w-full sm:w-48 pl-10 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer"
              value={filterMobility}
              onChange={e => setFilterMobility(e.target.value)}
            >
              <option value="">All Mobility Status</option>
              <option value="Independent and Active">Independent</option>
              <option value="Needs Partial Assistance">Needs Partial</option>
              <option value="Requires full-time care">Full-time Care</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select
              className="w-full sm:w-32 pl-3 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer"
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Results count */}
        <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 text-sm text-slate-500">
          Showing {filtered.length} of {submissions.length} submissions
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-slate-50">
                {['Name', 'Contact', 'Location', 'Age', 'Mobility', 'Submitted', 'Actions'].map(h => (
                  <th key={h} className={`px-4 py-3 text-xs font-medium text-slate-500 uppercase tracking-wider ${h === 'Actions' ? 'text-right' : 'text-left'}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((sub, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={sub.name} />
                      <span className="font-medium text-slate-900">{sub.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-slate-700">{sub.emailId}</div>
                    <div className="text-xs text-slate-500">{sub.phoneNumber}</div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">{sub.locationOfParent}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{sub.ageOfParent}</td>
                  <td className="px-4 py-3">{getMobilityBadge(sub.mobilityStatus)}</td>
                  <td className="px-4 py-3 text-sm text-slate-500">{new Date(sub.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-right">
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-indigo-600" title="View">
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-slate-500">No submissions match your filters</p>
            <button
              onClick={() => { setSearchTerm(''); setFilterMobility(''); }}
              className="mt-3 text-indigo-600 font-medium hover:text-indigo-700"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const UsersTab = ({ submissions }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMobility, setFilterMobility] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  const filtered = submissions
    .filter(s => {
      const q = searchTerm.toLowerCase();
      return (s.name.toLowerCase().includes(q) || s.emailId.toLowerCase().includes(q) || s.phoneNumber.includes(searchTerm))
        && (!filterMobility || s.mobilityStatus === filterMobility);
    })
    .sort((a, b) => {
      if (sortOrder === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortOrder === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortOrder === 'name-asc') return a.name.localeCompare(b.name);
      return 0;
    });

  const getMobilityBadge = (status) => {
    if (status === 'Independent and Active') return <Badge variant="success">Independent</Badge>;
    if (status === 'Needs Partial Assistance') return <Badge variant="warning">Partial</Badge>;
    return <Badge variant="danger">Full-time Care</Badge>;
  };

  const independentCount = submissions.filter(s => s.mobilityStatus === 'Independent and Active').length;
  const needsCareCount = submissions.filter(s =>
    s.mobilityStatus === 'Needs Partial Assistance' || s.mobilityStatus === 'Requires full-time care'
  ).length;

  return (
    <div className="p-4 md:p-6 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Users</h1>
          <p className="text-slate-500 mt-1">All registered users from form submissions</p>
        </div>
        <div className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 font-medium">
          {submissions.length} total users
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Users" value={submissions.length.toLocaleString()} icon={Users} />
        <StatCard title="Independent" value={independentCount.toLocaleString()} subtitle="Active mobility" icon={Activity} />
        <StatCard title="Needs Care" value={needsCareCount.toLocaleString()} subtitle="Assistance required" icon={Heart} />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Search and Filters */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search by name, email..."
            className="pl-3 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none flex-1"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <div className="relative">
            <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <select
              className="w-full sm:w-40 pl-10 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none appearance-none cursor-pointer"
              value={filterMobility}
              onChange={e => setFilterMobility(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Independent and Active">Independent</option>
              <option value="Needs Partial Assistance">Needs Partial</option>
              <option value="Requires full-time care">Full-time Care</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 text-sm text-slate-500">
          Showing {filtered.length} of {submissions.length} users
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="bg-slate-50">
                {['User', 'Phone', 'Location', 'Age', 'Mobility', 'Registered'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((user, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={user.name} />
                      <div>
                        <div className="font-medium text-slate-900">{user.name}</div>
                        <div className="text-xs text-slate-500">{user.emailId}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">{user.phoneNumber}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{user.locationOfParent}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{user.ageOfParent}</td>
                  <td className="px-4 py-3">{getMobilityBadge(user.mobilityStatus)}</td>
                  <td className="px-4 py-3 text-sm text-slate-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ==================== LOGIN PAGE ====================

const LoginPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_BASE_URL}/v1/forms/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok && data.status === 'success') {
        localStorage.setItem('admin_token', data.data.access_token);
        onLoginSuccess();
      } else {
        setError(data.message || 'Login failed');
      }
    } catch {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <div className="text-center mb-6">
          <Logo size="md" />
          <h1 className="text-2xl font-bold text-slate-900 mt-6 mb-2">Welcome back</h1>
          <p className="text-slate-500">Sign in to your admin account</p>
        </div>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 text-sm">
            <span>⚠️</span> {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors flex justify-center items-center gap-2 disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
};

// ==================== MAIN LAYOUT ====================

const AdminLayout = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('admin_token');
      if (token) {
        try {
          const response = await fetch(`${API_BASE_URL}/v1/forms/admin/validate`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.ok) {
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('admin_token');
          }
        } catch {
          localStorage.removeItem('admin_token');
        }
      }
      setIsCheckingAuth(false);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) loadSubmissions();
  }, [isAuthenticated]);

  const loadSubmissions = async () => {
    setLoading(true);
    try {
      const data = await fetchSubmissions();
      setSubmissions(data);
    } catch (err) {
      console.error('Failed to fetch submissions:', err);
      if (err.message?.includes('401')) handleLogout();
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsAuthenticated(false);
    setSubmissions([]);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardTab submissions={submissions} onRefresh={loadSubmissions} />;
      case 'submissions': return <SubmissionsTab submissions={submissions} onRefresh={loadSubmissions} />;
      case 'users': return <UsersTab submissions={submissions} />;
      default: return <DashboardTab submissions={submissions} onRefresh={loadSubmissions} />;
    }
  };

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={handleLogin} />;
  }

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Mobile Sidebar Overlay */}
      <MobileSidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />

      {/* Desktop Sidebar - Fixed position */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Desktop Header */}
        <div className="hidden md:flex h-16 border-b border-slate-200 bg-white px-6 items-center justify-between z-30">
          <h1 className="text-lg font-semibold text-slate-900 capitalize">{activeTab}</h1>
          <button onClick={loadSubmissions} className="p-2 rounded-lg hover:bg-slate-100 text-slate-500" title="Refresh">
            <RefreshCw size={18} />
          </button>
        </div>

        {/* Mobile Header */}
        <div className="md:hidden">
          <MobileHeader
            onMenuClick={() => setMobileMenuOpen(true)}
            onLogout={handleLogout}
            title={activeTab}
            onRefresh={loadSubmissions}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className={sidebarCollapsed ? 'md:pl-20' : 'md:pl-64'}>
              {renderContent()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { AdminLayout as default, LoginPage as AdminLoginPage };
