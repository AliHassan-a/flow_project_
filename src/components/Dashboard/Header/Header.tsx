import { useContext } from "react";
import "./header.scss";
import { MyContext } from "../../../hooks/DashboardContext";
const defaultValue = "option1";
const Header = () => {
  const context = useContext(MyContext);
  const ids = context?.flowData?.map((data) => data?.id);
  const message_index = context?.flowData?.flatMap((data: any) =>
    data?.inference_outputs?.flatMap((output: any) => output?.message_id)
  );

  return (
    <div className="parent-topbar ">
      <div className="logo">Flow</div>
      <div className="input-fields flex gap-4">
        {/* <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label> */}
        <div className="wandB-run-input">
          <input type="search" id="default-search" placeholder="WandB Run" />
        </div>
        <div className="problem-id ">
          <select id="problem-id">
            <option defaultValue={defaultValue} disabled selected>
              Problem ID
            </option>
            {ids?.map((id, index) => (
              <option value={id} key={index}>
                {id}
              </option>
            ))}
          </select>
        </div>
        <div className="Idx ">
          <select>
            <option defaultValue={defaultValue} disabled selected>
              Idx
            </option>
            {message_index?.map((messageIndex, index: number) => (
              <option value={messageIndex}>{messageIndex}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Header;
