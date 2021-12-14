import { cartActions } from './cart-slice';
import { uiActions } from './ui-slice';
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending cart data!',
      })
    );
    const sendRequest = async () => {
      const response = await fetch(
        'https://meals-fd05c-default-rtdb.firebaseio.com/art.json',
        {
          method: 'PUT',
          body: JSON.stringify({
            items: cart.items,
            totalAmount: cart.totalAmount,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Something went wrong ');
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Succes...',
          message: 'Sen cart success!',
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!...',
          message: 'Sending cart data failed!' + error,
        })
      );
    }

    // sendRequest().catch((error) => {
    //   dispatch(
    //     uiActions.showNotification({
    //       status: 'error',
    //       title: 'Error!...',
    //       message: 'Sending cart data failed!' + error,
    //     })
    //   );
    // });
  };
};

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        'https://meals-fd05c-default-rtdb.firebaseio.com/art.json'
      );

      if (!response.ok) {
        throw new Error('Could not fetch cart data');
      }

      const data = await response.json();
      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.pedplaceCart({
          items: cartData.items || [],
          totalAmount: cartData.totalAmount || 0,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!...',
          message: 'Sending cart data failed!' + error,
        })
      );
    }
  };
};
