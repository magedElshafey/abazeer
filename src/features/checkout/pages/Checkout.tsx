import { lazy, Suspense, memo } from "react";
import { useTranslation } from "react-i18next";
import { Loader } from "lucide-react";
import { FiMapPin } from "react-icons/fi";

import SEO from "@/common/components/seo/Seo";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import MainBtn from "@/common/components/buttons/MainBtn";
import MainTextArea from "@/common/components/inputs/MainTextArea";
import DialogComponent from "@/common/components/dialog/dialog";
import EmptyStateCard from "@/features/user/components/common/EmptyStateCard";
import AddressCard from "@/features/user/components/addresses/AddressCard";
import OrderDetails from "../components/order-details/OrderDetails";
import PriceDetails from "../components/order-details/PriceDetails";
import ShippingMethods from "../components/shipping-methods/ShippingMethods";
import PaymentMethods from "../components/payment-methods/PaymentMethods";
import CouponInput from "../components/copoun/CouponInput";

import useCheckoutLogic from "../logic/useCheckoutLogic";

const Coupon = lazy(() => import("../components/copoun/Coupon"));

const Checkout = () => {
  const { t } = useTranslation();

  const {
    states: { coupon, localAddress, paymentMethod, notes, shiipingMethod },
    handlers,
    data,
    queries,
    refs,
    isPending,
  } = useCheckoutLogic();

  const { addressQuery } = queries;

  return (
    <>
      <SEO title={t("checkout")} />

      <main
        className="containerr p-4 grid grid-cols-1 md:grid-cols-2 gap-6"
        aria-labelledby="checkout-heading"
      >
        <h1 id="checkout-heading" className="sr-only">
          {t("checkout")}
        </h1>

        {/* ✅ LEFT SIDE - Order Summary */}
        <section aria-label={t("order details")}>
          <div className="bg-slate-100 p-5 rounded-xl shadow-sm">
            <OrderDetails />

            <div className="py-4 border-t border-b mt-4">
              <h2 className="font-semibold mb-3">{t("shipping methods")}</h2>
              <ShippingMethods
                method={shiipingMethod}
                setMethod={handlers.setShippingMethod}
                shippingMethods={data.shippingMethods}
              />
            </div>

            <footer className="pt-4">
              <PriceDetails method={shiipingMethod} />
            </footer>
          </div>

          {/* ✅ Coupon Section */}
          <section className="mt-6">
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

            <button
              onClick={handlers.toggleCouponInput}
              className="text-blue-600 underline mt-4 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
              aria-expanded={coupon.visible}
            >
              {t("You have a coupon code?")}
            </button>

            {coupon.visible && (
              <div className="mt-3">
                <CouponInput
                  code={coupon.code}
                  handleCodeChange={handlers.handleCodeChange}
                  setCode={(value) =>
                    handlers.setCoupon((prev) => ({ ...prev, code: value }))
                  }
                  setShowCouponInput={(value) =>
                    handlers.setCoupon((prev) => ({ ...prev, visible: value }))
                  }
                />
              </div>
            )}
          </section>
        </section>

        {/* ✅ RIGHT SIDE - Address & Payment */}
        <section aria-label={t("address and payment")}>
          <FetchHandler queryResult={addressQuery} skeletonType="coupon">
            {addressQuery?.isSuccess &&
            addressQuery.data?.length > 0 &&
            localAddress ? (
              <>
                <AddressCard address={localAddress} />

                <DialogComponent
                  ref={refs.dialogRef}
                  header={{ title: t("my addresses") }}
                  content={
                    <div className="max-h-[500px] overflow-y-auto md:w-[500px]">
                      {addressQuery.data.map((address) => (
                        <button
                          key={address.id}
                          onClick={() =>
                            handlers.handleLocalAddressChange(address)
                          }
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
              method={paymentMethod}
              setMethod={handlers.setPaymentMethod}
              paymentMethods={data.paymentMethods}
            />
          </div>

          <div className="mt-4">
            <MainTextArea
              value={notes}
              onChange={handlers.handleNotesChange}
              label={t("order notes")}
              placeholder={t("note your order")}
            />
          </div>

          <div className="flex-center mt-4">
            <MainBtn
              text={t("checkout")}
              theme="secondary"
              onClick={handlers.handleCheckoutClick}
              disabled={
                isPending ||
                !localAddress?.id ||
                !paymentMethod?.type ||
                !shiipingMethod?.id
              }
              isPending={isPending}
              aria-busy={isPending}
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default memo(Checkout);
