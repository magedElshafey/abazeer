import { type FC, type PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/store/AuthProvider";
import DialogComponent from "../dialog/dialog";

interface LoginPromptProps {
    title?: string;
    description?: string;
}

const LoginPrompt: FC<PropsWithChildren<LoginPromptProps>> = ({
    children,
    title = "login_required",
    description = "login_required_description",
}) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    // If user is logged in, render children directly
    if (user) {
        return <>{children}</>;
    }

    // If user is not logged in, wrap children with dialog
    const handleLoginClick = () => {
        navigate("/auth/login");
    };

    return (
        <DialogComponent
            header={{
                title,
                description,
            }}
            action={{
                text: "login",
                action: handleLoginClick,
            }}
            cancel={{
                text: "cancel",
            }}
            type="regular"
        >
            <div onClickCapture={(e) => e.preventDefault()}>

                {children}
            </div>
        </DialogComponent>
    );
};

export default LoginPrompt;

