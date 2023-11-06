"use client";

import React from "react";
import Container from "../Container";
import { Categories } from "@/utils/Categories";
import Category from "./Category";
import { usePathname, useSearchParams } from "next/navigation";

const CategoriesNav = () => {
  const params = useSearchParams();
  const category = params?.get("category");

  const pathName = usePathname();
  const isMainPage = pathName === "/";
  if (!isMainPage) return null;

  return (
    <div className="bg-white">
      <Container>
        <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
          {Categories.map((item) => (
            <Category
              key={item.label}
              label={item.label}
              icon={item.icon}
              selected={
                category === item.label ||
                (category === null && item.label === "ALL")
              }
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default CategoriesNav;
