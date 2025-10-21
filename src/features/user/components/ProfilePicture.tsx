import Avatar from "@/common/components/avatar/Avatar";
import Loader from "@/common/components/loader/spinner/Loader";
import { User } from "@/features/auth/types/auth.types";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { useAuth } from "@/store/AuthProvider";
import { Response } from "@/types/Response";
import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { IoCamera } from "react-icons/io5";
import { toast } from "sonner";

const ProfilePicture = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { updateUser, user } = useAuth();

    const {
        mutate: uploadProfilePicture,
        isPending
    } = useMutation({
        mutationFn: async (image: File) => {
            const response = await Axios.post<Response<Partial<User>>>(apiRoutes.updateProfile, {
                image: image,
            }, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            return response;
        },
        mutationKey: ["profile", "image"],
        onSuccess: response => {
            toast.success(response.data.message);
            updateUser({profile_image: response.data.data.profile_image}) 
        }
    })

    const handleClick = () => {
        inputRef.current?.click();
    }

    const handleChange = (image: File) => {
        uploadProfilePicture(image);
    }

    return (
        <div className="relative">
            <Avatar 
                url={user?.profile_image ? user.profile_image : "/not-found.img"}
                alt="user-profile-picture"
                size={100}
            />
            <input onChange={e => e.target.files && handleChange(e.target.files[0])} multiple={false} className="hidden" type="file" accept="image/*" ref={inputRef} />
            <div onClick={handleClick} className="absolute start-1 -bottom-0 h-6 w-6 rounded-full cursor-pointer flex-center bg-blue-400 hover:bg-blue-500 duration-75">
                {
                    isPending ?
                    <Loader color="orangeColor" />
                    :
                    <IoCamera className="text-orangeColor text-sm" />
                }
            </div>
        </div>
    );
}

export default ProfilePicture;