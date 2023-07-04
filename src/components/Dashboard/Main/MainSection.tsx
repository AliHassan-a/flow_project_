import React from "react";
import "./mainSection.scss";
import "./mainSection.scss";
import Flow from "./Flow";
import { newData } from "../../../utils/newData";
import PlanAgent from "./PlanAgent";
import PlanFeedbackAgent from "./PlanFeedbackAgent";
import CodeAgent from "./CodeAgent";
const MainSection = () => {
  return (
    <div className="parent-main">
      <Flow />
      <PlanAgent />
      <PlanFeedbackAgent />
      <CodeAgent />
    </div>
  );
};

export default MainSection;

// const MainSection = () => {
//   const [expanded, setExpanded] = useState<string | false>(false);
//   const [flowRunIds, setFlowRunIds] = useState<string[]>([]);
//   console.log("Data", newData);
//   // Function to extract unique flowRunIds from newData
//   const extractFlowRunIds = (data: any) => {
//     const uniqueIdItems: string[] = [];
//     const AllItems: string[] = [];

//     data?.forEach((node: any) => {
//       node?.inference_outputs?.forEach((output: any) => {
//         output?.history?.history?.forEach((item: any) => {
//           const flowRunId: string = item.flow_run_id;
//           const foundItem: any = uniqueIdItems.find(
//             (uniqueItem: any) => uniqueItem.flow_run_id === flowRunId
//           );

//           if (!foundItem) {
//             uniqueIdItems.push(item);
//           }
//         });
//       });
//     });
//     return uniqueIdItems;
//   };

//   useEffect(() => {
//     // Extract flowRunIds from newData and update state
//     const uniqueFlowRunIds = extractFlowRunIds(newData);
//     setFlowRunIds(uniqueFlowRunIds);
//   }, []);

//   return (
//     <div className="parent-main">
//       {/* <Flow />
//       <PlanAgent />
//       <PlanFeedbackAgent />
//       <CodeAgent /> */}
//       {/* {renderdivs(newData)} */}
//       <div style={{ display: "flex", gap: "5px" }}>
//         {flowRunIds.map((item: any, index: number) => (
//           <div key={item?.flow_run_id} style={{ border: "1px solid white" }}>
//             <h4 style={{ color: "purple" }}>{item.message_type}</h4>
//             {item?.data?.problem_description ? (
//               <h3>Problem Description</h3>
//             ) : null}
//             <h4 style={{ padding: "5px" }}>
//               {item?.data?.problem_description}
//             </h4>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MainSection;
