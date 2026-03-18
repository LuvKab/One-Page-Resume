const encoder = new TextEncoder();

const parseLineToDelta = (line: string) => {
  const trimmed = line.trim();
  if (!trimmed || !trimmed.startsWith("data:")) return null;

  const payload = trimmed.slice(5).trim();
  if (!payload || payload === "[DONE]") return null;

  try {
    const data = JSON.parse(payload);
    const deltaContent = data?.choices?.[0]?.delta?.content;
    return typeof deltaContent === "string" ? deltaContent : null;
  } catch (error) {
    return null;
  }
};

export const createOpenAICompatibleTextStream = (
  response: Response
): ReadableStream<Uint8Array> =>
  new ReadableStream({
    async start(controller) {
      if (!response.body) {
        controller.close();
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split(/\r?\n/);
          buffer = lines.pop() || "";

          for (const line of lines) {
            const delta = parseLineToDelta(line);
            if (delta) {
              controller.enqueue(encoder.encode(delta));
            }
          }
        }

        if (buffer) {
          const delta = parseLineToDelta(buffer);
          if (delta) {
            controller.enqueue(encoder.encode(delta));
          }
        }

        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });

