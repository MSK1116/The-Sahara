"use client";
import React, { useState } from "react";
import { FileUpload } from "./file-upload";
import { Button } from "./button";
import axios from "axios";
import toast from "react-hot-toast";

const ProfileUpload = ({ user }) => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const handleUpload = async () => {
    if (!image) {
      return console.log("No image selected");
    }
    const formData = new FormData();
    formData.append("file", image);
    formData.append("userId", user.sub);

    try {
      setUploading(true);
      const res = await axios.post("/api/changeAvatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res) {
        console.log(res.data.blobConnection.downloadUrl);
        document.getElementById("ProfileUpload").close();
        toast.success("Image uploaded Please Re-Login");
        setUploading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to upload image");
      setUploading(false);
    }
  };
  return (
    <>
      <dialog id="ProfileUpload" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Upload your photo!</h3>
          <FileUpload onChange={(filesArray) => setImage(filesArray[0])} />
          <div className=" flex items-center justify-center gap-x-4">
            <Button disabled={uploading} onClick={() => handleUpload()} className={"bg-linear-120 from-blue-600 to-blue-700 cursor-pointer"} type="button" variant={"default"}>
              Upload {uploading && <span className="loading loading-spinner loading-xs"></span>}
            </Button>
            <Button disabled={uploading} onClick={() => document.getElementById("ProfileUpload").close()} type="button" variant={"outline"}>
              Cancel
            </Button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default ProfileUpload;
