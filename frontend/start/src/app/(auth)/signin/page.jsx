"use client";

import RHFTextField from "@/ui/RHFTextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import Button from "@/ui/Button";
import toast from "react-hot-toast";
import { signInApi } from "@/services/authService";

const schema = yup
  .object({
    email: yup.string().email("ایمیل نامعتبر است").required("ایمیل الزامی است"),
    password: yup.string().required("رمز عبور الزامی است"),
  })
  .required();

function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = async (values) => {
    try {
      const { user, message } = await signInApi(values);
      console.log(user, message);
      toast.success(message);
      reset();
      // router.push("/profile");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error?.response?.data?.message);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-secondary-500 text-center mb-6">
        ورود
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <RHFTextField
          label="ایمیل"
          name="email"
          register={register}
          dir="ltr"
          errors={errors}
          isRequired
        />
        <RHFTextField
          label="رمز عبور"
          name="password"
          register={register}
          type="password"
          dir="ltr"
          errors={errors}
          isRequired
        />
        <Button variant="primary" type="submit" className="w-full">
          ورود
        </Button>
      </form>
      <Link href="/signup" className="text-secondary-500 mt-6 text-center">
        ثبت نام
      </Link>
    </div>
  );
}

export default Signin;