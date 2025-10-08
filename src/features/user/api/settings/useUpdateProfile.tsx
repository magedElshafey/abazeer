import { useMutation } from "@tanstack/react-query";
import { ProfileSchemaType } from "@/features/auth/schema/profileSchema";
import { Response } from "@/types/Response";
import { Axios } from "@/lib/axios/Axios";

const useUpdateProfile = () => {
    return useMutation({
        mutationFn: async (data: ProfileSchemaType) => {
            const response = await Axios.put<Response>("profile", data);
            return response.data;
        },
    });
};

export default useUpdateProfile;
