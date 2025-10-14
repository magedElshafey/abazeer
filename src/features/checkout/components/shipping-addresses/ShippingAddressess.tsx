import { useTranslation } from "react-i18next";
import useGetUserAddresses from "@/features/user/api/addresses/useGetUserAddresses";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import AddressCard from "@/features/user/components/addresses/AddressCard";
import EmptyStateCard from "@/features/user/components/common/EmptyStateCard";
import type { Address } from "@/features/user/types/addresses.types";
import { FiMapPin } from "react-icons/fi";
const ShippingAddresses = () => {
  const { t } = useTranslation();

  return <div className=""></div>;
};

export default ShippingAddresses;
