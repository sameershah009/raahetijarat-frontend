"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { SubmitHandler, Controller } from "react-hook-form";
import { PiEnvelopeSimple, PiSealCheckFill } from "react-icons/pi";
import { Form } from "@core/ui/form";
import { Button, Title, Text, Input, Checkbox, Select } from "rizzui";
import cn from "@core/utils/class-names";
import { routes } from "@/config/routes";
import toast from "react-hot-toast";
import AvatarUpload from "@core/ui/file-upload/avatar-upload";
import {
  defaultValues,
  profileFormSchema,
  ProfileFormTypes,
} from "@/validators/profile-settings.schema";
import { roles } from "@/data/forms/my-details";
import FormGroup from "@/app/shared/form-group";
import { Link } from "@/i18n/routing";
import FormFooter from "@core/components/form-footer";
import UploadZone from "@core/ui/file-upload/upload-zone";
import { useLayout } from "@/layouts/use-layout";
import { useBerylliumSidebars } from "@/layouts/beryllium/beryllium-utils";
import { LAYOUT_OPTIONS } from "@/config/enums";
import { useTranslations } from "next-intl";

const QuillEditor = dynamic(() => import("@core/ui/quill-editor"), {
  ssr: false,
});

export default function ProfileSettingsView() {
  const t = useTranslations("form");

  const onSubmit: SubmitHandler<ProfileFormTypes> = (data) => {
    toast.success(<Text as="b">Profile successfully updated!</Text>);
    console.log("Profile settings data ->", data);
  };

  return (
    <>
      <Form<ProfileFormTypes>
        validationSchema={profileFormSchema(t)}
        onSubmit={onSubmit}
        className="@container"
        useFormProps={{
          mode: "onChange",
          defaultValues,
        }}
      >
        {({ register, control, getValues, setValue, formState: { errors } }) => {
          return (
            <>
              <ProfileHeader
                title="Olivia Rhye"
                description={t("form-profile-description")}
              >
                <div className="w-full sm:w-auto md:ms-auto">
                  <Link href={routes.profile}>
                    <Button as="span">{t("form-view-profile")}</Button>
                  </Link>
                </div>
              </ProfileHeader>

              <div className="mx-auto mb-10 grid w-full max-w-screen-2xl gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                <FormGroup
                  title={t("form-username")}
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    className="col-span-full"
                    prefix="https://redq.io/"
                    placeholder={t("form-first-name")}
                    prefixClassName="relative pe-2.5 before:w-[1px] before:h-[38px] before:absolute before:bg-gray-300 before:-top-[9px] before:right-0"
                    {...register("username")}
                    error={errors.username?.message}
                  />
                </FormGroup>

                <FormGroup
                  title={t("form-website")}
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    type="url"
                    className="col-span-full"
                    prefix={t("form-url-prefix")}
                    prefixClassName="relative pe-2.5 before:w-[1px] before:h-[38px] before:absolute before:bg-gray-300 before:-top-[9px] before:right-0"
                    placeholder={t("form-website-placeholder")}
                    {...register("website")}
                    error={errors.website?.message}
                  />
                </FormGroup>

                <FormGroup
                  title={t("form-your-photo")}
                  description={t("form-your-photo-placeholder")}
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <div className="col-span-2 flex flex-col items-center gap-4 @xl:flex-row">
                    <AvatarUpload
                      name="avatar"
                      setValue={setValue}
                      getValues={getValues}
                      error={errors?.avatar?.message}
                    />
                  </div>
                </FormGroup>

                <FormGroup
                  title={t("form-your-bio")}
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <div className="@3xl:col-span-2">
                    <Controller
                      control={control}
                      name="description"
                      render={({ field: { onChange, value } }) => (
                        <QuillEditor
                          value={value}
                          onChange={onChange}
                          className="[&>.ql-container_.ql-editor]:min-h-[100px]"
                        />
                      )}
                    />
                  </div>
                </FormGroup>

                <FormGroup
                  title={t("form-job-title")}
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <div className="col-span-full">
                    <Controller
                      control={control}
                      name="role"
                      render={({ field: { value, onChange } }) => (
                        <Select
                          dropdownClassName="!z-10 h-auto"
                          inPortal={false}
                          placeholder={t("form-select-role")}
                          options={roles}
                          onChange={onChange}
                          value={value}
                          getOptionValue={(option) => option.value}
                          displayValue={(selected) =>
                            roles?.find((r) => r.value === selected)?.label ?? ""
                          }
                          error={errors?.role?.message}
                        />
                      )}
                    />
                    <Checkbox
                      label={t("form-job-checkbox-label")}
                      className="mt-3"
                    />
                  </div>
                </FormGroup>

                <FormGroup
                  title={t("form-email-alternative")}
                  description={t("form-email-alternative-description")}
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <Input
                    prefix={<PiEnvelopeSimple className="h-6 w-6 text-gray-500" />}
                    type="email"
                    className="col-span-full"
                    placeholder={t("form-email-address-placeholder")}
                    {...register("email")}
                    error={errors.email?.message}
                  />
                </FormGroup>

                <FormGroup
                  title={t("form-portfolio-projects")}
                  description={t("form-portfolio-projects-description")}
                  className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                  <div className="@3xl:col-span-2">
                    <UploadZone
                      name="portfolios"
                      getValues={getValues}
                      setValue={setValue}
                      error={errors?.portfolios?.message}
                    />
                  </div>
                </FormGroup>
              </div>
              <FormFooter
                // isLoading={isLoading}
                altBtnText={t("form-cancel")}
                submitBtnText={t("form-save")}
              />
            </>
          );
        }}
      </Form>
    </>
  );
}

