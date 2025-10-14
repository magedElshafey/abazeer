import { lazy, Suspense, useState, useCallback, useEffect } from "react";
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
const Coupon = lazy(() => import("../components/copoun/Coupon"));

const Checkout = () => {
  const { t } = useTranslation();
  const [code, setCode] = useState("");
  const [isCouponVisible, setCouponVisible] = useState(false);
  const [method, setMethod] = useState<Payment>(paymentMethods[0]);
  const addressQueryResult = useGetUserAddresses();
  const [localAddress, setLocalAddress] = useState<Address>();
  console.log("address", addressQueryResult);
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

  const toggleCouponInput = useCallback(
    () => setCouponVisible((prev) => !prev),
    []
  );
  const handleLocalAddressChange = useCallback(
    (value: Address) => setLocalAddress(value),
    []
  );
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
          <div className="flex-center mt-4">
            <MainBtn text="checkout" theme="secondary" />
          </div>
        </div>
      </main>
    </>
  );
};

export default Checkout;
