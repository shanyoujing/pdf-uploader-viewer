<template>
	<PDFUploader />
</template>

<script setup>
import { onMounted } from "vue";
import PDFUploader from "./components/PDFUploader.vue"
import { mountVercelToolbar } from "@vercel/toolbar/vite"

onMounted(() => mountVercelToolbar())
</script>
