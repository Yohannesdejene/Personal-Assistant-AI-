import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AIAssist",
  description: "Login to AIAssist",
};
import LoginForm from "@/components/auth/login";

const Login = () => {
  return (
    <div className="bg-white ">
      <main className="gradient-primary h-screen text-white  overflow-y-auto font-sans flex items-center   ">
        <LoginForm />
      </main>
    </div>
  );
};
export default Login;
