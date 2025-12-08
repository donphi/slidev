<script setup lang="ts">
import { computed } from 'vue'
import { handleBackground } from '../layoutHelper'

// Default layout automatically applies footer background to all regular slides
// This won't affect slides using other layouts (intro, cover, section, etc.)

const style = computed(() => handleBackground('/img/footer.png'))
</script>

<template>
  <!-- 
    Default layout for all content slides:
    - Applies footer.png as background
    - Standard padding for content
    
    To change the background for all regular slides, 
    edit the path in handleBackground() above
  -->
  <div class="slidev-layout default" :style="style">
    <slot />
  </div>
</template>

