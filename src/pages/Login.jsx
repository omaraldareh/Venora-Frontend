import {ArrowLeft,Mail,Lock,ArrowRight} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import heroImg from "../assets/images/hero-bg.png";
import API from '../api/axios';
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from 'react';

const Login = () => {

  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({

    initialValues: {
      email: '',
      password: ''
    },

    validationSchema: Yup.object({

      email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),

      password: Yup.string()
        .required("Password is required")

    }),

    onSubmit: async (values) => {

      try {
        setServerError("");

        const response = await API.post(
          '/auth/login',
          values
        );

        const { token, data } = response.data;

        localStorage.setItem("token",token);

        localStorage.setItem("user",JSON.stringify(data));

        if (data.role === "provider") {
          navigate('/provider/dashboard');
        }

        else if (data.role === "user") {
          navigate('/');
        }

        else if (data.role === "admin") {
          navigate('/admin/dashboard');
        }

      } catch (error) {
        setServerError(
          error.response?.data?.message || "Failed to login"
        )
    }
  }
  });

  return (

    <div className="min-h-screen w-full bg-[#030712] flex items-stretch text-white font-sans">

      <div className="w-full lg:w-[45%] flex flex-col justify-between p-8 md:p-12 bg-[#050B17] relative z-10">

        <div className="flex items-center justify-between">

          <a
            href="/"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#D4A353] transition-colors group"
          >

            <ArrowLeft
              size={16}
              className="group-hover:-translate-x-0.5 transition-transform"
            />

            Back to Home
          </a>
        </div>

        {/* Form */}
        <div className="w-full max-w-md mx-auto my-auto py-12">

          <h2 className="text-3xl md:text-4xl font-serif text-white mb-2">
            Welcome Back
          </h2>

          <p className="text-gray-400 text-sm mb-8">
            Login to access your premium venue dashboard and bookings.
          </p>

          <form
            onSubmit={formik.handleSubmit} className="flex flex-col gap-5">

            <div className="flex flex-col gap-2">

              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Email Address
              </label>

              <div className="relative flex items-center">

                <Mail className="absolute left-4 text-gray-500 w-5 h-5" />

                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full bg-[#0B1426] border outline-none rounded-xl pl-12 pr-4 py-3.5 text-sm font-medium text-white transition-all placeholder:text-gray-600
                  ${
                    formik.touched.email &&
                    formik.errors.email
                      ? "border-red-500"
                      : "border-white/10 focus:border-[#D4A353]"
                  }`}
                />
              </div>

              {
                formik.touched.email &&
                formik.errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.email}
                  </p>
                )
              }
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">

              <div className="flex items-center justify-between">

                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Password
                </label>

                <a
                  href="/forgetPassword" className="text-xs text-[#D4A353] hover:underline">
                  Forgot Password?
                </a>
              </div>

              <div className="relative flex items-center">

                <Lock className="absolute left-4 text-gray-500 w-5 h-5" />

                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full bg-[#0B1426] border outline-none rounded-xl pl-12 pr-4 py-3.5 text-sm font-medium text-white transition-all placeholder:text-gray-600
                  ${
                    formik.touched.password &&
                    formik.errors.password
                      ? "border-red-500"
                      : "border-white/10 focus:border-[#D4A353]"
                  }`}
                />
              </div>

              {
                formik.touched.password &&
                formik.errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.password}
                  </p>
                )
              }
            </div>
              {
                serverError && (
                  <div className='bg-red-500/10 border border-red-500/30 text-sm rounded-xl px-4 py-3'>
                    {serverError}
                  </div>
                )
              }
            <button
              type="submit" disabled={formik.isSubmitting ||!formik.isValid ||!formik.dirty}

              className="group mt-2 bg-[#D4A353] hover:bg-[#b88d45] disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-sm shadow-lg shadow-[#D4A353]/10 transition-all duration-300 flex items-center justify-center gap-2 w-full"
            >

              Sign In to Account

              <ArrowRight
                size={16}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </button>

          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-400 mt-8">

            Don't have an account?{" "}

            <a
              href="/choose-register"
              className="text-[#D4A353] font-semibold hover:underline"
            >
              Create an account
            </a>
          </p>
        </div>

        {/* Bottom */}
        <div className="text-center text-xs text-gray-600">
          &copy; {new Date().getFullYear()} Venuora. Luxury Experiences.
        </div>
      </div>

      {/* Right Side */}
      <div className="hidden lg:flex flex-1 relative items-center justify-center p-12 overflow-hidden">

        <img
          src={heroImg}
          alt="Luxury Ambience"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-r from-[#050B17] via-[#050B17]/40 to-transparent z-10" />

        <div className="absolute inset-0 bg-[#050B17]/30 z-10" />

        <div className="relative z-20 max-w-md text-left mr-auto">

          <span className="bg-[#D4A353]/20 text-[#D4A353] px-3 py-1 rounded-full text-xs font-semibold border border-[#D4A353]/30 tracking-wide inline-block mb-4">
            ✨ Premium Access
          </span>

          <h3 className="text-4xl font-serif text-white leading-tight mb-4">
            Manage Your Moments <br />

            <span className="text-[#D4A353]">
              Seamlessly
            </span>
          </h3>

          <p className="text-gray-300 text-sm leading-relaxed">
            Connect with premium vendors, track your event countdowns, and explore world-class venues handpicked for your unique celebrations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;