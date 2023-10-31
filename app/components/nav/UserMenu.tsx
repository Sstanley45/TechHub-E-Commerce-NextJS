"use client";

import React, { useCallback, useState } from "react";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <>
      <div className="relative z-30">
        <div onClick={toggleOpen}></div>
      </div>
    </>
  );
};

export default UserMenu;
