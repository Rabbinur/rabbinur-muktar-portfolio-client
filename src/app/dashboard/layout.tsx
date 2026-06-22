"use client";

import DashboardLayout from "./layout/layout";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/components/Redux/hooks";
import { useCurrentUserInfo, setUserInfo } from "@/components/Redux/Slice/authSlice";
import { useMyProfileQuery } from "@/components/Redux/RTK/authApi";

const MainDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(useCurrentUserInfo);
  
  // Fetch profile if Redux state is empty (e.g., after a browser refresh)
  const { data: profileData } = useMyProfileQuery(undefined, {
    skip: !!userInfo,
  });

  useEffect(() => {
    if (profileData?.success && profileData?.data) {
      const userData = profileData.data;
      dispatch(
        setUserInfo({
          email: userData.email,
          name: userData.name,
          email_verified: true,
          role: userData.role,
          profile: userData.profile_picture || "",
        })
      );
    }
  }, [profileData, dispatch]);

  return (
    <div className="admin-theme">
      <DashboardLayout>{children}</DashboardLayout>
    </div>
  );
};

export default MainDashboardLayout;
