<!--
  ╔══════════════════════════════════════════════════════════════════════════════╗
  ║                       PRODUCTION PIPELINE COMPONENT                          ║
  ╠══════════════════════════════════════════════════════════════════════════════╣
  ║                                                                              ║
  ║  A configurable pipeline diagram component for Slidev presentations.        ║
  ║  Features:                                                                   ║
  ║  • Customizable stages with headers, content, and footers                   ║
  ║  • Top feedback loop with bidirectional arrows                              ║
  ║  • Bottom optimization section with LLM logos                               ║
  ║  • Uses CSS variables from style.css for consistent theming                 ║
  ║                                                                              ║
  ║  USAGE:                                                                      ║
  ║  <ProductionPipeline                                                         ║
  ║    :stages="stagesArray"                                                     ║
  ║    :topLabel="{ title: '...', subtitle: '...' }"                            ║
  ║    :bottomLabel="{ title: '...', content: ['...'] }"                        ║
  ║    :showLogos="true"                                                         ║
  ║  />                                                                          ║
  ║                                                                              ║
  ╚══════════════════════════════════════════════════════════════════════════════╝
-->

<script setup>
import { computed } from 'vue'

// ============================================================================
// PROPS CONFIGURATION
// ============================================================================
const props = defineProps({
  /**
   * Array of pipeline stages
   * Each stage: { id: string, title: string, content: string[], footer: string }
   */
  stages: {
    type: Array,
    default: () => [
      { id: 'data', title: 'Data', content: ['Company Filings', 'Other Structured'], footer: 'Processing' },
      { id: 'analytics', title: 'Data Analytics', content: ['LLM/Traditional', 'Scorecard'], footer: 'Scoring Model' },
      { id: 'results', title: 'Results', content: ['Exec/Board', 'Scoring'], footer: 'Company Score' },
      { id: 'portfolio', title: 'Portfolio Construction', content: ['Company Score', 'Over/Under to Sector'], footer: 'S&P 500 Benchmark' }
    ]
  },
  
  /**
   * Top label configuration for the feedback loop header
   */
  topLabel: {
    type: Object,
    default: () => ({
      title: 'Continuous Risk Assessment & Quality Control',
      subtitle: 'Data accuracy/coverage, Data Leakage, Scoring Consistency, Management Changes, Corporate Actions'
    })
  },
  
  /**
   * Bottom label configuration for the optimization section
   */
  bottomLabel: {
    type: Object,
    default: () => ({
      title: 'Model Optimisation',
      content: ['Scorecard Refinement and Testing', 'Data Sources and Enrichment']
    })
  },
  
  /**
   * Show/hide the feedback loops
   */
  showFeedback: {
    type: Boolean,
    default: true
  },
  
  /**
   * Show/hide the LLM logos in the bottom section
   */
  showLogos: {
    type: Boolean,
    default: true
  },
  
  /**
   * Main title above the diagram
   */
  mainTitle: {
    type: String,
    default: ''
  },
  
  /**
   * Enable/disable entry animations
   */
  animate: {
    type: Boolean,
    default: false
  }
})

// ============================================================================
// LLM MODEL LOGOS CONFIGURATION
// Edit this array to change which logos appear in the optimization box
// ============================================================================
const llmModels = [
  { name: 'Gemini 3', logo: '/img/gemini.svg' },
  { name: 'GPT-5.1', logo: '/img/openai.svg' },
  { name: 'Claude 4.5', logo: '/img/anthropic.svg' }
]

// Computed property for animation class
const animationClass = computed(() => props.animate ? 'animated' : '')
</script>

