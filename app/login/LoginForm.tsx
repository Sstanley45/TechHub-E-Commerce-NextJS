"use client";

import React, { useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/Button";
import Link from "next/link";
import { AiOutlineGoogle } from "react-icons/ai";

const LoginForm = () => {
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
    console.log(data);
  };

  return (
    <>
      <Heading title="Sign In to Tech Hub" />
      <Button
        label="Continue with Google"
        icon={AiOutlineGoogle}
        outline={false}
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
