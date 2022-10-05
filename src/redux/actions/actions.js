export const handleModalToggle = () => ({
  type: "MODAL_TOGGLE",
});

export const incrementCartItems = (payload) => ({
  type: "ADD_CART_ITEM",
  payload: payload,
});

export const removeCartItem = (payload) => ({
  type: "REMOVE_CART_ITEM",
  payload: payload,
});
