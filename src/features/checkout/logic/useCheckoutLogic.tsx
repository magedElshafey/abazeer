// hooks
import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { useCart } from "@/store/CartProvider";
import useGetUserAddresses from "@/features/user/api/addresses/useGetUserAddresses";
import useCheckout from "../api/checkout/useCheckout";
// types
import type { Payment } from "../types/payment.type";
import type { Address } from "@/features/user/types/addresses.types";
// data
import { paymentMethods } from "@/data/data";
// toast
import { toast } from "sonner";
// utils
import handlePromisError from "@/utils/handlePromiseError";
import { Shippings } from "../types/shipping.types";
import useGetWebsiteSettings from "@/features/settings/api/useGetWebsiteSettings";
import { useQueryClient } from "@tanstack/react-query";
import { apiRoutes } from "@/services/api-routes/apiRoutes";

const useCheckoutLogic = () => {
  const queryClient = useQueryClient();
  const dialogRef = useRef<{ close: () => void }>(null);
  const { items, setCouponCode } = useCart();
  const settingsQuery = useGetWebsiteSettings();
  const { data: settings, isLoading: settingsLoading } = settingsQuery;

  // ✅ Group related states logically
  const [shippingMethods, setShippingMethods] = useState<Shippings[]>([]);
  const [shiipingMethod, setShippingMethod] = useState<Shippings>(
    shippingMethods[0]
  );

  const [coupon, setCoupon] = useState<{
    code: string;
    value: string;
    type: string;
  }>({ code: "", value: "", type: "" });
  const [paymentMethod, setPaymentMethod] = useState<Payment>(
    paymentMethods[0]
  );
  const [localAddress, setLocalAddress] = useState<Address | undefined>();
  const [notes, setNotes] = useState("");

  const addressQuery = useGetUserAddresses();

  // ✅ Use derived state only when necessary
  useEffect(() => {
    if (
      addressQuery.isFetching ||
      !addressQuery.isSuccess ||
      !addressQuery.data?.length ||
      localAddress
    )
      return;

    const defaultAddress =
      addressQuery.data.find((a) => a.is_default) ?? addressQuery.data[0];
    setLocalAddress(defaultAddress);
  }, [
    addressQuery.isSuccess,
    addressQuery.data,
    localAddress,
    addressQuery.isFetching,
  ]);

  const { mutateAsync, isPending } = useCheckout();

  // ✅ useCallback to avoid unnecessary re-renders
  const handleCodeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setCoupon((prev) => ({ ...prev, value: e.target.value })),
    []
  );

  const handleNotesChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value),
    []
  );

  const handleLocalAddressChange = useCallback((value: Address) => {
    setLocalAddress(value);
    dialogRef.current?.close();
  }, []);

  const handleCheckoutClick = useCallback(async () => {
    try {
      const payload = {
        products: items.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
        payment_type: paymentMethod.type,
        notes,
        address_id: localAddress?.id ?? 0,
        coupon_code: coupon.code || undefined,
      };

      const response = await mutateAsync(payload);

      if (response?.status) {
        toast.success(response?.message);
        setCouponCode(undefined);

        // ✅ اعمل refetch فوري
        await queryClient.refetchQueries({
          queryKey: [apiRoutes.cart, coupon.code || undefined],
        });
      }
    } catch (error) {
      handlePromisError(error);
      queryClient.invalidateQueries({ queryKey: [apiRoutes.cart] });
    }
  }, [
    items,
    paymentMethod,
    notes,
    localAddress,
    coupon.code,
    mutateAsync,
    setCouponCode,
  ]);

  useEffect(() => {
    if (!settingsLoading && settings) {
      const shippingMethod = {
        coastLabel: settings.delivery_fee,
        id: 1,
        name: "delivery",
        value: parseInt(settings.delivery_fee),
      };
      setShippingMethods([shippingMethod]);
      setShippingMethod(shippingMethod);
    }
  }, [settings, settingsLoading]);

  // ✅ Memoize returned object for better performance
  return useMemo(
    () => ({
      states: {
        coupon,
        paymentMethod,
        localAddress,
        notes,
        shiipingMethod,
      },
      handlers: {
        handleCodeChange,
        handleNotesChange,
        handleLocalAddressChange,
        handleCheckoutClick,
        setCoupon,
        setPaymentMethod,
        setShippingMethod,
      },
      data: { paymentMethods, shippingMethods },
      queries: { addressQuery, settingsQuery },
      refs: { dialogRef },
      isPending,
    }),
    [
      coupon,
      paymentMethod,
      localAddress,
      notes,
      handleCodeChange,
      handleNotesChange,
      handleLocalAddressChange,
      handleCheckoutClick,
      addressQuery,
      isPending,
      shiipingMethod,
      settingsQuery,
    ]
  );
};

export default useCheckoutLogic;
