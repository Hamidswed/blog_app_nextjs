"use client";

import { useCategories } from "@/hooks/useCategories";
import RHFSelect from "@/ui/RHFSelect";
import RHFTextField from "@/ui/RHFTextField";
import TextField from "@/ui/TextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import Image from "next/image";
import ButtonIcon from "@/ui/ButtonIcon";
import { XMarkIcon } from "@heroicons/react/24/outline";
import FileInput from "@/ui/FileInput";

const schema = yup.object();

function CreatePostForm() {
  const { categories } = useCategories();
  const [coverImageUrl, setCoverImageUrl] = useState(null);

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  return (
    <form className="form">
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
    </form>
  );
}

export default CreatePostForm;
