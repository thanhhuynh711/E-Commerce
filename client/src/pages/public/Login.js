import React, { useState, useCallback } from "react";
import lucy from "../../assets/download (1).jpg";
import { InputField, Button } from "../../components";
import icons from "../../ultils/icons";
import { Link } from "react-router-dom";
import path from "../../ultils/path";

const Login = () => {
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    name: "",
  });

  const { HiHome } = icons;

  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = useCallback(() => {
    console.log(payload);
  }, [payload]);

  return (
    <div className="w-screen h-screen relative">
      <div className=" absolute bg-[rgba(0,0,0,0.4)] z-10 top-0 left-0 right-0 bottom-0"></div>
      <img className="w-full h-full object-cover" src={lucy} alt="lucy" />
      <div className="top-0 bottom-0 left-0 right-1/2 absolute flex justify-center items-center">
        <div className="p-8 z-20 bg-white rounded-md min-w-[500px] flex flex-col items-center ">
          <Link to={`/${path.HOME}`} className="w-full text-start">
            <HiHome
              size={20}
              className="hover:opacity-60 cursor-pointer text-main"
            />
          </Link>
          <h1 className="text-[28px] font-semibold text-main mb-8">
            {isRegister ? "Register" : "Login"}
          </h1>
          {isRegister && (
            <InputField
              value={payload.name}
              setValue={setPayload}
              nameKey="name"
            />
          )}
          <InputField
            value={payload.email}
            setValue={setPayload}
            nameKey="email"
          />
          <InputField
            value={payload.password}
            setValue={setPayload}
            nameKey="password"
            type="password"
          />
          <Button
            name={isRegister ? "Register" : "Login"}
            fw
            handleOnClick={handleSubmit}
          />
          <div className="flex items-center justify-between my-2 w-full text-sm">
            {!isRegister && (
              <span className="text-blue-500 hover:underline cursor-pointer">
                Forgot your account?
              </span>
            )}
            {!isRegister && (
              <span
                onClick={() => setIsRegister(true)}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Create account
              </span>
            )}
            {isRegister && (
              <span
                onClick={() => setIsRegister(false)}
                className="text-blue-500 w-full text-end hover:underline cursor-pointer"
              >
                Go login
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
