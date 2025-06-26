import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AIAssist",
  description: "Register to AIAssist",
};
import SignupFrom from "@/components/auth/register";

const Login = () => {
  return (
    <div className="bg-white ">
      <main className="gradient-primary h-screen text-white  overflow-y-auto font-sans flex items-center   ">
        <SignupFrom />
      </main>
    </div>
  );
};
export default Login;
