import Spline from '@splinetool/react-spline'

function Hero({ onCTAClick }) {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-slate-950">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/AeAqaKLmGsS-FPBN/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/40 to-slate-950/90 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80 text-xs mb-6">
          <span>One app to rule them all — zorg, reizen, lifestyle & fun</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white">
          Sjakie — AI SuperApp
        </h1>
        <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
          Clean. Snel. Speels. Jouw buddy voor zorg, reizen, lifestyle & fun. Voor 18–25. Zero bullshit.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#triage" className="px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold shadow-lg shadow-orange-500/20 transition-colors">
            Start AI Dokter
          </a>
          <a href="#hangover" className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors">
            Hangover Mode
          </a>
          <a href="#future" className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors">
            Future Self
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
