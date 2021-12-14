import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const isShow = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => {
    return state.cart;
  });

  useEffect(() => {
    fetch('https://meals-fd05c-default-rtdb.firebaseio.com/cart.json', {
      method: 'PUT',
      body: JSON.stringify(cart),
    });
  }, [cart]);

  return (
    <Layout>
      {isShow && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
