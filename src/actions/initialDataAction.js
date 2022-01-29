import {initialDataConstants,categoryConstants,productConstants, orderConstants,} from "./constants";
  import axiosIntance from '../Helpers/axios';

  export const getInitialData = () => {
    return async (dispatch) => {
      const res = await axiosIntance.post(`/initialData`);
      console.log(res);
      if (res.status === 200) {
        const { categories, products } = res.data;
        dispatch({
          type: categoryConstants.GET_ALL_CATEGORIES_SUCCESS,
          payload: { categories },
        });
        dispatch({
          type:productConstants.GET_ALL_PRODUCTS_SUCCESS,
          payload: { products },
        });
        // dispatch({
        //   type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
        //   payload: { orders },
        // });
      }
      console.log(res);
    };
  };