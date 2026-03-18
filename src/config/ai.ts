export type AIModelType = "doubao" | "deepseek" | "openai" | "gemini";

export const SERVER_MANAGED_AI = import.meta.env.VITE_SERVER_MANAGED_AI === "true";

export type OpenAICompatiblePresetId =
  | "openai_official"
  | "deepseek_official"
  | "doubao_ark"
  | "qwen_dashscope"
  | "zhipu_glm"
  | "kimi_moonshot"
  | "openrouter"
  | "siliconflow"
  | "together"
  | "ollama_local"
  | "lmstudio_local"
  | "custom_compatible";

export interface OpenAICompatiblePreset {
  id: OpenAICompatiblePresetId;
  name: string;
  description: string;
  docsUrl: string;
  recommendedEndpoint: string;
  recommendedModel: string;
  requiresApiKey: boolean;
  isLocal: boolean;
}

export const OPENAI_COMPATIBLE_PRESETS: OpenAICompatiblePreset[] = [
  {
    id: "openai_official",
    name: "OpenAI",
    description: "Official OpenAI API",
    docsUrl: "https://platform.openai.com/api-keys",
    recommendedEndpoint: "https://api.openai.com/v1",
    recommendedModel: "gpt-4.1-mini",
    requiresApiKey: true,
    isLocal: false,
  },
  {
    id: "deepseek_official",
    name: "DeepSeek (OpenAI Compatible)",
    description: "Official DeepSeek compatible endpoint",
    docsUrl: "https://platform.deepseek.com",
    recommendedEndpoint: "https://api.deepseek.com/v1",
    recommendedModel: "deepseek-chat",
    requiresApiKey: true,
    isLocal: false,
  },
  {
    id: "doubao_ark",
    name: "Doubao Ark (OpenAI Compatible)",
    description: "Volcengine Ark OpenAI compatible endpoint",
    docsUrl: "https://console.volcengine.com/ark",
    recommendedEndpoint: "https://ark.cn-beijing.volces.com/api/v3",
    recommendedModel: "doubao-seed-1-6-250615",
    requiresApiKey: true,
    isLocal: false,
  },
  {
    id: "qwen_dashscope",
    name: "Qwen DashScope",
    description: "Alibaba DashScope compatible endpoint",
    docsUrl: "https://dashscope.aliyun.com",
    recommendedEndpoint:
      "https://dashscope.aliyuncs.com/compatible-mode/v1",
    recommendedModel: "qwen-plus",
    requiresApiKey: true,
    isLocal: false,
  },
  {
    id: "zhipu_glm",
    name: "Zhipu GLM",
    description: "Zhipu AI compatible endpoint",
    docsUrl: "https://open.bigmodel.cn",
    recommendedEndpoint: "https://open.bigmodel.cn/api/paas/v4",
    recommendedModel: "glm-4-flash",
    requiresApiKey: true,
    isLocal: false,
  },
  {
    id: "kimi_moonshot",
    name: "Kimi Moonshot",
    description: "Moonshot Open Platform compatible endpoint",
    docsUrl: "https://platform.moonshot.cn",
    recommendedEndpoint: "https://api.moonshot.cn/v1",
    recommendedModel: "moonshot-v1-8k",
    requiresApiKey: true,
    isLocal: false,
  },
  {
    id: "openrouter",
    name: "OpenRouter",
    description: "OpenRouter model gateway",
    docsUrl: "https://openrouter.ai/keys",
    recommendedEndpoint: "https://openrouter.ai/api/v1",
    recommendedModel: "openai/gpt-4.1-mini",
    requiresApiKey: true,
    isLocal: false,
  },
  {
    id: "siliconflow",
    name: "SiliconFlow",
    description: "SiliconFlow model gateway",
    docsUrl: "https://siliconflow.cn",
    recommendedEndpoint: "https://api.siliconflow.cn/v1",
    recommendedModel: "Qwen/Qwen2.5-7B-Instruct",
    requiresApiKey: true,
    isLocal: false,
  },
  {
    id: "together",
    name: "Together AI",
    description: "Together OpenAI compatible endpoint",
    docsUrl: "https://api.together.xyz/settings/api-keys",
    recommendedEndpoint: "https://api.together.xyz/v1",
    recommendedModel: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
    requiresApiKey: true,
    isLocal: false,
  },
  {
    id: "ollama_local",
    name: "Ollama (Local)",
    description: "Local Ollama server",
    docsUrl: "https://ollama.com",
    recommendedEndpoint: "http://127.0.0.1:11434/v1",
    recommendedModel: "qwen2.5:7b",
    requiresApiKey: false,
    isLocal: true,
  },
  {
    id: "lmstudio_local",
    name: "LM Studio (Local)",
    description: "Local LM Studio OpenAI compatible server",
    docsUrl: "https://lmstudio.ai",
    recommendedEndpoint: "http://127.0.0.1:1234/v1",
    recommendedModel: "local-model",
    requiresApiKey: false,
    isLocal: true,
  },
  {
    id: "custom_compatible",
    name: "Custom Compatible",
    description: "Any OpenAI compatible provider or gateway",
    docsUrl: "https://platform.openai.com/docs/api-reference/chat",
    recommendedEndpoint: "",
    recommendedModel: "",
    requiresApiKey: true,
    isLocal: false,
  },
];

