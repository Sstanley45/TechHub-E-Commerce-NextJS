"use client";

import React, { useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true); 

    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.ok) {
          router.push("/cart");
          router.refresh();
          toast.success("Logging In...");
        }
        if (callback?.error) {
          toast.error(callback.error);
        }
      })
      .catch(() => toast.error("Something went wrong when logging in"))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Heading title="Sign In to Tech Hub" />
      <Button
        label="Continue with Google"
        icon={AiOutlineGoogle} 
        outline
        onClick={() => {}}
      />
      <hr className="bg-slate-300 w-full h-px" />
      {/* email */}
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      {/* password */}
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Button
        label={isLoading ? "Loading..." : "Sign In"}
        onClick={handleSubmit(onSubmit)}
      />
      <p className="text-sm">
        Do not have an account ?{" "}
        <Link className="underline" href="/register">
          Sign up
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
