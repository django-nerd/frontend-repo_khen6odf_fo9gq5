import { useState } from 'react'

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Hangover() {
  const [weight, setWeight] = useState('')
  const [severity, setSeverity] = useState(2)
  const [hr, setHr] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        weight_kg: weight ? Number(weight) : undefined,
        severity: Number(severity),
        include_heart_rate: hr ? Number(hr) : undefined
      }
      const res = await fetch(`${BASE_URL}/api/hangover`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
      })
      const data = await res.json()
      setResult(data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="hangover" className="py-14 bg-slate-950 border-t border-white/10">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">🥴 Hangover Mode</h2>
        <p className="text-slate-300 mb-6">Hydratieschema, tips en check-ins. 18–25 vibe: kort, eerlijk, memes ok.</p>
        <div className="grid lg:grid-cols-2 gap-6">
          <form onSubmit={submit} className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 space-y-4">
            <div>
              <label className="text-slate-300 text-sm">Gewicht (kg)</label>
              <input type="number" min="35" max="250" value={weight} onChange={(e)=>setWeight(e.target.value)} className="mt-1 w-full bg-slate-800 text-white rounded-xl px-4 py-3 outline-none border border-white/10" />
            </div>
            <div>
              <label className="text-slate-300 text-sm">Ernst</label>
              <input type="range" min="1" max="5" value={severity} onChange={(e)=>setSeverity(e.target.value)} className="mt-2 w-full" />
              <div className="text-slate-400 text-xs">1 = meh, 5 = rip</div>
            </div>
            <div>
              <label className="text-slate-300 text-sm">Hartslag (optie)</label>
              <input type="number" min="40" max="220" value={hr} onChange={(e)=>setHr(e.target.value)} className="mt-1 w-full bg-slate-800 text-white rounded-xl px-4 py-3 outline-none border border-white/10" />
            </div>
            <button disabled={loading} className="w-full px-4 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold disabled:opacity-60">{loading ? 'Even...' : 'Genereer plan'}</button>
          </form>

          <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
            {!result ? (
              <div className="text-slate-400">Vul links in en klik. Je plan komt hier. 💧</div>
            ) : (
              <div className="space-y-4">
                <div className="text-white text-xl font-semibold">Drinkdoel: {result.target_hydration_ml} ml</div>
                <div>
                  <div className="text-slate-300 font-medium mb-1">Schema</div>
                  <ul className="space-y-2 text-slate-200 list-disc pl-5">
                    {result.schedule.map((s, i)=> (
                      <li key={i}><span className="text-slate-400 mr-2">{s.time}</span> {s.action}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <div className="text-slate-300 font-medium mb-1">Supps</div>
                  <ul className="space-y-1 text-slate-200 list-disc pl-5">
                    {result.supplements.map((s, i)=> (
                      <li key={i}>{s.name} — <span className="text-slate-400">{s.note}</span></li>
                    ))}
                  </ul>
                </div>
                {result.flags && (
                  <div className="text-orange-300">{result.flags}</div>
                )}
                <div className="text-white">{result.voice}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hangover
