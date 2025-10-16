import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { MdOutlineEdit } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { Address } from "../../types/addresses.types";
import MainBtn from "@/common/components/buttons/MainBtn";
import useMakeDefaultAddress from "../../api/addresses/useMakeDefaultAddress";
import DeleteAddressButton from "../DeleteAddressButton";
import { useLocation } from "react-router-dom";
interface AddressCardProps {
  address: Address;
  hasEdit?: boolean;
  hasDelete?: boolean;
  hasDefault?: boolean;
}

const AddressCard: FC<AddressCardProps> = ({
  address,
  hasDelete = true,
  hasEdit = true,
  hasDefault = true,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useMakeDefaultAddress();
  const { pathname } = useLocation();

  const getFullAddress = () => {
    const parts = [address.address];
    parts.push(address.city_id.name, address.country_id.name);
    return parts.join(", ");
  };

  const handleMakeDefault = async () => {
    await mutateAsync(address.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-800">{address.name}</h3>
          {address.is_default ? (
            <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-md">
              {t("default")}
            </span>
          ) : (
            hasDefault && (
              <MainBtn
                type="button"
                theme="outline"
                className="!px-3 !py-1 text-xs !w-fit"
                text="make_default"
                onClick={handleMakeDefault}
                isPending={isPending}
              />
            )
          )}
        </div>
        <p className="text-sm text-gray-600 mt-1">{address.postcode}</p>
      </div>

      {/* Content */}
      <div className="px-6 py-4 space-y-3">
        {/* Address */}
        <div className="flex items-start gap-3">
          <HiOutlineLocationMarker
            className="text-gray-500 mt-0.5 flex-shrink-0"
            size={18}
          />
          <div className="text-gray-700 text-sm">
            <p>{getFullAddress()}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-6 py-4 border-t border-gray-100">
        <div className="flex gap-3">
          {hasEdit && (
            <button
              onClick={() =>
                navigate(
                  `/my-profile/addresses/${address.id}/edit?to=${pathname}`
                )
              }
              className="flex items-center gap-2 bg-orangeColor hover:bg-orangeColor/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <MdOutlineEdit size={16} />
              {t("edit")}
            </button>
          )}
          {hasDelete && (
            <DeleteAddressButton
              addressId={address.id}
              addressName={address.name}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
