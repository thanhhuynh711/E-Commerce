import React, { useState, useCallback, useEffect } from "react";
import lucy from "../../assets/download (1).jpg";
import { InputField, Button } from "../../components";
import icons from "../../ultils/icons";
import { Link } from "react-router-dom";
import path from "../../ultils/path";
import {
  apiRegister,
  apiLogin,
  apiForgotPassword,
  apiFinalRegister,
} from "../../apis";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import to from "../../ultils/path";
import { login } from "../../store/user/userSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { validate } from "../../ultils/helper";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [payload, setPayload] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    mobile: "",
  });

  const { HiHome } = icons;

  const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);
  const [invalidFields, setInvalidFields] = useState([]);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const resetPayload = () => {
    setPayload({
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      mobile: "",
    });
  };

  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const handleForgotPassword = async () => {
    const response = await apiForgotPassword({ email });
    console.log(response);
    if (response.success) {
      toast.success(response.mes, { theme: "colored" });
    } else toast.info(response.mes, { theme: "colored" });
  };

  useEffect(() => {
    resetPayload();
  }, [isRegister]);

  const handleSubmit = useCallback(async () => {
    const { firstname, lastname, mobile, ...data } = payload;

    const invalids = isRegister
      ? validate(payload, setInvalidFields)
      : validate(data, setInvalidFields);

    if (invalids === 0) {
      if (isRegister) {
        const response = await apiRegister(payload);
        if (response.sucess) {
          setIsVerifiedEmail(true);
        } else Swal.fire("Oops!", response.mes, "error");
      } else {
        const rs = await apiLogin(data);
        if (rs.sucess) {
          dispatch(
            login({
              isLoggedIn: true,
              token: rs.accessToken,
              userData: rs.userData,
            })
          );
          navigate(`/${to.HOME}`);
        } else Swal.fire("Oops!", rs.mes, "error");
      }
    }
  }, [payload, isRegister]);

  const finalRegister = async () => {
    const response = await apiFinalRegister(token);
    if (response.sucess) {
      Swal.fire("Congratulation", response.mes, "success").then(() => {
        setIsRegister(false);
        resetPayload();
      });
    } else Swal.fire("Oops!", response.mes, "error");
    setIsVerifiedEmail(false);
    setToken("");
  };

  return (
    <div className="w-screen h-screen relative">
      {isVerifiedEmail && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-overlay z-30 flex flex-col justify-center items-center">
          <div className="bg-white w-[500px] rounded-md p-8">
            <h4 className="">
              We sent a code to your mail. Please check your mail enter your
              code:
            </h4>
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="p-2 border rounded-md outline-none"
            />
            <button
              type="button"
              className="px-4 py-2 bg-main font-semibold text-white rounded-md ml-4"
              onClick={finalRegister}
            >
              Submit
            </button>
          </div>
        </div>
      )}
      {isForgotPassword && (
        <div className="absolute animate-slice-right top-0 left-0 bottom-0 right-0 z-30 flex-col bg-white flex items-center py-8">
          <div className="flex flex-col gap-4">
            <label htmlFor="email">Enter your email:</label>
            <input
              type="text"
              id="email"
              placeholder="Exp: email@gmail.com"
              className="w-[800px] pb-2 border-b outline-none placeholder:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex items-center justify-end w-full gap-4">
              <Button
                name="Submit"
                handleOnClick={handleForgotPassword}
                style="px-4 py-2 rounded-md text-white bg-main text-semibold my-2"
              />
              <Button
                name="Back"
                handleOnClick={() => setIsForgotPassword(false)}
                style="px-4 py-2 rounded-md text-white bg-blue-500 text-semibold my-2"
              />
            </div>
          </div>
        </div>
      )}
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
            <div className="flex items-center gap-2">
              <InputField
                value={payload.firstname}
                setValue={setPayload}
                nameKey="firstname"
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
              />
              <InputField
                value={payload.lastname}
                setValue={setPayload}
                nameKey="lastname"
                invalidFields={invalidFields}
                setInvalidFields={setInvalidFields}
              />
            </div>
          )}
          <InputField
            value={payload.email}
            setValue={setPayload}
            nameKey="email"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          {isRegister && (
            <InputField
              value={payload.mobile}
              setValue={setPayload}
              nameKey="mobile"
              invalidFields={invalidFields}
              setInvalidFields={setInvalidFields}
            />
          )}
          <InputField
            value={payload.password}
            setValue={setPayload}
            nameKey="password"
            type="password"
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
          />
          <Button
            name={isRegister ? "Register" : "Login"}
            fw
            handleOnClick={handleSubmit}
          />
          <div className="flex items-center justify-between my-2 w-full text-sm">
            {!isRegister && (
              <span
                onClick={() => setIsForgotPassword(true)}
                className="text-blue-500 hover:underline cursor-pointer"
              >
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
