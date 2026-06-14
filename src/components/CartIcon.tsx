import { useCart } from '../context/CartContext';
import { useState } from 'react';
import CartSidebar from './CartSidebar';

export default function CartIcon() {
  const { totalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative bg-white/20 backdrop-blur rounded-full p-3 hover:bg-white/30 transition-all"
      >
        <span className="text-2xl">🛒</span>
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
      </button>
      <CartSidebar isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}