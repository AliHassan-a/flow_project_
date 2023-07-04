import React, { useEffect } from "react";
import { useStore } from "./../state/store";
import LeanMessage from "./LeanMessage";
import "./Agent.scss";
import {
  AgentSchema,
  FlowAgentSchema,
  FlowMessageSchema,
  MessageSchema,
} from "../state/interfaces";
import { shallow } from "zustand/shallow";
import { Chip, IconButton, Paper, Tooltip, Typography } from "@mui/material";
import { Resizable } from "re-resizable";
import { get } from "http";
import { QuestionAnswer } from "@mui/icons-material";
import { darkTheme } from "../App";

export interface AgentProps {
  num_agents: number;
  agent: FlowAgentSchema;
  isOrchestration: boolean;
}
export default function Agent(props: AgentProps) {
  const agent = props.agent;
  const [getMessagesAndConversations] = useStore(
    (state) => [state.getMessagesAndConversations],
    shallow
  );
  const messagesAndConversations = getMessagesAndConversations();

  return (
    <Resizable
      key={agent.id + props.num_agents.toString()}
      defaultSize={{
        width: (99 / props.num_agents).toString() + "vw",
        height: "100%",
      }}
      minWidth="700px"
      enable={{
        top: false,
        right: true,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
    >
      <div
        className="agent"
        style={{
          borderColor: darkTheme.palette.text.disabled,
          border: "1px solid",
          borderRadius: "10px",
          margin: "5px",
          padding: "5px",
        }}
      >
        <div className="agentHeader">
          <Typography variant="h5" sx={{ marginTop: "10px" }}>
            {"# "}
            {props.isOrchestration ? "Flow" : agent.id}
          </Typography>
        </div>
        <div className="agentContent">
          {messagesAndConversations.map((messageOrConv, idx) => {
            let agent_owns_conversation = false;
            if (messageOrConv.content.flow_runner) {
              agent_owns_conversation =
                messageOrConv.content.flow_runner == agent.id;
            }

            if (props.isOrchestration) {
              if (!messageOrConv.content.flow_run_id) {
                agent_owns_conversation = true;
              }
            }
            if (messageOrConv.type == "message") {
              const message: FlowMessageSchema =
                messageOrConv.content as FlowMessageSchema;
              // check if this message occurs in a conversation owned by this agent
              // currently the code is a bit convoluted
              // ToDo: maybe change the type of state.conversations from array to dict
              // then we can immediately look up the conversation of this message, instead of looping

              return (
                <LeanMessage
                  key={agent.id + message.message_id + message.message_index}
                  agent={agent}
                  message={message}
                  agent_owns_conversation={agent_owns_conversation}
                ></LeanMessage>
              );
            } else {
              return (
                <div
                  key={idx}
                  style={{
                    margin: "10px",
                    visibility: agent_owns_conversation ? undefined : "hidden",
                  }}
                >
                  <Chip label={"New conversation"}></Chip>

                  <Tooltip title={messageOrConv.content.toString()}>
                    <IconButton
                      onClick={() => {
                        navigator.clipboard.writeText(
                          messageOrConv.content.toString() ?? ""
                        );
                      }}
                    >
                      <QuestionAnswer />
                    </IconButton>
                  </Tooltip>
                </div>
              );
            }
          })}
        </div>
      </div>
    </Resizable>
  );
}
