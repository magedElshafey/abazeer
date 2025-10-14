import {
  lazy,
  Suspense,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useTranslation } from "react-i18next";
import SEO from "@/common/components/seo/Seo";
import OrderDetails from "../components/order-details/OrderDetails";
import CouponInput from "../components/copoun/CouponInput";
import { Loader } from "lucide-react";
import PaymentMethods from "../components/payment-methods/PaymentMethods";
import { Payment } from "../types/payment.type";
import { paymentMethods } from "@/data/data";
import MainBtn from "@/common/components/buttons/MainBtn";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import useGetUserAddresses from "@/features/user/api/addresses/useGetUserAddresses";
import AddressCard from "@/features/user/components/addresses/AddressCard";
import { Address } from "@/features/user/types/addresses.types";
import EmptyStateCard from "@/features/user/components/common/EmptyStateCard";
import { FiMapPin } from "react-icons/fi";
import DialogComponent from "@/common/components/dialog/dialog";
import useCheckout from "../api/checkout/useCheckout";
import { useCart } from "@/store/CartProvider";
import handlePromisError from "@/utils/handlePromiseError";
import { toast } from "sonner";
import MainTextArea from "@/common/components/inputs/MainTextArea";
const Coupon = lazy(() => import("../components/copoun/Coupon"));

const Checkout = () => {
  const dialogRef = useRef<{
    close: () => void;
  }>(null);
  const { t } = useTranslation();
  const [code, setCode] = useState("");
  const [isCouponVisible, setCouponVisible] = useState(false);
  const { items } = useCart();
  const [method, setMethod] = useState<Payment>(paymentMethods[0]);
  const addressQueryResult = useGetUserAddresses();
  const [localAddress, setLocalAddress] = useState<Address>();
  const [notes, setNotes] = useState("");
  useEffect(() => {
    if (
      addressQueryResult.isSuccess &&
      addressQueryResult?.data &&
      addressQueryResult?.data?.length > 0
    ) {
      if (localAddress === undefined) {
        const defaultAddress = addressQueryResult.data.find(
          (address) => address.is_default
        );
        if (defaultAddress) {
          setLocalAddress(defaultAddress);
        } else {
          setLocalAddress(addressQueryResult?.data[0]);
        }
      }
    }
  }, [addressQueryResult, localAddress]);

  const handleCodeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setCode(e.target.value),
    []
  );
  const handleNotesChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value),
    []
  );
  const toggleCouponInput = useCallback(
    () => setCouponVisible((prev) => !prev),
    []
  );
  const handleLocalAddressChange = useCallback((value: Address) => {
    setLocalAddress(value);
    dialogRef?.current?.close();
  }, []);
  const { isPending, mutateAsync } = useCheckout();
  const handleCheckoutClick = async () => {
    try {
      const payload = {
        products: items.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
        payment_type: method?.type,
        notes,
        address_id: localAddress?.id ?? 0,
        // coupon_code: code,
      };
      const response = await mutateAsync(payload);
      if (response?.status) {
        toast.success(response?.message);
      }
    } catch (error) {
      handlePromisError(error);
    }
  };

  return (
    <>
      <SEO title={t("checkout")} />
      <main
        className="containerr  p-4 grid grid-cols-1 md:grid-cols-2 gap-6"
        aria-label={t("checkout page")}
      >
        <section aria-labelledby="order-details-section">
          <h2 id="order-details-section" className="sr-only">
            {t("order details")}
          </h2>
          <OrderDetails />

          <div className="mt-6">
            <Suspense
              fallback={
                <div className="text-center text-gray-500">
                  <Loader className="animate-spin inline-block mr-2" />
                  {t("loading coupons...")}
                </div>
              }
            >
              <Coupon />
            </Suspense>
          </div>

          <button
            onClick={toggleCouponInput}
            className="text-blue-600 underline mt-4 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
            aria-expanded={isCouponVisible}
          >
            {t("You have a coupon code?")}
          </button>

          {isCouponVisible && (
            <div className="mt-3">
              <CouponInput
                code={code}
                handleCodeChange={handleCodeChange}
                setCode={setCode}
                setShowCouponInput={setCouponVisible}
              />
            </div>
          )}
        </section>
        {/* addresses */}
        <div>
          <div>
            <FetchHandler
              queryResult={addressQueryResult}
              skeletonType="coupon"
            >
              {addressQueryResult?.isSuccess &&
              addressQueryResult?.data &&
              addressQueryResult?.data?.length > 0 &&
              localAddress ? (
                <>
                  <AddressCard address={localAddress as Address} />
                  <DialogComponent
                    ref={dialogRef}
                    header={{
                      title: "my addresses",
                    }}
                    content={
                      <div className="max-h-[500px] overflow-y-auto md:w-[500px] ">
                        {addressQueryResult?.data?.map((address) => (
                          <button
                            onClick={() => {
                              handleLocalAddressChange(address);
                            }}
                            className={`mb-4 border  transition duration-200 hover:shadow-lg rounded-md cursor-pointer block w-full ${
                              localAddress?.id === address?.id
                                ? "border-orangeColor"
                                : ""
                            }`}
                          >
                            <AddressCard
                              key={address?.id}
                              address={address}
                              hasEdit={false}
                              hasDelete={false}
                              hasDefault={false}
                            />
                          </button>
                        ))}
                      </div>
                    }
                  >
                    <button className="text-slate-800 underline cursor-pointer my-4 font-medium">
                      {t("change address")}
                    </button>
                  </DialogComponent>
                </>
              ) : (
                <EmptyStateCard
                  icon={FiMapPin}
                  link="/my-profile/addresses/create?to=/checkout"
                  buttonText={t("add_first_address")}
                  title={t("no_addresses_title")}
                  description={t("no_addresses_description")}
                />
              )}
            </FetchHandler>
          </div>
          <div className="mt-5">
            <PaymentMethods
              method={method}
              setMethod={setMethod}
              paymentMethods={paymentMethods}
            />
          </div>
          <div className="mt-4">
            <MainTextArea
              value={notes}
              onChange={handleNotesChange}
              label="order notes"
              placeholder="note your order"
            />
          </div>
          <div className="flex-center mt-4">
            <MainBtn
              text="checkout"
              theme="secondary"
              onClick={handleCheckoutClick}
              disabled={isPending}
              isPending={isPending}
            />
          </div>
        </div>
      </main>
    </>
  );
};

export default Checkout;
