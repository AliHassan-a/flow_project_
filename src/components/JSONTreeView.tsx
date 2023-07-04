import React, { ReactNode } from "react";
import logo from "./logo.svg";
import { DataSchema } from "./../state/interfaces";

import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { Button, IconButton } from "@mui/material";
import { ContentCopyOutlined } from "@mui/icons-material";

export default function JSONTreeView(props: {
  parent_id: string;
  kv_pairs: any;
}) {
  const createTreeViews = (parent_id: string, kv_pairs: any): ReactNode => {
    console.log("constructing tree for ", parent_id, kv_pairs);
    return Object.entries(kv_pairs).map((val, idx) => {
      const [key, value] = val;
      if (Array.isArray(value)) {
        return (
          <TreeItem key={parent_id + key} nodeId={parent_id + key} label={key}>
            {Object.entries(value).map((entry, idx) => {
              return (
                <TreeItem key={idx} nodeId={parent_id + key + idx} label={idx}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <IconButton
                      onClick={() => {
                        navigator.clipboard.writeText(JSON.stringify(entry));
                      }}
                    >
                      <ContentCopyOutlined />
                    </IconButton>
                    <pre style={{ whiteSpace: "pre-line" }}>
                      {JSON.stringify(entry)}
                    </pre>
                  </div>
                </TreeItem>
              );
            })}
          </TreeItem>
        );
      } else if (value instanceof Object) {
        return (
          <TreeItem key={parent_id + key} nodeId={parent_id + key} label={key}>
            {createTreeViews(parent_id + key, value)}
          </TreeItem>
        );
      }
      return (
        <TreeItem nodeId={parent_id + key} label={key}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <IconButton
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(value));
              }}
            >
              <ContentCopyOutlined />
            </IconButton>
            <pre>{value as any}</pre>
          </div>
        </TreeItem>
      );
    });
  };

  return (
    <div>
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ flexGrow: 1, maxWidth: 400 }}
      >
        {createTreeViews(props.parent_id, props.kv_pairs)}
      </TreeView>
    </div>
  );
}
