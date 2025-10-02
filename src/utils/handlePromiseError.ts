import { AxiosError } from "axios";
import { toast } from "sonner";

const handlePromisError = (error: unknown) => {
  if (error instanceof AxiosError && error.response) {
    toast.error(error.response.data.message);
  } else {
    toast.error("An unexpected error occurred");
  }
};

export default handlePromisError;
