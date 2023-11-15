<template>
  <UCard>
    <div class="flex justify-between">
      <div class="mr-auto flex">
        <div class="mr-2 my-auto">Github</div>
      </div>
      <div class="ml-auto flex">
        <UButton
          :icon="
            isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
          "
          color="gray"
          variant="ghost"
          class="my-auto"
          aria-label="Theme"
          @click="isDark = !isDark"
        />
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
</script>

<style scoped></style>
