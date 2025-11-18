import { useState } from 'react'

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Bubble({ role = 'bot', children }) {
  const isBot = role === 'bot'
  return (
    <div className={`w-full flex ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`${isBot ? 'bg-slate-800 text-white' : 'bg-orange-500 text-white'} px-4 py-2 rounded-2xl max-w-[80%]`}>{children}</div>
    </div>
  )
}

function Triage() {
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Yo! Wat is er aan de hand? Kort en simpel. 🫶' }
  ])
  const [input, setInput] = useState('Ik heb buikpijn')
  const [loading, setLoading] = useState(false)

  const sendStart = async (text) => {
    const res = await fetch(`${BASE_URL}/api/triage/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text })
    })
    const data = await res.json()
    setMessages(m => [...m, { role: 'bot', text: data.question }])
  }

  const sendNext = async (context) => {
    const res = await fetch(`${BASE_URL}/api/triage/next`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ context })
    })
    const data = await res.json()
    if (data.question) setMessages(m => [...m, { role: 'bot', text: data.question }])
    if (data.outcome) setMessages(m => [...m, { role: 'bot', text: `${data.outcome}` }])
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    setMessages(m => [...m, { role: 'user', text }])
    setInput('')
    setLoading(true)
    try {
      if (messages.length === 1) {
        await sendStart(text)
      } else {
        await sendNext(text)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="triage" className="py-14 bg-slate-950 border-t border-white/10">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Sjakie – AI Dokter Assistent</h2>
        <p className="text-slate-300 mb-6">Conversational triage. Kort, duidelijk, empathisch.</p>
        <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-4 sm:p-6 space-y-4">
          <div className="h-72 overflow-y-auto space-y-3 pr-2">
            {messages.map((m, i) => (
              <Bubble key={i} role={m.role}>{m.text}</Bubble>
            ))}
          </div>
          <form onSubmit={onSubmit} className="flex gap-2">
            <input
              className="flex-1 bg-slate-800 text-white rounded-xl px-4 py-3 outline-none border border-white/10 focus:border-orange-500"
              placeholder="Typ je antwoord..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button disabled={loading} className="px-4 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold disabled:opacity-60">
              {loading ? '...' : 'Stuur'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Triage
