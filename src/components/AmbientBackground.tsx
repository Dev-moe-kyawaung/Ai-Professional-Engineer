export default function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-obsidian noise">
      {/* base wash */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,#0d1726_0%,#070a10_45%,#04060a_100%)]" />

      {/* ambient orbs */}
      <div className="absolute -top-[18vh] left-[8vw] h-[52vw] w-[52vw] max-h-[720px] max-w-[720px] rounded-full bg-[radial-gradient(circle,rgba(34,224,245,0.16),transparent_62%)] blur-3xl animate-drift" />
      <div
        className="absolute top-[38vh] -right-[12vw] h-[48vw] w-[48vw] max-h-[680px] max-w-[680px] rounded-full bg-[radial-gradient(circle,rgba(154,107,255,0.16),transparent_62%)] blur-3xl animate-drift"
        style={{ animationDelay: '-9s' }}
      />
      <div
        className="absolute bottom-[-14vh] left-[26vw] h-[40vw] w-[40vw] max-h-[560px] max-w-[560px] rounded-full bg-[radial-gradient(circle,rgba(76,134,255,0.14),transparent_62%)] blur-3xl animate-drift"
        style={{ animationDelay: '-17s' }}
      />

      {/* grid */}
      <div className="absolute inset-0 grid-lines [mask-image:radial-gradient(90%_70%_at_50%_0%,#000_10%,transparent_78%)]" />

      {/* horizon line */}
      <div className="absolute left-0 right-0 top-[62vh] h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_40%,transparent_40%,rgba(0,0,0,0.72)_100%)]" />
    </div>
  )
}
