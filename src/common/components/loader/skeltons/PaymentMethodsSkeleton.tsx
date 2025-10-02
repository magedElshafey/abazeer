import {
  FaCreditCard,
  FaPaypal,
  FaApplePay,
  FaGooglePay,
} from "react-icons/fa";

const PaymentMethodsSkeleton = () => {
  return (
    <div className="my-6 flex items-center gap-3 flex-wrap">
      {[...Array(4)]?.map((_, i) => (
        <div
          key={i}
          className="animate-pulse w-16 h-9 bg-gray-200 flex items-center justify-center"
        >
          {i === 0 && <FaCreditCard className="text-gray-300" size={24} />}
          {i === 1 && <FaPaypal className="text-gray-300" size={24} />}
          {i === 2 && <FaApplePay className="text-gray-300" size={24} />}
          {i === 3 && <FaGooglePay className="text-gray-300" size={24} />}
        </div>
      ))}
    </div>
  );
};

export default PaymentMethodsSkeleton;
