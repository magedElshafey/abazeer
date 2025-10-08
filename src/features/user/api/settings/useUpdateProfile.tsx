import { useMutation } from "@tanstack/react-query";
import { ProfileSchemaType } from "@/features/auth/schema/profileSchema";
import { Response } from "@/types/Response";
import { Axios } from "@/lib/axios/Axios";
import { apiRoutes } from "@/services/api-routes/apiRoutes";

const useUpdateProfile = () => {
    return useMutation({
        mutationFn: async (data: ProfileSchemaType) => {
            const response = await Axios.post<Response>(apiRoutes.updateProfile, data);
            return response.data;
        },
    });
};

export default useUpdateProfile;
