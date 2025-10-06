import { useMutation } from "@tanstack/react-query";
import { Axios } from "../../../lib/axios/Axios";
import { apiRoutes } from "../../../services/api-routes/apiRoutes";

const useSendForgetPasswordOtp = () => {
  return useMutation({
    mutationKey: ["send-forget-password-otp"],
    mutationFn: async (formData: {code: string, email: string}) => {
      const { data } = await Axios.post(apiRoutes?.checkOTP, formData);
      return data;
    },
  });
};

export default useSendForgetPasswordOtp;