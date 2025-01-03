"use client";

import Button from "@/ui/Button";
import RHFTextField from "@/ui/RHFTextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signUpApi } from "@/services/authService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { SpinnerMini } from "@/ui/Spinner";
import Link from "next/link";

// export const metadata = {
//   title: "ثبت نام",
// };

const schema = yup
  .object({
    name: yup
      .string()
      .min(5, "نام و نام خانوادگی نا معتبر است")
      .max(30)
      .required("نام و نام خانوادگی الزامی است"),
    email: yup.string().email("ایمیل نامعتبر است").required("ایمیل الزامی است"),
    password: yup.string().required("رمز عبور الزامی است"),
  })
  .required();

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const router = useRouter();
  const { signup } = useAuth();

  const onSubmit = async (values) => {
    await signup(values);
  };

  return (
    <div>
      <h1 className="text-xl font-bold text-secondary-500 text-center mb-6">
        ثبت نام
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <RHFTextField
          label="نام و نام خانوادگی"
          name="name"
          register={register}
          errors={errors}
          isRequired
        />
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
        <div className="flex justify-center">
          {isLoading ? (
            <SpinnerMini />
          ) : (
            <Button variant="primary" type="submit" className="w-full">
              تایید
            </Button>
          )}
        </div>
      </form>
      <Link href="/signup" className="text-secondary-500 mt-6 text-center">
        ثبت نام
      </Link>
    </div>
  );
}

export default Signup;
