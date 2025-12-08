<script setup lang="ts">
import { computed } from 'vue'
import { handleBackground } from '../layoutHelper'

const props = defineProps({
  background: {
    default: '',
  },
})

const style = computed(() => handleBackground(props.background))
</script>

<template>
  <!-- 
    Main container: 
    - relative: establishes positioning context for absolute children
    - !p-0: removes default slidev-layout padding (! = important)
    - :style applies the background image
  -->
  <div class="slidev-layout intro h-full relative !p-0" :style="style">
    
    <!-- 
      Content container with ABSOLUTE positioning:
      - absolute: positions relative to the slide edges (ignores parent padding)
      - text-right: right-align all text
      
      Position controls (distance from edges):
      - right-XX: distance from RIGHT edge
      - bottom-XX: distance from BOTTOM edge
      
      Values: 0=0px, 4=16px, 8=32px, 12=48px, 16=64px, 20=80px, 24=96px, 32=128px
      
      ADJUST THESE to move the text:
      - right-12 → increase to move LEFT, decrease to move RIGHT
      - bottom-8 → increase to move UP, decrease to move DOWN (can go to bottom-4, bottom-2, bottom-0)
    -->
    <div class="absolute right-24 bottom-30 text-right">
      <slot />
    </div>
  </div>
</template>
