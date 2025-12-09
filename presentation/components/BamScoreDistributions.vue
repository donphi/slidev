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
    
    const CHART_WIDTH = 280
    const CHART_HEIGHT = 300
    const GAP = 5
    
    /* ─────────────────────────────────────────────────────────────────────────────
       COLORS (matching the original chart)
       ───────────────────────────────────────────────────────────────────────────── */
    
    const COLORS = {
        general: distributionSettings.seriesColors[0],
        tech: distributionSettings.seriesColors[1],
        overall: distributionSettings.seriesColors[2],
        }
    
    /* ─────────────────────────────────────────────────────────────────────────────
       CHART SETTINGS (from central config)
       ───────────────────────────────────────────────────────────────────────────── */
    
    const BIN_COUNT = distributionSettings.defaultBinCount
    const FILL_OPACITY = distributionSettings.defaultFillOpacity
    </script>
    
    <template>
      <div class="bam-distributions">
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
          />
          
        </ChartRow>
      </div>
    </template>
    
    <style scoped>
    .bam-distributions {
      width: 100%;
    }
    </style>