import { apiClient } from "@/lib/api/client";

type UploadLogoResponse = {
  success: true;
  statusCode: number;
  message: string;
  data: { url: string };
};

type CompleteOnboardingResponse = {
  success: true;
  statusCode: number;
  message: string;
  data: { onboarded: true };
};

export const onboardingService = {
  async uploadOrganizationLogo(file: File) {
    const formData = new FormData();
    formData.append("logo", file);

    const response = await apiClient.post<UploadLogoResponse>(
      "/upload/org-logo",
      formData,
      { headers: { "Content-Type": null } },
    );
    return response.data.data.url;
  },

  async completeOnboarding() {
    const response = await apiClient.patch<CompleteOnboardingResponse>("/users/me/complete-onboarding");
    return response.data.data;
  },
};