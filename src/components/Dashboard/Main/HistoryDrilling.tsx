import React from "react";
import TreeItem from "@mui/lab/TreeItem";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/cjs/styles/prism";
interface HistoryDrillingProps {
  _: any;
}

const HistoryDrilling: React.FC<HistoryDrillingProps> = ({ _ }) => {
  const renderChild = (el: any, index: number) => {
    return (
      <div style={{ padding: "10px 20px" }}>
        <TreeItem
          key={el.message_id}
          nodeId={el.message_id}
          label={el.message_type}
        >
          <TreeItem
            nodeId={`${index.toString()}-nested_child`}
            label={
              (el?.message_type === "InputMessage" &&
                `keys_to_ignore_for_hash: ${el.keys_to_ignore_for_hash}`) ||
              (el?.message_type === "OutputMessage" && (
                <>
                  <SyntaxHighlighter language="python" style={coy}>
                    {el?.data?.output_data?.code}
                  </SyntaxHighlighter>
                </>
              )) ||
              (el?.message_type === "UpdateMessage_ChatMessage" &&
                `Content: ${el?.data?.content}`) ||
              (el?.message_type === "UpdateMessage_NamespaceReset" &&
                `keys_deleted_from_namespace: ${el?.data?.keys_deleted_from_namespace}`)
            }
          >
            {el.history &&
              el.history.length > 0 &&
              renderNestedHistory(el?.history)}
          </TreeItem>
        </TreeItem>
      </div>
    );
  };

  const renderNestedHistory = (history: any[]) => {
    return history.map((item: any, index: number) => {
      return (
        <React.Fragment key={item.message_id}>
          {renderChild(item, index)}
        </React.Fragment>
      );
    });
  };

  return (
    <>
      {Array.isArray(_?.history)
        ? _?.history?.map((item: any, index: number) => {
            return (
              <TreeItem
                key={item?.message_id}
                nodeId={index.toString()}
                label={item?.message_type}
              >
                <TreeItem
                  nodeId={`${index.toString()}-parent_child`}
                  label={
                    (item?.message_type === "InputMessage" &&
                      `keys_to_ignore_for_hash: ${item.keys_to_ignore_for_hash}`) ||
                    (item?.message_type === "OutputMessage" && (
                      <>
                        <SyntaxHighlighter language="python" style={coy}>
                          {item?.data?.output_data?.code}
                        </SyntaxHighlighter>
                      </>
                    )) ||
                    (item?.message_type === "UpdateMessage_Generic" &&
                      `io_examples_and_explanation: ${item?.data?.io_examples_and_explanation}`)
                  }
                >
                  {item?.history &&
                    item?.history.length > 0 &&
                    renderNestedHistory(item.history)}
                </TreeItem>
              </TreeItem>
            );
          })
        : ""}
    </>
  );
};

export default HistoryDrilling;
