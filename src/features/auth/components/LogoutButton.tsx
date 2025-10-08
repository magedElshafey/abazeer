import { type FC, type PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/store/AuthProvider";
import DialogComponent from "@/common/components/dialog/dialog";

const LogoutButton: FC<PropsWithChildren> = ({ children }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        navigate("/", { replace: true });
        logout();
    };

    return (
        <DialogComponent
            header={{
                title: "log out",
                description: "Are you sure you want to log out?",
            }}
            action={{
                text: "Confirm",
                action: handleLogout,
            }}
            cancel={{
                text: "Cancel",
            }}
            type="danger"
        >
            <span>
                {children}
            </span>
        </DialogComponent>
    );
};

export default LogoutButton;

