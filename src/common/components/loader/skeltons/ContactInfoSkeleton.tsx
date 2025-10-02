import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactInfoSkeleton = () => {
  return (
    <div className="my-4 md:my-6 lg:my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(3)]?.map((_, i) => (
        <div
          key={i}
          className="animate-pulse p-6 bg-white rounded-lg shadow-md space-y-4"
        >
          {/* Icon */}
          <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto flex items-center justify-center">
            {i === 0 && <FaPhone className="text-gray-300" size={24} />}
            {i === 1 && <FaEnvelope className="text-gray-300" size={24} />}
            {i === 2 && <FaMapMarkerAlt className="text-gray-300" size={24} />}
          </div>

          {/* Contact method name */}
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />

          {/* Contact data */}
          <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
        </div>
      ))}
    </div>
  );
};

export default ContactInfoSkeleton;
