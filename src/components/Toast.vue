<script setup lang="ts">
import { ToastItem } from "../composables/useToast";
const props = defineProps<{
  toastList: ToastItem[];
}>();

const emit = defineEmits<{
  (e: "dismiss", id: number): void;
}>();
</script>

<template>
  <div class="toast-outer">
    <div class="toast-container">
      <transition-group name="fade" tag="div" class="toast-stack">
        <div
          v-for="t in props.toastList"
          :key="t.id"
          class="toast"
          :class="'is-' + t.type"
        >
          <span class="icon" v-if="t.icon"> {{ t.icon.icon }}</span>
          <span class="message">{{ t.message }}</span>
          <button class="close" type="button" @click="emit('dismiss', t.id)">
            ×
          </button>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<style scoped>
.toast-outer {
  width: 100vw;
  position: fixed;
  top: 1rem;
  z-index: 1100;
  display: flex;
  justify-content: center;
  pointer-events: none;
}

.toast-stack {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  pointer-events: none;
}

.toast {
  pointer-events: auto;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  line-height: 1.2;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
  opacity: 0.98;
  background: #333;
}

.toast.is-success {
  background: #16a34a;
}
.toast.is-error {
  background: #dc2626;
}

.close {
  margin-left: 6px;
  background: transparent;
  border: none;
  color: inherit;
  font-size: 16px;
  cursor: pointer;
  line-height: 1;
  opacity: 0.9;
}
.close:hover {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
