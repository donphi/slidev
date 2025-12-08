<script setup>
defineProps({
  showFeedback: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <div class="pipeline-wrapper">
    <!-- Full-width Top Dashed Line with Arrows -->
    <div class="top-line">
      <span class="arrow-left">◄</span>
      <div class="dashed-line"></div>
      <span class="arrow-right">►</span>
    </div>

    <!-- Production Header -->
    <div class="production-header">
      <div class="prod-title">Production</div>
      <div class="prod-subtitle">Continuous Risk Assessment &amp; Quality Control</div>
      <div class="prod-detail">Data accuracy/coverage, Data Leakage, Scoring Consistency, Management Changes, Corporate Actions</div>
    </div>

    <!-- Main 4-Column Pipeline Grid -->
    <div class="pipeline-grid">
      <!-- Column 1: Data -->
      <div class="grid-cell">
        <div class="stage-box">
          <div class="box-body">
            <div class="box-title">Data</div>
            <div class="box-content">Company Filings<br>Other Structured</div>
          </div>
          <div class="box-footer">Processing</div>
        </div>
      </div>

      <!-- Arrow 1→2 -->
      <div class="grid-arrow">
        <span class="arrow-icon">→</span>
      </div>

      <!-- Column 2: Data Analytics -->
      <div class="grid-cell">
        <div class="stage-box">
          <div class="box-body">
            <div class="box-title">Data Analytics</div>
            <div class="box-content">LLM/Traditional<br>Scorecard</div>
          </div>
          <div class="box-footer">Scoring Model</div>
        </div>
      </div>

      <!-- Arrow 2→3 -->
      <div class="grid-arrow">
        <span class="arrow-icon">→</span>
      </div>

      <!-- Column 3: Results -->
      <div class="grid-cell">
        <div class="stage-box">
          <div class="box-body">
            <div class="box-title">Results</div>
            <div class="box-content">Exec/Board<br>Scoring</div>
          </div>
          <div class="box-footer">Company Score</div>
        </div>
      </div>

      <!-- Arrow 3→4 -->
      <div class="grid-arrow">
        <span class="arrow-icon">→</span>
      </div>

      <!-- Column 4: Portfolio Construction -->
      <div class="grid-cell">
        <div class="stage-box">
          <div class="box-body">
            <div class="box-title">Portfolio Construction</div>
            <div class="box-content">Company Score<br>Over/Under to Sector</div>
          </div>
          <div class="box-footer">S&amp;P 500 Benchmark</div>
        </div>
      </div>
    </div>

    <!-- Feedback Section -->
    <div class="feedback-section" v-if="showFeedback">
      <!-- Vertical Lines aligned with boxes 1, 2, 3 -->
      <div class="feedback-vlines">
        <div class="vline-col"><div class="vline"></div></div>
        <div class="vline-col"><div class="vline"></div></div>
        <div class="vline-col"><div class="vline"></div></div>
        <div class="vline-col empty"></div>
      </div>

      <!-- Horizontal Connector Bar -->
      <div class="feedback-hbar">
        <div class="hbar-segment"></div>
      </div>

      <!-- Center drop line -->
      <div class="feedback-drop">
        <div class="vline short"></div>
      </div>

      <!-- Model Optimisation Box -->
      <div class="model-opt-box">
        <div class="model-opt-title">Model Optimisation</div>
        <div class="model-opt-content">
          LLM Testing Gemini 3, GPT-5.1, Claude 4.5<br>
          Scorecard Refinement and Testing<br>
          Data Sources and Enrichment
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pipeline-wrapper {
  --pipe-primary: var(--slidev-theme-primary, #5d8392);
  --pipe-heading: var(--slidev-heading-color, #2c3e50);
  --pipe-text: var(--slidev-text-color, #333);
  
  display: flex;
  flex-direction: column;
  font-family: var(--slidev-font-family, 'Nunito Sans', sans-serif);
  width: 100%;
}

/* =============================================
   TOP DASHED LINE - Full Width
   ============================================= */
.top-line {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 0.2rem;
}

.dashed-line {
  flex: 1;
  height: 0;
  border-top: 2px dashed var(--pipe-primary);
}

.arrow-left,
.arrow-right {
  color: var(--pipe-primary);
  font-size: 0.85rem;
  line-height: 1;
}

/* =============================================
   PRODUCTION HEADER
   ============================================= */
.production-header {
  text-align: center;
  margin-bottom: 1rem;
}

.prod-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--pipe-heading);
  margin-bottom: 0.15rem;
}

.prod-subtitle {
  font-size: 0.85rem;
  font-style: italic;
  color: var(--pipe-text);
  margin-bottom: 0.1rem;
}

.prod-detail {
  font-size: 0.65rem;
  font-style: italic;
  color: var(--pipe-text);
  opacity: 0.8;
}

/* =============================================
   PIPELINE GRID - 4 boxes with arrows between
   Using CSS Grid with fixed proportions
   ============================================= */
.pipeline-grid {
  display: grid;
  grid-template-columns: 1fr 30px 1fr 30px 1fr 30px 1fr;
  align-items: center;
  width: 100%;
}

.grid-cell {
  display: flex;
  justify-content: center;
}

.grid-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
}

.arrow-icon {
  color: var(--pipe-primary);
  font-size: 1.3rem;
  font-weight: 300;
  opacity: 0.9;
}

/* =============================================
   STAGE BOXES
   ============================================= */
.stage-box {
  border: 1.5px solid var(--pipe-primary);
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #fff;
  border-radius: 3px;
  overflow: hidden;
}

.box-body {
  padding: 0.8rem 0.6rem;
  text-align: center;
  min-height: 75px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.box-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--pipe-heading);
  margin-bottom: 0.4rem;
}

.box-content {
  font-size: 0.72rem;
  color: var(--pipe-text);
  line-height: 1.45;
}

.box-footer {
  background: var(--pipe-primary);
  color: #fff;
  font-size: 0.72rem;
  font-weight: 600;
  padding: 0.4rem 0.5rem;
  text-align: center;
}

/* =============================================
   FEEDBACK SECTION
   ============================================= */
.feedback-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.3rem;
  width: 100%;
}

