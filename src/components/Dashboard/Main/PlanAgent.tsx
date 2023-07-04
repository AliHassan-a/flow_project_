import React from "react";
import "./mainSection.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TreeView from "@mui/lab/TreeView";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
const PlanAgent = () => {
  return (
    <div>
      <div className="plan_agent-section">
        <div className="header-title">Plan Agent</div>
        <div className="planAgent-tree">
          <TreeView
            aria-label="disabled items"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            multiSelect
          >
            <TreeItem nodeId="1" label="One">
              <TreeItem nodeId="2" label="Two" />
              <TreeItem nodeId="3" label="Three" />
              <TreeItem nodeId="4" label="Four" />
            </TreeItem>
            <TreeItem nodeId="5" label="Five" disabled>
              <TreeItem nodeId="6" label="Six" />
            </TreeItem>
            <TreeItem nodeId="7" label="Seven">
              <TreeItem nodeId="8" label="Eight" />
              <TreeItem nodeId="9" label="Nine">
                <TreeItem nodeId="10" label="Ten">
                  <TreeItem nodeId="11" label="Eleven" />
                  <TreeItem nodeId="12" label="Twelve" />
                </TreeItem>
              </TreeItem>
            </TreeItem>
          </TreeView>
        </div>
      </div>
    </div>
  );
};

export default PlanAgent;
