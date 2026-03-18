# 一页简历 (One Page Resume)

一个注重排版控制与交付质量的 AI 简历编辑器：本地优先存储、实时预览、模块化编辑与高质量 PDF 导出。

- 仓库地址: https://github.com/LuvKab/resume-master
- 技术栈: TanStack Start + React 18 + TypeScript + Tailwind + TipTap

## 主要能力

- 模块级高度调节（含头像区域）
- 模块拖拽排序与可视化布局控制
- AI 润色与语法检查
- 本地优先数据存储（隐私友好）
- 一键导出 PDF（投递场景）
- OpenAI 兼容接入（官方 / 中转 / 本地）

## 快速开始

```bash
pnpm install
pnpm dev
```

启动后请以终端输出地址为准。

## 构建与运行

```bash
pnpm build
pnpm start
```

## 常用脚本

| 命令 | 说明 |
| --- | --- |
| `pnpm dev` | 本地开发 |
| `pnpm build` | 生产构建（客户端 + SSR） |
| `pnpm preview` | 预览构建产物 |
| `pnpm start` | 启动服务端 |
| `pnpm generate:template-snapshots` | 生成模板快照 |

## 项目结构

```text
src/
  app/                 # 页面与布局
  components/          # UI 组件
  routes/              # 路由与 API 入口
  i18n/                # 多语言文案
  config/              # 常量与配置
  store/               # Zustand 状态
  utils/               # 工具函数
```

## AI 配置说明

### 1) 前端手动配置（默认）

在「仪表盘 -> AI 配置」中填写 API 信息。

当前支持：

- 官方: OpenAI、DeepSeek、Doubao、Gemini
- OpenAI 兼容预设: Qwen、Zhipu、Kimi、OpenRouter、SiliconFlow、Together
- 本地: Ollama、LM Studio

说明：

- 所有 API 相关输入框默认均为空
- 预设仅给出推荐 Endpoint / Model
- 需点击“应用推荐值”后才会回填
- 本地或免鉴权网关可启用“API Key 可选”

### 2) 服务端托管模式（可选）

如需避免用户在前端填写密钥，可启用服务端托管：

```env
VITE_SERVER_MANAGED_AI=true
DEFAULT_AI_MODEL=openai
OPENAI_API_KEY=...
OPENAI_MODEL_ID=...
OPENAI_API_ENDPOINT=...
```

也支持 `doubao` / `deepseek` / `gemini` 对应环境变量。

## 可自定义项

- 品牌与导出相关: `src/config/constants.ts`
- SEO 信息: `src/routes/$locale.tsx`、`src/routes/__root.tsx`
- 首页视觉内容: `src/app/(public)/[locale]/page.tsx`

## GitHub Actions 说明

未配置以下 Secret 时，相关发布/部署任务会自动跳过，不会导致 CI 失败：

- Docker: `DOCKERHUB_USERNAME`、`DOCKERHUB_TOKEN`
- Cloudflare: `CLOUDFLARE_API_TOKEN`、`CLOUDFLARE_ACCOUNT_ID`
