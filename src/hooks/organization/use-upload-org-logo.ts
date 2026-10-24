import { useMutation } from "@tanstack/react-query";
import { UploadOrgLogoApi } from "@/lib/api/upload.api";

/** Uploads an org logo to Cloudinary. Returns the hosted URL. */
export const useUploadOrgLogo = () => {
    return useMutation({
        mutationFn: (file: File) => UploadOrgLogoApi(file),
    });
};