export function ProfileHeader({
  title,
  description,
  children,
}: React.PropsWithChildren<{ title: string; description?: string }>) {
  const { layout } = useLayout();
  const { expandedLeft } = useBerylliumSidebars();

  return (
    <div
      className={cn(
        "relative z-0 -mx-4 px-4 pt-28 before:absolute before:start-0 before:top-0 before:h-40 before:w-full before:bg-gradient-to-r before:from-[#F8E1AF] before:to-[#F6CFCF] @3xl:pt-[190px] @3xl:before:h-[calc(100%-120px)] dark:before:from-[#bca981] dark:before:to-[#cbb4b4] md:-mx-5 md:px-5 lg:-mx-8 lg:px-8 xl:-mx-6 xl:px-6 3xl:-mx-[33px] 3xl:px-[33px] 4xl:-mx-10 4xl:px-10",
        layout === LAYOUT_OPTIONS.BERYLLIUM && expandedLeft
          ? "before:start-5 3xl:before:start-[25px]"
          : "xl:before:w-[calc(100%_+_10px)]"
      )}
    >
      <div className="relative z-10 mx-auto flex w-full max-w-screen-2xl flex-wrap items-end justify-start gap-6 border-b border-dashed border-muted pb-10">
        <div className="relative -top-1/3 aspect-square w-[110px] overflow-hidden rounded-full border-[6px] border-white bg-gray-100 shadow-profilePic @2xl:w-[130px] @5xl:-top-2/3 @5xl:w-[150px] dark:border-gray-50 3xl:w-[200px]">
          <Image
            src="https://raahetijarat-furyroad.s3.amazonaws.com/public/profile-image.webp"
            alt="profile-pic"
            fill
            sizes="(max-width: 768px) 100vw"
            className="aspect-auto"
          />
        </div>
        <div>
          <Title
            as="h2"
            className="mb-2 inline-flex items-center gap-3 text-xl font-bold text-gray-900"
          >
            {title}
            <PiSealCheckFill className="h-5 w-5 text-primary md:h-6 md:w-6" />
          </Title>
          {description ? <Text className="text-sm text-gray-500">{description}</Text> : null}
        </div>
        {children}
      </div>
    </div>
  );
}
