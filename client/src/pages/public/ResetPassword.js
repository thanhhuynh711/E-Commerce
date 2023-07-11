import React, { useState } from "react";
import { Button } from "../../components";
import { useParams } from "react-router-dom";
import { apiRestePassword } from "../../apis";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();

  const handleResetPassword = async () => {
    const response = await apiRestePassword({ password, token });
    if (response.success) {
      toast.success(response.mes, { theme: "colored" });
    } else toast.info(response.mes, { theme: "colored" });
  };
  return (
    <div className="absolute animate-slice-right top-0 left-0 bottom-0 right-0 z-30 flex-col bg-white flex items-center py-8">
      <div className="flex flex-col gap-4">
        <label htmlFor="password">Enter your new password:</label>
        <input
          type="text"
          id="password"
          placeholder="Type here"
          className="w-[800px] pb-2 border-b outline-none placeholder:text-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex items-center justify-end w-full gap-4">
          <Button
            name="Submit"
            handleOnClick={handleResetPassword}
            style="px-4 py-2 rounded-md text-white bg-main text-semibold my-2"
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
