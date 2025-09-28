import { eventAdapter, eventPayload } from "../type/event";

// RECIVER
enum topicPC {
  MODAL_SOMTHING = "add event modal here",
  TOAST_SOMTHING = "add event toast here",
  REDIRECT = "add event redirect here",
}

// SENDER
// TODO: ADD enum topic

// TODO: Implement logic
function getNavigatePayload() {
  return "";
}

export function createPCHandler(adapter: eventAdapter) {
  return function handleEventPC(ev: eventPayload) {
    const { topic, payload } = ev;

    switch (topic) {
      // MODAL
      case topicPC.MODAL_SOMTHING: {
        const payloadModal = payload?.modal; // TODO: Add type payloadModal
        if (!payloadModal) break;
        console.log("payloadModal :>> ", payloadModal);
        break;
      }

      // TOAST
      case topicPC.TOAST_SOMTHING: {
        const payloadToast = payload?.toast; // TODO: Add type payloadToast
        if (!payloadToast) break;

        console.log("payloadToast :>> ", payloadToast);

        break;
      }

      // REDIRECT
      case topicPC.REDIRECT: {
        const navigatePayload = getNavigatePayload();
        adapter.navigate(navigatePayload); // TODO: implement type
        break;
      }

      default:
        console.warn("Unhandled PC topic:", topic, payload);
    }
  };
}
