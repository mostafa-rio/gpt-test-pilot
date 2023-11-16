<template>
  <UContainer class="my-5">
    <Header class="mb-3" />

    <UModal :prevent-close="true" v-model="isLoadingModalOpen">
      <div class="p-4 text-center">
        GPT is generating test. <br />
        Please Wait...
      </div>
    </UModal>

    <div class="flex relative flex-col lg:flex-row gap-3">
      <UCard class="w-full lg:w-1/2">
        <template v-slot:header> Your test configurations</template>
        <UTextarea :rows="20" v-model="codeToTest" />

        <div class="mt-3">
          <label class="text-xs" for="type-of-test"> Select a test </label>
          <USelect
            id="type-of-test"
            v-model="typeOfTest"
            :options="typeOfTestOptions"
          />
        </div>

        <div class="mt-3">
          <label id="technologies" class="text-xs" for="type-of-test">
            Technologies to use in test ( separated by commas )
          </label>
          <UTextarea
            :rows="4"
            v-model="technologies"
            id="technologies"
            placeholder="Jest, Mocha"
          />
        </div>

        <div class="mt-3">
          <label class="text-xs" for="instructions">Custom Instructions</label>
          <UTextarea
            :rows="4"
            id="instructions"
            v-model="instructions"
            placeholder="Target the header element with the id of #header"
          />
        </div>
        <div class="mt-3">
          <label class="text-xs" for="apiKey"
            >OpenAI API Key ( Wont be saved )
          </label>
          <UTextarea
            :rows="2"
            id="apiKey"
            v-model="apiKey"
            placeholder="OPENAI_API_KEY"
          />
        </div>

        <div class="mt-3">
          <UButton @click="generateTest">Generate</UButton>
        </div>
        <!-- <template v-slot:footer> Token count: 321</template> -->
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
import type { TypeOfTest, GenerateTestParams } from "@/types";
import VCodeBlock from "@wdns/vue-code-block";
const currentTheme = useColorMode();
const typeOfTestOptions: TypeOfTest[] = ["Endt to end", "Integration", "Unit"];
const typeOfTest = ref<TypeOfTest>("Unit");
const isDark = computed(() => {
  return currentTheme.value === "dark";
});
const isLoadingModalOpen = ref(false);
const technologies = ref("");
const codeToTest = ref("");
const code = ref(``);
const instructions = ref("");
const apiKey = ref("");

const generateTest = async () => {
  try {
    isLoadingModalOpen.value = true;
    const body: GenerateTestParams = {
      instructions: instructions.value,
      technologies: technologies.value,
      type: typeOfTest.value,
      code: codeToTest.value,
      apiKey: apiKey.value,
    };
    const dataRes = await $fetch<{ success: boolean; body: any }>(
      "/api/generateTest",
      {
        method: "POST",
        body,
      }
    );
    code.value = dataRes.body.message.content;
    isLoadingModalOpen.value = false;
  } catch (err) {
    console.log(err);
    isLoadingModalOpen.value = false;
  }
};
</script>

<style scoped></style>
