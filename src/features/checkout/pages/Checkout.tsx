import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import SEO from "@/common/components/seo/Seo";
import { Loader } from "lucide-react";
import { FiMapPin } from "react-icons/fi";

// components
import OrderDetails from "../components/order-details/OrderDetails";
import CouponInput from "../components/copoun/CouponInput";
import PaymentMethods from "../components/payment-methods/PaymentMethods";
import MainBtn from "@/common/components/buttons/MainBtn";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import AddressCard from "@/features/user/components/addresses/AddressCard";
import EmptyStateCard from "@/features/user/components/common/EmptyStateCard";
import DialogComponent from "@/common/components/dialog/dialog";
import MainTextArea from "@/common/components/inputs/MainTextArea";
import useCheckoutLogic from "../logic/useCheckoutLogic";

const Coupon = lazy(() => import("../components/copoun/Coupon"));

const Checkout = () => {
  const { t } = useTranslation();
  const {
    states: { coupon, localAddress, method, notes },
    handlers: {
      toggleCouponInput,
      handleCodeChange,
      handleLocalAddressChange,
      handleNotesChange,
      handleCheckoutClick,
      setCoupon,
      setMethod,
    },
    data: { paymentMethods },
    queries: { addressQuery },
    refs: { dialogRef },
    isPending,
  } = useCheckoutLogic();

  return (
    <>
      <SEO title={t("checkout")} />

      <main
        className="containerr p-4 grid grid-cols-1 md:grid-cols-2 gap-6"
        aria-label={t("checkout page")}
      >
        {/* 🧾 Order Section */}
        <section aria-labelledby="order-details-section">
          <h2 id="order-details-section" className="sr-only">
            {t("order details")}
          </h2>

          <OrderDetails />

          <div className="mt-6">
            <Suspense
              fallback={
                <div
                  role="status"
                  aria-live="polite"
                  className="text-center text-gray-500"
                >
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
            aria-expanded={coupon.visible}
          >
            {t("You have a coupon code?")}
          </button>

          {coupon.visible && (
            <div className="mt-3">
              <CouponInput
                code={coupon.code}
                handleCodeChange={handleCodeChange}
                setCode={(value) =>
                  setCoupon((prev) => ({
                    ...prev,
                    code:
                      typeof value === "function" ? value(prev.code) : value,
                  }))
                }
                setShowCouponInput={(value) =>
                  setCoupon((prev) => ({
                    ...prev,
                    visible:
                      typeof value === "function" ? value(prev.visible) : value,
                  }))
                }
              />
            </div>
          )}
        </section>

        {/* 📍 Address & Payment Section */}
        <section aria-labelledby="address-and-payment-section">
          <h2 id="address-and-payment-section" className="sr-only">
            {t("address and payment")}
          </h2>

          <FetchHandler queryResult={addressQuery} skeletonType="coupon">
            {addressQuery?.isSuccess &&
            addressQuery?.data?.length > 0 &&
            localAddress ? (
              <>
                <AddressCard address={localAddress} />

                <DialogComponent
                  ref={dialogRef}
                  header={{ title: t("my addresses") }}
                  content={
                    <div className="max-h-[500px] overflow-y-auto md:w-[500px]">
                      {addressQuery.data.map((address) => (
                        <button
                          key={address.id}
                          onClick={() => handleLocalAddressChange(address)}
                          className={`mb-4 border transition duration-200 hover:shadow-lg rounded-md w-full ${
                            localAddress?.id === address.id
                              ? "border-orangeColor"
                              : ""
                          }`}
                          aria-pressed={localAddress?.id === address.id}
                        >
                          <AddressCard
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
                  <button className="text-slate-800 underline my-4 font-medium">
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
              label={t("order notes")}
              placeholder={t("note your order")}
            />
          </div>

          <div className="flex-center mt-4">
            <MainBtn
              text={t("checkout")}
              theme="secondary"
              onClick={handleCheckoutClick}
              disabled={isPending}
              isPending={isPending}
              aria-busy={isPending}
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default Checkout;
