<script setup lang="ts">
import { defineEmits } from "vue";

const emit = defineEmits(["confirm", "cancel"]);

import { defineProps } from "vue";
import { ModalState } from "../composables/useModal";

const props = defineProps<{
  message: string;
  icon?: ModalState["icon"];
  warningText: string;
  confirmText: string;
  cancelText: string;
}>();
</script>

<template>
  <div class="modal-outer">
    <div class="modal-container">
      <section class="info-container">
        <div>{{ props.icon }}</div>
        <p class="message">{{ props.message }}</p>
        <p class="warning-text">{{ props.warningText }}</p>
      </section>
      <section class="btn-container">
        <button @click="emit('cancel')">{{ props.cancelText }}</button>
        <button @click="emit('confirm')">{{ props.confirmText }}</button>
      </section>
    </div>
  </div>
</template>

<style scoped>
.modal-outer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100dvh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  min-width: 300px;
  text-align: center;
}

.message,
.warning-text {
  font-size: large;
}

.btn-container {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;

  button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: medium;
    background-color: rgb(238, 165, 29);
    color: white;
    transition: background-color 0.3s;
  }
}
</style>
