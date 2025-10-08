import { FC } from "react";
import ChangePasswordCard from "../components/settings/ChangePasswordCard";
import ProfileForm from "../components/settings/ProfileForm";

const Settings: FC = () => {
    return (
        <div className="flex flex-col gap-4">
            <ProfileForm />
            <ChangePasswordCard />
        </div>
    );
};

export default Settings;


