// composables/useToast.ts
import { reactive } from "vue";
import { eventToastIcons } from "../type/event";
export type ToastType = "success" | "error";
export type ToastItem = {
  id: number;
  message: string;
  type: ToastType;
  icon: eventToastIcons;
};

const state = reactive<{ list: ToastItem[] }>({ list: [] });
let seq = 0;

export function useToast() {
  function show(o: Omit<ToastItem, "id">) {
    const id = ++seq;
    state.list.push({ ...o, id });
    setTimeout(() => dismiss(id), 3000);
  }
  function dismiss(id: number) {
    const i = state.list.findIndex((t) => t.id === id);
    if (i >= 0) state.list.splice(i, 1);
  }
  return { state, show, dismiss };
}
