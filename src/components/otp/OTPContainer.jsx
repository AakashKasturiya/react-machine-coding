import { useEffect, useRef, useState } from "react";
import { OTPFooter } from "./OTPFooter";
import { OTPHeader } from "./OTPHeader";

export const OTPContainer = () => {
  //correctOTP = "123456";

  const correctOTP = "123456";

  // ------------------------------------
  // Input References
  // Used for auto-focus and navigation
  // ------------------------------------
  const inputRefs = useRef([]);

  // ------------------------------------
  // OTP State Management
  // Stores all OTP digits
  // Example: ["1","2","3","","",""]
  // ------------------------------------
  const [otp, setOtp] = useState(new Array(6).fill(""));

  // ------------------------------------
  // Validation Error State
  // Highlights invalid input field
  // ------------------------------------

  const [errorIndex, setErrorIndex] = useState(null);

  const [countDown, setCountDown] = useState(30);

  const [status, setStatus] = useState(null);

  // ------------------------------------
  // Feature 1:
  // Number-only validation
  // Auto focus next input
  // OTP state update
  const handleChange = (e, index) => {
    setStatus(null);
    const value = e.target.value;

    if (!/^\d*$/.test(value)) {
      setErrorIndex(index);

      setTimeout(() => {
        setErrorIndex(null);
      }, 1500);

      return;
    }

    setErrorIndex(null);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // ------------------------------------
  // Feature 2:
  // Backspace Navigation
  // Move to previous input
  // Remove previous digit
  // ------------------------------------
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];

      if (otp[index] !== "") {
        newOtp[index] = "";
        setOtp(newOtp);
        return;
      }

      if (index > 0) {
        inputRefs.current[index - 1]?.focus();

        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  // ------------------------------------
  // Feature 3:
  // Paste OTP Support
  // Example: 123456
  // Auto-fill all inputs
  // ------------------------------------
  const handlePaste = (e) => {
    e.preventDefault();

    const pastedData = e.clipboardData.getData("text");

    /**Step 3: Validation*/
    if (!/^\d+$/.test(pastedData)) {
      return;
    }

    /**Step 4: Split */
    const otpArray = pastedData.slice(0, otp.length).split("");

    /**Step 5: Update Statex     */

    const newOtp = [...otp];

    otpArray.forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);

    /**Step 6: Move Focus */
    const lastIndex = Math.min(otpArray.length - 1, otp.length - 1);

    inputRefs.current[lastIndex]?.focus();
  };

  // ------------------------------------
  // Feature 4:
  // OTP Completion Detection
  // Enable Verify Button
  // ------------------------------------
  const isOtpComplete = otp.every((digit) => digit !== "");

  // Feature 5: Resend OTP in 30s

  useEffect(() => {
    if (countDown === 0 || status === "success") return;

    const timer = setInterval(() => {
      setCountDown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [countDown, status]);

  const verifyOTPHandler = () => {
    const enteredOTP = otp.join("");

    if (enteredOTP === correctOTP) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  };

  const resendOTPHandler = () => {
    setOtp(new Array(6).fill(""));
    inputRefs.current[0]?.focus();
    setCountDown(30);
    setStatus(null);
  };
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-indigo-100 flex items-center justify-center p-6">
      <section className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <OTPHeader />
        {/* Body */}
        <div className="px-8 py-10">
          <div className="flex justify-center gap-3">
            {Array.from({ length: 6 }, (_, index) => (
              <input
                key={index}
                type="text"
                value={otp[index]}
                maxLength={1}
                ref={(element) => (inputRefs.current[index] = element)}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className={`
            w-14 h-14 rounded-2xl
            border-2 text-center text-2xl font-bold
            transition-all outline-none
            ${
              errorIndex === index
                ? "border-red-500 ring-4 ring-red-100"
                : "border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            }
            `}
              />
            ))}
          </div>
          {errorIndex !== null && (
            <p className="text-red-500 text-sm my-2 text-center animate-pulse">
              OTP can contain only numeric digits (0-9)
            </p>
          )}
          {status !== "success" && countDown > 0 && (
            <div className="my-2 flex items-end justify-end">
              <p className="text-sm text-red-400">Resend OTP in {countDown}s</p>
            </div>
          )}

          <button
            onClick={verifyOTPHandler}
            disabled={!isOtpComplete}
            className={`
         mt-8 w-full py-4 rounded-2xl
         text-white font-semibold transition-all
         ${
           isOtpComplete
             ? "bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
             : "bg-slate-400 cursor-not-allowed"
         }
         `}
          >
            Verify OTP 🚀
          </button>
          {status === "success" && (
            <div className="mt-4 rounded-xl bg-green-50 border border-green-200 p-4">
              <p className="text-green-700 font-medium text-center">
                ✅ OTP Verified Successfully
              </p>
            </div>
          )}

          {status === "error" && (
            <p className="text-red-600 text-center mt-3 font-medium">
              ❌ Invalid OTP. Please try again.
            </p>
          )}
          <OTPFooter
            countDown={countDown}
            resendOtpHandler={resendOTPHandler}
          />
        </div>
      </section>
    </main>
  );
};
