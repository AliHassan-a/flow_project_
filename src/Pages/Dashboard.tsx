import React from "react";
import Layout from "../Layouts/Layout";
import Header from "../components/Dashboard/Header/Header";
import MainSection from "../components/Dashboard/Main/MainSection";
import { MyContextProvider } from "../hooks/DashboardContext";
import NewMainSection from "../components/Dashboard/Main/NewMainSection";

export default function Dashboard() {
  return (
    <MyContextProvider>
      <Layout>
        {/* <div><MainSection /></div> */}
        <div>
          <NewMainSection />
        </div>
      </Layout>
    </MyContextProvider>
  );
}
