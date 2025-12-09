<template>
  <!-- 
    Global elements that appear on ALL slides:
    - Confidential label
    - Page number (X of Y)
    
    Configure positioning and styling via CSS variables in style.css
    
    $slidev is automatically injected by Slidev and provides:
    - $slidev.nav.currentPage - current slide number
    - $slidev.nav.total - total number of slides
  -->
  
  <!-- Confidential Label -->
  <div class="confidential-label">
    CONFIDENTIAL
  </div>
  
  <!-- Page Number (hidden if slide has 'no-page-number' class in frontmatter) -->
  <div v-if="!hidePageNumber" class="page-number">
    {{ $slidev.nav.currentPage }} of {{ $slidev.nav.total }}
  </div>
</template>

<script setup>
import { inject, computed } from 'vue'

// $slidev is provided globally by Slidev via Vue's inject system
const $slidev = inject('$slidev')

// Check if current slide has 'no-page-number' in its class frontmatter
const hidePageNumber = computed(() => {
  try {
    const currentSlide = $slidev?.nav?.currentSlideRoute?.meta?.slide
    const slideClass = currentSlide?.frontmatter?.class || ''
    return slideClass.includes('no-page-number')
  } catch {
    return false // Default: show page number if anything fails
  }
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
