import { apiRoutes } from "@/services/api-routes/apiRoutes";
import { useMutation } from "@tanstack/react-query";
import { Axios } from "@/lib/axios/Axios";
import { ContactusSchemaType } from "../../pages/contact/schema/contactusSchema";
const useContactUs = () => {
  return useMutation({
    mutationKey: [apiRoutes?.contactStore],
    mutationFn: async (formData: ContactusSchemaType) => {
      const { data } = await Axios.post(apiRoutes?.contactStore, formData);
      return data;
    },
  });
};

export default useContactUs;
