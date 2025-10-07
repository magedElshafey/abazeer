import { Outlet } from "react-router-dom";
import ProfileNav from "../components/ProfileNav";

const ProfileLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="containerr mx-auto px-4 py-8">
        {/* Large Screens: Row Layout with 1/4 width navigation */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="w-full lg:w-1/4">
              <ProfileNav />
          </div>
          <div className="flex-1">
            <div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
