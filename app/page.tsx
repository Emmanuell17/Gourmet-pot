import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        
        {/* Hero Section */}
        <section className="text-center mb-20 md:mb-28 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight text-stone-900 mb-6">
            Met pot
          </h1>
          <p className="text-xl md:text-2xl text-stone-600 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
            Where culinary artistry meets authentic tradition
          </p>
          <Link 
            href="/menu"
            className="inline-block px-8 py-4 bg-stone-900 text-stone-50 rounded-lg shadow-md hover:bg-stone-800 hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium text-lg"
          >
            View Menu
          </Link>
        </section>

        {/* About Section */}
        <section className="mb-20 md:mb-28 animate-slide-up">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-light text-stone-900 mb-6 text-center">
              Our Story
            </h2>
            <div className="space-y-4 text-stone-700 text-lg md:text-xl leading-relaxed text-center">
              <p>
                We craft each dish with respect for quality ingredients and time-honored techniques, 
                creating meals that are both refined and deeply welcoming.
              </p>
            </div>
          </div>
        </section>

        {/* Pickup Section */}
        <section className="mb-20 md:mb-28 animate-slide-up">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8 md:p-10 hover:shadow-md transition-shadow duration-300 border border-stone-100">
              <h2 className="text-2xl md:text-3xl font-light text-stone-900 mb-6 text-center">
                Pickup
              </h2>
              <div className="space-y-4 text-stone-700 text-center">
                <p className="text-lg leading-relaxed mb-4">
                  We offer delivery only. Pickup is available on Fridays and Saturdays.
                </p>
                <div className="space-y-3 pt-4 border-t border-stone-100">
                  <div className="py-2">
                    <p className="font-medium mb-1">Order by Wednesday</p>
                    <p className="text-sm text-stone-600">Place your order by Wednesday for pickup</p>
                  </div>
                  <div className="py-2">
                    <p className="font-medium mb-1">Pickup Days</p>
                    <p className="text-stone-600">Friday & Saturday</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Location Section */}
        <section className="mb-20 md:mb-28 animate-slide-up">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-light text-stone-900 mb-6">
              Visit Us
            </h2>
            <div className="text-stone-700 text-lg leading-relaxed">
              <p className="mb-2">123 Main Street</p>
              <p>City, State 12345</p>
            </div>
          </div>
        </section>

        {/* Call To Action Section */}
        <section className="bg-stone-100 rounded-2xl p-12 md:p-16 text-center animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-light text-stone-900 mb-4">
            Ready to Experience Met pot?
          </h2>
          <p className="text-stone-600 text-lg mb-8 max-w-xl mx-auto">
            Explore our carefully curated menu featuring seasonal ingredients and classic preparations with a modern touch.
          </p>
          <Link 
            href="/menu"
            className="inline-block px-8 py-4 bg-stone-900 text-stone-50 rounded-lg shadow-md hover:bg-stone-800 hover:shadow-lg hover:scale-105 transition-all duration-300 font-medium text-lg"
          >
            View Menu
          </Link>
        </section>

      </div>
    </div>
  )
}

