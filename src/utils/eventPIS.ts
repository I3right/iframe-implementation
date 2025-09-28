import {
  type eventPayload,
  type eventAdapter,
  type pisEventToastPayload,
  type pisEventModalPayload,
  type pisEventNavigatePayload,
  type eventModalOptions,
} from "../type/event";
import { PATH_APP_PAGE_LIST } from "./constant";
import {
  TOPIC_MODAL_CANCEL_ADD,
  TOPIC_MODAL_REMOVE_PRODUCT,
  TOPIC_MODAL_REMOVE_SETTING,
  TOPIC_MODAL_REMOVE_VARIANT,
  TOPIC_REDIRECT,
  TOPIC_RESP_REMOVE_PRODUCT,
  TOPIC_RESP_REMOVE_SETTING,
  TOPIC_RESP_REMOVE_VARIANT,
  TOPIC_TOAST_CREATE_UPDATE_PRODUCT,
  TOPIC_TOAST_REMOVE_PRODUCT,
} from "./topic";
import { createResponseEvent, responseEventToIframe } from "./event";

function responseModalWithEvent(topic: string, payloadData: any) {
  const responseEvent = createResponseEvent(TOPIC_RESP_REMOVE_PRODUCT, {
    data: { id: payloadData.id },
  });

  if (topic === TOPIC_MODAL_REMOVE_VARIANT) {
    responseEvent.topic = TOPIC_RESP_REMOVE_VARIANT;
  }

  if (topic === TOPIC_MODAL_REMOVE_SETTING) {
    responseEvent.topic = TOPIC_RESP_REMOVE_SETTING;
  }

  return () => responseEventToIframe(responseEvent);
}

function handleConfirmModal(
  adapter: eventAdapter,
  topic: string,
  payloadData: any
) {
  if (topic === TOPIC_MODAL_CANCEL_ADD) {
    return () => adapter.navigate(PATH_APP_PAGE_LIST);
  }

  return responseModalWithEvent(topic, payloadData);
}

function getNavigatePayload(
  payload: Record<string, any>
): pisEventNavigatePayload {
  let navigatePayload: pisEventNavigatePayload = { origin: "", path: "" };
  if (typeof payload.origin === "string" && typeof payload.path === "string") {
    navigatePayload = { origin: payload.origin, path: payload.path };
  }
  return navigatePayload;
}

function convertPayloadIconToAdapter(
  payload: pisEventModalPayload["icon"]
): eventModalOptions["icon"] {
  let iconAdapter: eventModalOptions["icon"] = {
    name: "warning",
    type: "ssk-icon-color",
  };

  if (payload.name && payload.color) {
    return (iconAdapter = { name: payload.color, type: payload.name });
  }

  if (payload.style && payload.icon) {
    return (iconAdapter = { name: payload.icon, type: payload.style });
  }

  return iconAdapter;
}

export function createPISHandler(adapter: eventAdapter) {
  return function handleEventPIS(ev: eventPayload) {
    const { topic, payload } = ev;

    switch (topic) {
      // MODAL
      case TOPIC_MODAL_REMOVE_PRODUCT:
      case TOPIC_MODAL_REMOVE_VARIANT:
      case TOPIC_MODAL_REMOVE_SETTING:
      case TOPIC_MODAL_CANCEL_ADD: {
        const payloadModal: pisEventModalPayload = payload?.modal;
        if (!payloadModal) break;
        adapter.modal({
          message: payloadModal.message,
          icon: convertPayloadIconToAdapter(payloadModal.icon),
          warningText: payloadModal.warningText ?? "",
          data: payloadModal.data ?? {},
          confirmText: topic === TOPIC_MODAL_CANCEL_ADD ? "ยกเลิก" : "ลบ",
          cancelText: topic === TOPIC_MODAL_CANCEL_ADD ? "อยู่ต่อ" : "ยกเลิก",
          onConfirm: handleConfirmModal(adapter, topic, payloadModal.data),
          onCancel: () => {},
        });
        break;
      }

      // TOAST
      case TOPIC_TOAST_CREATE_UPDATE_PRODUCT:
      case TOPIC_TOAST_REMOVE_PRODUCT: {
        const payloadToast: pisEventToastPayload = payload?.toast;
        if (!payloadToast) break;
        adapter.toast({
          message: payloadToast.message,
          type: payloadToast.type,
          icon: payloadToast.icon,
        });
        break;
      }

      // REDIRECT
      case TOPIC_REDIRECT: {
        const navigatePayload = getNavigatePayload(payload);
        adapter.navigate(navigatePayload.path);
        break;
      }

      default:
        console.warn("Unhandled PIS topic:", topic, payload);
    }
  };
}
