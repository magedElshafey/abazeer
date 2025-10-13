import OrderDetails from "../components/order-details/OrderDetails";

const Checkout = () => {
  return (
    <div className="containerr">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <OrderDetails />
      </div>
    </div>
  );
};

export default Checkout;
