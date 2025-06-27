"use client";
import React, { useState, ReactNode } from "react";
import { AppSidebar } from "@/components/Sidebar/index";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftIcon } from "lucide-react";

import Header from "@/components/Header";
export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className=" flex  ">
        {/* <!-- ===== Sidebar Start ===== --> */}
        {/* <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
        <AppSidebar />
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </>
  );
}
