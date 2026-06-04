import { useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { ArrowLeft } from "lucide-react";
const Otp = () => {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = searchParams.get("email");
  const type = searchParams.get("type");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [cooldown, setCooldown] = useState(0);

  const inputRefs = useRef([]);


  const handleChange = (value, index) => {

    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };


  const handleBackspace = (e, index) => {

    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // =====================
  // Verify OTP
  // =====================
  const handleVerifyOtp = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);
      setErrorMessage("");

      const enteredOtp = otp.join("");

      if (enteredOtp.length < 6) {
        setErrorMessage("Please enter full OTP code");
        return;
      }

      const endpoint =
        type === "reset"
          ? "/auth/verifyResetOTP"
          : "/auth/verify";

      await API.post(endpoint, {
        email,
        otp: enteredOtp,
      });

      setSuccessMessage("OTP verified successfully");

      setTimeout(() => {

        if (type === "reset") {
          navigate(`/resetPassword?email=${email}`);
        } else {
          navigate("/login");
        }

      }, 1500);

    } catch (error) {

      setErrorMessage(
        error.response?.data?.message || "Invalid OTP"
      );

    } finally {
      setLoading(false);
    }
  };

  // =====================
  // Resend OTP (ANTI SPAM)
  // =====================
  const handleResendOtp = async () => {

    if (cooldown > 0) return;

    try {

      setErrorMessage("");
      setSuccessMessage("");

      await API.post("/auth/resend-otp", {email,type});
      setSuccessMessage("OTP sent successfully");

      setCooldown(30);

      const interval = setInterval(() => {

        setCooldown((prev) => {

          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }

          return prev - 1;

        });

      }, 1000);

    } catch (error) {

      setErrorMessage(
        error.response?.data?.message || "Failed to resend OTP"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#020817] text-white flex flex-col">

      <div className="w-full px-8 py-6 flex items-center">

        <button
          onClick={() =>
            navigate(type === "reset" ? "/forgetPassword" : "/register")
          }
          className="flex items-center gap-2 text-[#C6A15B] text-sm font-medium px-4 py-2 rounded-xl hover:bg-white hover:text-black transition-all duration-300">
        <ArrowLeft size={20} strokeWidth={2.5} />

          Back
        </button>

      </div>

      <div className="flex-1 flex items-center justify-center px-4">

        <div className="w-full max-w-md rounded-3xl border border-[#C6A15B]/20 bg-white/5 backdrop-blur-sm p-8 shadow-2xl">

          {/* Title */}
          <div className="text-center mb-8">

            <h1 className="text-3xl font-semibold mb-3">

              {type === "reset"
                ? "Verify Reset Code"
                : "Verify Your Email"}

            </h1>

            <p className="text-gray-400 text-sm">
              Enter the 6-digit code sent to
            </p>

            <p className="text-[#C6A15B] text-sm mt-2">
              {email}
            </p>

          </div>

          {/* Error */}
          {errorMessage && (
            <div className="mb-4 text-red-400 text-sm text-center">
              {errorMessage}
            </div>
          )}

          {/* Success */}
          {successMessage && (
            <div className="mb-4 text-green-400 text-sm text-center">
              {successMessage}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleVerifyOtp}>

            {/* OTP Inputs */}
            <div className="flex justify-center gap-3 mb-8">

              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) =>
                    handleChange(e.target.value, index)
                  }
                  onKeyDown={(e) =>
                    handleBackspace(e, index)
                  }
                  className="w-12 h-14 text-center text-lg bg-[#0B1120] border border-white/10 rounded-xl outline-none focus:border-[#C6A15B]"
                />
              ))}

            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#C6A15B] text-black font-semibold rounded-xl hover:bg-[#D4AF37] disabled:opacity-50 transition"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

          </form>

          {/* Resend */}
          <p className="text-center text-sm text-gray-400 mt-6">

            Didn't receive code?{" "}

            <span
              onClick={cooldown > 0 ? null : handleResendOtp}
              className={`text-[#C6A15B] cursor-pointer transition ${
                cooldown > 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:text-[#D4AF37]"
              }`}
            >
              {cooldown > 0
                ? `Resend in ${cooldown}s`
                : "Resend OTP"}
            </span>

          </p>

        </div>

      </div>
    </div>
  );
};

export default Otp;