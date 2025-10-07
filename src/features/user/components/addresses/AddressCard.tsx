import { FC } from "react";
import { useTranslation } from "react-i18next";
import { MdOutlineEdit, MdOutlineDelete } from "react-icons/md";
import { HiOutlineLocationMarker, HiOutlinePhone } from "react-icons/hi";
import { ADDRESS_TYPES } from "../../constants/address.constants";

interface AddressCardProps {
  id: number;
  name: string;
  address: string;
  address2?: string;
  phone?: string;
  city: string;
  country: string;
  type_id: number;
  isDefault?: boolean;
  onEdit?: (id: number) => void;
  onRemove?: (id: number) => void;
}

const AddressCard: FC<AddressCardProps> = ({
  id,
  name,
  address,
  address2,
  phone,
  city,
  country,
  type_id,
  isDefault = false,
  onEdit,
  onRemove,
}) => {
  const { t } = useTranslation();

  const getAddressTypeLabel = () => {
    switch (type_id) {
      case ADDRESS_TYPES.SHIPPING:
        return t("shipping");
      case ADDRESS_TYPES.BILLING:
        return t("billing");
      default:
        return t("address");
    }
  };

  const getFullAddress = () => {
    const parts = [address];
    if (address2) parts.push(address2);
    parts.push(city, country);
    return parts.join(", ");
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-800">{name}</h3>
          {isDefault && (
            <span className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              {t("default")}
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600 mt-1">{getAddressTypeLabel()}</p>
      </div>

      {/* Content */}
      <div className="px-6 py-4 space-y-3">
        {/* Address */}
        <div className="flex items-start gap-3">
          <HiOutlineLocationMarker className="text-gray-500 mt-0.5 flex-shrink-0" size={18} />
          <div className="text-gray-700 text-sm">
            <p>{getFullAddress()}</p>
          </div>
        </div>

        {/* Phone */}
        {phone && (
          <div className="flex items-center gap-3">
            <HiOutlinePhone className="text-gray-500 flex-shrink-0" size={18} />
            <span className="text-gray-700 text-sm">{phone}</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="px-6 py-4 border-t border-gray-100">
        <div className="flex gap-3">
          <button
            onClick={() => onEdit?.(id)}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <MdOutlineEdit size={16} />
            {t("edit")}
          </button>
          <button
            onClick={() => onRemove?.(id)}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <MdOutlineDelete size={16} />
            {t("remove")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressCard;
