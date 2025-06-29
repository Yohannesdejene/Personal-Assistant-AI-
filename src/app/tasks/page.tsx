import type { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Header from "@/components/Layouts/Header";
import ChatLayout from "@/components/Layouts/ChatLayout";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "AIAssist",
  description: "Ai based assistant",
};

const Dashboard = () => {
  return (
    <div className=" border-0 ">
      <SidebarProvider className=" border-0 ">
        <DefaultLayout>
          <></>
        </DefaultLayout>
        <div className="  w-full">
          <ChatLayout />
          <div></div>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Dashboard;
