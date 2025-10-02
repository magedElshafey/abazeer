import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";

const Header = () => {
  return (
    <div className="hidden md:block bg-background-gray py-2 border-b">
      <div className="containerr flex-between">
        <RightSide />
        <LeftSide />
      </div>
    </div>
  );
};

export default Header;
