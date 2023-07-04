import React, { useContext, useEffect } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TreeView from "@mui/lab/TreeView";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { MyContext } from "../../../hooks/DashboardContext";
const Flow = () => {
  const context = useContext(MyContext);
  console.log(context?.historyData);

  useEffect(() => {}, []);

  return (
    <div>
      <div className="flow-section">
        <div className="header-title">Flow</div>
        <div className="flow-tree">
          <TreeView
            aria-label="disabled items"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            multiSelect
          >
            <TreeItem
              nodeId="1"
              label={context?.historyData?.problem_description}
            >
              <TreeItem
                nodeId="1"
                label={context?.historyData?.problem_description}
              ></TreeItem>
            </TreeItem>
          </TreeView>
        </div>
      </div>
    </div>
  );
};

export default Flow;
