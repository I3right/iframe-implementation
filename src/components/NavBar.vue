<script setup lang="ts">
import { getPageAppURL } from "../utils/helper";
import { usePlatform } from "../composables/usePlatform";
import { pageIframe } from "../utils/constant";
import router from "../routes";

const { isPISIframe } = usePlatform();
function handleClickButton(page: pageIframe) {
  router.push({ path: getPageAppURL(page) });
}
</script>

<template>
  <section class="mocknav">
    <button name="button page list" @click="handleClickButton(pageIframe.LIST)">
      {{ isPISIframe() ? "Page product list" : "Page catalog list" }}
    </button>
    <button name="button page Add" @click="handleClickButton(pageIframe.ADD)">
      {{ isPISIframe() ? "Page add product" : "Page add catalog" }}
    </button>
  </section>
</template>

<style scoped>
.mocknav {
  width: 250px;
  border-right: 1px solid #e5e7eb;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mocknav button {
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: #f9fafb;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.mocknav button:hover {
  background-color: #f3f4f6;
  border-color: #9ca3af;
}

.mocknav button:active {
  background-color: #e5e7eb;
}
</style>
