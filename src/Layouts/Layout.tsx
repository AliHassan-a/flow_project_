import React from "react";
import Header from "../components/Dashboard/Header/Header";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import { styled } from "@mui/system";
const FlexDiv = styled("div")({
  display: "flex",
});

const Layout = (props: any) => {
  return (
    <div
    // style={{ overflowY: "hidden" }}
    >
      <Header />
      <FlexDiv>
        <Sidebar />
        <div
          style={{
            backgroundColor: "#25293C",
            height: "88vh",
            padding: "15px",
            overflowY: "auto",
            width: "80%",
          }}
        >
          {props.children}
        </div>
      </FlexDiv>
    </div>
  );
};

export default Layout;
