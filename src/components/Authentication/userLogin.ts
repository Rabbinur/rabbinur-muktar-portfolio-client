import { FieldValues } from "react-hook-form";

export const userLogin = async (formData: FieldValues) => {
  const res = await fetch(
    "/api/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );

  const userInfo = await res.json();
  return userInfo;
};
