<script setup lang="ts">
import { onBeforeUnmount, onMounted } from "vue";
import { useRouter } from "vue-router";
import Modal from "./Modal.vue";
import Toast from "./Toast.vue";
import { useModal } from "../composables/useModal";
import { useToast } from "../composables/useToast";
import { SENDER_PC, SENDER_PIS } from "../composables/usePlatform";
import { createPISHandler } from "../utils/eventPIS.ts";
import { BASE_IFRAME_URL } from "../utils/constant";
import { parseEventData } from "../utils/event.ts";
import { createPCHandler } from "../utils/eventPC.ts";
import type { eventAdapter } from "../type/event";

const router = useRouter();
const modal = useModal();
const toast = useToast();

const stateEventPIS: eventAdapter = {
  modal: (o) => modal.open(o),
  toast: (o) => toast.show(o),
  navigate: (path) => router.push(path),
};

const eventPISHandler = createPISHandler(stateEventPIS);
const eventPCHandler = createPCHandler(stateEventPIS);

function handleEventIframe(event: MessageEvent) {
  if (event.origin !== BASE_IFRAME_URL) return;

  const eventData = parseEventData(event.data);
  if (!eventData) return;

  switch (eventData.sender) {
    case SENDER_PIS:
      eventPISHandler(eventData);
      break;
    case SENDER_PC:
      eventPCHandler(eventData);
      break;
    default:
      console.warn("Unknown sender:", eventData.sender);
  }
}

onMounted(() => {
  window.addEventListener("message", handleEventIframe);
});

onBeforeUnmount(() => {
  window.removeEventListener("message", handleEventIframe);
});
</script>

<template>
  <Modal
    v-if="modal.state.open"
    :message="modal.state.message"
    :icon="modal.state.icon"
    :warning-text="modal.state.warningText"
    :confirm-text="modal.state.confirmText"
    :cancel-text="modal.state.cancelText"
    @confirm="modal.confirm"
    @cancel="modal.cancel"
    @close="modal.close"
  />

  <Toast
    :toast-list="toast.state.list"
    @dismiss="(id: number)=>toast.dismiss(id)"
  />
</template>

<style scoped></style>
