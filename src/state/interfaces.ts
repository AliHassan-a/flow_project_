// keep this in sync with the FastAPI definition

// conversation id becomes flow_run_id
// message_creator is either system, user or a flow_runner

// content is still available

// I think I should visualize parsed outputs, and current state
export interface FlowMessageSchema {
  message_id: string;
  created_at: string;
  created_at_millis?: number;
  message_index: number;
  parsed_outputs?: { [key: string]: any } | null; // ToDo should we make this stronger than any?
  data?: { [key: string]: any } | null; // ToDo should we make this stronger than any?

  valid_parsing?: boolean;
  history?: {
    history: FlowMessageSchema[];
  };
  message_creation_history?:{
    history: FlowMessageSchema[];
  }

  flow_run_id: string;
  flow_runner?: string;
  message_creator?: string;
  content: string;
  parents?: string[];
  current_flow_state?: { [key: string]: any };
  message_type?: string;
  expected_outputs?:any,
  updated_keys?:any,
}

export interface FlowPredictionSchema {
  id: string;
  success: boolean;
  inference_outputs: FlowMessageSchema[];
}

export interface FlowAgentSchema {
  id: string;
}

export interface FlowInferenceSchema {
  messages: FlowMessageSchema[];
  agents: FlowAgentSchema[];
  passed?: boolean;
}
export type FlowDataSchema = {
  [id: string]: FlowInferenceSchema[];
};

export interface MessageSchema {
  num: number;
  id: string;
  metadata: any; // ToDo the metadata also contains the parents
  content: string;
  created_by?: string;
  conversation?: string;
  orchestration_state?: any;
  role?: string;
}

export interface FlowEntrySchema {
  type: "message" | "conv";
  content: FlowMessageSchema | { flow_run_id: string; flow_runner?: string };
}
export interface EntrySchema {
  type: "message" | "conv";
  content: MessageSchema | string;
}

export interface ConversationSchema {
  id: string;
  metadata: any;
  messages: string[];
  agent_ids: string[];
}

export interface AgentSchema {
  id: string;
  metadata: any;
}

export type DataSchema = {
  [id: string]: {
    messages: {
      [id: string]: MessageSchema;
    };
    conversations: {
      [id: string]: ConversationSchema;
    };
    agents: {
      [id: string]: AgentSchema;
    };
    passed: boolean;
  }[];
};
