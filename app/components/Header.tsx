"use client";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

const Header = () => {
  const router = useRouter();

  const handleBack = useCallback(() => {
    router.back();
  }, []);

  return <div>Header</div>;
};

export default Header;
