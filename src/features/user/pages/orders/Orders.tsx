import { FC } from "react";
import { useTranslation } from "react-i18next";
import { MdShoppingBag } from "react-icons/md";
import EmptyStateCard from "../../components/common/EmptyStateCard";
import useGetUserOrders from "../../api/orders/useGetUserOrders";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import MainBtn from "@/common/components/buttons/MainBtn";
import { useNavigate } from "react-router-dom";
import SaudiCurrency from "@/common/components/currency/SaudiCurrency";

const getStatusColor = (status: string): string => {
  const colorMap: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-blue-100 text-blue-800",
    shipped: "bg-purple-100 text-purple-800",
    completed: "bg-green-100 text-green-800",
    delivered: "bg-green-100 text-green-800",
    canceled: "bg-red-100 text-red-800",
  };

  return colorMap[status];
};

const Orders: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const ordersQuery = useGetUserOrders();
  const orders = ordersQuery.data || [];

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        {t("orders")}
      </h1>

      <FetchHandler
        queryResult={ordersQuery}
        skeletonType="order-card"
        loadingType="skeleton"
      >
        {orders && orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-sm border flex border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {order.order_number}
                    </h3>
                    <p className="text-sm text-gray-500">{order.created_at}</p>
                  </div>
                  <div className="flex flex-col gap-1 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">
                        {t("payment_status")}:
                      </span>{" "}
                      {order.payment_status}
                    </div>
                    {order.payment_method && (
                      <div>
                        <span className="font-medium">
                          {t("payment_method")}:
                        </span>{" "}
                        {order.payment_method}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-col justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        order.order_status_label
                      )}`}
                    >
                      {order.order_status}
                    </span>
                    <span className="text-lg font-bold text-gray-900">
                      {order.total} <SaudiCurrency />
                    </span>
                  </div>
                  <MainBtn
                    className="px-6"
                    onClick={() => navigate(`${order.id}`)}
                  >
                    {t("details")}
                  </MainBtn>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyStateCard
            icon={MdShoppingBag}
            link="/products"
            buttonText={t("browse_products")}
            title={t("no_orders_title")}
            description={t("no_orders_description")}
          />
        )}
      </FetchHandler>
    </div>
  );
};

export default Orders;
