<!--
  ╔══════════════════════════════════════════════════════════════════════════════╗
  ║                     EXAMPLE: FINANCIAL METRICS SLIDE                         ║
  ╠══════════════════════════════════════════════════════════════════════════════╣
  ║                                                                              ║
  ║  This component demonstrates:                                                ║
  ║  1. Loading chart data from CSV files                                        ║
  ║  2. Using direct data arrays                                                 ║
  ║  3. Displaying 3 charts side-by-side                                         ║
  ║                                                                              ║
  ║  USAGE IN SLIDES.MD:                                                         ║
  ║  ────────────────────                                                        ║
  ║  ---                                                                         ║
  ║  ---                                                                         ║
  ║                                                                              ║
  ║  # Financial Overview                                                        ║
  ║                                                                              ║
  ║  <FinancialMetrics />                                                        ║
  ║                                                                              ║
  ╚══════════════════════════════════════════════════════════════════════════════╝
-->

<script setup lang="ts">
    import LineChart from './charts/components/LineChart.vue'
    import ChartRow from './charts/components/ChartRow.vue'
    import { seriesPresets } from './charts/config/chartStyles'
    
    /* ─────────────────────────────────────────────────────────────────────────────
       SIZING
       
       Slide content width: ~870px (960px - padding)
       For 3 charts with 24px gaps: (870 - 48) / 3 ≈ 274px
       ───────────────────────────────────────────────────────────────────────────── */
    
    const CHART_WIDTH = 274
    const CHART_HEIGHT = 220
    const GAP = 24
    
    /* ─────────────────────────────────────────────────────────────────────────────
       DIRECT DATA EXAMPLE
       
       For small datasets, just define the data inline.
       ───────────────────────────────────────────────────────────────────────────── */
    
    const revenueData = {
      xAxisData: ['Q1', 'Q2', 'Q3', 'Q4'],
      series: [
        {
          ...seriesPresets.primary,
          name: '2024',
          data: [12.5, 14.2, 15.8, 18.1],
        },
        {
          ...seriesPresets.secondary,
          name: '2023',
          data: [10.2, 11.5, 12.8, 13.2],
        },
      ],
    }
    
    const costData = {
      xAxisData: ['Q1', 'Q2', 'Q3', 'Q4'],
      series: [
        {
          ...seriesPresets.positive,
          name: 'Cost Ratio',
          data: [72, 68, 65, 61],
        },
        {
          ...seriesPresets.reference,
          name: 'Target',
          data: [65, 65, 65, 65],
        },
      ],
    }
    </script>
    
    <template>
      <ChartRow :gap="GAP" align="top" justify="start">
        
        <!-- Chart 1: Direct data example -->
        <LineChart
          title="Revenue Growth"
          subtitle="Quarterly ($M)"
          :width="CHART_WIDTH"
          :height="CHART_HEIGHT"
          :xAxisData="revenueData.xAxisData"
          :series="revenueData.series"
          yAxisLabel="Revenue"
        />
        
        <!-- Chart 2: CSV file example (16k rows - sampled automatically) -->
        <LineChart
          title="Historical AUM"
          subtitle="Daily ($B)"
          :width="CHART_WIDTH"
          :height="CHART_HEIGHT"
          csvPath="/data/aum-historical.csv"
          xColumn="date"
          :yColumns="['aum']"
          :seriesLabels="['AUM']"
          :seriesPresets="['primary']"
          xAsDate
          xDateFormat="monthYear"
        />
        
        <!-- Chart 3: Direct data example -->
        <LineChart
          title="Cost Ratio"
          subtitle="Quarterly (%)"
          :width="CHART_WIDTH"
          :height="CHART_HEIGHT"
          :xAxisData="costData.xAxisData"
          :series="costData.series"
          yAxisLabel="Ratio %"
          :yMin="50"
          :yMax="80"
        />
        
      </ChartRow>
    </template>