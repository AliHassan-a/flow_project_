import {
  FlowAgentSchema,
  FlowDataSchema,
  FlowInferenceSchema,
  FlowMessageSchema,
  FlowPredictionSchema,
} from "./interfaces";

export const parseFlow = (run_data: FlowPredictionSchema[]) => {
  let data: FlowDataSchema = {};
  console.log("done");

  run_data.forEach((run) => {
    // create a list of problems
    let problem_id = run.id;
    let samples: FlowInferenceSchema[] = [];

    run.inference_outputs.forEach((inference_outputs, sample_idx) => {
      let messages: FlowMessageSchema[] = [];
      let agents: FlowAgentSchema[] = [];

      // create a list of all messages
      dfs(inference_outputs, messages);

      let uniqueMessages: FlowMessageSchema[] = [];
      let uniqueMessageIds: Set<string> = new Set<string>();
      messages.forEach((message) => {
          if (!uniqueMessageIds.has(message.message_id)) {
              uniqueMessageIds.add(message.message_id);
              uniqueMessages.push(message);
          }
        });
        messages = uniqueMessages;

      let msg_index = true;
        messages.forEach((message) => {
          if(!message.message_index){
            msg_index = false;
          }
        });
        // convert the created_at date to millis
        messages.forEach((message) => {
            message.created_at_millis = Date.parse(message.created_at);
        });
      if(msg_index){
        messages = messages.sort((a, b) => a.message_index - b.message_index);
      }
        else{
        messages = messages.sort((a, b) => a.created_at_millis! - b.created_at_millis!);
      }

      // agents are now called flow_runner
      let flow_run_ids = new Set<string>();
      messages.map((message) => {
        if (message.flow_runner) {
          flow_run_ids.add(message.flow_runner);
        }
      });
      agents = Array.from(flow_run_ids).map((flow_run_id) => {
        return {
          id: flow_run_id,
        };
      });
      samples.push({ messages, agents, passed: run.success });
    });

    data[problem_id] = samples;
  });

  return data;
};

const dfs = (
  current_message: FlowMessageSchema,
  messages: FlowMessageSchema[]
) => {
  messages.push(current_message);
  if (current_message.history) {
    current_message.history.history.forEach((child) => {
      dfs(child, messages);
    });
  }
  else if (current_message.message_creation_history) {
    current_message.message_creation_history.history.forEach((child) => {
      dfs(child, messages);
    });
  }
};
