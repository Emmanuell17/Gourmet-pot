import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        {/* Restaurant name */}
        <h1 className="text-4xl font-bold mb-4">Gourmet Pot</h1>
        
        {/* Short description */}
        <p className="text-lg mb-6">
          Welcome to Gourmet Pot, where we serve delicious and authentic cuisine 
          with fresh ingredients and traditional recipes.
        </p>
        
        {/* Opening hours */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Opening Hours</h2>
          <p>Monday - Friday: 11:00 AM - 10:00 PM</p>
          <p>Saturday - Sunday: 12:00 PM - 11:00 PM</p>
        </div>
        
        {/* Location */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Location</h2>
          <p>123 Main Street, City, State 12345</p>
        </div>
        
        {/* Menu button */}
        <Link 
          href="/menu"
          className="inline-block px-6 py-3 bg-gray-800 text-white rounded hover:bg-gray-700"
        >
          Menu
        </Link>
      </div>
    </div>
  )
}

