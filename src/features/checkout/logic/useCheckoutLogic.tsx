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

const useCheckoutLogic = () => {
  const dialogRef = useRef<{ close: () => void }>(null);
  const { items } = useCart();
  const {data: settings, isLoading: settingsLoading} = useGetWebsiteSettings();

  // ✅ Group related states logically
  const [shippingMethods, setShippingMethods] = useState<Shippings[]>([
    {
      id: 1,
      name: "local pickup",
      coastLabel: "free shipping",
      value: 0,
    }
  ]);
  const [shiipingMethod, setShippingMethod] = useState<Shippings>(
    shippingMethods[0]
  );

  const [coupon, setCoupon] = useState({ code: "", visible: false });
  const [paymentMethod, setPaymentMethod] = useState<Payment>(
    paymentMethods[0]
  );
  const [localAddress, setLocalAddress] = useState<Address | undefined>();
  const [notes, setNotes] = useState("");

  const addressQuery = useGetUserAddresses();

  // ✅ Use derived state only when necessary
  useEffect(() => {
    if (addressQuery.isFetching || !addressQuery.isSuccess || !addressQuery.data?.length || localAddress)
      return;

    const defaultAddress =
      addressQuery.data.find((a) => a.is_default) ?? addressQuery.data[0];
    setLocalAddress(defaultAddress);
  }, [addressQuery.isSuccess, addressQuery.data, localAddress]);

  const { mutateAsync, isPending } = useCheckout();

  // ✅ useCallback to avoid unnecessary re-renders
  const handleCodeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setCoupon((prev) => ({ ...prev, code: e.target.value })),
    []
  );

  const handleNotesChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value),
    []
  );

  const toggleCouponInput = useCallback(
    () => setCoupon((prev) => ({ ...prev, visible: !prev.visible })),
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
      if (response?.status) toast.success(response?.message);
    } catch (error) {
      handlePromisError(error);
    }
 }, [items, paymentMethod, notes, localAddress, coupon.code, mutateAsync]);

  useEffect(() => {
    if(!settingsLoading && settings) {
      setShippingMethods(old => {
        return [
          ...old,
          {
            coastLabel: settings.delivery_fee, 
            id: old.length + 1,
            name: "delivery",
            value: parseInt(settings.delivery_fee)
          }
        ]
      })
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
        toggleCouponInput,
        handleCodeChange,
        handleNotesChange,
        handleLocalAddressChange,
        handleCheckoutClick,
        setCoupon,
        setPaymentMethod,
        setShippingMethod,
      },
      data: { paymentMethods, shippingMethods },
      queries: { addressQuery },
      refs: { dialogRef },
      isPending,
    }),
    [
      coupon,
      paymentMethod,
      localAddress,
      notes,
      toggleCouponInput,
      handleCodeChange,
      handleNotesChange,
      handleLocalAddressChange,
      handleCheckoutClick,
      addressQuery,
      isPending,
      shiipingMethod,
    ]
  );
};

export default useCheckoutLogic;
