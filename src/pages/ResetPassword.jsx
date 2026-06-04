import { ArrowLeft } from "lucide-react";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";
import API from "../api/axios";
import Swal from 'sweetalert2';
import { useState, useEffect } from "react";

const ResetPassword = () => {

  const [servererror, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");

  useEffect(() => {
    if (!email) {
      navigate('/forgetPassword');
    }
  }, [email, navigate]);

  const formik = useFormik({

    initialValues: {
      password: '',
      confirmPassword: ''
    },

    validationSchema: Yup.object({

      password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),

      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required')

    }),

    onSubmit: async (values) => {

      try {

        setLoading(true);
        setServerError('');

        await API.post('/auth/resetPassword', {
          ...values,
          email
        });

        Swal.fire({
          icon: 'success',
          title: 'Password Reset Successful',
          text: 'Your password has been updated successfully.',
          background: '#0B1120',
          color: '#fff',
          confirmButtonColor: '#C6A15B',
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
          customClass: {
            popup: 'rounded-3xl border border-[#C6A15B]/20 shadow-2xl',
            title: 'text-2xl font-semibold',
            htmlContainer: 'text-sm text-gray-300',
          }
        });

        setTimeout(() => {

          navigate('/login', {
            state: {
              successMessage: 'Password reset successfully'
            }
          });

        }, 2000);

      } catch (error) {

        setServerError(
          error.response?.data?.message || "Something went wrong"
        );

      } finally {

        setLoading(false);

      }
    }
  });

  return (
    <div className="min-h-screen bg-[#020817] text-white flex flex-col">

      <div className="w-full px-8 py-6 flex items-center">

        <button onClick={() => navigate("/login")} className="flex items-center gap-2 text-[#C6A15B] text-sm font-medium px-4 py-2 rounded-xl hover:bg-white hover:text-black transition-all duration-300">

          <ArrowLeft size={20} strokeWidth={2.5} />

          Back to Login
        </button>

      </div>

      <div className="flex-1 flex items-center justify-center px-4">

        <div className="w-full max-w-md rounded-3xl border border-[#C6A15B]/20 bg-white/5 backdrop-blur-sm p-8 shadow-2xl">

          <div className="text-center mb-8">

            <h1 className="text-3xl font-semibold mb-3">
              Reset Password
            </h1>

            <p className="text-gray-400 text-sm">
              Create a new secure password for your account
            </p>

          </div>

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">

            <div className="flex flex-col gap-2">

              <label className="text-sm font-medium">
                New Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="New Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="bg-[#0B1120] border border-white/10 p-3 rounded-xl outline-none focus:border-[#C6A15B] focus:ring-2 focus:ring-[#C6A15B]/30 transition-all text-white"
              />

              {
                formik.touched.password &&
                formik.errors.password && (
                  <p className="text-red-400 text-xs">
                    {formik.errors.password}
                  </p>
                )
              }

            </div>

            <div className="flex flex-col gap-2">

              <label className="text-sm font-medium">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="bg-[#0B1120] border border-white/10 p-3 rounded-xl outline-none focus:border-[#C6A15B] focus:ring-2 focus:ring-[#C6A15B]/30 transition-all text-white"
              />

              {
                formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="text-red-400 text-xs">
                    {formik.errors.confirmPassword}
                  </p>
                )
              }

            </div>

            {
              servererror && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center py-3 rounded-xl">
                  {servererror}
                </div>
              )
            }

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 bg-[#C6A15B] text-black font-semibold rounded-xl hover:bg-[#D4AF37] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default ResetPassword;