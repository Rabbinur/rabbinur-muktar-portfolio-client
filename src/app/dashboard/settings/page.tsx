"use client";

import { useGetSettingsQuery, useUpdateSettingsMutation } from "@/components/Redux/RTK/portfolioApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { toast } from "sonner";

import SettingsTabNav, { TabId } from "./_components/SettingsTabNav";
import ProfileHeroForm from "./_components/ProfileHeroForm";
import SocialsResumeForm from "./_components/SocialsResumeForm";
import ContactInfoForm from "./_components/ContactInfoForm";
import SeoConfigForm from "./_components/SeoConfigForm";
import { settingsFormSchema, SettingsFormValues, DEFAULT_SETTINGS_VALUES } from "./_types/schema";

export default function SettingsPage() {
  const { data: settingsResponse, isLoading: isLoadingSettings } = useGetSettingsQuery(undefined);
  const [updateSettings, { isLoading: isSaving }] = useUpdateSettingsMutation();

  const [activeTab, setActiveTab] = useState<TabId>("personal");

  const methods = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: DEFAULT_SETTINGS_VALUES,
  });

  const { reset, handleSubmit } = methods;

  useEffect(() => {
    if (settingsResponse?.data) {
      const data = settingsResponse.data;
      reset({
        personalInfo: {
          name: data.personalInfo?.name || "",
          role: data.personalInfo?.role || "",
          location: data.personalInfo?.location || "",
          bio: data.personalInfo?.bio || "",
          profileImage: data.personalInfo?.profileImage || "",
          resumeUrl: data.personalInfo?.resumeUrl || "",
        },
        socialLinks: {
          github: data.socialLinks?.github || "",
          linkedin: data.socialLinks?.linkedin || "",
          twitter: data.socialLinks?.twitter || "",
          facebook: data.socialLinks?.facebook || "",
        },
        contactInfo: {
          email: data.contactInfo?.email || "",
          phone: data.contactInfo?.phone || "",
          whatsapp: data.contactInfo?.whatsapp || "",
          instagram: data.contactInfo?.instagram || "",
        },
        seoSettings: {
          title: data.seoSettings?.title || "",
          description: data.seoSettings?.description || "",
          keywords: data.seoSettings?.keywords || [],
        },
        websiteSettings: {
          availabilityStatus: data.websiteSettings?.availabilityStatus || "Available for projects",
          theme: data.websiteSettings?.theme || "dark",
        },
        heroTitle: data.heroTitle || "",
        heroSubtitle: data.heroSubtitle || "",
        stat1Label: data.stat1Label || "Completed Projects",
        stat1Value: data.stat1Value || "",
        stat2Label: data.stat2Label || "Client satisfaction",
        stat2Value: data.stat2Value || "99%",
        stat3Label: data.stat3Label || "Years experience",
        stat3Value: data.stat3Value || "3+",
      });
    }
  }, [settingsResponse, reset]);

  const onSubmit = async (values: SettingsFormValues) => {
    try {
      await updateSettings(values).unwrap();
      toast.success("Settings updated successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update settings");
    }
  };

  if (isLoadingSettings) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-[#001f3f]" />
      </div>
    );
  }

  return (
    <div className="bg-slate-50/50 min-h-screen p-4 md:p-6 lg:p-8 space-y-6">
      <div className="border-b border-slate-100 pb-5">
        <h1 className="text-2xl font-black text-[#001f3f]">Portfolio Settings</h1>
        <p className="text-sm text-slate-400">Configure personal information, resume links, and SEO tags.</p>
      </div>

      <div className="space-y-6">
        {/* Navigation Tabs */}
        <SettingsTabNav activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Form Body wrapping in React Hook Form Provider */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex-1 w-full space-y-6">
            {activeTab === "personal" && <ProfileHeroForm />}
            {activeTab === "social" && <SocialsResumeForm />}
            {activeTab === "contact" && <ContactInfoForm />}
            {activeTab === "seo" && <SeoConfigForm />}

            {/* Form Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="submit"
                disabled={isSaving}
                className="bg-[#001f3f] text-white hover:bg-[#003366] px-8 py-3 rounded-xl font-extrabold text-xs transition-all shadow flex items-center gap-1.5"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving Settings...</span>
                  </>
                ) : (
                  <span>Save Changes</span>
                )}
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
