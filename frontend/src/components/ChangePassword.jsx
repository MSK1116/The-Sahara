"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { set } from "date-fns";

export default function ChangePassword({ user }) {
  const [newPassword, setNewPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [changing, setChanging] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== retypePassword) {
      setErrors("Passwords do not match");
      return;
    }
    handlePasswordChange();
    console.log({ newPassword, retypePassword });
  };

  const handlePasswordChange = async () => {
    try {
      setErrors("");
      setChanging(true);
      console.log(user);
      const try1 = await axios.post("/api/changePassword", { email: user.email, user_id: user.sub, newPassword });
      if (try1) {
        setChanging(false);
        setNewPassword("");
        setRetypePassword("");
        document.getElementById("changePassword").close();
      }
    } catch (error) {
      console.log(error);
      setErrors(error.response.data.error || "Something went wrong");
      setChanging(false);
    } finally {
      setChanging(false);
    }
  };

  return (
    <dialog id="changePassword" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-blue-700 text-lg mb-4">Change Password</h3>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="retypePassword">Retype New Password</Label>
            <Input id="retypePassword" type="password" value={retypePassword} onChange={(e) => setRetypePassword(e.target.value)} required />
          </div>

          <div className="text-center text-xs text-error ">{errors || ""}</div>
          <div className="modal-action mt-4">
            <Button disabled={changing} type="submit">
              {changing ? <span className=" loading loading-spinner loading-xs"></span> : "Update Password"}
            </Button>
            <button type="button" className="btn" onClick={() => document.getElementById("changePassword").close()}>
              Close
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
