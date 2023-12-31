import React from "react";
import Agent from "./Agent";
import { useStore } from "./../state/store";
import { CircularProgress } from "@mui/material";
import "./DataView.scss";
import { shallow } from "zustand/shallow";
import NavBar from "./NavBar";

export default function DataView() {
  const [isValid, getAgents] = useStore(
    (state) => [state.isSelectionValid, state.getAgents],
    shallow
  );
  const [loading] = useStore((state) => [state.loading], shallow);
  const valid = isValid();
  const agents = getAgents();

  return (
    <div>
      <NavBar></NavBar>
      {/*<Button onClick={() => { navigate("/") }}>Return</Button>*/}
      <div className="DataView">
        {loading ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              justifyItems: "center",
            }}
          >
            <CircularProgress></CircularProgress>
          </div>
        ) : (
          <>
            {!valid ? (
              <>
                {/*

                <Agent
                  num_agents={agents.length + 1}
                  key="orchestrationAgent"
                  agent={{ id: "" }}
                  isOrchestration={true}
                ></Agent>
                */}
                {agents.map((agent, idx) => {
                  return (
                    <Agent
                      num_agents={agents.length + 1}
                      key={agent.id}
                      agent={{ id: "" }}
                      isOrchestration={false}
                    ></Agent>
                  );
                })}
              </>
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
                  justifyItems: "center",
                }}
              ></div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
