import Hero from './components/Hero'
import Triage from './components/Triage'
import Hangover from './components/Hangover'
import FutureSelf from './components/FutureSelf'
import Drugs from './components/Drugs'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Hero />
      <Triage />
      <Hangover />
      <FutureSelf />
      <Drugs />
      <footer className="py-10 text-center text-slate-500 border-t border-white/10">Sjakie – AI SuperApp • v1</footer>
    </div>
  )
}

export default App
