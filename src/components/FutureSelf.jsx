import { useState } from 'react'

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Bar({ label, value, color='bg-orange-500' }) {
  return (
    <div>
      <div className="flex justify-between text-sm text-slate-300 mb-1"><span>{label}</span><span>{value}</span></div>
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

function FutureSelf() {
  const [form, setForm] = useState({ sleep_hours: 7, steps_per_day: 8000, alcohol_units_per_week: 4, screen_time_hours: 6 })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`${BASE_URL}/api/future-self`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      setResult(data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="future" className="py-14 bg-slate-950 border-t border-white/10">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Future Self</h2>
        <p className="text-slate-300 mb-6">Zie de impact van je lifestyle op energie, mobiliteit, mentale balans en blessurerisico.</p>
        <div className="grid lg:grid-cols-2 gap-6">
          <form onSubmit={submit} className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 space-y-4">
            <div>
              <label className="text-slate-300 text-sm">Slaap (uren)</label>
              <input type="range" min="0" max="14" value={form.sleep_hours} onChange={e=>setForm(f=>({...f, sleep_hours: Number(e.target.value)}))} className="w-full" />
              <div className="text-slate-400 text-xs">{form.sleep_hours}u</div>
            </div>
            <div>
              <label className="text-slate-300 text-sm">Stappen per dag</label>
              <input type="number" min="0" max="50000" value={form.steps_per_day} onChange={e=>setForm(f=>({...f, steps_per_day: Number(e.target.value)}))} className="mt-1 w-full bg-slate-800 text-white rounded-xl px-4 py-3 outline-none border border-white/10" />
            </div>
            <div>
              <label className="text-slate-300 text-sm">Alcohol (units/week)</label>
              <input type="number" min="0" max="70" value={form.alcohol_units_per_week} onChange={e=>setForm(f=>({...f, alcohol_units_per_week: Number(e.target.value)}))} className="mt-1 w-full bg-slate-800 text-white rounded-xl px-4 py-3 outline-none border border-white/10" />
            </div>
            <div>
              <label className="text-slate-300 text-sm">Schermtijd (u/dag)</label>
              <input type="number" min="0" max="18" value={form.screen_time_hours} onChange={e=>setForm(f=>({...f, screen_time_hours: Number(e.target.value)}))} className="mt-1 w-full bg-slate-800 text-white rounded-xl px-4 py-3 outline-none border border-white/10" />
            </div>
            <button disabled={loading} className="w-full px-4 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold disabled:opacity-60">{loading ? 'Even...' : 'Bereken'}</button>
          </form>

          <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 space-y-4">
            {!result ? (
              <div className="text-slate-400">Vul links in en bekijk je toekomst. 👀</div>
            ) : (
              <>
                <div className="text-white text-2xl font-bold">Score: {result.score}/100</div>
                <Bar label="Energy" value={result.dimensions.energy} />
                <Bar label="Mobility" value={result.dimensions.mobility} color="bg-lime-500" />
                <Bar label="Mental balance" value={result.dimensions.mental_balance} color="bg-sky-500" />
                <Bar label="Injury risk (lower is better)" value={100 - result.dimensions.injury_risk} color="bg-rose-500" />
                <div className="text-slate-300">{result.summary}</div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FutureSelf
