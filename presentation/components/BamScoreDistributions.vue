<!--
  ╔══════════════════════════════════════════════════════════════════════════════╗
  ║                    BAM PROJECT SCORE DISTRIBUTIONS                           ║
  ╠══════════════════════════════════════════════════════════════════════════════╣
  ║                                                                              ║
  ║  Three distribution charts side-by-side:                                     ║
  ║  - General Score (blue)                                                      ║
  ║  - Tech Score (orange)                                                       ║
  ║  - Overall Score (green)                                                     ║
  ║                                                                              ║
  ║  Data source: /public/data/bam.csv                                           ║
  ║                                                                              ║
  ║  USAGE IN SLIDES.MD:                                                         ║
  ║  ────────────────────                                                        ║
  ║  ---                                                                         ║
  ║  ---                                                                         ║
  ║                                                                              ║
  ║  <BAMScoreDistributions />                                                   ║
  ║                                                                              ║
  ╚══════════════════════════════════════════════════════════════════════════════╝
-->

<script setup lang="ts">
    import DistributionChart from "../charts/components/DistributionChart.vue"
    import ChartRow from "../charts/components/ChartRow.vue"
    import { distributionSettings } from "../charts/config/chartStyles"
        
    /* ─────────────────────────────────────────────────────────────────────────────
       SIZING
       
       Slide content width: ~870px
       For 3 charts with 20px gaps: (870 - 40) / 3 ≈ 276px
       ───────────────────────────────────────────────────────────────────────────── */
    
    const CHART_WIDTH = 276
    const CHART_HEIGHT = 280
    const GAP = 20
    
    /* ─────────────────────────────────────────────────────────────────────────────
       COLORS (matching the original chart)
       ───────────────────────────────────────────────────────────────────────────── */
    
    const COLORS = {
      general: '#4A90D9',   // Blue
      tech: '#E8873D',      // Orange  
      overall: '#5CB85C',   // Green
    }
    
    /* ─────────────────────────────────────────────────────────────────────────────
       CHART SETTINGS (from central config)
       ───────────────────────────────────────────────────────────────────────────── */
    
    const BIN_COUNT = distributionSettings.defaultBinCount
    const FILL_OPACITY = distributionSettings.defaultFillOpacity
    </script>
    
    <template>
      <div class="bam-distributions">
        <!-- Main Title -->
        <h2 class="main-title">BAM Project Score Distributions</h2>
        
        <!-- Three Charts -->
        <ChartRow :gap="GAP" align="top" justify="center">
          
          <!-- General Score -->
          <DistributionChart
            title="General Score"
            :width="CHART_WIDTH"
            :height="CHART_HEIGHT"
            csvPath="/data/bam.csv"
            valueColumn="general_score"
            :color="COLORS.general"
            :fillOpacity="FILL_OPACITY"
            :binCount="BIN_COUNT"
            xAxisLabel="Score"
            yAxisLabel="Frequency"
            :xMin="3"
            :xMax="10"
          />
          
          <!-- Tech Score -->
          <DistributionChart
            title="Tech Score"
            :width="CHART_WIDTH"
            :height="CHART_HEIGHT"
            csvPath="/data/bam.csv"
            valueColumn="tech_score"
            :color="COLORS.tech"
            :fillOpacity="FILL_OPACITY"
            :binCount="BIN_COUNT"
            xAxisLabel="Score"
            yAxisLabel="Frequency"
            :xMin="1"
            :xMax="10"
          />
          
          <!-- Overall Score -->
          <DistributionChart
            title="Overall Score"
            :width="CHART_WIDTH"
            :height="CHART_HEIGHT"
            csvPath="/data/bam.csv"
            valueColumn="overall_score"
            :color="COLORS.overall"
            :fillOpacity="FILL_OPACITY"
            :binCount="BIN_COUNT"
            xAxisLabel="Score"
            yAxisLabel="Frequency"
            :xMin="1"
            :xMax="10"
          />
          
        </ChartRow>
      </div>
    </template>
    
    <style scoped>
    .bam-distributions {
      width: 100%;
    }
    
    .main-title {
      font-family: 'Nunito Sans', sans-serif;
      font-size: 18px;
      font-weight: 700;
      color: #333;
      text-align: center;
      margin: 0 0 15px 0;
    }
    </style>