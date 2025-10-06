import type { AboutType } from "../../types/About.type";

interface AboutCardProps {
  data: AboutType;
}
const AboutCard: React.FC<AboutCardProps> = ({ data }) => {
  return <div>AboutCard</div>;
};

export default AboutCard;
