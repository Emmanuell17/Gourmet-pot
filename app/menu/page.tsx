import Link from 'next/link'

export default function Menu() {
  return (
    <div className="min-h-screen bg-[#f5f5f0] p-8">
      <div className="max-w-2xl mx-auto text-center">
        {/* Page title */}
        <h1 className="text-4xl font-bold mb-8">Menu</h1>
        
        {/* Coming soon message */}
        <div className="mt-16">
          <p className="text-2xl text-gray-700">Coming soon...</p>
        </div>
        
        {/* Back to home link */}
        <div className="mt-8">
          <Link 
            href="/"
            className="text-gray-600 hover:text-gray-800 underline"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

