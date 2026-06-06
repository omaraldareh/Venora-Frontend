import { ArrowLeft, User, Mail, Lock, Phone, MapPin, ArrowRight } from 'lucide-react';
import heroImg from "../assets/images/hero-bg.png";
import API from '../api/axios'; 
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useSearchParams } from "react-router-dom";

const Register = () => {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");
  const navigate = useNavigate();

const formik = useFormik({
  initialValues: {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: ''
  },

  validationSchema: Yup.object({
    name: Yup.string().required('Name is required'),

    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),

    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required'),

    phone: Yup.string()
      .matches(/^07[789]\d{7}$/, "Phone number must be valid Jordanian number")
      .required('Phone number is required'),

    address: Yup.string()
      .required('Address is required'),
  }),


// ✅ الصح: انتبه للأقواس { } حول الـ Helpers
onSubmit: async (values, { setSubmitting, setFieldError }) => {
  try {
    const response = await API.post('/auth/register', { ...values, role });

    console.log(response.data);
    alert('OTP Sent Successfully');
    navigate(`/verifyOtp?email=${values.email}&type=register`);

  } catch (error) {
    console.log(error.response?.data);
    
    const serverMessage = error.response?.data?.message || "";
    
    if (serverMessage.toLowerCase().includes("email") || error.response?.status === 400) {
      setFieldError('email', 'This email is already registered.');
    } else {
      alert(serverMessage || 'Something went wrong. Please try again.');
    }
  } finally {
    setSubmitting(false);
  }
}});

  return (
    <div className="min-h-screen w-full bg-[#030712] flex items-stretch text-white font-sans">
      
      <div className="hidden lg:flex flex-1 relative items-center justify-center p-12 overflow-hidden">
        <img 
          src={heroImg} 
          alt="Luxury Hall" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-l from-[#050B17] via-[#050B17]/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-[#050B17]/30 z-10" />

        <div className="relative z-20 max-w-md text-left ml-10">
          <span className="bg-[#D4A353]/20 text-[#D4A353] px-3 py-1 rounded-full text-xs font-semibold border border-[#D4A353]/30 tracking-wide inline-block mb-4">
            ✨ Create Account
          </span>
          <h3 className="text-4xl font-serif text-white leading-tight mb-4">
            Start Your Luxury <br />
            <span className="text-[#D4A353]">Journey With Us</span>
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Join Venuora today to discover exclusive partner benefits, manage seamless event bookings, and unlock the finest venues in Jordan.
          </p>
        </div>
      </div>

      
      <div className="w-full lg:w-[55%] flex flex-col justify-between p-8 md:p-12 bg-[#050B17] relative z-10 overflow-y-auto">
        
        <div className="flex items-center justify-between mb-6 lg:mb-0">
          <a href="/" className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#D4A353] transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Home
          </a>
          <span className="text-xs text-gray-500 font-mono">VENUORA Premium</span>
        </div>

        <div className="w-full max-w-xl mx-auto my-auto py-6">
          <h2 className="text-3xl font-serif text-white mb-2">Get Started</h2>
          <p className="text-gray-400 text-sm mb-8">
            Create your premium account to explore and secure unforgettable venues.
          </p>

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

    {/* Name */}
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
        Full Name
      </label>

      <div className="relative flex items-center">
        <User className="absolute left-4 text-gray-500 w-4 h-4" />

        <input
          type="text"
          name="name"
          placeholder="John Doe"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full bg-[#0B1426] border outline-none rounded-xl pl-11 pr-4 py-3 text-sm font-medium text-white transition-all placeholder:text-gray-600
          ${
            formik.touched.name && formik.errors.name
              ? "border-red-500"
              : "border-white/10 focus:border-[#D4A353]"
          }`}
        />
      </div>

      {formik.touched.name && formik.errors.name && (
        <p className="text-red-500 text-xs mt-1">
          {formik.errors.name}
        </p>
      )}
    </div>

    {/* Email */}
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
        Email Address
      </label>

      <div className="relative flex items-center">
        <Mail className="absolute left-4 text-gray-500 w-4 h-4" />

        <input
          type="email"
          name="email"
          placeholder="name@example.com"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full bg-[#0B1426] border outline-none rounded-xl pl-11 pr-4 py-3 text-sm font-medium text-white transition-all placeholder:text-gray-600
          ${
            formik.touched.email && formik.errors.email
              ? "border-red-500"
              : "border-white/10 focus:border-[#D4A353]"
          }`}
        />
      </div>

      {formik.touched.email && formik.errors.email && (
        <p className="text-red-500 text-xs mt-1">
          {formik.errors.email}
        </p>
      )}
    </div>

    {/* Password */}
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
        Password
      </label>

      <div className="relative flex items-center">
        <Lock className="absolute left-4 text-gray-500 w-4 h-4" />

        <input
          type="password"
          name="password"
          placeholder="••••••••"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full bg-[#0B1426] border outline-none rounded-xl pl-11 pr-4 py-3 text-sm font-medium text-white transition-all placeholder:text-gray-600
          ${
            formik.touched.password && formik.errors.password
              ? "border-red-500"
              : "border-white/10 focus:border-[#D4A353]"
          }`}
        />
      </div>

      {formik.touched.password && formik.errors.password && (
        <p className="text-red-500 text-xs mt-1">
          {formik.errors.password}
        </p>
      )}
    </div>

    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
        Confirm Password
      </label>

      <div className="relative flex items-center">
        <Lock className="absolute left-4 text-gray-500 w-4 h-4" />

        <input
          type="password"
          name="confirmPassword"
          placeholder="••••••••"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full bg-[#0B1426] border outline-none rounded-xl pl-11 pr-4 py-3 text-sm font-medium text-white transition-all placeholder:text-gray-600
          ${
            formik.touched.confirmPassword &&
            formik.errors.confirmPassword
              ? "border-red-500"
              : "border-white/10 focus:border-[#D4A353]"
          }`}
        />
      </div>

      {formik.touched.confirmPassword &&
        formik.errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">
            {formik.errors.confirmPassword}
          </p>
        )}
    </div>

    {/* Phone */}
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
        Phone Number
      </label>

      <div className="relative flex items-center">
        <Phone className="absolute left-4 text-gray-500 w-4 h-4" />

        <input
          type="text"
          name="phone"
          placeholder="0791234567"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full bg-[#0B1426] border outline-none rounded-xl pl-11 pr-4 py-3 text-sm font-medium text-white transition-all placeholder:text-gray-600
          ${
            formik.touched.phone && formik.errors.phone
              ? "border-red-500"
              : "border-white/10 focus:border-[#D4A353]"
          }`}
        />
      </div>

      {formik.touched.phone && formik.errors.phone && (
        <p className="text-red-500 text-xs mt-1">
          {formik.errors.phone}
        </p>
      )}
    </div>

    {/* Address */}
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
        Address
      </label>

      <div className="relative flex items-center">
        <MapPin className="absolute left-4 text-gray-500 w-4 h-4" />

        <input
          type="text"
          name="address"
          placeholder="Amman, Jordan"
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`w-full bg-[#0B1426] border outline-none rounded-xl pl-11 pr-4 py-3 text-sm font-medium text-white transition-all placeholder:text-gray-600
          ${
            formik.touched.address && formik.errors.address
              ? "border-red-500"
              : "border-white/10 focus:border-[#D4A353]"
          }`}
        />
      </div>

      {formik.touched.address && formik.errors.address && (
        <p className="text-red-500 text-xs mt-1">
          {formik.errors.address}
        </p>
      )}
    </div>

  </div>

  <button
    type="submit"
    disabled={formik.isSubmitting ||!formik.isValid ||!formik.dirty}
    className="group mt-3 bg-[#D4A353] hover:bg-[#b88d45] disabled:opacity-50 disabled:cursor-not-allowed text-white py-4 rounded-xl font-bold text-sm shadow-lg shadow-[#D4A353]/10 transition-all duration-300 flex items-center justify-center gap-2 w-full"
  >
    Create Your Account

    <ArrowRight
      size={16}
      className="group-hover:translate-x-0.5 transition-transform"
    />
  </button>
</form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Already have an account?{' '}
            <a href="/login" className="text-[#D4A353] font-semibold hover:underline">
              Sign In
            </a>
          </p>
        </div>

        <div className="text-center text-xs text-gray-600 mt-6 lg:mt-0">
          &copy; {new Date().getFullYear()} Venuora. Luxury Experiences.
        </div>
      </div>

    </div>
  );
};

export default Register;