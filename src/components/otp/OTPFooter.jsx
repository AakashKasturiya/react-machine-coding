export const OTPFooter = ({countDown, resendOtpHandler}) => {
    console.log(countDown)
  return (
    <>
      <div className="mt-6 text-center">
        <p className="text-sm text-slate-500">Didn't receive the code?</p>

        <div className="my-2 flex items-end justify-end">
          {countDown === 0 && (
            <button
              className="text-sm text-indigo-600 font-medium cursor-pointer"
              onClick={resendOtpHandler}
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </>
  );
};
