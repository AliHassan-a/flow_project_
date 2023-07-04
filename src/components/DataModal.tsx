import React from "react";
import { CloseOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import JSONTreeView from "./JSONTreeView";
import { darkTheme } from "./../App";

export interface DataModalProps {
  title: string;
  id: string;
  data: object;
  close: () => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid",
  borderRadius: 10,
  boxShadow: 24,
  overflow: "scroll",
  p: 4,
};

export default function DataModal(props: DataModalProps) {
  const message = props;
  return (
    <Box
      sx={{
        ...style,
        borderColor: darkTheme.palette.text.disabled,
        height: "75vh",
        width: "75vw",
        scroll: "y",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" component="h2" style={{ flex: 1 }}>
          {message.title}
        </Typography>

        <IconButton
          size="large"
          color="primary"
          component="label"
          onClick={message.close}
        >
          <CloseOutlined />
        </IconButton>
      </div>

      <div style={{ width: "100%", overflow: "auto" }}>
        <JSONTreeView
          parent_id={message.id}
          kv_pairs={message.data!}
        ></JSONTreeView>

        {/*
        <JSONTree
          valueRenderer={(raw: any) => <pre>{raw}</pre>}
          data={message.data!}
        ></JSONTree>
           */}
      </div>
      {
        //<JsonViewer value={message.metadata} />
      }
    </Box>
  );
}
