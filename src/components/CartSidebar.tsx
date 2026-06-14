import { useCart } from '../context/CartContext';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { cart, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <h2 className="text-xl font-bold">Your Cart 🛒</h2>
          <button onClick={onClose} className="text-2xl hover:text-gray-200">&times;</button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="text-center py-10">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-gray-500">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-3 border-b pb-3">
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-contain bg-gray-50 rounded" />
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold line-clamp-2">{item.title}</h4>
                    <p className="text-blue-600 font-bold">${item.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 bg-gray-200 rounded-full hover:bg-gray-300"
                      >-</button>
                      <span className="text-sm w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 bg-gray-200 rounded-full hover:bg-gray-300"
                      >+</button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-auto text-red-500 text-sm"
                      >Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t p-4 space-y-3">
            <div className="flex justify-between font-bold">
              <span>Total ({totalItems} items):</span>
              <span className="text-xl text-blue-600">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={clearCart}
                className="flex-1 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50"
              >
                Clear Cart
              </button>
              <button className="flex-1 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg">
                Checkout →
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}