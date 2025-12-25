import FormOtp from "@/src/components/auth/FormOtp";
import LoginWithGoogle from "@/src/components/auth/LoginWithGoogle";

export default function AuthPage() {
  const isOtpSent = false;
  return (
    <main className="h-dvh w-full px-6 py-4">
      <div className="bg-lightblue-500 -z-10 w-400 h-400 aspect-square fixed -top-330 -right-130 rounded-full"></div>
      <h1 className="text-white text-4xl font-bold mt-10">
        <span className="text-blue-900">Login</span> or{" "}
        <span className="text-neutral-800">SignUp</span>
      </h1>

      {isOtpSent ? <FormOtp /> : <LoginWithGoogle />}
    </main>
  );
}
