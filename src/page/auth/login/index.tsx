import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { AuthService } from "../../../service/auth-service";
import Button from "../../../shared-components/Button";
import InputText from "../../../shared-components/input-field/InputText";
import { AppDispatch } from "../../../store/store";
import { schema } from "./schema";
import { LoginFormType, LoginResponseType } from "./type";
import { setToken } from "../../../store/slice/auth/authSlice";

const defaultValues = {
  email: "",
  password: "",
};

declare global {
  interface Window {
    recaptchaVerifier: any;
  }
}

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(false);

  const { signInWithGoogle } = new AuthService();

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<LoginFormType>({
    defaultValues,
    resolver: zodResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit = (data: LoginFormType) => {
    if (data) {
      console.log(data);
      onLoginSetToken("asdkflasflkakfaskfafkasfjalksfjlakfjsalkfj");
    }
  };

  const onLoginSetToken = (token: string | number | null) => dispatch(setToken(token));

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const response = (await signInWithGoogle()) as LoginResponseType;
      const token = response.user.stsTokenManager.accessToken;
      onLoginSetToken(token);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubLogin = () => {
    // Redirect to GitHub OAuth page
    window.location.href = "https://github.com/login/oauth/authorize?client_id=YOUR_GITHUB_CLIENT_ID";
  };

  useEffect(() => {
    setValue("email", "admin@gmail.com");
    setValue("password", "admin@123456");
  }, []);

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 overflow-x-hidden">
        {/* Container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        >
          {/* Title */}
          <motion.h1
            className="text-2xl font-semibold text-center text-gray-800 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Welcome Back!
          </motion.h1>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <InputText field={field} type="email" label="Email" placeholder="Enter your email" error={errors} />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <InputText
                  field={field}
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
                  error={errors}
                />
              )}
            />
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Login
            </button>
          </form>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-5 mt-5">
            <div>
              <Button
                onClick={handleGoogleSignIn}
                label="Google"
                className="bg-red-700 hover:bg-red-900 focus:outline-none focus:ring focus:ring-gray-600"
                icon={<FaGoogle className="mr-2" />}
              />
            </div>
            <div>
              <Button
                onClick={() => console.log("github")}
                label="GitHub"
                className="bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring focus:ring-gray-600"
                icon={<FaGithub className="mr-2" />}
              />
            </div>
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-4 text-center text-sm text-gray-600"
          >
            Don’t have an account?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </motion.div>
        </motion.div>
      </div>
      <div id="recaptcha-container"></div>
    </>
  );
};

export default Login;
