<template>
  <!-- 
    Global elements that appear on ALL slides:
    - Confidential label
    - Page number (X of Y)
    
    Configure positioning and styling via CSS variables in style.css
  -->
  
  <!-- Confidential Label -->
  <div class="confidential-label">
    CONFIDENTIAL
  </div>
  
  <!-- Page Number (hidden on first slide) -->
  <div v-if="showPageNumber" class="page-number">
    {{ currentSlideNo }} of {{ total }}
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useNav } from '@slidev/client'

const { currentSlideNo, total } = useNav()

// Hide page number on first slide only
const showPageNumber = computed(() => {
  return currentSlideNo.value > 1
})
</script>

<style scoped>
/* ===========================================
   CONFIDENTIAL LABEL - Position & Style
   Configure via CSS variables in style.css
   =========================================== */
.confidential-label {
  position: fixed;
  
  /* Position - controlled by CSS variables */
  top: var(--confidential-top, auto);
  bottom: var(--confidential-bottom, 1.5rem);
  left: var(--confidential-left, 1.5rem);
  right: var(--confidential-right, auto);
  
  /* Typography */
  font-size: var(--confidential-font-size, 0.6rem);
  letter-spacing: var(--confidential-tracking, 0.15em);
  color: var(--confidential-color, #999);
  
  /* Style */
  font-weight: 500;
  text-transform: uppercase;
  z-index: 100;
}

/* ===========================================
   PAGE NUMBER - Position & Style
   Configure via CSS variables in style.css
   =========================================== */
.page-number {
  position: fixed;
  
  /* Position - controlled by CSS variables */
  top: var(--page-number-top, auto);
  bottom: var(--page-number-bottom, 1.5rem);
  left: var(--page-number-left, auto);
  right: var(--page-number-right, 1.5rem);
  
  /* Typography */
  font-size: var(--page-number-font-size, 0.6rem);
  color: var(--page-number-color, #666);
  
  /* Style */
  font-weight: 400;
  z-index: 100;
}
</style>
