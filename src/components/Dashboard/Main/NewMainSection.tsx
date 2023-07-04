import React from "react";
import data from "../../../utils/predictions.json";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TreeView from "@mui/lab/TreeView";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import HistoryDrilling from "./HistoryDrilling";

const NewMainSection = () => {
  console.log("Data", data);
  const renderTreeItems = (nodes: any) => {
    return nodes?.map((node: any) => (
      <TreeItem
        key={node.id}
        nodeId={node.id}
        style={{ padding: "20px" }}
        label={
          <div style={{ padding: "10px 20px" }}>
            Problem Id: {node.id}
            <br />
            Problem Desscription:{" "}
            {node?.inference_outputs[0]?.history[0]?.data?.problem_description}
          </div>
        }
      >
        {Array.isArray(node?.inference_outputs) &&
          node?.inference_outputs.map((_: any, index: Number) => (
            <TreeItem
              style={{
                marginTop: "20px",
                backgroundColor: "#2F3349F2",
                padding: "10px 20px",
              }}
              key={_.message_id}
              nodeId={_.message_id}
              label={
                <div
                  style={{ padding: "10px 20px", backgroundColor: "#2F3349F2" }}
                >
                  Message Type : {_.message_type}
                </div>
              }
            >
              <TreeItem
                style={{
                  color: " backgroundColor: #2F3349F2",
                  padding: "10px 20px",
                }}
                nodeId={index.toString()}
                label={
                  <SyntaxHighlighter language="python" style={dark}>
                    {_?.data?.output_data?.code}
                  </SyntaxHighlighter>
                }
              ></TreeItem>
              {<h1 style={{ fontSize: "1.2rem" }}>History</h1>}
              {_?.history && <HistoryDrilling _={_} />}
            </TreeItem>
          ))}
      </TreeItem>
    ));
  };

  return (
    <div>
      <TreeView
        aria-label="disabled items"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        multiSelect
        style={{ backgroundColor: "#25293C" }}
      >
        {renderTreeItems(data)}
      </TreeView>
    </div>
  );
};

export default NewMainSection;
