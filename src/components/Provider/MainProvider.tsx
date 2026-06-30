"use client";
import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { Toaster } from "sonner";
import { store } from "../Redux/store";

import PwaProvider from "./PwaProvider";
import PwaRegister from "./PwaRegister";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider store={store}>
      <PwaProvider>
        <PwaRegister />
        <Toaster position="top-right" richColors />
        {children}
      </PwaProvider>
    </ReduxProvider>
  );
};

export default Provider;