/* Vertical lines - 4 columns matching main grid */
.feedback-vlines {
  display: grid;
  grid-template-columns: 1fr 30px 1fr 30px 1fr 30px 1fr;
  width: 100%;
}

.vline-col {
  display: flex;
  justify-content: center;
}

.vline-col:nth-child(1) { grid-column: 1; }
.vline-col:nth-child(2) { grid-column: 3; }
.vline-col:nth-child(3) { grid-column: 5; }
.vline-col:nth-child(4) { grid-column: 7; }

.vline {
  width: 0;
  height: 1.8rem;
  border-left: 2px dashed var(--pipe-primary);
}

.vline-col.empty {
  visibility: hidden;
}

/* Horizontal connector bar - spans columns 1-3 */
.feedback-hbar {
  display: grid;
  grid-template-columns: 1fr 30px 1fr 30px 1fr 30px 1fr;
  width: 100%;
}

.hbar-segment {
  grid-column: 1 / 6;
  height: 0;
  border-top: 2px dashed var(--pipe-primary);
  margin: 0 auto;
  width: calc(100% - 50%/2);
  justify-self: center;
  position: relative;
  left: 0;
}

/* Center drop */
.feedback-drop {
  display: flex;
  justify-content: center;
  width: 100%;
}

.vline.short {
  height: 1rem;
  border-left: 2px dashed var(--pipe-primary);
}

/* Model Optimisation Box */
.model-opt-box {
  border: 2px dashed var(--pipe-primary);
  padding: 0.8rem 2.5rem;
  text-align: center;
  background: rgba(255, 255, 255, 0.85);
  max-width: 420px;
}

.model-opt-title {
  font-size: 1rem;
  font-weight: 700;
  font-style: italic;
  color: var(--pipe-heading);
  margin-bottom: 0.5rem;
}

.model-opt-content {
  font-size: 0.72rem;
  color: var(--pipe-text);
  line-height: 1.65;
}
</style>