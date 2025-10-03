<script setup lang="ts">
import { getIframeUrl } from "../utils/helper";
import { pageIframe } from "../utils/constant";
import { usePlatform } from "../composables/usePlatform";

const { getIframeId } = usePlatform();
const props = defineProps<{
  pageType: pageIframe;
}>();
</script>

<template>
  <section class="iframe-container">
    <iframe
      :id="getIframeId()"
      :src="getIframeUrl(props.pageType)"
      width="100%"
      height="100%"
    />
  </section>
</template>

<style scoped>
.iframe-container {
  width: 100%;
  background: #f9fafb;
  padding: 2rem;

  iframe {
    border: none;
  }
}
</style>
