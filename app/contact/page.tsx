import Image from 'next/image'

export default function Contact() {
  return (
    <div className="min-h-screen relative">
      {/* Interactive Background - same as menu/order pages */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/background.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,165,0,0.1)_0%,transparent_50%)] animate-pulse"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 md:p-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-white tracking-wider">Contact</h1>
          <p className="text-lg text-white/90 mb-6">Get in touch with us.</p>
          <p className="text-lg text-white/90">
            <span className="font-medium">Instagram:</span>{' '}
            <a
              href="https://instagram.com/gourmet_pot_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-orange-400 hover:text-orange-300 underline"
            >
              @gourmet_pot_
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}



