<!--
  ╔══════════════════════════════════════════════════════════════════════════════╗
  ║                      PERFORMANCE CHART COMPONENT                             ║
  ╠══════════════════════════════════════════════════════════════════════════════╣
  ║                                                                              ║
  ║  Pre-configured wrapper for BAM vs SP500 performance data.                   ║
  ║  Edit the settings below to customize the chart.                             ║
  ║                                                                              ║
  ║  USAGE: <PerformanceChart />                                                 ║
  ║                                                                              ║
  ╚══════════════════════════════════════════════════════════════════════════════╝
-->

<script setup lang="ts">
import LineChart from '../charts/components/LineChart.vue'

/* ─────────────────────────────────────────────────────────────────────────────
   SIZING
   
   Full width: ~870px (slide content width)
   Height: adjust to fit slide content area
   ───────────────────────────────────────────────────────────────────────────── */

const CHART_WIDTH = 870
const CHART_HEIGHT = 400
</script>

<template>
  <div class="performance-chart-wrapper">
    <LineChart
      :width="CHART_WIDTH"
      :height="CHART_HEIGHT"
      title=""
      subtitle=""
      csvPath="/data/performance.csv"
      xColumn="Date"
      :yColumns="['SP500 return', 'BAM return']"
      :seriesLabels="['S&P 500 Return', 'BAM Return']"
      :seriesPresets="['burgundy', 'primary']"
      yAxisLabel="Return (%)"
      :showLegend="true"
    />
  </div>
</template>

<style scoped>
.performance-chart-wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}
</style>
