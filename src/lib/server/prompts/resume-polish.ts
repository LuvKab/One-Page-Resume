const MAX_CUSTOM_INSTRUCTIONS_LENGTH = 1200;

const BASE_RESUME_POLISH_PROMPT = `你是专业的简历润色助手，请仅对用户给出的简历内容进行润色，并严格遵守以下规则：

1. 不允许编造经历、数据、奖项或技能；只能基于原文改写表达。
2. 保留原始事实与时间线，不改变事实语义。
3. 保留 Markdown 结构（标题、列表、加粗、换行层级）：
   - 列表必须保持列表
   - 加粗必须保持加粗
   - 段落层级不要打乱
4. 语言风格要求专业、简洁、结果导向，优先突出量化成果与可验证价值。
5. 输出必须是可直接替换原文的 Markdown 正文，不要添加解释、前言、后记或代码块围栏。
6. 语言与原文保持一致（中文输入输出中文，英文输入输出英文）。
`;

const normalizeCustomInstructions = (input?: string) => {
  const normalized = (input || "").trim();
  if (!normalized) {
    return "";
  }
  return normalized.slice(0, MAX_CUSTOM_INSTRUCTIONS_LENGTH);
};

export const buildResumePolishPrompt = (customInstructions?: string) => {
  const normalized = normalizeCustomInstructions(customInstructions);
  if (!normalized) {
    return BASE_RESUME_POLISH_PROMPT;
  }

  return `${BASE_RESUME_POLISH_PROMPT}

用户附加要求（在不违反上述硬约束的前提下执行）：
${normalized}`;
};

