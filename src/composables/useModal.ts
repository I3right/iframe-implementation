// composables/useModal.ts
import { reactive } from "vue";

export type ModalState = {
  open: boolean;
  message: string;
  icon: { name: string; type: string };
  warningText: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
};

const state = reactive<ModalState>({
  open: false,
  message: "",
  icon: { name: "", type: "" },
  warningText: "",
  confirmText: "ตกลง",
  cancelText: "ยกเลิก",
  onConfirm: () => {},
  onCancel: () => {},
});

export function useModal() {
  function open(opts: Partial<typeof state> & { message: string }) {
    Object.assign(state, opts, { open: true });
  }
  function close() {
    state.open = false;
    reset();
  }
  function confirm() {
    state.onConfirm?.();
    close();
  }
  function cancel() {
    state.onCancel?.();
    close();
  }
  function reset() {}
  return { state, open, close, confirm, cancel };
}
