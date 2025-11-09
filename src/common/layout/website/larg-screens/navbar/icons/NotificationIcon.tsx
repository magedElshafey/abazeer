import { memo, useState, useCallback, useEffect, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import i18n from "@/lib/i18n/i18n";
import useGetNotifications from "@/features/notifications/useGetNotifications";
import useMarkNotification from "@/features/notifications/useMarkNotification";
import { formatRelativeTime } from "@/utils/formatRelativeTime";
import Loader from "@/common/components/loader/spinner/Loader";
import { useAuth } from "@/store/AuthProvider";

const NotificationIcon = memo(() => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: notifications = [], isLoading } = useGetNotifications();
  const markAsReadMutation = useMarkNotification();
  
  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read_at).length,
    [notifications]
  );

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback(() => setOpen(true), []);
  const handleMouseLeave = useCallback(() => setOpen(false), []);
  const handleClick = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if ((e.key === "Enter" || e.key === " ") && !open) setOpen(true);
    },
    [open]
  );

  useEffect(() => {
    if (open) document.addEventListener("keydown", handleKeyDown);
    else document.removeEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, handleKeyDown]);

  // Hide notification icon if user is not logged in
  if (!user) {
    return null;
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Icon */}
      <button
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={t("notifications")}
        onClick={handleClick}
        className="flex items-center gap-4 focus:outline-none focus:ring-2 focus:ring-orangeColor rounded-md transition-all"
      >
        <div className="relative">
          <IoIosNotificationsOutline
            size={26}
            className="text-gray-700"
            aria-hidden="true"
          />
          <span
            aria-label={t("unread notifications count")}
            className="absolute -end-3 -top-3 bg-orangeColor text-white flex items-center justify-center w-5 h-5 text-xs"
          >
            {isLoading ? (
              <Loader color="white" />
            ) : (
              unreadCount
            )}
          </span>
        </div>
      </button>

      {/* Dropdown */}
      <div
        className={`border-t-transparent top-full ${
          i18n.language === "ar" ? "-right-[280px]" : "-left-[280px]"
        } transition-all duration-300 ease-out transform origin-top absolute border-t-[10px] ${
          open
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
        ref={dropdownRef}
      >
        <div
          role="menu"
          aria-label={t("notifications dropdown")}
          className={`min-w-[340px] bg-white shadow-xl rounded-xl p-4 z-50 border border-gray-100
         `}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-800">
              {t("notifications")}
            </h3>
            {unreadCount > 0 && (
              <span className="text-xs bg-orangeColor text-white px-2 py-1 rounded-full">
                {unreadCount} {t("new")}
              </span>
            )}
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader />
            </div>
          ) : notifications.length > 0 ? (
            <ul className="space-y-2 max-h-96 overflow-y-auto" role="list">
              {notifications.map((notification) => {
                const isRead = Boolean(notification.read_at);
                const handleClick = () => {
                  if (!isRead) {
                    markAsReadMutation.mutate(notification.id);
                  }
                  const orderId = notification?.data?.data?.order_id;
                  const productId = notification?.data?.data?.product_id;
                  if (
                    orderId != null &&
                    String(orderId).trim().length > 0
                  ) {
                    navigate(`/my-profile/orders/${orderId}`);
                    setOpen(false);
                  } else if (
                    productId != null &&
                    String(productId).trim().length > 0
                  ) {
                    navigate(`/products/${productId}`);
                    setOpen(false);
                  }
                };
                return (
                  <li
                    key={notification.id}
                    onClick={handleClick}
                    className={`p-3 rounded-lg border transition-colors cursor-pointer hover:bg-gray-100 ${
                      isRead
                        ? "bg-gray-50 border-gray-100"
                        : "bg-orangeColor/5 border-orangeColor/20"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          isRead
                            ? "bg-transparent"
                            : "bg-orangeColor"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-semibold mb-1 ${
                            isRead
                              ? "text-gray-700"
                              : "text-gray-900"
                          }`}
                        >
                          {notification.data.title}
                        </p>
                        <p
                          className={`text-sm ${
                            isRead
                              ? "text-gray-600"
                              : "text-gray-800"
                          }`}
                        >
                          {notification.data.body}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {formatRelativeTime(notification.created_at)}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <p aria-live="polite">{t("no notifications")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

NotificationIcon.displayName = "NotificationIcon";
export default NotificationIcon;

