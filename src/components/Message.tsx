import React, { useState } from "react";
import { AgentSchema, MessageSchema } from "../state/interfaces";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Fab,
  IconButton,
  Modal,
  Popover,
  Typography,
} from "@mui/material";
import "./Message.scss";
import AddchartIcon from "@mui/icons-material/Addchart";
import { useStore } from "../state/store";
import { ExpandMoreOutlined } from "@mui/icons-material";
import { shallow } from "zustand/shallow";
import { JsonViewer } from "@textea/json-viewer";

export interface MessageProps {
  agent_owns_conversation: boolean; //
  created_by?: string;
  conversation?: string;
  agent: AgentSchema;
  message: MessageSchema;
}

export default function Message(props: MessageProps) {
  const { created_by, conversation, message } = props;

  const [showMetadataPopover, setShowMetadataPopover] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const [selectedMessage, setSelectedMessage] = useStore(
    (state) => [state.selectedMessage, state.setSelectedMessage],
    shallow
  );
  const [ancestors, setAncestors] = useStore(
    (state) => [state.ancestors, state.setAncestors],
    shallow
  );

  const collapsed =
    useStore((state) => state.collapsed[message.id], shallow) ?? true;
  const setCollapsed = useStore((state) => state.setCollapsed, shallow);

  const isSelected = selectedMessage == message.id;
  const isAncestor = ancestors.includes(message.id);
  let borderColor = "white";
  if (isSelected) {
    borderColor = "#AAF";
  }
  if (isAncestor) {
    borderColor = "#00A";
  }
  const shouldHighlight = isSelected || isAncestor;

  return (
    <div
      className="Message"
      style={{
        visibility: props.agent_owns_conversation ? undefined : "hidden",
      }}
    >
      <Card
        style={{
          border: shouldHighlight ? `3px solid ${borderColor}` : undefined,
        }}
      >
        <CardContent>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Agent: {message.created_by ?? "null"}
            </Typography>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
              onClick={(event) => {
                setAnchorEl(event.currentTarget);
                setShowMetadataPopover(true);
              }}
            >
              <AddchartIcon />
            </IconButton>

            <Popover
              open={showMetadataPopover}
              onClose={() => {
                setShowMetadataPopover(false);
                setAnchorEl(null);
              }}
              anchorEl={anchorEl}
            >
              <Box sx={{ maxWidth: "80%" }}>
                <Typography variant="h6" component="h2">
                  Metadata
                </Typography>
                <JsonViewer value={message.metadata} />
              </Box>
            </Popover>
          </div>

          <Divider></Divider>
          <Accordion
            expanded={!collapsed}
            onChange={() => {
              setCollapsed(message.id, !collapsed);
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreOutlined />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Content
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <p style={{ whiteSpace: "pre-line" }}>{message.content}</p>
            </AccordionDetails>
          </Accordion>
        </CardContent>
        <Divider></Divider>
        <CardActions>
          <Button
            size="small"
            onClick={() => {
              if (isSelected) {
                setSelectedMessage(undefined);
                setAncestors([]);
              } else {
                const parents = message.metadata["parents"] ?? [];
                setSelectedMessage(message.id);
                setAncestors(parents);
              }
            }}
          >
            {isSelected ? "hide parents" : "show parents"}
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
