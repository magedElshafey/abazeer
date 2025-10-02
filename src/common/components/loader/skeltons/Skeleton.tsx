import CategorySkelton from "./CategorySkelton";
import ProductSkelton from "./ProductSkelton";
import SliderSkeleton from "./SliderSkelton";
import { SkeletonType } from "../../../../types/SkeltonType";
import BlogSkelton from "./BlogSkelton";
import FeatureSkeltion from "./FeatureSkeltion";
import HeroSkeleton from "./HeroSkeltion";
import ServiceCardSkeleton from "./ServiceCardSkeleton";
import FullImageSkeleton from "./FullImageSkeleton";
import ContactInfoSkeleton from "./ContactInfoSkeleton";
import PaymentMethodsSkeleton from "./PaymentMethodsSkeleton";
import FAQSkeleton from "./FAQSkeleton";
import CustomSkeleton from "./CustomSkeleton";
import EditProfileSkeleton from "./EditProfileSkeleton";
import CartTableSkeleton from "./CartTableSkeleton";
interface SkeltonProps {
  type: SkeletonType;
}
const Skeleton: React.FC<SkeltonProps> = ({ type }) => {
  switch (type) {
    case "hero":
      return <HeroSkeleton />;
    case "product":
      return <ProductSkelton />;
    case "category":
      return <CategorySkelton />;
    case "slider":
      return <SliderSkeleton />;
    case "blog":
      return <BlogSkelton />;
    case "feature":
      return <FeatureSkeltion />;
    case "service":
      return <ServiceCardSkeleton />;
    case "image":
      return <FullImageSkeleton />;
    case "contact":
      return <ContactInfoSkeleton />;
    case "payment":
      return <PaymentMethodsSkeleton />;
    case "faq":
      return <FAQSkeleton />;
    case "profile":
      return <EditProfileSkeleton />;
    case "cart-table":
      return <CartTableSkeleton />;
    case "custome":
      return <CustomSkeleton />;
    default:
      return null;
  }
};

export default Skeleton;
