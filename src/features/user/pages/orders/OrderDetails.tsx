import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import useGetOrderById from "../../api/orders/useGetOrderById";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import OrderDetailsCard from "../../components/orders/OrderDetailsCard";
import OrderItemCard from "../../components/orders/OrderItemCard";
import CancelOrderButton from "../../components/orders/CancelOrderButton";
import MainBtn from "@/common/components/buttons/MainBtn";
import { IoArrowBack } from "react-icons/io5";
import { HiDownload } from "react-icons/hi";

const OrderDetails: FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const orderQuery = useGetOrderById(id || "");
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex-between flex-col md:flex-row">
        <h1 className="text-2xl md:text-3xl text-nowrap flex-1 font-bold text-gray-800 mb-6">
          {t("order_details")}
        </h1>
        <div className="flex flex-col w-full md:w-1/2 md:flex-center md:flex-row gap-2">
          {orderQuery.data &&
            orderQuery.data.order_status_label === "pending" && (
              <div className="flex-1">
                <CancelOrderButton orderId={orderQuery.data.id} />
              </div>
            )}
          {orderQuery.data &&
            (orderQuery.data.order_status_label === "completed" ||
              orderQuery.data?.order_status_label === "paid") &&
            orderQuery.data.invoice && (
              <MainBtn
                className="flex-1 flex items-center gap-2"
                onClick={() => {
                  window.open(orderQuery.data.invoice as string, "_blank");
                }}
              >
                <HiDownload size={20} />
                {t("download_invoice")}
              </MainBtn>
            )}
          <MainBtn
            className="flex-1"
            theme="outline"
            onClick={() => navigate("..")}
          >
            <IoArrowBack />
          </MainBtn>
        </div>
      </div>

      <FetchHandler
        queryResult={orderQuery}
        skeletonType="order-card"
        loadingType="skeleton"
      >
        {orderQuery.data && (
          <div className="space-y-6">
            <OrderDetailsCard title="order_information">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">
                    {t("order_number")}:
                  </span>
                  <span className="text-gray-900 font-semibold">
                    {orderQuery.data.order_number}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">
                    {t("time")}:
                  </span>
                  <span className="text-gray-900 font-semibold">
                    {orderQuery.data.created_at}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">
                    {t("order_status")}:
                  </span>
                  <span className="text-gray-900 font-semibold">
                    {orderQuery.data.order_status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">
                    {t("payment_method")}:
                  </span>
                  <span className="text-gray-900 font-semibold">
                    {orderQuery.data.payment_method || t("not_specified")}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-medium">
                    {t("payment_status")}:
                  </span>
                  <span className="text-gray-900 font-semibold">
                    {orderQuery.data.payment_status}
                  </span>
                </div>
              </div>
            </OrderDetailsCard>

            <OrderDetailsCard title="products">
              <div className="flex flex-col gap-10">
                <div className="space-y-4">
                  {orderQuery.data.order_items.map((item) => (
                    <OrderItemCard key={item.id} item={item} />
                  ))}
                </div>
                <div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">
                        {t("subtotal")}:
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {orderQuery.data.subtotal} {t("SAR")}
                      </span>
                    </div>
                    {
                      orderQuery.data.coupon && (
                        <div className="flex-between mb-2 text-green-600 font-medium">
                          <dt>{t("discount")}</dt>
                          <dd>
                            - {orderQuery.data.discount} {t("SAR")}
                          </dd>
                        </div>
                      )
                    }
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">
                        {t("tax")}:
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {orderQuery.data.tax} {t("SAR")}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 font-medium">
                        {t("delivery")}:
                      </span>
                      <span className="text-gray-900 font-semibold">
                        {orderQuery.data.shipping} {t("SAR")}
                      </span>
                    </div>
                    <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-800">
                        {t("total")}:
                      </span>
                      <span className="text-lg font-bold text-orangeColor">
                        {orderQuery.data.total} {t("SAR")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </OrderDetailsCard>
          </div>
        )}
      </FetchHandler>
    </div>
  );
};

export default OrderDetails;
