<script setup lang="ts">
import { computed } from 'vue'
import { handleBackground } from '../layoutHelper'

const style = computed(() => handleBackground('/img/footer.png'))
</script>

<template>
  <div class="slidev-layout fact" :style="style">
    <div class="my-auto">
      <slot />
    </div>
  </div>
</template>
