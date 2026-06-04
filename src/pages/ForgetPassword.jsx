import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Mail } from "lucide-react";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import API from '../api/axios';

const ForgetPassword = () => {

  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({

    initialValues: {
      email: ''
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
    }),

    onSubmit: async (values) => {

      try {

        setServerError("");

        await API.post('/auth/forgetPassword', values);

        navigate(`/verifyOtp?email=${values.email}&type=reset`);
      } catch (error) {

        setServerError(
          error.response?.data?.message || "Something went wrong"
        );

      }

    }

  });

  return (

    <div className="min-h-screen bg-[#020817] text-white flex flex-col">

      <div className="w-full px-8 py-6">

        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 text-[#C6A15B] text-sm font-medium px-4 py-2 rounded-xl hover:bg-white hover:text-black transition-all duration-300"
        >

          <ArrowLeft size={20} strokeWidth={2.5} />

          Back to Login

        </button>

      </div>

      <div className="flex-1 flex items-center justify-center px-4">

        <div className="w-full max-w-md bg-white/3 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-2xl">

          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#C6A15B]/20 flex items-center justify-center">

            <Mail className="text-[#C6A15B]" size={30} />

          </div>

          <h1 className="text-3xl font-bold text-center mb-3">
            Forgot Password?
          </h1>

          <p className="text-gray-400 text-center text-sm mb-8 leading-relaxed">
            Enter your email address and we'll send you a verification code to reset your password.
          </p>

          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-4"
          >

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#C6A15B] focus:ring-2 focus:ring-[#C6A15B]/30 transition-all"
            />

            {formik.touched.email && formik.errors.email && (

              <p className="text-red-400 text-sm">
                {formik.errors.email}
              </p>

            )}

            {serverError && (

              <p className="text-red-400 text-sm">
                {serverError}
              </p>

            )}

            <button
              type="submit"
              className="w-full bg-[#C6A15B] text-black font-semibold py-3 rounded-xl hover:scale-[1.02] active:scale-[0.98] hover:bg-[#d4b06a] transition-all duration-300"
            >

              Send OTP

            </button>

          </form>

        </div>

      </div>

    </div>

  )
}

export default ForgetPassword