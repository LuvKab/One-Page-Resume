import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  AI_MODEL_CONFIGS,
  AIModelType,
  DEFAULT_OPENAI_COMPATIBLE_PRESET_ID,
  OpenAICompatiblePresetId,
  SERVER_MANAGED_AI,
} from "@/config/ai";

interface AIConfigState {
  selectedModel: AIModelType;
  doubaoApiKey: string;
  doubaoModelId: string;
  deepseekApiKey: string;
  deepseekModelId: string;
  openaiApiKey: string;
  openaiModelId: string;
  openaiApiEndpoint: string;
  openaiProviderPresetId: OpenAICompatiblePresetId;
  openaiApiKeyOptional: boolean;
  geminiApiKey: string;
  geminiModelId: string;
  setSelectedModel: (model: AIModelType) => void;
  setDoubaoApiKey: (apiKey: string) => void;
  setDoubaoModelId: (modelId: string) => void;
  setDeepseekApiKey: (apiKey: string) => void;
  setDeepseekModelId: (modelId: string) => void;
  setOpenaiApiKey: (apiKey: string) => void;
  setOpenaiModelId: (modelId: string) => void;
  setOpenaiApiEndpoint: (endpoint: string) => void;
  setOpenaiProviderPresetId: (presetId: OpenAICompatiblePresetId) => void;
  setOpenaiApiKeyOptional: (optional: boolean) => void;
  setGeminiApiKey: (apiKey: string) => void;
  setGeminiModelId: (modelId: string) => void;
  isConfigured: () => boolean;
}

export const useAIConfigStore = create<AIConfigState>()(
  persist(
    (set, get) => ({
      selectedModel: "doubao",
      doubaoApiKey: "",
      doubaoModelId: "",
      deepseekApiKey: "",
      deepseekModelId: "",
      openaiApiKey: "",
      openaiModelId: "",
      openaiApiEndpoint: "",
      openaiProviderPresetId: DEFAULT_OPENAI_COMPATIBLE_PRESET_ID,
      openaiApiKeyOptional: false,
      geminiApiKey: "",
      geminiModelId: "",
      setSelectedModel: (model: AIModelType) => set({ selectedModel: model }),
      setDoubaoApiKey: (apiKey: string) => set({ doubaoApiKey: apiKey }),
      setDoubaoModelId: (modelId: string) => set({ doubaoModelId: modelId }),
      setDeepseekApiKey: (apiKey: string) => set({ deepseekApiKey: apiKey }),
      setDeepseekModelId: (modelId: string) => set({ deepseekModelId: modelId }),
      setOpenaiApiKey: (apiKey: string) => set({ openaiApiKey: apiKey }),
      setOpenaiModelId: (modelId: string) => set({ openaiModelId: modelId }),
      setOpenaiApiEndpoint: (endpoint: string) => set({ openaiApiEndpoint: endpoint }),
      setOpenaiProviderPresetId: (presetId: OpenAICompatiblePresetId) =>
        set({ openaiProviderPresetId: presetId }),
      setOpenaiApiKeyOptional: (optional: boolean) =>
        set({ openaiApiKeyOptional: optional }),
      setGeminiApiKey: (apiKey: string) => set({ geminiApiKey: apiKey }),
      setGeminiModelId: (modelId: string) => set({ geminiModelId: modelId }),
      isConfigured: () => {
        if (SERVER_MANAGED_AI) {
          return true;
        }
        const state = get();
        const config = AI_MODEL_CONFIGS[state.selectedModel];
        return config.validate(state);
      }
    }),
    {
      name: "ai-config-storage"
    }
  )
);
