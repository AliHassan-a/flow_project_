import React, { useContext } from "react";
import "./Sidebar.scss";
import { newData } from "../../../utils/newData";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TreeView from "@mui/lab/TreeView";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { MyContext } from "../../../hooks/DashboardContext";

const Sidebar = () => {
  const context = useContext(MyContext);
  const getLog = (data: any) => {
    context?.setHistoryData(data);
  };

  const renderTreeItems = (nodes: any) => {
    return nodes?.map((node: any) => (
      <TreeItem key={node.id} nodeId={node.id} label={node.id}>
        {Array.isArray(node?.inference_outputs) &&
          node?.inference_outputs.map((_: any) => (
            <TreeItem
              key={_.message_id}
              nodeId={_.message_id}
              label={_.message_type}
            >
              {Array.isArray(node?.inference_outputs) &&
                _?.history?.history?.map((item: any) => (
                  <TreeItem
                    key={item.message_id}
                    nodeId={item.message_id}
                    label={item.type}
                    onClick={() => getLog(item.data)}
                  ></TreeItem>
                ))}
            </TreeItem>
          ))}
      </TreeItem>
    ));
  };

  return (
    <div className="sidebar-parent">
      <TreeView
        aria-label="disabled items"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        // disabledItemsFocusable={focusDisabledItems}
        multiSelect
      >
        {renderTreeItems(newData)}
      </TreeView>

      {/* Tree */}
    </div>
  );
};

export default Sidebar;