export const OPENAI_COMPATIBLE_PRESET_MAP = Object.fromEntries(
  OPENAI_COMPATIBLE_PRESETS.map((preset) => [preset.id, preset])
) as Record<OpenAICompatiblePresetId, OpenAICompatiblePreset>;

export const DEFAULT_OPENAI_COMPATIBLE_PRESET_ID: OpenAICompatiblePresetId =
  "custom_compatible";

export const getOpenAICompatiblePresetById = (
  presetId?: string
): OpenAICompatiblePreset =>
  OPENAI_COMPATIBLE_PRESET_MAP[
    (presetId as OpenAICompatiblePresetId) ||
      DEFAULT_OPENAI_COMPATIBLE_PRESET_ID
  ] || OPENAI_COMPATIBLE_PRESET_MAP[DEFAULT_OPENAI_COMPATIBLE_PRESET_ID];

export const normalizeOpenAICompatibleEndpoint = (endpoint?: string) => {
  const normalized = (endpoint || "").trim();
  if (!normalized) return "";
  return normalized
    .replace(/\/+$/, "")
    .replace(/\/chat\/completions$/i, "")
    .replace(/\/completions$/i, "");
};

export interface AIValidationContext {
  doubaoApiKey?: string;
  doubaoModelId?: string;
  deepseekApiKey?: string;
  deepseekModelId?: string;
  openaiApiKey?: string;
  openaiModelId?: string;
  openaiApiEndpoint?: string;
  openaiProviderPresetId?: OpenAICompatiblePresetId;
  openaiApiKeyOptional?: boolean;
  geminiApiKey?: string;
  geminiModelId?: string;
}

export interface AIModelConfig {
  url: (endpoint?: string) => string;
  requiresModelId: boolean;
  defaultModel?: string;
  headers: (apiKey: string) => Record<string, string>;
  validate: (context: AIValidationContext) => boolean;
}

export const AI_MODEL_CONFIGS: Record<AIModelType, AIModelConfig> = {
  doubao: {
    url: () => "https://ark.cn-beijing.volces.com/api/v3/chat/completions",
    requiresModelId: true,
    headers: (apiKey: string) => ({
      "Content-Type": "application/json",
      ...(apiKey?.trim() ? { Authorization: `Bearer ${apiKey.trim()}` } : {}),
    }),
    validate: (context: AIValidationContext) =>
      !!(context.doubaoApiKey?.trim() && context.doubaoModelId?.trim()),
  },
  deepseek: {
    url: () => "https://api.deepseek.com/v1/chat/completions",
    requiresModelId: false,
    defaultModel: "deepseek-chat",
    headers: (apiKey: string) => ({
      "Content-Type": "application/json",
      ...(apiKey?.trim() ? { Authorization: `Bearer ${apiKey.trim()}` } : {}),
    }),
    validate: (context: AIValidationContext) => !!context.deepseekApiKey?.trim(),
  },
  openai: {
    url: (endpoint?: string) =>
      `${normalizeOpenAICompatibleEndpoint(endpoint)}/chat/completions`,
    requiresModelId: true,
    headers: (apiKey: string) => ({
      "Content-Type": "application/json",
      ...(apiKey?.trim() ? { Authorization: `Bearer ${apiKey.trim()}` } : {}),
    }),
    validate: (context: AIValidationContext) =>
      !!(
        context.openaiModelId?.trim() &&
        context.openaiApiEndpoint?.trim() &&
        (context.openaiApiKeyOptional || context.openaiApiKey?.trim())
      ),
  },
  gemini: {
    url: () => "https://generativelanguage.googleapis.com/v1beta",
    requiresModelId: true,
    headers: (apiKey: string) => ({
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    }),
    validate: (context: AIValidationContext) =>
      !!(context.geminiApiKey?.trim() && context.geminiModelId?.trim()),
  },
};
