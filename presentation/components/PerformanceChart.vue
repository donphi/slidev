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
   
   Slide content width: ~870px
   Height: adjust to fit slide content area
   ───────────────────────────────────────────────────────────────────────────── */

const CHART_WIDTH = 580
const CHART_HEIGHT = 400
</script>

<template>
  <div class="performance-chart-wrapper">
    <LineChart
      :width="CHART_WIDTH"
      :height="CHART_HEIGHT"
      title="BAM vs S&P 500 Quarterly Returns"
      subtitle="2005 Q3 - 2025 Q2"
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
