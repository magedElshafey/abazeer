import { toast } from "sonner";
import { isAxiosResponseError } from "../types/Response";

const toastErrorMessage = (err: Error) => {
    if(isAxiosResponseError(err)) {
        toast.error(err.response.data.message);
    } else {
        toast.error(err.message);
    }
}

export default toastErrorMessage