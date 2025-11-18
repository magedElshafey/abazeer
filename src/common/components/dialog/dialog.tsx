import {
  forwardRef,
  useImperativeHandle,
  useState,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/ui/dialog";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import toastErrorMessage from "@/utils/toastApiError";
import MainBtn from "../buttons/MainBtn";

interface ActionType {
  action?: (() => void) | (() => Promise<void>);
  text?: string;
  disabled?: boolean;
}

interface RefType {
  close: () => void;
  open: () => void;
}

interface Props {
  header?: {
    title?: string;
    description?: string;
  };
  content?: ReactNode;
  action?: ActionType;
  cancel?: ActionType;
  queryKey?: string[];
  type?: "regular" | "danger";
  onSuccess?: () => void;
  onOpenChange?: (isOpen: boolean) => void;
}

const defaultCancelText = "cancel";
const defaultOkText = "ok";

const DialogComponent = forwardRef<RefType, PropsWithChildren<Props>>(
  (
    {
      header,
      content,
      children,
      action,
      cancel,
      queryKey,
      type = "regular",
      onSuccess,
      onOpenChange,
    },
    ref
  ) => {
    const { t } = useTranslation();
    const queryClient = useQueryClient();

    const [opened, setOpened] = useState(false);

    useImperativeHandle(
      ref,
      () => ({
        close: () => {
          setOpened(false);
        },
        open: () => setOpened(true),
      }),
      []
    );

    const { mutate, isPending } = useMutation({
      mutationKey: [queryKey],
      mutationFn: async () => {
        const response = await action?.action?.();
        return response;
      },
      onSuccess: async (response: unknown) => {
        if (
          response &&
          typeof response === "object" &&
          "data" in response &&
          response.data &&
          typeof response.data === "object" &&
          "message" in response.data
        ) {
          toast.success(response.data.message as string);
        }
        if(queryKey) await queryClient.invalidateQueries({ queryKey: queryKey });
        setOpened(false);
        onSuccess?.();
      },
      onError: (error: unknown) => {
        toastErrorMessage(error as Error);
      },
    });

    return (
      <Dialog
        open={opened}
        onOpenChange={(e) => {
          setOpened(e);
          if (!e) {
            cancel?.action?.();
          }
          onOpenChange?.(e);
        }}
      >
        <DialogTrigger onClick={() => setOpened(true)} asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="min-w-96 w-fit">
          {header && (
            <DialogHeader
              className={!content ? "border-b-0" : ""}
              autoFocus
              tabIndex={1}
            >
              {header.title && <DialogTitle>{t(header.title)}</DialogTitle>}
              {header.description && (
                <DialogDescription>{t(header.description)}</DialogDescription>
              )}
            </DialogHeader>
          )}

          {content}

          <DialogFooter className={content ? "" : "border-t-0"}>
            <DialogClose className="w-full sm:w-auto">
              <MainBtn className="w-full" theme="outline">
                {t(cancel?.text || defaultCancelText)}
              </MainBtn>
            </DialogClose>
            {action && (
              <MainBtn
                onClick={() => mutate()}
                isPending={isPending}
                theme={type === "danger" ? "danger" : "main"}
                disabled={action.disabled}
              >
                {t(action.text || defaultOkText)}
              </MainBtn>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
);

export default DialogComponent;
