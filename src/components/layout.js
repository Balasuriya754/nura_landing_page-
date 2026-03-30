import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Users,
  LogOut,
  Menu,
  X,
  RefreshCw,
  ChevronDown,
  User,
} from 'lucide-react';
import { setAuthToken } from '../services/api';
import { Logo } from './Logo';

// Menu items
const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'submissions', label: 'Submissions', icon: FileText },
  { id: 'users', label: 'Users', icon: Users },
];

// Sidebar Component
export const Sidebar = ({ activeTab, setActiveTab, collapsed, setCollapsed, onLogout }) => {
  return (
    <aside className={`fixed left-0 top-0 bottom-0 bg-white border-r border-slate-200 z-50 transition-all duration-300 ${
      collapsed ? 'w-20' : 'w-64'
    }`}>
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200">
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center w-full' : ''}`}>
          <Logo size={collapsed ? 'sm' : 'md'} />
          {!collapsed && <span className="font-bold text-slate-900 text-lg">60Plus Global</span>}
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md hover:bg-slate-100 text-slate-500 transition-colors"
        >
          {collapsed ? <Menu size={18} /> : <X size={18} />}
        </button>
      </div>

      <nav className="p-3 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              } ${collapsed ? 'justify-center' : ''}`}
            >
              <Icon size={20} className={isActive ? 'text-indigo-600' : 'text-slate-400'} />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-slate-200">
        <button
          onClick={onLogout}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-all ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut size={20} />
          {!collapsed && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

// Topbar Component
export const Topbar = ({ title, onRefresh, onLogout }) => (
  <div className="h-16 border-b border-slate-200 bg-white px-6 flex items-center justify-between sticky top-0 z-40">
    <h1 className="text-lg font-semibold text-slate-900 capitalize">{title}</h1>
    <div className="flex items-center gap-2">
      <button
        onClick={onRefresh}
        className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
        title="Refresh"
      >
        <RefreshCw size={18} />
      </button>
      <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
        <div className="flex items-center gap-2">
          <User size={18} className="text-slate-500" />
          <span className="text-sm font-medium text-slate-900">Admin</span>
          <ChevronDown size={14} className="text-slate-400" />
        </div>
      </div>
    </div>
  </div>
);

// Page Header
export const PageHeader = ({ title, subtitle, action }) => (
  <div className="flex justify-between items-start mb-6">
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-1">{title}</h1>
      {subtitle && <p className="text-slate-500">{subtitle}</p>}
    </div>
    {action}
  </div>
);

// Loading Spinner
export const Spinner = () => (
  <div className="flex items-center justify-center py-12">
    <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
  </div>
);

// Modal Component
export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto">
          <div className="flex justify-between items-center p-4 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100">
              <X size={20} className="text-slate-500" />
            </button>
          </div>
          <div className="p-4">{children}</div>
          <div className="p-4 border-t border-slate-200 bg-slate-50 rounded-b-xl">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
