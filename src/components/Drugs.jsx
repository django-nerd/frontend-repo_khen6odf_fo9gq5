import { useEffect, useState } from 'react'

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
const options = [
  { key: 'alcohol', label: 'Alcohol' },
  { key: 'mdma', label: 'MDMA' },
  { key: 'cannabis', label: 'Cannabis' },
  { key: 'cocaine', label: 'Cocaïne' },
]

function Drugs() {
  const [substance, setSubstance] = useState('alcohol')
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchInfo = async () => {
      const res = await fetch(`${BASE_URL}/api/drugs/info?substance=${substance}`)
      const json = await res.json()
      setData(json)
    }
    fetchInfo()
  }, [substance])

  return (
    <section className="py-14 bg-slate-950 border-t border-white/10">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">💊 Drugs Mode (harm reduction)</h2>
        <p className="text-slate-300 mb-6">Educatief, niet promotioneel. 100% anoniem. Blijf veilig. 🫶</p>
        <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6">
          <div className="flex flex-wrap gap-2 mb-6">
            {options.map(o => (
              <button key={o.key} onClick={()=>setSubstance(o.key)} className={`px-4 py-2 rounded-xl border ${substance===o.key? 'bg-orange-500 text-white border-orange-500' : 'bg-white/5 text-white/80 border-white/10'}`}>{o.label}</button>
            ))}
          </div>
          {!data ? (
            <div className="text-slate-400">Fetching...</div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6 text-slate-200">
              <div>
                <div className="text-slate-300 font-semibold mb-1">Risico's</div>
                <ul className="list-disc pl-5 space-y-1">{data.education.risks.map((r,i)=>(<li key={i}>{r}</li>))}</ul>
              </div>
              <div>
                <div className="text-slate-300 font-semibold mb-1">Niet combineren met</div>
                <ul className="list-disc pl-5 space-y-1">{data.education.avoid_combinations.map((r,i)=>(<li key={i}>{r}</li>))}</ul>
              </div>
              <div>
                <div className="text-slate-300 font-semibold mb-1">Dosering</div>
                <div className="text-slate-200">{data.education.dosage_guidance}</div>
              </div>
              <div>
                <div className="text-slate-300 font-semibold mb-1">Aftercare</div>
                <ul className="list-disc pl-5 space-y-1">{data.education.aftercare.map((r,i)=>(<li key={i}>{r}</li>))}</ul>
              </div>
              <div className="sm:col-span-2">
                <div className="text-rose-300">Spoedsignalen: {data.education.emergency_signs.join(', ')}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Drugs
