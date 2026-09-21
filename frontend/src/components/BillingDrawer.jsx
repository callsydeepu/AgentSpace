import React from 'react'
import { X, Check, Zap, Coins, Shield } from 'lucide-react'
import { useSelector } from 'react-redux'

function BillingDrawer({ open, onClose }) {
  const { userData } = useSelector((state) => state.user)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm transition-opacity duration-200">
      <div className="w-full max-w-md bg-[#13151c] border-l border-white/[0.08] h-full flex flex-col p-6 shadow-2xl overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
              <Coins size={19} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-100">Billing & Subscriptions</h2>
              <p className="text-xs text-slate-500">Manage your credits and plan details</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer border-none"
          >
            <X size={18} />
          </button>
        </div>

        {/* Current Plan Overview */}
        <div className="my-6 p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent border border-indigo-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Current Plan</span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-medium capitalize">
              {userData?.plan || 'Free Tier'}
            </span>
          </div>
          <div className="mt-3">
            <p className="text-2xl font-bold text-white">100 Credits</p>
            <p className="text-xs text-slate-400 mt-1">Refreshes monthly. Reset in 14 days.</p>
          </div>
        </div>

        {/* Available Plans */}
        <div className="flex-1 space-y-4">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Available Plans</h3>

          {/* Pro Plan */}
          <div className="p-5 rounded-xl bg-white/[0.03] border border-indigo-500/30 hover:border-indigo-500/60 transition-all relative">
            <div className="absolute -top-2.5 right-4 bg-indigo-600 text-[10px] font-bold text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
              Popular
            </div>
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-base font-semibold text-white flex items-center gap-2">
                  Pro Developer <Zap size={15} className="text-indigo-400" />
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">Ideal for power users & active builders</p>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold text-white">$19</span>
                <span className="text-xs text-slate-500">/mo</span>
              </div>
            </div>

            <ul className="mt-4 space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Check size={14} className="text-indigo-400 shrink-0" /> Unlimited AI Agent queries
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-indigo-400 shrink-0" /> Priority multi-agent graph execution
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-indigo-400 shrink-0" /> Artifact storage & live preview
              </li>
            </ul>

            <button className="mt-5 w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors cursor-pointer border-none shadow-lg shadow-indigo-600/20">
              Upgrade to Pro
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] transition-all">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-base font-semibold text-white flex items-center gap-2">
                  Enterprise <Shield size={15} className="text-purple-400" />
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">Custom infrastructure & dedicated agents</p>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold text-white">$49</span>
                <span className="text-xs text-slate-500">/mo</span>
              </div>
            </div>

            <ul className="mt-4 space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Check size={14} className="text-purple-400 shrink-0" /> Custom LLM integrations
              </li>
              <li className="flex items-center gap-2">
                <Check size={14} className="text-purple-400 shrink-0" /> 24/7 dedicated support
              </li>
            </ul>

            <button className="mt-5 w-full py-2.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 text-xs font-semibold transition-colors cursor-pointer border-none">
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BillingDrawer
