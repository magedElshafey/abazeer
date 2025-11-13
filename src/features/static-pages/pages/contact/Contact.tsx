import MainInput from "@/common/components/inputs/MainInput";
import MainBtn from "@/common/components/buttons/MainBtn";
import MainTextArea from "@/common/components/inputs/MainTextArea";
import useContactusLogic from "./logic/useContactusLogic";
import useGetContactSettings from "../../api/contact/useGetContactSettings";
import FetchHandler from "@/common/api/fetchHandler/FetchHandler";
import { useTranslation } from "react-i18next";
import SectionTitle from "@/common/components/titles/SectionTitle";
const Contact = () => {
  const { t, i18n } = useTranslation();
  const { register, errors, handleSubmit, onSubmit, isPending } =
    useContactusLogic();
  const queryResult = useGetContactSettings();
  return (
    <div className="containerr my-5">
      <FetchHandler queryResult={queryResult} skeletonType="slider">
        <div className="w-full h-[250px] lg:h-[400px] overflow-hidden mb-4 relative">
          <div
            className="[&_iframe]:absolute [&_iframe]:top-0 [&_iframe]:left-0 [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:border-0"
            dangerouslySetInnerHTML={{
              __html: queryResult?.data?.iframe || "",
            }}
          />
        </div>
      </FetchHandler>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-20 mt-12">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <SectionTitle title="contact us" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="mb-4 col-span-2">
              <MainInput
                required={false}
                placeholder="subject"
                label="subject"
                enableAutocomplete
                {...register("subject")}
                error={errors.subject?.message}
              />
            </div>
            <div className="mb-4 col-span-2 lg:col-span-1">
              <MainInput
                required={true}
                placeholder="user name"
                label="user name"
                enableAutocomplete
                {...register("name")}
                error={errors.name?.message}
              />
            </div>
            <div className="mb-4 col-span-2 lg:col-span-1">
              <MainInput
                required={true}
                placeholder="email"
                label="email"
                enableAutocomplete
                {...register("email")}
                error={errors.email?.message}
              />
            </div>
            <div className="mb-4 col-span-2 lg:col-span-1">
              <MainInput
                required={false}
                placeholder="phone"
                label="phone"
                enableAutocomplete
                {...register("phone")}
                error={errors.phone?.message}
              />
            </div>
            <div className="mb-4 col-span-2 lg:col-span-1">
              <MainInput
                required={false}
                placeholder="address"
                label="address"
                enableAutocomplete
                {...register("address")}
                error={errors.address?.message}
              />
            </div>

            <div className="mb-4 col-span-2">
              <MainTextArea
                required={false}
                placeholder="contact message"
                label="contact message"
                {...register("message")}
                error={errors.message?.message}
              />
            </div>
          </div>
          <div className="w-full flex-center">
            <div className="w-full md:w-[180px]">
              <MainBtn
                type="submit"
                className="w-full flex-center"
                text="send"
                isPending={isPending}
              />
            </div>
          </div>
        </form>
        <div
          className={`md:ps-8  ${
            i18n.language === "ar" ? "md:border-r" : "md:border-l"
          }`}
        >
          <SectionTitle title="contact information" />
          <div>
            {queryResult?.data?.contact_address && (
              <div className="flex items-center gap-2 mb-4">
                <p className="font-bold">{t("address")}</p>
                <p className=" duration-300 transition-all hover:underline">
                  {queryResult?.data?.contact_address}
                </p>
              </div>
            )}
            {queryResult?.data?.contact_email && (
              <div className="flex items-center gap-2 mb-4">
                <p className="font-bold">{t("email")}</p>
                <a
                  href={queryResult?.data?.contact_email}
                  className=" duration-300 transition-all hover:underline lowercase"
                >
                  {queryResult?.data?.contact_email}
                </a>
              </div>
            )}
            {queryResult?.data?.contact_phone && (
              <div className="flex items-center gap-2 mb-4">
                <p className="font-bold">{t("phone")}</p>
                <a
                  dir="ltr"
                  href={`https://wa.me/${queryResult?.data?.contact_phone}`}
                  className=" duration-300 transition-all hover:underline lowercase"
                >
                  {queryResult?.data?.contact_phone}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
