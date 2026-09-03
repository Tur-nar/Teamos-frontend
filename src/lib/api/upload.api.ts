import { client } from "@/lib/api/client";

/** Uploads a logo file to Cloudinary before org creation. Returns the hosted URL. */
export const UploadOrgLogoApi = async (file: File): Promise<string> => {
    const form = new FormData();
    form.append("logo", file);

    const res = await client.post<{ url: string }>("/upload/org-logo", form, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    // The Axios interceptor unwraps response.data, so res is already { success, data }
    // Our interceptor returns response.data directly, which is { success: true, data: { url } }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = (res as any)?.data ?? res;
    const url = typeof data?.url === "string" ? data.url : (res as unknown as { url: string }).url;
    return url;
};

/** Sets onboarded=true on the authenticated user. Idempotent. */
export const CompleteOnboardingApi = async (): Promise<{ onboarded: true }> => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const res: any = await client.patch("/users/me/complete-onboarding");
    return res?.data ?? res;
};
