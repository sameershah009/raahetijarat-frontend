import { generateUploadButton, generateUploadDropzone, generateUploader, generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "../../../../apps/raahetijarat/src/app/api/uploadthing/core";

export const Uploader: ReturnType<typeof generateUploader> = generateUploader<OurFileRouter>();
export const UploadButton: ReturnType<typeof generateUploadButton> = generateUploadButton<OurFileRouter>();
export const UploadDropzone: ReturnType<typeof generateUploadDropzone> = generateUploadDropzone<OurFileRouter>();

export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();
