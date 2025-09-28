import { usePlatform } from "../composables/usePlatform";
import type { eventPayload } from "../type/event";
import { BASE_IFRAME_URL, PLATFORM_NAME } from "./constant";

const { getIframeElement } = usePlatform();

export function parseEventData(data: unknown): eventPayload | null {
  try {
    if (typeof data === "object" && data !== null) return data as eventPayload;
    if (typeof data === "string") return JSON.parse(data) as eventPayload;
  } catch {
    console.error("Failed to parse event data:", data);
  }
  return null;
}

function mapEventPayload(eventPayload: eventPayload): string {
  return JSON.stringify(eventPayload);
}

export function createResponseEvent(
  topic: string = "",
  payload: any = {}
): eventPayload {
  return { sender: PLATFORM_NAME, topic, payload };
}

export function responseEventToIframe(eventPayload: eventPayload) {
  const iframeElement = getIframeElement();
  if (!iframeElement || !iframeElement.contentWindow) return;

  const respPayload = mapEventPayload(eventPayload);
  if (respPayload.length === 0) return;
  iframeElement.contentWindow.postMessage(respPayload, BASE_IFRAME_URL);
}
