import type { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "AIAssist",
  description: "Ai based assistant",
};

const Dashboard = () => {
  return (
    <div className="gradient-primary">
      <SidebarProvider className="">
        <DefaultLayout>
          <div>
            <div></div>
          </div>
        </DefaultLayout>
      </SidebarProvider>
    </div>
  );
};

export default Dashboard;
