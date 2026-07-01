import { CartProvider, CartButton } from '@/components/store/Cart'

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <CartButton />
      {children}
    </CartProvider>
  )
}
