<template>
  <UContainer class="my-5">
    <Header class="mb-3" />
    <div class="flex flex-col lg:flex-row gap-3">
      <UCard class="w-full lg:w-1/2">
        <template v-slot:header> Your test configurations</template>
        <UTextarea :rows="20" v-model="value" />
        <template v-slot:footer> Token count: 321</template>
      </UCard>
      <UCard class="w-full lg:w-1/2">
        <template #header> Generated Tests </template>
        <VCodeBlock
          :code="code"
          highlightjs
          lang="javascript"
          :theme="isDark ? 'ir-black' : 'grayscale'"
        />
      </UCard>
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import VCodeBlock from "@wdns/vue-code-block";
const currentTheme = useColorMode();
const isDark = computed(() => {
  return currentTheme.value === "dark";
});
const value = ref("");

const code = ref(`<script>const foo = 'bar';<script>`);
</script>

<style scoped></style>
