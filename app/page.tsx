import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="min-h-screen relative p-8 overflow-hidden">
      {/* Background image with blur */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/background.jpg"
          alt="Background pattern"
          fill
          className="object-cover"
          style={{ filter: 'blur(2px)' }}
          priority
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-[#f5f5f0]/80"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Restaurant name */}
        <h1 className="text-5xl font-bold mb-4 text-black">Gourmet pot</h1>
        
        {/* Tagline */}
        <p className="text-lg mb-8 text-gray-700">
          Where culinary artistry meets authentic tradition
        </p>
        
        {/* View Menu button */}
        <Link 
          href="/menu"
          className="inline-block px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors mb-16"
        >
          View Menu
        </Link>
        
        {/* Our Story section */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-black">Our Story</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            We craft each dish with respect for quality ingredients and time-honored techniques, creating meals that are both refined and deeply welcoming.
          </p>
        </div>
        
        {/* Pickup section */}
        <div className="bg-white rounded-lg p-8 max-w-md mx-auto shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-black">Pickup</h2>
          <p className="text-gray-700">
            We offer delivery only. Pickup is available on Fridays and Saturdays.
          </p>
        </div>
      </div>
    </div>
  )
}

