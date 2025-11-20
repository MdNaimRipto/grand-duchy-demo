import { colorConfig } from "@/configs/colorConfig";
import { envConfig } from "@/configs/envConfig";
import Image from "next/image";
import React, { useState } from "react";
import { RiUpload2Fill } from "react-icons/ri";
import { CircularProgress } from "@mui/material";
import { ErrorToast } from "./toasts/ErrorToast";

interface ImageUploadProps {
  image: string;
  setImage: (url: string) => void;
}

const ImageUpload = ({ image, setImage }: ImageUploadProps) => {
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const optimizeImage = (file: File, maxWidth = 1000, quality = 0.7) => {
    return new Promise<File | null>((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new window.Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Set max width & height
          let width = img.width;
          let height = img.height;
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;
          ctx?.drawImage(img, 0, 0, width, height);
          if (ctx) {
            ctx.fillStyle = "#00000000";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, width, height);
          }

          // Convert to JPEG/WebP with compression
          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(new File([blob], file.name, { type: "image/webp" }));
              } else {
                resolve(null);
              }
            },
            "image/webp",
            quality
          );
        };
      };
    });
  };

  const handleImageUpload = async (e: any) => {
    e.preventDefault();
    setIsImageUploaded(true);
    const img = e.target.files[0];
    if (img) {
      const optimizedImage = await optimizeImage(img);
      if (!optimizedImage) {
        setIsImageUploaded(false);
        return ErrorToast("Image optimization failed");
      }
      const formData = new FormData();
      formData.append("image", optimizedImage);

      const url = `https://api.imgbb.com/1/upload?key=${envConfig.img_bb_secret}`;
      fetch(url, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((imgData) => {
          try {
            setImage(imgData?.data?.url);
          } finally {
            setIsImageUploaded(false);
          }
        });
    }
  };
  return (
    <div className="mt-4 w-full">
      <label className="capitalize text-sm font-medium">
        Add image <span className="text-error">*</span>
      </label>
      {image.length ? (
        <div className="mt-2 w-3/5 h-[300px] rounded-lg overflow-hidden relative">
          <button
            className="rounded-full bg-white text-black absolute right-2 font-medium top-2 w-7 h-7"
            onClick={() => setImage("")}
          >
            X
          </button>
          <Image
            src={image.length ? image : ""}
            alt="Recipe Image"
            width={400}
            height={400}
            priority
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <>
          {isImageUploaded ? (
            <CircularProgress
              sx={{
                color: colorConfig.primary,
              }}
            />
          ) : (
            <div
              onClick={() => {
                const imageUploadElement =
                  document.getElementById("image-upload");
                if (imageUploadElement) imageUploadElement.click();
              }}
              className="flex flex-col items-center justify-center gap-2 border rounded-md mt-2 p-6"
            >
              <RiUpload2Fill className="text-primary text-4xl" />
              <span className="capitalize text-sm font-medium">
                Upload image
              </span>
              <input
                id="image-upload"
                name="image"
                type="file"
                className="hidden"
                onChange={(e) => handleImageUpload(e)}
                required
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ImageUpload;
