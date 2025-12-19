import Link from 'next/link'

export default function Menu() {
  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        
        {/* Coming Soon Section */}
        <section className="text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight text-stone-900 mb-6">
            Menu
          </h1>
          <div className="max-w-2xl mx-auto mt-16 mb-12">
            <p className="text-2xl md:text-3xl text-stone-600 font-light mb-4">
              Coming Soon
            </p>
            <p className="text-lg md:text-xl text-stone-500 leading-relaxed">
              We're crafting an exceptional menu that reflects our commitment to quality and authenticity. 
              Please check back soon.
            </p>
          </div>
          
          {/* Back to home link */}
          <Link 
            href="/"
            className="inline-block px-8 py-4 bg-stone-900 text-stone-50 rounded-lg shadow-md hover:bg-stone-800 hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium text-lg"
          >
            ← Back to Home
          </Link>
        </section>

      </div>
    </div>
  )
}

