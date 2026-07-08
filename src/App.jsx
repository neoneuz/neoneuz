import { useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { CartProvider, useCart } from './context/CartContext'
import { WishlistProvider, useWishlist } from './context/WishlistContext'
import { OrderProvider } from './context/OrderContext'
import Header from './components/Header'
import Footer from './components/Footer'
import SearchOverlay from './components/SearchOverlay'
import Home from './pages/Home'
import Category from './pages/Category'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import OtpVerification from './pages/auth/OtpVerification'
import ResetPassword from './pages/auth/ResetPassword'
import Profile from './pages/account/Profile'
import EditProfile from './pages/account/EditProfile'
import ChangePassword from './pages/account/ChangePassword'
import AccountSettings from './pages/account/AccountSettings'
import AddressBook from './pages/account/AddressBook'
import NotificationSettings from './pages/account/NotificationSettings'
import ShippingAddress from './pages/checkout/ShippingAddress'
import DeliveryMethod from './pages/checkout/DeliveryMethod'
import OrderSummary from './pages/checkout/OrderSummary'
import Payment from './pages/checkout/Payment'
import PaymentSuccess from './pages/checkout/PaymentSuccess'
import PaymentFailed from './pages/checkout/PaymentFailed'
import PaymentPending from './pages/checkout/PaymentPending'
import OrderHistory from './pages/orders/OrderHistory'
import OrderDetails from './pages/orders/OrderDetails'
import OrderTracking from './pages/orders/OrderTracking'
import Invoice from './pages/orders/Invoice'

const ACCOUNT_ROUTES = [
  'profile',
  'edit-profile',
  'change-password',
  'account-settings',
  'address-book',
  'notification-settings',
  'orders',
  'order-details',
  'order-tracking',
  'order-invoice',
]

const AUTH_ROUTES = ['login', 'register', 'forgot-password', 'otp-verify', 'reset-password']

function AppShell() {
  const { isAuthenticated, logout } = useAuth()
  const { itemCount: cartCount, clearCart } = useCart()
  const { count: wishlistCount } = useWishlist()

  const [route, setRoute] = useState('home')
  const [activeCategory, setActiveCategory] = useState('Erkaklar')
  const [activeProduct, setActiveProduct] = useState(null)
  const [activeOrderId, setActiveOrderId] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)

  // OTP oqimi qaysi jarayonga (ro'yxatdan o'tish yoki parolni tiklash) tegishli ekanini
  // va qaysi email uchun ekanini saqlab turadi.
  const [authFlow, setAuthFlow] = useState({ purpose: 'register', email: '' })

  // Checkout jarayonida tanlangan manzil va yetkazib berish usulini bosqichlar orasida saqlab turadi.
  const [checkoutSelection, setCheckoutSelection] = useState({ addressId: null, deliveryId: 'standard' })
  const [lastOrder, setLastOrder] = useState(null)

  function scrollTop() {
    window.scrollTo(0, 0)
  }

  function goHome() {
    setRoute('home')
    scrollTop()
  }

  function goCategory(name = 'Erkaklar') {
    setActiveCategory(name)
    setRoute('category')
    scrollTop()
  }

  function goProduct(product) {
    setActiveProduct(product)
    setRoute('product')
    setSearchOpen(false)
    scrollTop()
  }

  function handleNavigate(to, label) {
    if (to === 'home') goHome()
    else if (to === 'category') goCategory(label)
    else if (to === 'sale') goCategory('Aksiya')
  }

  function goAccount(page) {
    setRoute(page)
    scrollTop()
  }

  function goProfileOrLogin() {
    goAccount(isAuthenticated ? 'profile' : 'login')
  }

  function handleLogout() {
    logout()
    goHome()
  }

  // --- Auth oqimlari ---
  function goLogin() {
    setRoute('login')
    scrollTop()
  }

  function goRegister() {
    setRoute('register')
    scrollTop()
  }

  function goForgotPassword() {
    setRoute('forgot-password')
    scrollTop()
  }

  function handleLoggedIn() {
    goAccount('profile')
  }

  function handleRegistered(email) {
    setAuthFlow({ purpose: 'register', email })
    setRoute('otp-verify')
    scrollTop()
  }

  function handleCodeSent(email) {
    setAuthFlow({ purpose: 'reset', email })
    setRoute('otp-verify')
    scrollTop()
  }

  function handleOtpVerified() {
    if (authFlow.purpose === 'register') {
      goAccount('profile')
    } else {
      setRoute('reset-password')
      scrollTop()
    }
  }

  function handlePasswordReset() {
    goLogin()
  }

  function handleAccountDeleted() {
    goHome()
  }

  // --- Buyurtmalar tarixi oqimi ---
  function goOrderDetails(orderId) {
    setActiveOrderId(orderId)
    setRoute('order-details')
    scrollTop()
  }

  function goOrderTracking(orderId) {
    setActiveOrderId(orderId)
    setRoute('order-tracking')
    scrollTop()
  }

  function goOrderInvoice(orderId) {
    setActiveOrderId(orderId)
    setRoute('order-invoice')
    scrollTop()
  }

  function backToOrderDetails() {
    setRoute('order-details')
    scrollTop()
  }

  // --- Savat, sevimlilar va checkout oqimi ---
  function goCart() {
    setRoute('cart')
    scrollTop()
  }

  function goWishlist() {
    setRoute('wishlist')
    scrollTop()
  }

  function goCheckoutAddress() {
    setRoute('checkout-address')
    scrollTop()
  }

  function goCheckoutDelivery() {
    setRoute('checkout-delivery')
    scrollTop()
  }

  function goCheckoutSummary() {
    setRoute('checkout-summary')
    scrollTop()
  }

  function goCheckoutPayment() {
    setRoute('checkout-payment')
    scrollTop()
  }

  function selectAddress(addressId) {
    setCheckoutSelection((s) => ({ ...s, addressId }))
  }

  function selectDelivery(deliveryId) {
    setCheckoutSelection((s) => ({ ...s, deliveryId }))
  }

  // To'lov natijasi sahifasiga o'tadi. Muvaffaqiyatli to'lovda savat tozalanadi;
  // "kutilmoqda" yoki "muvaffaqiyatsiz" holatlarda savat saqlanib qoladi (qayta urinish uchun).
  function goPaymentResult(status, order) {
    if (order) setLastOrder(order)
    if (status === 'success') clearCart()
    setRoute(`payment-${status}`)
    scrollTop()
  }

  const isAccountRoute = ACCOUNT_ROUTES.includes(route)
  const isAuthRoute = AUTH_ROUTES.includes(route)

  return (
    <div className="min-h-screen bg-neone-bg text-white">
      <Header
        onNavigate={handleNavigate}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenAccount={goProfileOrLogin}
        onOpenCart={goCart}
        onOpenWishlist={goWishlist}
        isAuthenticated={isAuthenticated}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
      />

      {route === 'home' && <Home onSelectProduct={goProduct} onNavigateCategory={goCategory} />}
      {route === 'category' && (
        <Category categoryName={activeCategory} onSelectProduct={goProduct} onBack={goHome} />
      )}
      {route === 'product' && activeProduct && (
        <Product product={activeProduct} onBack={goHome} onSelectProduct={goProduct} />
      )}
      {route === 'cart' && <Cart onBack={goHome} onSelectProduct={goProduct} onCheckout={goCheckoutAddress} />}
      {route === 'wishlist' && <Wishlist onBack={goHome} onSelectProduct={goProduct} />}

      {route === 'checkout-address' && (
        <ShippingAddress
          selectedAddressId={checkoutSelection.addressId}
          onSelectAddress={selectAddress}
          onContinue={goCheckoutDelivery}
          onBack={goCart}
          onContinueShopping={goHome}
        />
      )}
      {route === 'checkout-delivery' && (
        <DeliveryMethod
          selectedDeliveryId={checkoutSelection.deliveryId}
          onSelectDelivery={selectDelivery}
          onContinue={goCheckoutSummary}
          onBack={goCheckoutAddress}
          onContinueShopping={goHome}
        />
      )}
      {route === 'checkout-summary' && (
        <OrderSummary
          addressId={checkoutSelection.addressId}
          deliveryId={checkoutSelection.deliveryId}
          onContinue={goCheckoutPayment}
          onBack={goCheckoutDelivery}
          onEditAddress={goCheckoutAddress}
          onEditDelivery={goCheckoutDelivery}
          onContinueShopping={goHome}
        />
      )}
      {route === 'checkout-payment' && (
        <Payment
          addressId={checkoutSelection.addressId}
          deliveryId={checkoutSelection.deliveryId}
          onBack={goCheckoutSummary}
          onSuccess={(order) => goPaymentResult('success', order)}
          onFailed={(order) => goPaymentResult('failed', order)}
          onPending={(order) => goPaymentResult('pending', order)}
          onContinueShopping={goHome}
        />
      )}
      {route === 'payment-success' && <PaymentSuccess order={lastOrder} onHome={goHome} />}
      {route === 'payment-failed' && <PaymentFailed order={lastOrder} onRetry={goCheckoutPayment} onHome={goHome} />}
      {route === 'payment-pending' && (
        <PaymentPending order={lastOrder} onConfirm={() => goPaymentResult('success')} onCancel={() => goPaymentResult('failed')} />
      )}

      {route === 'login' && (
        <Login onBack={goHome} onLoggedIn={handleLoggedIn} onGoRegister={goRegister} onGoForgotPassword={goForgotPassword} />
      )}
      {route === 'register' && <Register onBack={goHome} onRegistered={handleRegistered} onGoLogin={goLogin} />}
      {route === 'forgot-password' && (
        <ForgotPassword onBack={goLogin} onCodeSent={handleCodeSent} onGoLogin={goLogin} />
      )}
      {route === 'otp-verify' && (
        <OtpVerification
          email={authFlow.email}
          purpose={authFlow.purpose}
          onBack={authFlow.purpose === 'register' ? goRegister : goForgotPassword}
          onVerified={handleOtpVerified}
        />
      )}
      {route === 'reset-password' && <ResetPassword onBack={goForgotPassword} onReset={handlePasswordReset} />}

      {route === 'profile' && isAuthenticated && <Profile onNavigate={goAccount} onLogout={handleLogout} onBack={goHome} />}
      {route === 'edit-profile' && isAuthenticated && (
        <EditProfile onNavigate={goAccount} onLogout={handleLogout} onBack={() => goAccount('profile')} />
      )}
      {route === 'change-password' && isAuthenticated && (
        <ChangePassword onNavigate={goAccount} onLogout={handleLogout} onBack={() => goAccount('profile')} />
      )}
      {route === 'account-settings' && isAuthenticated && (
        <AccountSettings
          onNavigate={goAccount}
          onLogout={handleLogout}
          onBack={() => goAccount('profile')}
          onAccountDeleted={handleAccountDeleted}
        />
      )}
      {route === 'address-book' && isAuthenticated && (
        <AddressBook onNavigate={goAccount} onLogout={handleLogout} onBack={() => goAccount('profile')} />
      )}
      {route === 'notification-settings' && isAuthenticated && (
        <NotificationSettings onNavigate={goAccount} onLogout={handleLogout} onBack={() => goAccount('profile')} />
      )}
      {route === 'orders' && isAuthenticated && (
        <OrderHistory
          onNavigate={goAccount}
          onLogout={handleLogout}
          onBack={() => goAccount('profile')}
          onSelectOrder={goOrderDetails}
          onTrackOrder={goOrderTracking}
          onGoShopping={goHome}
        />
      )}
      {route === 'order-details' && isAuthenticated && activeOrderId && (
        <OrderDetails orderId={activeOrderId} onBack={() => goAccount('orders')} onTrack={goOrderTracking} onInvoice={goOrderInvoice} />
      )}
      {route === 'order-tracking' && isAuthenticated && activeOrderId && (
        <OrderTracking orderId={activeOrderId} onBack={backToOrderDetails} />
      )}
      {route === 'order-invoice' && isAuthenticated && activeOrderId && <Invoice orderId={activeOrderId} onBack={backToOrderDetails} />}
      {isAccountRoute && !isAuthenticated && (
        <Login onBack={goHome} onLoggedIn={handleLoggedIn} onGoRegister={goRegister} onGoForgotPassword={goForgotPassword} />
      )}

      <Footer />

      {searchOpen && (
        <SearchOverlay onClose={() => setSearchOpen(false)} onSelectProduct={goProduct} />
      )}
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <OrderProvider>
            <AppShell />
          </OrderProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  )
}
