export const OTPHeader = () => {
  return (
    <>
      <header className="bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-10 text-center">
        <div className="h-16 w-16 mx-auto rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
          <i className="ri-shield-keyhole-line text-3xl text-white"></i>
        </div>

        <h1 className="mt-5 text-3xl font-bold text-white">
          Verify Your Account
        </h1>

        <p className="mt-2 text-indigo-100 text-sm">
          Enter the verification code sent to your email address
        </p>
      </header>
    </>
  );
};