<template>
  <div class="pipeline-wrapper" :class="animationClass">
    
    <!-- ════════════════════════════════════════════════════════════════════
         MAIN TITLE
         Edit: Change mainTitle prop to customize
         ════════════════════════════════════════════════════════════════════ -->
    <div class="main-title" v-if="mainTitle">{{ mainTitle }}</div>

    <!-- ════════════════════════════════════════════════════════════════════
         TOP FEEDBACK LOOP - Quality Control Header
         Shows bidirectional arrows spanning across all stages
         ════════════════════════════════════════════════════════════════════ -->
    <div class="top-feedback-section" v-if="showFeedback">
      
      <!-- Quality Control Text -->
      <div class="qc-header" v-if="topLabel.title">
        <div class="qc-title">{{ topLabel.title }}</div>
        <div class="qc-subtitle" v-if="topLabel.subtitle">{{ topLabel.subtitle }}</div>
      </div>
      
      <!-- Top Bidirectional Arrow SVG -->
      <svg class="top-arrow-svg" viewBox="0 0 800 50" preserveAspectRatio="xMidYMid meet">
        <defs>
          <!-- Small directional arrowhead (points right, auto-rotates) -->
          <marker id="pp-arrow" markerWidth="5" markerHeight="5" refX="10" refY="5" orient="auto" viewBox="0 0 10 10">
            <path d="M0,0 L10,5 L0,10" class="arrow-marker" />
          </marker>
        </defs>
        
        <!-- Horizontal dashed line (no arrows) -->
        <path 
          d="M107.5,10 L692.5,10" 
          class="feedback-line"
        />
        
        <!-- 
          Vertical drop-down arrows to each stage box
          Precise center alignment: 
          Total width 735px. Center at 400.
          Offsets from center: ±292.5, ±97.5
        -->
        <line x1="107.5" y1="10" x2="107.5" y2="45" class="vertical-line" marker-end="url(#pp-arrow)" />
        <line x1="302.5" y1="10" x2="302.5" y2="45" class="vertical-line" marker-end="url(#pp-arrow)" />
        <line x1="497.5" y1="10" x2="497.5" y2="45" class="vertical-line" marker-end="url(#pp-arrow)" />
        <line x1="692.5" y1="10" x2="692.5" y2="45" class="vertical-line" marker-end="url(#pp-arrow)" />
      </svg>
    </div>

    <!-- ════════════════════════════════════════════════════════════════════
         MAIN PIPELINE STAGES
         The horizontal flow of stage boxes with arrows between them
         ════════════════════════════════════════════════════════════════════ -->
    <div class="pipeline-stages">
      <template v-for="(stage, idx) in stages" :key="stage.id">
        
        <!-- Individual Stage Box -->
        <div class="stage-box" :style="{ animationDelay: `${idx * 0.1}s` }">
          <!--
            ┌─────────────────────────────────────────┐
            │ STAGE BOX STRUCTURE                     │
            │                                         │
            │ ┌─────────────────────────────────────┐ │
            │ │ HEADER (title)                      │ │  <- .stage-header
            │ ├─────────────────────────────────────┤ │
            │ │                                     │ │
            │ │ BODY (content lines)                │ │  <- .stage-body
            │ │                                     │ │
            │ ├─────────────────────────────────────┤ │
            │ │ FOOTER (label)                      │ │  <- .stage-footer
            │ └─────────────────────────────────────┘ │
            │                                         │
            │ SIZE ADJUSTMENTS:                       │
            │ • Width: Edit --stage-box-width         │
            │ • Min-height: Edit --stage-body-height  │
            │ • Padding: Edit individual sections     │
            └─────────────────────────────────────────┘
          -->
          <div class="stage-header">{{ stage.title }}</div>
          <div class="stage-body">
            <span v-for="(line, i) in stage.content" :key="i">
              {{ line }}<br v-if="i < stage.content.length - 1" />
            </span>
          </div>
          <div class="stage-footer">{{ stage.footer }}</div>
        </div>

        <!-- Flow Arrow Between Stages (not after last stage) -->
        <div v-if="idx < stages.length - 1" class="flow-arrow" :style="{ animationDelay: `${idx * 0.1 + 0.05}s` }">
          <svg viewBox="0 0 50 24" class="arrow-svg">
            <!-- Horizontal line -->
            <path d="M0,12 L35,12" class="arrow-line" />
            <!-- Triangle arrowhead -->
            <path d="M30,6 L42,12 L30,18" class="arrow-head" />
          </svg>
        </div>
        
      </template>
    </div>

    <!-- ════════════════════════════════════════════════════════════════════
         BOTTOM FEEDBACK LOOP - Optimization Section
         Shows vertical lines from stages connecting to optimization box
         ════════════════════════════════════════════════════════════════════ -->
    <div class="bottom-feedback-section" v-if="showFeedback">
      
      <!-- Bottom Arrow SVG - Vertical lines up to stages + horizontal connector -->
      <svg class="bottom-arrow-svg" viewBox="0 0 800 50" preserveAspectRatio="xMidYMid meet">
        <defs>
          <!-- Small directional arrowhead (points right, auto-rotates) -->
          <marker id="pp-arrow-b" markerWidth="5" markerHeight="5" refX="10" refY="5" orient="auto" viewBox="0 0 10 10">
            <path d="M0,0 L10,5 L0,10" class="arrow-marker" />
          </marker>
        </defs>
        
        <!--
          Vertical arrows pointing UP from horizontal line to each stage
          Precise center alignment: 
          Total width 735px. Center at 400.
          Offsets from center: ±292.5, ±97.5
          
          UPDATED GEOMETRY:
          Horizontal line at y=40 (lower) so arrows have length 35 (40-5).
          This matches the top section (10 to 45 = 35).
        -->
        <line x1="107.5" y1="40" x2="107.5" y2="5" class="vertical-line" marker-end="url(#pp-arrow-b)" />
        <line x1="302.5" y1="40" x2="302.5" y2="5" class="vertical-line" marker-end="url(#pp-arrow-b)" />
        <line x1="497.5" y1="40" x2="497.5" y2="5" class="vertical-line" marker-end="url(#pp-arrow-b)" />
        <line x1="692.5" y1="40" x2="692.5" y2="5" class="vertical-line" marker-end="url(#pp-arrow-b)" />
        
        <!-- Horizontal connector line -->
        <line x1="107.5" y1="40" x2="692.5" y2="40" class="horizontal-line" />
        
        <!-- Center vertical drop to optimization box -->
        <line x1="400" y1="40" x2="400" y2="50" class="vertical-line" />
      </svg>

      <!-- ══════════════════════════════════════════════════════════════════
           OPTIMIZATION BOX
           Contains LLM logos and additional content
           ══════════════════════════════════════════════════════════════════ -->
      <div class="optimization-box" v-if="bottomLabel.title">
        
        <!-- Optimization Title -->
        <div class="opt-title">{{ bottomLabel.title }}</div>
        
        <!-- LLM Logos Row -->
        <div class="llm-logos" v-if="showLogos">
          <!--
            LOGO SIZE ADJUSTMENT:
            Edit --logo-size variable in CSS to change all logo sizes
            Or add custom width/height to individual img tags
          -->
          <div v-for="model in llmModels" :key="model.name" class="logo-item">
            <img :src="model.logo" :alt="model.name" class="logo-img" />
            <span class="logo-label">{{ model.name }}</span>
          </div>
        </div>
        
        <!-- Additional Content Lines -->
        <div class="opt-content">
          <div v-for="(line, i) in bottomLabel.content" :key="i" class="opt-line">
            {{ line }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ╔══════════════════════════════════════════════════════════════════════════════╗
   ║                           CSS VARIABLES & THEMING                            ║
   ╠══════════════════════════════════════════════════════════════════════════════╣
   ║                                                                              ║
   ║  These CSS custom properties pull from your global style.css where possible  ║
   ║  Edit the fallback values here to customize the component                    ║
   ║                                                                              ║
   ╚══════════════════════════════════════════════════════════════════════════════╝ */

.pipeline-wrapper {
  /* ════════════════════════════════════════════════════════════════════════════
     COLOR VARIABLES
     These inherit from style.css CSS variables with fallbacks
     ════════════════════════════════════════════════════════════════════════════ */
  
  /* Primary accent color - used for borders, arrows, headers */
  --pipe-primary: var(--slidev-theme-primary, #5d8392);
  
  /* Heading text color */
  --pipe-heading: var(--slidev-heading-color, #2c3e50);
  
  /* Body text color */
  --pipe-text: var(--slidev-text-color, #333);
  
  /* Background colors */
  --pipe-bg: #ffffff;
  --pipe-footer-bg: var(--slidev-theme-primary, #5d8392);
  --pipe-footer-text: #ffffff;
  
  /* ════════════════════════════════════════════════════════════════════════════
     SIZE VARIABLES - EDIT THESE TO ADJUST COMPONENT DIMENSIONS
     ════════════════════════════════════════════════════════════════════════════ */
  
  /* Stage box dimensions */
  --stage-box-width: 150px;          /* Width of each stage box */
  --stage-body-height: 30px;         /* Minimum height of body section */
  
  /* Arrow dimensions */
  --arrow-width: 45px;               /* Width of flow arrows between stages */
  --arrow-height: 24px;              /* Height of flow arrows */
  
  /* Logo dimensions in optimization box */
  --logo-size: 32px;                 /* Size of LLM logos */
  
  /* Spacing */
  --section-gap: 0.1rem;             /* Gap between major sections */
  
  /* Font family - inherits from style.css */
  font-family: var(--slidev-font-family, 'Nunito Sans', sans-serif);
  
  /* Layout */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--section-gap);
  width: 100%;
  padding: 0.25rem 1rem;            /* EDIT: Overall component padding */
}

/* ════════════════════════════════════════════════════════════════════════════════
   MAIN TITLE STYLES
   ════════════════════════════════════════════════════════════════════════════════ */

.main-title {
  font-size: 1rem;                /* EDIT: Change title size */
  font-weight: 700;
  color: var(--pipe-heading);
  margin-bottom: 0.15rem;
}

/* ════════════════════════════════════════════════════════════════════════════════
   TOP FEEDBACK SECTION STYLES
   Contains the QC header and top bidirectional arrows
   ════════════════════════════════════════════════════════════════════════════════ */

.top-feedback-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Quality Control Header Text */
.qc-header {
  text-align: center;
  margin-bottom: 0.25rem;
}

.qc-title {
  font-size: 0.85rem;               /* EDIT: Change QC title size */
  font-weight: 600;
  font-style: italic;
  color: var(--pipe-heading);
}

.qc-subtitle {
  font-size: 0.6rem;                /* EDIT: Change QC subtitle size */
  font-style: italic;
  color: var(--pipe-text);
  opacity: 0.8;
  max-width: 600px;
}

/* Top Arrow SVG Container */
.top-arrow-svg {
  width: 100%;
  max-width: 800px;
  height: 50px;                     /* EDIT: Adjust height if arrows need more space */
}

/* ════════════════════════════════════════════════════════════════════════════════
   SVG ARROW & LINE STYLES
   Shared styles for all SVG elements
   ════════════════════════════════════════════════════════════════════════════════ */

/* Arrow marker fill color */
.arrow-marker {
  fill: var(--pipe-primary);
  fill-opacity: 0.8;
}

/* Dashed feedback lines (horizontal in top section) */
.feedback-line {
  fill: none;
  stroke: var(--pipe-primary);
  stroke-width: 2;
  stroke-dasharray: 8, 4;           /* EDIT: Change dash pattern (dash-length, gap-length) */
  stroke-opacity: 0.8;
}

/* Vertical dashed lines (connecting to stages) */
.vertical-line {
  stroke: var(--pipe-primary);
  stroke-width: 2;
  stroke-dasharray: 6, 4;           /* EDIT: Change vertical line dash pattern */
  stroke-opacity: 0.7;
}

/* Horizontal connector line (bottom section) */
.horizontal-line {
  stroke: var(--pipe-primary);
  stroke-width: 2;
  stroke-dasharray: 6, 4;
  stroke-opacity: 0.7;
}

/* ════════════════════════════════════════════════════════════════════════════════
   PIPELINE STAGES CONTAINER
   Horizontal flex container for stage boxes and arrows
   ════════════════════════════════════════════════════════════════════════════════ */

.pipeline-stages {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;                           /* No gap - arrows handle spacing */
}

/* ════════════════════════════════════════════════════════════════════════════════
   STAGE BOX STYLES
   Individual stage cards with header, body, footer
   ════════════════════════════════════════════════════════════════════════════════ */

.stage-box {
  width: var(--stage-box-width);
  border: 2px solid var(--pipe-primary);
  background: var(--pipe-bg);
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

/* Stage Header - Title bar at top */
.stage-header {
  background: var(--pipe-footer-bg);
  color: var(--pipe-footer-text);
  padding: 0.4rem 0.5rem;           /* EDIT: Adjust header padding */
  font-size: 0.8rem;                /* EDIT: Adjust header font size */
  font-weight: 700;
  text-align: center;
}

/* Stage Body - Content area */
.stage-body {
  padding: 0.5rem;                  /* EDIT: Adjust body padding */
  font-size: 0.65rem;               /* EDIT: Adjust body font size */
  line-height: 1.4;
  color: var(--pipe-text);
  text-align: center;
  min-height: var(--stage-body-height);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Stage Footer - Label bar at bottom */
.stage-footer {
  background: var(--pipe-footer-bg);
  color: var(--pipe-footer-text);
  padding: 0.3rem 0.5rem;           /* EDIT: Adjust footer padding */
  font-size: 0.6rem;                /* EDIT: Adjust footer font size */
  font-weight: 600;
  text-align: center;
}

/* ════════════════════════════════════════════════════════════════════════════════
   FLOW ARROW STYLES
   Horizontal arrows between stage boxes
   ════════════════════════════════════════════════════════════════════════════════ */

.flow-arrow {
  display: flex;
  align-items: center;
  padding: 0 0.25rem;               /* EDIT: Adjust spacing around arrows */
}

.arrow-svg {
  width: var(--arrow-width);
  height: var(--arrow-height);
}

.arrow-line {
  stroke: var(--pipe-primary);
  stroke-width: 2.5;
  fill: none;
}

.arrow-head {
  fill: var(--pipe-primary);
}

/* ════════════════════════════════════════════════════════════════════════════════
   BOTTOM FEEDBACK SECTION STYLES
   Contains the vertical arrows and optimization box
   ════════════════════════════════════════════════════════════════════════════════ */

.bottom-feedback-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bottom-arrow-svg {
  width: 100%;
  max-width: 800px;
  height: 50px;                     /* EDIT: Adjust height if needed */
}

/* ════════════════════════════════════════════════════════════════════════════════
   OPTIMIZATION BOX STYLES
   The bottom box containing LLM logos and content
   ════════════════════════════════════════════════════════════════════════════════ */

.optimization-box {
  border: 2px solid var(--pipe-primary);
  background: var(--pipe-bg);
  padding: 0.6rem 2rem 0.75rem;     /* EDIT: Adjust box padding (top, horizontal, bottom) */
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  max-width: 280px;                 /* EDIT: Maximum width of optimization box */
  width: 100%;
  margin-bottom: 0.5rem;            /* Ensure space below the box */
}

/* Optimization Title */
.opt-title {
  font-size: 0.85rem;               /* EDIT: Adjust title size */
  font-weight: 700;
  font-style: italic;
  color: var(--pipe-heading);
  margin-bottom: 0.35rem;
}

/* ════════════════════════════════════════════════════════════════════════════════
   LLM LOGOS SECTION
   Row of model logos with labels
   ════════════════════════════════════════════════════════════════════════════════ */

.llm-logos {
  display: flex;
  justify-content: center;
  gap: 1.5rem;                      /* EDIT: Gap between logo items */
  margin-bottom: 0.35rem;
}

.logo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.logo-img {
  width: var(--logo-size);
  height: var(--logo-size);
  object-fit: contain;
}

.logo-label {
  font-size: 0.55rem;               /* EDIT: Logo label font size */
  font-weight: 600;
  color: var(--pipe-text);
}

/* ════════════════════════════════════════════════════════════════════════════════
   OPTIMIZATION CONTENT
   Additional text lines in the optimization box
   ════════════════════════════════════════════════════════════════════════════════ */

.opt-content {
  margin-top: 0.25rem;
}

.opt-line {
  font-size: 0.6rem;                /* EDIT: Content line font size */
  color: var(--pipe-text);
  line-height: 1.5;
}

/* ════════════════════════════════════════════════════════════════════════════════
   ANIMATION STYLES (Optional)
   Add animate prop to enable entry animations
   ════════════════════════════════════════════════════════════════════════════════ */

.animated .stage-box {
  opacity: 0;
  animation: fadeSlideIn 0.4s ease-out forwards;
}

.animated .flow-arrow {
  opacity: 0;
  animation: fadeIn 0.3s ease-out forwards;
}

.animated .optimization-box {
  opacity: 0;
  animation: fadeIn 0.5s ease-out 0.5s forwards;
}

@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* ════════════════════════════════════════════════════════════════════════════════
   RESPONSIVE ADJUSTMENTS
   Scale down for smaller viewports
   ════════════════════════════════════════════════════════════════════════════════ */

@media (max-width: 900px) {
  .pipeline-wrapper {
    --stage-box-width: 130px;
    --arrow-width: 35px;
    --logo-size: 28px;
  }
  
  .stage-header,
  .stage-body,
  .stage-footer {
    font-size: 0.6rem;
  }
}
</style>
