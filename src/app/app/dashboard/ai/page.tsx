import { useEffect, useMemo, useState } from "react";
import { Check, ExternalLink, Sparkles } from "lucide-react";
import { useTranslations } from "@/i18n/compat/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DeepSeekLogo from "@/components/ai/icon/IconDeepseek";
import IconDoubao from "@/components/ai/icon/IconDoubao";
import IconOpenAi from "@/components/ai/icon/IconOpenAi";
import { useAIConfigStore } from "@/store/useAIConfigStore";
import { cn } from "@/lib/utils";
import {
  AI_MODEL_CONFIGS,
  AIModelType,
  OPENAI_COMPATIBLE_PRESETS,
  OpenAICompatiblePresetId,
  getOpenAICompatiblePresetById,
} from "@/config/ai";

const AISettingsPage = () => {
  const {
    doubaoApiKey,
    doubaoModelId,
    deepseekApiKey,
    openaiApiKey,
    openaiModelId,
    openaiApiEndpoint,
    openaiProviderPresetId,
    openaiApiKeyOptional,
    geminiApiKey,
    geminiModelId,
    setDoubaoApiKey,
    setDoubaoModelId,
    setDeepseekApiKey,
    setOpenaiApiKey,
    setOpenaiModelId,
    setOpenaiApiEndpoint,
    setOpenaiProviderPresetId,
    setOpenaiApiKeyOptional,
    setGeminiApiKey,
    setGeminiModelId,
    selectedModel,
    setSelectedModel,
  } = useAIConfigStore();

  const [currentModel, setCurrentModel] = useState(selectedModel);
  const t = useTranslations();
  const selectedPreset = useMemo(
    () => getOpenAICompatiblePresetById(openaiProviderPresetId),
    [openaiProviderPresetId]
  );

  useEffect(() => {
    setCurrentModel(selectedModel);
  }, [selectedModel]);

  const handleApiKeyChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: AIModelType
  ) => {
    const newApiKey = e.target.value;
    if (type === "doubao") {
      setDoubaoApiKey(newApiKey);
      return;
    }
    if (type === "deepseek") {
      setDeepseekApiKey(newApiKey);
      return;
    }
    if (type === "gemini") {
      setGeminiApiKey(newApiKey);
      return;
    }
    setOpenaiApiKey(newApiKey);
  };

  const handleModelIdChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: AIModelType
  ) => {
    const newModelId = e.target.value;
    if (type === "doubao") {
      setDoubaoModelId(newModelId);
      return;
    }
    if (type === "openai") {
      setOpenaiModelId(newModelId);
      return;
    }
    if (type === "gemini") {
      setGeminiModelId(newModelId);
    }
  };

  const applyOpenAIPresetRecommendation = () => {
    setOpenaiApiEndpoint(selectedPreset.recommendedEndpoint || "");
    setOpenaiModelId(selectedPreset.recommendedModel || "");
    setOpenaiApiKeyOptional(!selectedPreset.requiresApiKey);
  };

  const openaiConfigured = AI_MODEL_CONFIGS.openai.validate({
    openaiApiKey,
    openaiModelId,
    openaiApiEndpoint,
    openaiApiKeyOptional,
    openaiProviderPresetId,
  });

  const models = [
    {
      id: "deepseek" as AIModelType,
      name: t("dashboard.settings.ai.deepseek.title"),
      description: t("dashboard.settings.ai.deepseek.description"),
      icon: DeepSeekLogo,
      link: "https://platform.deepseek.com",
      color: "text-q_acid",
      isConfigured: !!deepseekApiKey,
    },
    {
      id: "doubao" as AIModelType,
      name: t("dashboard.settings.ai.doubao.title"),
      description: t("dashboard.settings.ai.doubao.description"),
      icon: IconDoubao,
      link: "https://console.volcengine.com/ark",
      color: "text-q_black",
      isConfigured: !!(doubaoApiKey && doubaoModelId),
    },
    {
      id: "openai" as AIModelType,
      name: t("dashboard.settings.ai.openai.title"),
      description: t("dashboard.settings.ai.openai.description"),
      icon: IconOpenAi,
      link: selectedPreset.docsUrl,
      color: "text-q_black",
      isConfigured: openaiConfigured,
    },
    {
      id: "gemini" as AIModelType,
      name: t("dashboard.settings.ai.gemini.title"),
      description: t("dashboard.settings.ai.gemini.description"),
      icon: Sparkles,
      link: "https://aistudio.google.com/app/apikey",
      color: "text-q_acid",
      isConfigured: !!(geminiApiKey && geminiModelId),
    },
  ];

  return (
    <div className="mx-auto py-4 px-4">
      <div className="flex gap-8">
        <div className="w-64 space-y-6">
          <div className="flex flex-col space-y-1">
            {models.map((model) => {
              const Icon = model.icon;
              const isChecked = selectedModel === model.id;
              const isViewing = currentModel === model.id;

              return (
                <div
                  key={model.id}
                  onClick={() => setCurrentModel(model.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left border",
                    "transition-all duration-200 cursor-pointer",
                    "hover:bg-q_acid/10 hover:border-q_acid/30",
                    isViewing
                      ? "bg-q_acid/10 border-q_acid/40"
                      : "border-transparent"
                  )}
                >
                  <div
                    className={cn(
                      "shrink-0",
                      isViewing ? "text-q_black" : "text-muted-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col items-start">
                    <span
                      className={cn(
                        "font-medium text-sm",
                        isViewing && "text-q_black"
                      )}
                    >
                      {model.name}
                    </span>
                    <span className="text-xs text-muted-foreground truncate w-full">
                      {model.isConfigured
                        ? t("common.configured")
                        : t("common.notConfigured")}
                    </span>
                  </div>
                  <button
                    type="button"
                    aria-label={`Select ${model.name}`}
                    onClick={() => {
                      setSelectedModel(model.id);
                      setCurrentModel(model.id);
                    }}
                    className={cn(
                      "h-6 w-6 rounded-md flex items-center justify-center border transition-all",
                      "shrink-0",
                      isChecked
                        ? "bg-q_acid border-q_acid text-q_bone"
                        : "bg-transparent border-muted-foreground/40 text-transparent hover:border-q_acid/40"
                    )}
                  >
                    <Check className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex-1 max-w-2xl">
          {models.map(
            (model) =>
              model.id === currentModel && (
                <div key={model.id} className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-semibold flex items-center gap-2">
                      <div className={cn("shrink-0", model.color)}>
                        <model.icon className="h-6 w-6" />
                      </div>
                      {model.name}
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                      {model.description}
                    </p>
                  </div>

                  <div className="space-y-6">
                    {model.id === "openai" && (
                      <div className="space-y-4 rounded-xl border border-border/80 bg-background/60 p-4">
                        <div className="space-y-2">
                          <Label className="text-base font-medium">
                            {t("dashboard.settings.ai.openai.providerPreset")}
                          </Label>
                          <Select
                            value={openaiProviderPresetId}
                            onValueChange={(value) => {
                              const presetId = value as OpenAICompatiblePresetId;
                              const preset = getOpenAICompatiblePresetById(presetId);
                              setOpenaiProviderPresetId(presetId);
                              setOpenaiApiKeyOptional(!preset.requiresApiKey);
                            }}
                          >
                            <SelectTrigger className="h-11">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {OPENAI_COMPATIBLE_PRESETS.map((preset) => (
                                <SelectItem key={preset.id} value={preset.id}>
                                  {preset.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-muted-foreground">
                            {selectedPreset.description}
                          </p>
                        </div>

                        <div className="space-y-1 text-xs text-muted-foreground">
                          <p>
                            {t("dashboard.settings.ai.openai.recommendedEndpoint")}
                            ：{" "}
                            {selectedPreset.recommendedEndpoint ||
                              t("dashboard.settings.ai.openai.notProvided")}
                          </p>
                          <p>
                            {t("dashboard.settings.ai.openai.recommendedModel")}：
                            {" "}
                            {selectedPreset.recommendedModel ||
                              t("dashboard.settings.ai.openai.notProvided")}
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            className="h-9"
                            onClick={applyOpenAIPresetRecommendation}
                          >
                            {t("dashboard.settings.ai.openai.applyRecommended")}
                          </Button>
                          <a
                            href={selectedPreset.docsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-muted-foreground hover:text-q_acid flex items-center gap-1"
                          >
                            {t("dashboard.settings.ai.getApiKey")}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>

                        <div className="flex items-center justify-between gap-4 rounded-lg border border-border/60 px-3 py-2.5">
                          <div className="space-y-1">
                            <p className="text-sm font-medium">
                              {t("dashboard.settings.ai.openai.apiKeyOptional")}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {t(
                                "dashboard.settings.ai.openai.apiKeyOptionalDescription"
                              )}
                            </p>
                          </div>
                          <Switch
                            checked={openaiApiKeyOptional}
                            onCheckedChange={setOpenaiApiKeyOptional}
                          />
                        </div>
                      </div>
                    )}

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-base font-medium">
                          {t(`dashboard.settings.ai.${model.id}.apiKey`)}
                        </Label>
                        {model.id !== "openai" && (
                          <a
                            href={model.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-muted-foreground hover:text-q_acid flex items-center gap-1"
                          >
                            {t("dashboard.settings.ai.getApiKey")}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                      <Input
                        value={
                          model.id === "doubao"
                            ? doubaoApiKey
                            : model.id === "openai"
                              ? openaiApiKey
                              : model.id === "gemini"
                                ? geminiApiKey
                                : deepseekApiKey
                        }
                        onChange={(e) => handleApiKeyChange(e, model.id)}
                        type="password"
                        placeholder={t(
                          `dashboard.settings.ai.${model.id}.apiKey`
                        )}
                        className={cn(
                          "h-11",
                          "bg-background",
                          "border-border",
                          "focus:ring-2 focus:ring-q_acid/20"
                        )}
                      />
                    </div>

                    {model.id === "doubao" && (
                      <div className="space-y-4">
                        <Label className="text-base font-medium">
                          {t("dashboard.settings.ai.doubao.modelId")}
                        </Label>
                        <Input
                          value={doubaoModelId}
                          onChange={(e) => handleModelIdChange(e, "doubao")}
                          placeholder={t("dashboard.settings.ai.doubao.modelId")}
                          className={cn(
                            "h-11",
                            "bg-background",
                            "border-border",
                            "focus:ring-2 focus:ring-q_acid/20"
                          )}
                        />
                      </div>
                    )}

                    {model.id === "openai" && (
                      <>
                        <div className="space-y-4">
                          <Label className="text-base font-medium">
                            {t("dashboard.settings.ai.openai.modelId")}
                          </Label>
                          <Input
                            value={openaiModelId}
                            onChange={(e) => handleModelIdChange(e, "openai")}
                            placeholder={t("dashboard.settings.ai.openai.modelId")}
                            className={cn(
                              "h-11",
                              "bg-background",
                              "border-border",
                              "focus:ring-2 focus:ring-q_acid/20"
                            )}
                          />
                        </div>

                        <div className="space-y-4">
                          <Label className="text-base font-medium">
                            {t("dashboard.settings.ai.openai.apiEndpoint")}
                          </Label>
                          <Input
                            value={openaiApiEndpoint}
                            onChange={(e) =>
                              setOpenaiApiEndpoint(e.target.value)
                            }
                            placeholder={t(
                              "dashboard.settings.ai.openai.apiEndpoint"
                            )}
                            className={cn(
                              "h-11",
                              "bg-background",
                              "border-border",
                              "focus:ring-2 focus:ring-q_acid/20"
                            )}
                          />
                        </div>
                      </>
                    )}

                    {model.id === "gemini" && (
                      <div className="space-y-4">
                        <Label className="text-base font-medium">
                          {t("dashboard.settings.ai.gemini.modelId")}
                        </Label>
                        <Input
                          value={geminiModelId}
                          onChange={(e) => handleModelIdChange(e, "gemini")}
                          placeholder={t("dashboard.settings.ai.gemini.modelId")}
                          className={cn(
                            "h-11",
                            "bg-background",
                            "border-border",
                            "focus:ring-2 focus:ring-q_acid/20"
                          )}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export const runtime = "edge";

export default AISettingsPage;
