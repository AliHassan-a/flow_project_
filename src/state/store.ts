import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  MessageSchema,
  ConversationSchema,
  AgentSchema,
  DataSchema,
  EntrySchema,
  FlowDataSchema,
  FlowEntrySchema,
  FlowAgentSchema,
} from "./interfaces";
import axios from "axios";

import { parseFlow } from "./parser";

export interface AppState {
  wandb_run: string;
  data: FlowDataSchema; // contains all data from the backend

  // while waiting for the fetching result, we are loading
  loading: boolean;
  loadingError: string;

  // keys and index to select a specific data and a specific sample from the data
  data_id: string;
  sample_idx: number;
  isSelectionValid: () => boolean;

  // helper functions to extract messages, conversations and agents
  getMessagesAndConversations: () => FlowEntrySchema[];
  getAgents: () => FlowAgentSchema[];
  reset: () => void;
  setDataId: (id: string) => void;
  setSampleIDX: (num: number) => void;

  // for visualizing the currently selected message and its parents
  // the current setup only supports a list of messages to be highlighted
  // maybe eventually we want to use BFS to find more distant ancestors as well
  // I've left some type suggestions in comments below
  selectedMessage?: string;
  setSelectedMessage: (id?: string) => void;
  ancestors: string[]; //{id:string, level:number}[] //{[id:string]: "none"|"parent"}
  setAncestors: (ids: string[]) => void;

  collapsed: { [message_id: string]: boolean };
  setCollapsed: (message_id: string, val: boolean) => void;

  fetchData: (run_path: string) => boolean;
}

export const useStore = create<AppState>()(
  devtools((set, get) => ({
    wandb_run: "epfl-dlab/GPTeam/2rauj93t",
    data: {},
    loading: false,
    loadingError: "",

    // keys and index to select a specific data and a specific sample from the data
    data_id: "",
    sample_idx: 0,

    collapsed: {},

    reset: () => {
      set({ data: {}, data_id: "", sample_idx: 0 });
    },
    setDataId: (id: string) => {
      set({ data_id: id });
    },

    isSelectionValid: () => {
      const data = get().data;
      const data_id = get().data_id;
      const sample_idx = get().sample_idx;

      let selection_valid = false;
      if (data_id in data) {
        if (sample_idx > -1 && sample_idx < data[data_id]!.length) {
          selection_valid = true;
        }
      }
      return selection_valid;
    },

    getAgents: () => {
      const isValid = get().isSelectionValid;
      if (!isValid()) {
        return [];
      }
      const data = get().data;
      const data_id = get().data_id;
      const sample_idx = get().sample_idx;
      return data[data_id]![sample_idx]!.agents;
    },

    getMessagesAndConversations: () => {
      const isValid = get().isSelectionValid;
      if (!isValid()) {
        return [];
      }

      const data = get().data;
      const data_id = get().data_id;
      const sample_idx = get().sample_idx;

      const messages = data[data_id]![sample_idx]!.messages;

      let returnData: FlowEntrySchema[] = [];

      // currentConversation needs to be a dictionary for each agent
      let convMap = new Map<string, string>();

      //let currentConversation: string = messages[0].conversation ?? "";
      //returnData.push({ type: "conv", content: currentConversation });
      messages.forEach((message) => {
        if (!message.flow_run_id) {
          returnData.push({ type: "message", content: message });
          return;
        }
        if (!message.flow_runner) {
          returnData.push({ type: "message", content: message });
          return;
        }

        if (convMap.get(message.flow_runner) != message.flow_run_id) {
          returnData.push({
            type: "conv",
            content: {
              flow_run_id: message.flow_run_id,
              flow_runner: message.flow_runner,
            },
          });
        }
        convMap.set(message.flow_runner, message.flow_run_id);

        returnData.push({ type: "message", content: message });
      });
      console.log("return data:");
      console.log(returnData);
      return returnData;
    },
    setSampleIDX: (num: number) => {
      set({ sample_idx: num });
    },

    setCollapsed: (message_id: string, val: boolean) => {
      let collapsed = get().collapsed;
      collapsed[message_id] = val;
      set({ collapsed });
    },

    setSelectedMessage: (id?: string) => set({ selectedMessage: id }),
    ancestors: [],
    setAncestors: (ids: string[]) => {
      set({ ancestors: ids });
    },

    fetchData: (wandb_path_to_load: string) => {

      get().reset();
      set({ loading: true });
      set({ loadingError: "" });

      // get data from the backend
      const URL = `http://localhost:8000/data?wandb_run_path=${wandb_path_to_load}`;
      axios
        .get(URL, { timeout: 10000 })
        .then((response) => {
          const predictions_data = response.data?.predictions_dataset ?? {};

          let data: FlowDataSchema = parseFlow(predictions_data);
          set({ data });
          console.log({ data });

          console.log(data);
          set({ data, wandb_run: wandb_path_to_load });
        })
        .catch(() => {
          set({ data: {} });
          set({ loadingError: "Path not found" });
          return false;
        })
        .finally(() => {
          set({ loading: false });
        });
      return true;
    },
  }))
);
