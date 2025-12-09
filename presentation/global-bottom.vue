<template>
  <!-- 
    Global elements that appear on ALL slides:
    - Confidential label
    - Page number (X of Y)
    
    Configure positioning and styling via CSS variables in style.css
    
    slidevContext is injected from Slidev and provides:
    - slidevContext.nav.currentPage - current slide number
    - slidevContext.nav.total - total number of slides
  -->
  
  <!-- Confidential Label -->
  <div class="confidential-label">
    CONFIDENTIAL
  </div>
  
  <!-- Page Number (hidden if slide has 'no-page-number' class in frontmatter or context not ready) -->
  <div v-if="showPageNumber" class="page-number">
    {{ currentPage }} of {{ totalPages }}
  </div>
</template>

<script setup>
import { inject, computed } from 'vue'

// Access Slidev context - may be undefined initially
const slidevContext = inject('$slidev', null)

// Safely get current page number
const currentPage = computed(() => {
  return slidevContext?.nav?.currentPage ?? 1
})

// Safely get total pages
const totalPages = computed(() => {
  return slidevContext?.nav?.total ?? 1
})

// Check if current slide has 'no-page-number' in its class frontmatter
const hidePageNumber = computed(() => {
  try {
    const currentSlide = slidevContext?.nav?.currentSlideRoute?.meta?.slide
    const slideClass = currentSlide?.frontmatter?.class || ''
    return slideClass.includes('no-page-number')
  } catch {
    return false // Default: show page number if anything fails
  }
})

// Only show page number when context is available and not hidden
const showPageNumber = computed(() => {
  return slidevContext !== null && !hidePageNumber.value
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
