import React, { useState } from "react";
import { FlowAgentSchema, FlowMessageSchema } from "../state/interfaces";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  IconButton,
  Modal,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import "./Message.scss";
import { useStore } from "../state/store";
import { darkTheme } from "./../App";
import {
  AddOutlined,
  ChatBubble,
  DataArrayOutlined,
  ExpandMoreOutlined,
} from "@mui/icons-material";
import { shallow } from "zustand/shallow";
import DataModal from "./DataModal";
export interface MessageProps {
  agent_owns_conversation: boolean; //
  created_by?: string;
  conversation?: string;
  agent: FlowAgentSchema;
  message: FlowMessageSchema;
}
export default function LeanMessage(props: MessageProps) {
  const { message } = props;

  // state for popovers
  const [showMetadataPopover, setShowMetadataPopover] = useState(false);
  const [anchorElMetaPopover, setAnchorElMetaPopover] =
    React.useState<HTMLElement | null>(null);

  const [showStatePopover, setShowStatePopover] = useState(false);
  const [anchorElStatePopover, setAnchorElStatePopover] =
    React.useState<HTMLElement | null>(null);

  // highlighting parents of the message
  const [selectedMessage, setSelectedMessage] = useStore(
    (state) => [state.selectedMessage, state.setSelectedMessage],
    shallow
  );
  const [ancestors, setAncestors] = useStore(
    (state) => [state.ancestors, state.setAncestors],
    shallow
  );

  // expanding or collapsing message content
  const collapsed =
    useStore((state) => state.collapsed[message.message_id], shallow) ?? true;
  const setCollapsed = useStore((state) => state.setCollapsed, shallow);

  const isSelected = selectedMessage === message.message_id;
  const isAncestor = ancestors.includes(message.message_id);
  let borderColor = "white";
  if (isSelected) {
    borderColor = darkTheme.palette.text.secondary;
  }
  if (isAncestor) {
    borderColor = darkTheme.palette.text.disabled;
  }
  const shouldHighlight = isSelected || isAncestor;

  const toggleAncestorDisplay = () => {
    if (isSelected) {
      setSelectedMessage(undefined);
      setAncestors([]);
    } else {
      const parents = message.parents ?? [];
      setSelectedMessage(message.message_id);
      setAncestors(parents);
    }
  };

  return (
    <>
      <Paper
        elevation={12}
        sx={{
          visibility: props.agent_owns_conversation ? undefined : "hidden",
          border: shouldHighlight ? `3px solid ${borderColor}` : undefined,
          margin: "5px",
        }}
      >
        <Accordion expanded={!collapsed} onChange={() => {}}>
          <AccordionSummary
            expandIcon={
              <ExpandMoreOutlined
                onClick={() => {
                  setCollapsed(message.message_id, !collapsed);
                }}
              />
            }
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Toolbar sx={{ width: "100%" }}>
              <Tooltip title="click to reveal/hide ancestors">
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ paddingInlineEnd: "5px" }}
                  onClick={toggleAncestorDisplay}
                >
                  {message.flow_runner ?? "null"}
                </Typography>
              </Tooltip>
              <Tooltip title="click to reveal/hide ancestors">
                <Typography
                  onClick={toggleAncestorDisplay}
                  sx={{ flexGrow: 1 }}
                  color={darkTheme.palette.text.disabled}
                >
                  {" [" + message.message_creator + "]"}
                </Typography>
              </Tooltip>
              <Tooltip title={message.message_id}>
                <IconButton
                  onClick={() => {
                    navigator.clipboard.writeText(message.message_id);
                  }}
                >
                  <ChatBubble></ChatBubble>
                </IconButton>
              </Tooltip>
              <Tooltip title="show metadata">
                <IconButton
                  size="large"
                  color="inherit"
                  aria-label="menu"
                  onClick={(event) => {
                    setAnchorElMetaPopover(event.currentTarget);
                    setShowMetadataPopover(true);
                  }}
                >
                  <AddOutlined />
                </IconButton>
              </Tooltip>
              <Modal
                open={showMetadataPopover}
                onClose={() => {
                  setShowMetadataPopover(false);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <div>
                  <DataModal
                    close={() => {
                      setShowMetadataPopover(false);
                    }}
                    title="Metadata"
                    id={message.message_id}
                    data={{
                      message_id: message.message_id,
                      conversation_id: message.flow_run_id,
                      message_index: message.message_index,
                      created_at: message.created_at,
                      message_creator: message.message_creator,
                      flow_runner: message.flow_runner,
                      flow_run_id: message.flow_run_id,
                      parsed_outputs: message.parsed_outputs ?? {},
                      data: message.data ?? {},
                      expected_outputs: message.expected_outputs ?? {},
                      updated_keys: message.updated_keys ?? {},
                    }}
                  ></DataModal>
                </div>
              </Modal>

              <Tooltip title="show state">
                <IconButton
                  size="large"
                  color="inherit"
                  aria-label="menu"
                  onClick={(event) => {
                    setAnchorElStatePopover(event.currentTarget);
                    setShowStatePopover(true);
                  }}
                >
                  <DataArrayOutlined />
                </IconButton>
              </Tooltip>
              <Modal
                open={showStatePopover}
                onClose={() => {
                  setShowStatePopover(false);
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <div>
                  <DataModal
                    close={() => {
                      setShowStatePopover(false);
                    }}
                    title="State"
                    id={message.message_id}
                    data={message.current_flow_state ?? {}}
                  ></DataModal>
                </div>
              </Modal>
            </Toolbar>
          </AccordionSummary>
          <AccordionDetails>
            <pre style={{ overflow: "scroll" }}>{message.message_type}</pre>
            <pre style={{ overflow: "scroll" }}>{message.content}</pre>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </>
  );
}
