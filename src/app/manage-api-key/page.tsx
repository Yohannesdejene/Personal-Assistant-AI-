import type { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Header from "@/components/Layouts/Header";
import ChatLayout from "@/components/Layouts/ChatLayout";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import ApiKeyManagementPage from "@/components/manageApiKey/index";
import NormalHeader from "@/components/NormalHeader";
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
        <div className="  w-full  bg-primary  ">
          <div className=" md-hidden lg-hidden">
            <NormalHeader />
          </div>
          <ApiKeyManagementPage />
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Dashboard;
