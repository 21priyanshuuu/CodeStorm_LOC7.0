import { createUploadthing, type FileRouter } from "uploadthing/server";

const f = createUploadthing();

export const uploadRouter = {
  fileUpload: f({
    image: {
      maxFileSize: "4MB",
    },
    pdf: {
      maxFileSize: "4MB",
    },
  })
    .middleware(async () => {
      // Add any authentication or metadata logic here
      return { userId: "user_id" }; // Example metadata
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log(metadata);
      console.log("File uploaded:", file);
      return { url: file.url }; // Return the uploaded file's URL
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;