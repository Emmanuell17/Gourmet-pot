import Link from 'next/link'

// Hardcoded menu items
const menuItems = [
  { name: 'Margherita Pizza', price: '$12.99' },
  { name: 'Chicken Pasta', price: '$14.99' },
  { name: 'Caesar Salad', price: '$9.99' },
  { name: 'Beef Burger', price: '$13.99' },
  { name: 'Grilled Salmon', price: '$18.99' },
  { name: 'Vegetable Stir Fry', price: '$11.99' },
  { name: 'Chicken Curry', price: '$15.99' },
  { name: 'Fish and Chips', price: '$16.99' },
  { name: 'Vegetable Soup', price: '$7.99' },
  { name: 'Chocolate Cake', price: '$6.99' },
]

export default function Menu() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        {/* Page title */}
        <h1 className="text-4xl font-bold mb-8">Menu</h1>
        
        {/* Menu items list */}
        <div className="space-y-4">
          {menuItems.map((item, index) => (
            <div key={index} className="border-b pb-4">
              <div className="flex justify-between items-center">
                <span className="text-lg">{item.name}</span>
                <span className="text-lg font-semibold">{item.price}</span>
              </div>
            </div>
          ))}
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

