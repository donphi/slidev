<script setup lang="ts">
import { computed } from 'vue'
import { handleBackground } from '../layoutHelper'

const style = computed(() => handleBackground('/img/footer.png'))
</script>

<template>
  <div class="slidev-layout section w-full h-full grid" :style="style">
    <div class="my-auto text-center">
      <slot />
    </div>
  </div>
</template>
