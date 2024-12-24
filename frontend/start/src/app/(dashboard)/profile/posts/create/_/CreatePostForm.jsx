"use client";

import { useCategories } from "@/hooks/useCategories";
import RHFSelect from "@/ui/RHFSelect";
import RHFTextField from "@/ui/RHFTextField";
import TextField from "@/ui/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import * as yup from "yup";
import Image from "next/image";
import ButtonIcon from "@/ui/ButtonIcon";
import { XMarkIcon } from "@heroicons/react/24/outline";
import FileInput from "@/ui/FileInput";
import Button from "@/ui/Button";
import useCreatePost from "./useCreatePost";
import { SpinnerMini } from "@/ui/Spinner";
import { useRouter } from "next/navigation";
import useEditPost from "./useEditPost";
import { imageUrlToFile } from "@/utils/fileFormatter";

const schema = yup
  .object({
    title: yup
      .string()
      .min(5, "حداقل ۵ کاراکتر را وارد کنید")
      .required("عنوان ضروری است"),
    briefText: yup
      .string()
      .min(5, "حداقل ۱۰ کاراکتر را وارد کنید")
      .required("توضیحات ضروری است"),
    text: yup
      .string()
      .min(5, "حداقل ۱۰ کاراکتر را وارد کنید")
      .required("توضیحات ضروری است"),
    slug: yup.string().required("اسلاگ ضروری است"),
    readingTime: yup
      .number()
      .positive()
      .integer()
      .required("زمان مطالعه ضروری است")
      .typeError("یک عدد را وارد کنید"),
    category: yup.string().required("دسته بندی ضروری است"),
  })
  .required();

function CreatePostForm({ postToEdit = {} }) {
  const { _id: editId } = postToEdit;
  const isEditSession = Boolean(editId);
  const {
    title,
    text,
    slug,
    briefText,
    readingTime,
    category,
    coverImage,
    coverImageUrl: prevCoverImageUrl,
  } = postToEdit;

  let editValues = {};
  if (isEditSession) {
    editValues = {
      title,
      text,
      slug,
      briefText,
      readingTime,
      category: category._id,
      coverImage,
    };
  }

  const { categories } = useCategories();
  const [coverImageUrl, setCoverImageUrl] = useState(prevCoverImageUrl || null);
  const { isCreating, createPost } = useCreatePost();
  const { isUpdating, editPost } = useEditPost();

  const router = useRouter();

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
    defaultValues: editValues,
  });

  //coverImage is a link but we need to have a file to submit the form so with this function we convert link to file.
  useEffect(() => {
    if (prevCoverImageUrl) {
      async function fetchMyApi() {
        const file = await imageUrlToFile(prevCoverImageUrl);
        setValue("coverImage", file);
      }
      fetchMyApi();
    }
  }, [editId]);

  const onSubmit = (data) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    if (isEditSession) {
      editPost(
        { id: editId, data: formData },
        {
          onSuccess: () => {
            reset();
            router.push("/profile/posts");
          },
        }
      );
    } else {
      createPost(formData, {
        onSuccess: () => {
          router.push("/profile/posts");
        },
      });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField
        name="title"
        label="عنوان"
        errors={errors}
        register={register}
        isRequired
      />
      <RHFTextField
        name="briefText"
        label="متن کوتاه"
        errors={errors}
        register={register}
        isRequired
      />
      <RHFTextField
        name="text"
        label="متن"
        errors={errors}
        register={register}
        isRequired
      />
      <RHFTextField
        name="slug"
        label="اسلاگ"
        errors={errors}
        register={register}
        isRequired
      />
      <RHFTextField
        name="readingTime"
        label="زمان مطالعه"
        errors={errors}
        register={register}
        isRequired
      />
      <RHFSelect
        name="category"
        lable="دسته بندی"
        errors={errors}
        register={register}
        options={categories}
      />
      <Controller
        name="coverImage"
        control={control}
        rules={{ required: "کاور پست الزامی است" }}
        render={({ field: { value, onChange, ...rest } }) => {
          return (
            <FileInput
              type="file"
              label="انتخاب کاور پست"
              name="coverImage"
              errors={errors}
              isRequired
              {...rest}
              value={value?.fileName}
              onChange={(event) => {
                const file = event.target.files[0];
                onChange(file);
                setCoverImageUrl(URL.createObjectURL(file));
                event.target.value = null; //when you chose a same image it doesn't upload. so it's a trick.
              }}
            />
          );
        }}
      />
      {coverImageUrl && (
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image
            fill
            alt="cover-image"
            src={coverImageUrl}
            className="object-cover object-center"
          />
          <ButtonIcon
            variant="red"
            className="w-6 h-6 absolute left-2 top-2"
            onClick={() => {
              setCoverImageUrl(null);
              setValue("coverImage", null); //it must be removed from state of hook form too.
            }}
          >
            <XMarkIcon />
          </ButtonIcon>
        </div>
      )}
      <div>
        {isCreating ? (
          <SpinnerMini />
        ) : (
          <Button type="submit" variant="primary" className="w-full">
            تایید
          </Button>
        )}
      </div>
    </form>
  );
}

export default CreatePostForm;
