import React, { useState, useEffect } from 'react'
import { supabase } from './Authenticcation/supabaseClient'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, Clock, CheckCircle2, XCircle, Search,
  ChevronDown, ChevronUp, User, Briefcase, DollarSign,
  Shield, FileText, ExternalLink, RefreshCw, LogOut,
  TrendingUp, AlertCircle, Eye, X
} from 'lucide-react'
import LoginPage from './Authenticcation/Login'



const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className='bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4'>
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
      <Icon size={22} className='text-white' />
    </div>
    <div>
      <p className='text-gray-400 text-[12px] font-medium'>{label}</p>
      <p className='text-[#1a4731] text-[26px] font-bold leading-none mt-0.5'>{value}</p>
    </div>
  </div>
)

const Badge = ({ status }) => {
  const map = {
    pending:   'bg-amber-100 text-amber-700 border-amber-200',
    disbursed: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    rejected:  'bg-red-100 text-red-600 border-red-200',
  }
  const icons = {
    pending:   <Clock size={11} />,
    disbursed: <CheckCircle2 size={11} />,
    rejected:  <XCircle size={11} />,
  }
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border capitalize ${map[status] ?? map.pending}`}>
      {icons[status] ?? icons.pending}
      {status ?? 'pending'}
    </span>
  )
}

const DR = ({ label, value }) => value ? (
  <div className='flex flex-col gap-0.5'>
    <span className='text-gray-400 text-[11px] font-medium uppercase tracking-wide'>{label}</span>
    <span className='text-gray-700 text-[13px] font-medium'>{value}</span>
  </div>
) : null


const Modal = ({ app, onClose, onStatusChange, saving }) => {
  if (!app) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className='fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto'
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}
          transition={{ type: 'spring', damping: 25 }}
          className='bg-white rounded-3xl shadow-2xl w-full max-w-2xl my-8'
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className='bg-[#1a4731] rounded-t-3xl px-7 py-5 flex items-center justify-between'>
            <div>
              <p className='text-[#3dba6f] text-[11px] font-semibold tracking-widest uppercase mb-1'>Application Details</p>
              <h2 className='text-white text-[20px] font-bold'>{app.fullName}</h2>
            </div>
            <div className='flex items-center gap-3'>
              <Badge status={app.status ?? 'pending'} />
              <button onClick={onClose} className='w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors'>
                <X size={16} />
              </button>
            </div>
          </div>

          <div className='p-7 space-y-6'>

            {/* Personal */}
            <section>
              <h3 className='text-[#1a4731] font-bold text-[13px] uppercase tracking-widest mb-3 flex items-center gap-2'>
                <User size={13} /> Personal Information
              </h3>
              <div className='grid grid-cols-2 md:grid-cols-3 gap-4 bg-gray-50 rounded-2xl p-4'>
                <DR label='Phone' value={app.phone} />
                <DR label='Email' value={app.email} />
                <DR label='BVN' value={app.bvn} />
                <DR label='Address' value={app.address} />
                <DR label='City / State' value={app.cityState} />
              </div>
            </section>

            {/* Employment */}
            <section>
              <h3 className='text-[#1a4731] font-bold text-[13px] uppercase tracking-widest mb-3 flex items-center gap-2'>
                <Briefcase size={13} /> Employment
              </h3>
              <div className='grid grid-cols-2 md:grid-cols-3 gap-4 bg-gray-50 rounded-2xl p-4'>
                <DR label='Status' value={app.employmentStatus} />
                <DR label='Employer' value={app.employerName} />
                <DR label='Work Address' value={app.workAddress} />
                <DR label='Monthly Income' value={app.monthlyIncome} />
                <DR label='Years at Job' value={app.yearsAtJob} />
              </div>
            </section>

            {/* Loan Details */}
            <section>
              <h3 className='text-[#1a4731] font-bold text-[13px] uppercase tracking-widest mb-3 flex items-center gap-2'>
                <DollarSign size={13} /> Loan Details
              </h3>
              <div className='grid grid-cols-2 md:grid-cols-3 gap-4 bg-gray-50 rounded-2xl p-4'>
                <DR label='Type' value={app.loanType} />
                <DR label='Amount' value={app.loanAmount} />
                <DR label='Repayment' value={app.repaymentDuration} />
                <DR label='Purpose' value={app.loanPurpose} />
              </div>
            </section>

            {/* Guarantor */}
            <section>
              <h3 className='text-[#1a4731] font-bold text-[13px] uppercase tracking-widest mb-3 flex items-center gap-2'>
                <Shield size={13} /> Guarantor
              </h3>
              <div className='grid grid-cols-2 md:grid-cols-3 gap-4 bg-gray-50 rounded-2xl p-4'>
                <DR label='Name' value={app.guarantorName} />
                <DR label='Phone' value={app.guarantorPhone} />
                <DR label='Relationship' value={app.guarantorRelationship} />
                <DR label='Occupation' value={app.guarantorOccupation} />
                <DR label='Unique ID' value={app.guarantorID} />
              </div>
            </section>

            {/* Documents */}
            {(app.id_card_url || app.salary_slip_url) && (
              <section>
                <h3 className='text-[#1a4731] font-bold text-[13px] uppercase tracking-widest mb-3 flex items-center gap-2'>
                  <FileText size={13} /> Documents
                </h3>
                <div className='flex flex-wrap gap-3'>
                  {app.id_card_url && (
                    <a href={app.id_card_url} target='_blank' rel='noreferrer'
                      className='inline-flex items-center gap-2 bg-[#f0f9f4] border border-green-200 text-[#1a4731] text-[13px] font-semibold px-4 py-2.5 rounded-xl hover:bg-green-100 transition-colors'>
                      <FileText size={14} /> Work ID Card <ExternalLink size={12} />
                    </a>
                  )}
                  {app.salary_slip_url && (
                    <a href={app.salary_slip_url} target='_blank' rel='noreferrer'
                      className='inline-flex items-center gap-2 bg-[#f0f9f4] border border-green-200 text-[#1a4731] text-[13px] font-semibold px-4 py-2.5 rounded-xl hover:bg-green-100 transition-colors'>
                      <FileText size={14} /> Salary Slip <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </section>
            )}

            {/* Status History */}
            <section>
              <h3 className='text-[#1a4731] font-bold text-[13px] uppercase tracking-widest mb-3 flex items-center gap-2'>
                <Clock size={13} /> Status History
              </h3>
              <div className='space-y-2 bg-gray-50 rounded-2xl p-4'>
                {Array.isArray(app.status_history) && app.status_history.length > 0 ? (
                  app.status_history.slice().reverse().map((h, i) => (
                    <div key={i} className='flex items-center justify-between gap-3'>
                      <div className='flex items-center gap-3'>
                        <Badge status={h.to} />
                        <div className='text-gray-600 text-[13px]'>
                          <div className='font-medium'>{h.from} → {h.to}</div>
                          <div className='text-gray-400 text-[12px]'>
                            {new Date(h.at).toLocaleString('en-NG', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='text-gray-500 text-[13px]'>No status changes recorded.</div>
                )}
              </div>
            </section>

            {/* Actions */}
            <div className='flex flex-wrap gap-3 pt-2 border-t border-gray-100'>
              <button
                onClick={() => onStatusChange(app.id, 'disbursed')}
                disabled={saving || app.status === 'disbursed'}
                className='flex-1 inline-flex items-center justify-center gap-2 bg-[#1a4731] hover:bg-[#2d7a4f] disabled:opacity-50 text-white font-bold text-[13px] px-5 py-3 rounded-xl transition-all'>
                <CheckCircle2 size={15} />
                {saving ? 'Saving…' : 'Mark as Disbursed'}
              </button>
              <button
                onClick={() => onStatusChange(app.id, 'rejected')}
                disabled={saving || app.status === 'rejected'}
                className='flex-1 inline-flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 disabled:opacity-50 text-red-600 border border-red-200 font-bold text-[13px] px-5 py-3 rounded-xl transition-all'>
                <XCircle size={15} />
                {saving ? 'Saving…' : 'Reject'}
              </button>
              {app.status !== 'pending' && (
                <button
                  onClick={() => onStatusChange(app.id, 'pending')}
                  disabled={saving}
                  className='inline-flex items-center justify-center gap-2 bg-amber-50 hover:bg-amber-100 disabled:opacity-50 text-amber-700 border border-amber-200 font-bold text-[13px] px-5 py-3 rounded-xl transition-all'>
                  <Clock size={15} /> Reset to Pending
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}


const AppRow = ({ app, onView }) => (
  <motion.tr
    initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
    className='border-b border-gray-50 hover:bg-[#f0f9f4]/60 transition-colors group'>
    <td className='px-5 py-4'>
      <div>
        <p className='text-[#1a4731] font-semibold text-[13px]'>{app.fullName}</p>
        <p className='text-gray-400 text-[11px]'>{app.email}</p>
      </div>
    </td>
    <td className='px-5 py-4 hidden md:table-cell'>
      <p className='text-gray-600 text-[13px]'>{app.phone}</p>
    </td>
    <td className='px-5 py-4 hidden lg:table-cell'>
      <p className='text-gray-600 text-[13px]'>{app.loanType}</p>
    </td>
    <td className='px-5 py-4 hidden lg:table-cell'>
      <p className='text-gray-600 text-[13px] font-medium'>₦{app.loanAmount}</p>
    </td>
    <td className='px-5 py-4'>
      <Badge status={app.status ?? 'pending'} />
    </td>
    <td className='px-5 py-4 hidden sm:table-cell'>
      <p className='text-gray-400 text-[11px]'>
        {new Date(app.created_at).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}
      </p>
    </td>
    <td className='px-5 py-4'>
      <button onClick={() => onView(app)}
        className='inline-flex items-center gap-1.5 bg-[#1a4731] hover:bg-[#2d7a4f] text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-colors opacity-0 group-hover:opacity-100'>
        <Eye size={12} /> View
      </button>
    </td>
  </motion.tr>
)

const AdminPage = () => {
  // ── All hooks first — no early returns before this block ──
  const [session, setSession]         = useState(undefined)
  const [applications, setApplications] = useState([])
  const [loading, setLoading]         = useState(true)
  const [error, setError]             = useState(null)
  const [tab, setTab]                 = useState('all')
  const [search, setSearch]           = useState('')
  const [selected, setSelected]       = useState(null)
  const [saving, setSaving]           = useState(false)
  const [sortDir, setSortDir]         = useState('desc')

  // ── Auth ──
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session ?? null))
    const { data: listener } = supabase.auth.onAuthStateChange((_e, s) => setSession(s ?? null))
    return () => listener.subscription.unsubscribe()
  }, [])

  // ── Data fetch — runs only when logged in ──
  const fetchApplications = async () => {
    setLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase
        .from('loan_applications')
        .select('*')
        .order('created_at', { ascending: sortDir === 'asc' })
      if (error) throw error
      setApplications(data ?? [])
    } catch (err) {
      setError(err.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (session) fetchApplications()
  }, [sortDir, session])

  // ── Handlers ──
  const handleLogout = async () => {
    await supabase.auth.signOut()
    setSession(null)
    setApplications([])
  }

  const handleStatusChange = async (id, newStatus) => {
    setSaving(true)
    try {
      const app = applications.find(a => a.id === id)
      const oldStatus = app?.status ?? 'pending'
      const entry = { from: oldStatus, to: newStatus, at: new Date().toISOString() }
      const newHistory = Array.isArray(app?.status_history) ? [...app.status_history, entry] : [entry]
      const { error } = await supabase
        .from('loan_applications')
        .update({ status: newStatus, status_history: newHistory })
        .eq('id', id)
      if (error) throw error
      setApplications(prev => prev.map(a => a.id === id ? { ...a, status: newStatus, status_history: newHistory } : a))
      if (selected?.id === id) setSelected(prev => ({ ...prev, status: newStatus, status_history: newHistory }))
    } catch (err) {
      alert(`Failed to update: ${err.message}`)
    }
    setSaving(false)
  }

  const filtered = applications.filter(a => {
    const matchesTab =
      tab === 'all' ? true :
      tab === 'pending' ? (!a.status || a.status === 'pending') :
      a.status === tab
    const q = search.toLowerCase()
    const matchesSearch = !q ||
      a.fullName?.toLowerCase().includes(q) ||
      a.email?.toLowerCase().includes(q) ||
      a.phone?.includes(q) ||
      a.loanType?.toLowerCase().includes(q)
    return matchesTab && matchesSearch
  })

  const counts = {
    all:       applications.length,
    pending:   applications.filter(a => !a.status || a.status === 'pending').length,
    disbursed: applications.filter(a => a.status === 'disbursed').length,
    rejected:  applications.filter(a => a.status === 'rejected').length,
  }

  const tabs = [
    { key: 'all',       label: 'All',       color: 'bg-[#1a4731]' },
    { key: 'pending',   label: 'Pending',   color: 'bg-amber-500' },
    { key: 'disbursed', label: 'Disbursed', color: 'bg-emerald-600' },
    { key: 'rejected',  label: 'Rejected',  color: 'bg-red-500' },
  ]

  // ── Conditional renders AFTER all hooks ──
  if (session === undefined) return null
  if (!session) return <LoginPage onLogin={setSession} />

  return (
    <div className='min-h-screen bg-[#f4f7f5] font-sans'>

      {/* ── Header ── */}
      <header className='bg-[#1a4731] shadow-lg'>
        <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='w-9 h-9 rounded-xl bg-[#3dba6f] flex items-center justify-center'>
              <LayoutDashboard size={18} className='text-white' />
            </div>
            <div>
              <p className='text-white font-bold text-[15px] leading-none'>COR'N Admin</p>
              <p className='text-[#3dba6f] text-[11px]'>Loan Management</p>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <button onClick={fetchApplications}
              className='inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-[12px] font-medium px-3 py-2 rounded-lg transition-colors'>
              <RefreshCw size={13} className={loading ? 'animate-spin' : ''} /> Refresh
            </button>
            <button onClick={handleLogout}
              className='inline-flex items-center gap-1.5 bg-white/10 hover:bg-red-500 text-white text-[12px] font-medium px-3 py-2 rounded-lg transition-colors'>
              <LogOut size={13} /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className='max-w-7xl mx-auto px-6 py-8 space-y-6'>

        {/* ── Stats ── */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          <StatCard icon={TrendingUp}   label='Total Applications' value={counts.all}       color='bg-[#1a4731]' />
          <StatCard icon={Clock}        label='Pending'            value={counts.pending}   color='bg-amber-500' />
          <StatCard icon={CheckCircle2} label='Disbursed'          value={counts.disbursed} color='bg-emerald-600' />
          <StatCard icon={XCircle}      label='Rejected'           value={counts.rejected}  color='bg-red-500' />
        </div>

        {/* ── Table ── */}
        <div className='bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>

          {/* Toolbar */}
          <div className='px-6 pt-5 pb-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center gap-4'>
            <div className='flex items-center gap-1 bg-gray-100 rounded-xl p-1 flex-wrap'>
              {tabs.map(t => (
                <button key={t.key} onClick={() => setTab(t.key)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all ${tab === t.key ? 'bg-white text-[#1a4731] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                  {t.label}
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full text-white ${t.color}`}>{counts[t.key]}</span>
                </button>
              ))}
            </div>
            <div className='relative flex-1 max-w-xs ml-auto'>
              <Search size={14} className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' />
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder='Search name, email, phone…'
                className='w-full pl-9 pr-4 py-2 text-[13px] border border-gray-200 rounded-xl focus:outline-none focus:border-[#3dba6f] focus:ring-2 focus:ring-[#3dba6f]/20' />
            </div>
          </div>

          {error && (
            <div className='mx-6 mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-600 text-[13px]'>
              <AlertCircle size={14} /> {error}
            </div>
          )}

          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='bg-gray-50 border-b border-gray-100'>
                  <th className='px-5 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider'>Applicant</th>
                  <th className='px-5 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell'>Phone</th>
                  <th className='px-5 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider hidden lg:table-cell'>Loan Type</th>
                  <th className='px-5 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider hidden lg:table-cell'>Amount</th>
                  <th className='px-5 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider'>Status</th>
                  <th className='px-5 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider hidden sm:table-cell'>
                    <button onClick={() => setSortDir(d => d === 'asc' ? 'desc' : 'asc')}
                      className='flex items-center gap-1 hover:text-[#1a4731] transition-colors'>
                      Date {sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                    </button>
                  </th>
                  <th className='px-5 py-3' />
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className='border-b border-gray-50'>
                      {Array.from({ length: 7 }).map((_, j) => (
                        <td key={j} className='px-5 py-4'>
                          <div className='h-3 bg-gray-100 rounded animate-pulse' style={{ width: `${60 + Math.random() * 30}%` }} />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className='px-5 py-16 text-center'>
                      <div className='flex flex-col items-center gap-2'>
                        <div className='w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center'>
                          <Search size={20} className='text-gray-300' />
                        </div>
                        <p className='text-gray-400 text-[14px] font-medium'>No applications found</p>
                        <p className='text-gray-300 text-[12px]'>Try adjusting your search or filter</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map(app => (
                    <AppRow key={app.id} app={app} onView={setSelected} />
                  ))
                )}
              </tbody>
            </table>
          </div>

          {!loading && filtered.length > 0 && (
            <div className='px-6 py-3 border-t border-gray-100'>
              <p className='text-gray-400 text-[12px]'>
                Showing <span className='font-semibold text-gray-600'>{filtered.length}</span> of{' '}
                <span className='font-semibold text-gray-600'>{applications.length}</span> applications
              </p>
            </div>
          )}
        </div>
      </main>

      {selected && (
        <Modal
          app={selected}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
          saving={saving}
        />
      )}
    </div>
  )
}

export default AdminPage