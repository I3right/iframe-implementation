<script setup lang="ts">
import NavBar from "../components/NavBar.vue";
import IframeApp from "../components/IframeApp.vue";
import ModalAndToast from "../components/ModalAndToast.vue";
import { pageIframe } from "../utils/constant";

const props = defineProps<{
  pageType: pageIframe;
}>();
</script>

<template>
  <div style="display: flex; height: inherit">
    <NavBar />
    <IframeApp :page-type="props.pageType" />
    <ModalAndToast />
  </div>
</template>

<style></style>
