import useAuth from "@/features/auth/hooks/useAuth";
import { EnvelopeSimple, UserCircle } from "@phosphor-icons/react/dist/ssr";
import { FormEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Login = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLoading, requestOtp, login, loginAsGuest } = useAuth();
  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const [otp, setOtp] = useState("");
  const isOtpRequested = !!searchParams.get("otp") ?? false;

  const submitRequestOtp = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchParams.set("email", email);
    searchParams.set("otp", "true");
    setSearchParams(searchParams);
    requestOtp(email);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-50 p-4">
      <div className="flex w-full max-w-md flex-col items-center gap-10 overflow-clip rounded-xl border border-gray-300 bg-white p-4 shadow-lg">
        {!isOtpRequested && (
          <form
            onSubmit={submitRequestOtp}
            className="flex w-full flex-col gap-4"
          >
            <div className="flex w-full flex-col items-center overflow-clip rounded-xl border border-gray-300">
              <div className="text-md relative flex w-full items-center gap-1">
                <label className="absolute left-3 flex items-center gap-1">
                  Email:
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  className="w-full rounded-xl rounded-l-xl bg-gray-50 px-4 py-2 pl-[68px] text-gray-600"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </div>
            <div className="flex w-full flex-col gap-4">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-1 rounded-xl border border-gray-300 p-2 hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-300"
              >
                <EnvelopeSimple size={20} /> Login with Email
              </button>
              <div className="flex w-full justify-center gap-4 font-light">
                <div className="mb-3 w-1/5 border-b border-gray-300"></div>
                <span>OR</span>
                <div className="mb-3 w-1/5 border-b border-gray-300"></div>
              </div>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-1 rounded-xl border border-gray-300 p-2 hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-300"
                onClick={() => loginAsGuest()}
              >
                <UserCircle size={20} /> Login as guest
              </button>
            </div>
          </form>
        )}
        {isOtpRequested && (
          <div className="flex w-full flex-col gap-4">
            <div className="flex w-full flex-col items-center overflow-clip rounded-xl border border-gray-300">
              <div className="text-md relative flex w-full items-center gap-1">
                <label className="absolute left-3 flex items-center gap-1">
                  OTP:
                </label>
                <input
                  name="otp"
                  type="text"
                  placeholder="Confirm OTP"
                  value={otp}
                  className="w-full rounded-xl rounded-l-xl bg-gray-50 px-4 py-2 pl-[68px] text-gray-600"
                  onChange={(event) => setOtp(event.target.value)}
                />
              </div>
            </div>
            <button
              onClick={() => requestOtp(email)}
              className="flex w-full items-center justify-center gap-1 rounded-xl border border-gray-300 p-2 hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-300"
            >
              Resend
            </button>
            <button
              onClick={() => login(email, otp)}
              className="flex w-full items-center justify-center gap-1 rounded-xl border border-gray-300 p-2 hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-300"
            >
              Submit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
