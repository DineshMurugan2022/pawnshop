import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, Database, Users, FileText, Building2,
  DollarSign, BarChart3, Settings, TrendingUp, TrendingDown,
  Gem, Plus, Edit2, Trash2, Search, X, Save, LogOut
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getDashboardStats, getCurrentMetalRates, updateMetalRate } from '../services/pawnshopService';
import type { DashboardStats } from '../types/pawnshop';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '../utils/toast';
import { LanguageSwitcherDropdown } from '../components/LanguageSwitcher';

// Import section components (we'll create these)
import MasterSection from '../components/admin/MasterSection';
import CustomerSection from '../components/admin/CustomerSection';
import TransactionSection from '../components/admin/TransactionSection';
import BankSection from '../components/admin/BankSection';
import AccountsSection from '../components/admin/AccountsSection';
import ReportsSection from '../components/admin/ReportsSection';

type TabType = 'dashboard' | 'master' | 'customer' | 'transaction' | 'bank' | 'accounts' | 'reports';

const PawnshopAdmin: React.FC = () => {
  const { t } = useTranslation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [goldRate, setGoldRate] = useState(0);
  const [silverRate, setSilverRate] = useState(0);
  const [editingRates, setEditingRates] = useState(false);
  const [tempGoldRate, setTempGoldRate] = useState(0);
  const [tempSilverRate, setTempSilverRate] = useState(0);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/admin/login');
      toast.success(t('messages.logoutSuccess'));
    } catch (error) {
      toast.error(t('messages.logoutFailed'));
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [dashboardData, rates] = await Promise.all([
        getDashboardStats(),
        getCurrentMetalRates()
      ]);

      setStats(dashboardData);
      setGoldRate(rates.gold);
      setSilverRate(rates.silver);
      setTempGoldRate(rates.gold);
      setTempSilverRate(rates.silver);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRates = async () => {
    try {
      await Promise.all([
        updateMetalRate('gold', tempGoldRate),
        updateMetalRate('silver', tempSilverRate)
      ]);
      setGoldRate(tempGoldRate);
      setSilverRate(tempSilverRate);
      setEditingRates(false);
      await loadDashboardData();
      toast.success(t('messages.ratesUpdated'));
    } catch (error) {
      console.error('Error updating rates:', error);
      toast.error(t('messages.ratesUpdateFailed'));
    }
  };

  const tabs = [
    { id: 'dashboard' as TabType, label: t('admin.dashboard'), icon: LayoutDashboard },
    { id: 'master' as TabType, label: t('admin.master'), icon: Database },
    { id: 'customer' as TabType, label: t('admin.customer'), icon: Users },
    { id: 'transaction' as TabType, label: t('admin.transaction'), icon: FileText },
    { id: 'bank' as TabType, label: t('admin.bank'), icon: Building2 },
    { id: 'accounts' as TabType, label: t('admin.accounts'), icon: DollarSign },
    { id: 'reports' as TabType, label: t('admin.reports'), icon: BarChart3 },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Gem className="h-16 w-16 text-purple-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600 text-lg">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Gem className="h-8 w-8 text-purple-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{t('admin.title')}</h1>
                <p className="text-sm text-gray-500">{t('admin.subtitle')}</p>
              </div>
            </div>

            {/* User Info, Language Switcher and Logout */}
            <div className="flex items-center space-x-4">
              <LanguageSwitcherDropdown />
              {user && (
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user.email}</p>
                  <p className="text-xs text-gray-500">{t('admin.administrator')}</p>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title={t('common.logout')}
              >
                <LogOut className="h-4 w-4" />
                <span>{t('common.logout')}</span>
              </button>
            </div>

            {/* Metal Rates Display */}
            <div className="flex items-center space-x-6">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-6 py-3 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <div>
                    <p className="text-xs opacity-90">Gold Rate</p>
                    {editingRates ? (
                      <input
                        type="number"
                        value={tempGoldRate}
                        onChange={(e) => setTempGoldRate(Number(e.target.value))}
                        className="w-24 bg-white text-gray-900 px-2 py-1 rounded text-sm font-bold"
                      />
                    ) : (
                      <p className="text-lg font-bold">₹{goldRate.toLocaleString()}/g</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-400 to-gray-600 text-white px-6 py-3 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <TrendingDown className="h-5 w-5" />
                  <div>
                    <p className="text-xs opacity-90">{t('admin.silverRate')}</p>
                    {editingRates ? (
                      <input
                        type="number"
                        value={tempSilverRate}
                        onChange={(e) => setTempSilverRate(Number(e.target.value))}
                        className="w-24 bg-white text-gray-900 px-2 py-1 rounded text-sm font-bold"
                      />
                    ) : (
                      <p className="text-lg font-bold">₹{silverRate.toLocaleString()}/g</p>
                    )}
                  </div>
                </div>
              </div>

              {editingRates ? (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSaveRates}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={() => {
                      setEditingRates(false);
                      setTempGoldRate(goldRate);
                      setTempSilverRate(silverRate);
                    }}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setEditingRates(true)}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center space-x-2"
                >
                  <Edit2 className="h-4 w-4" />
                  <span>{t('admin.editRates')}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-4 font-medium transition-all whitespace-nowrap ${activeTab === tab.id
                      ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
                    }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">Active Pledges</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.total_active_pledges || 0}</p>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FileText className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">{t('admin.totalLoanAmount')}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">₹{(stats?.total_loan_amount || 0).toLocaleString()}</p>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <DollarSign className="h-8 w-8 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">{t('admin.totalCustomers')}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.total_customers || 0}</p>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Users className="h-8 w-8 text-purple-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm font-medium">{t('admin.cashInHand')}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">₹{(stats?.cash_in_hand || 0).toLocaleString()}</p>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <DollarSign className="h-8 w-8 text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Today's Activity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t('admin.todaysActivity')}</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-500 p-2 rounded-full">
                        <Plus className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-medium text-gray-900">{t('admin.newPledges')}</span>
                    </div>
                    <span className="text-2xl font-bold text-green-600">{stats?.today_pledges || 0}</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-500 p-2 rounded-full">
                        <TrendingUp className="h-5 w-5 text-white" />
                      </div>
                      <span className="font-medium text-gray-900">{t('admin.returns')}</span>
                    </div>
                    <span className="text-2xl font-bold text-blue-600">{stats?.today_returns || 0}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t('admin.quickActions')}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setActiveTab('transaction')}
                    className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all shadow-md"
                  >
                    <Plus className="h-6 w-6 mx-auto mb-2" />
                    <span className="text-sm font-medium">{t('admin.newPledge')}</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('customer')}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md"
                  >
                    <Users className="h-6 w-6 mx-auto mb-2" />
                    <span className="text-sm font-medium">{t('admin.addCustomer')}</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('reports')}
                    className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4 rounded-lg hover:from-green-700 hover:to-green-800 transition-all shadow-md"
                  >
                    <BarChart3 className="h-6 w-6 mx-auto mb-2" />
                    <span className="text-sm font-medium">{t('admin.viewReports')}</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('master')}
                    className="bg-gradient-to-r from-gray-600 to-gray-700 text-white p-4 rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all shadow-md"
                  >
                    <Settings className="h-6 w-6 mx-auto mb-2" />
                    <span className="text-sm font-medium">{t('admin.masterData')}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'master' && <MasterSection />}
        {activeTab === 'customer' && <CustomerSection />}
        {activeTab === 'transaction' && <TransactionSection />}
        {activeTab === 'bank' && <BankSection />}
        {activeTab === 'accounts' && <AccountsSection />}
        {activeTab === 'reports' && <ReportsSection />}
      </div>
    </div>
  );
};

export default PawnshopAdmin;
