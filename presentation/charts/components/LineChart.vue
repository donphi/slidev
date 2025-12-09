<!--
  ╔══════════════════════════════════════════════════════════════════════════════╗
  ║                         ECHARTS LINE CHART COMPONENT                         ║
  ╠══════════════════════════════════════════════════════════════════════════════╣
  ║                                                                              ║
  ║  A styled line chart component with:                                         ║
  ║  - Fixed dimensions (you specify exact width/height)                         ║
  ║  - Automatic styling from chartStyles.ts                                     ║
  ║  - Large dataset support with LTTB sampling                                  ║
  ║  - CSV file loading                                                          ║
  ║  - Static rendering (no animation) for PDF export                            ║
  ║                                                                              ║
  ║  USAGE (with direct data):                                                   ║
  ║  ─────────────────────────                                                   ║
  ║  <LineChart                                                                  ║
  ║    title="Revenue"                                                           ║
  ║    :width="280"                                                              ║
  ║    :height="200"                                                             ║
  ║    :xAxisData="['Q1', 'Q2', 'Q3', 'Q4']"                                     ║
  ║    :series="[{ name: 'Revenue', data: [10, 20, 15, 25] }]"                   ║
  ║  />                                                                          ║
  ║                                                                              ║
  ║  USAGE (with CSV file):                                                      ║
  ║  ──────────────────────                                                      ║
  ║  <LineChart                                                                  ║
  ║    title="Historical Data"                                                   ║
  ║    :width="280"                                                              ║
  ║    :height="200"                                                             ║
  ║    csvPath="/data/metrics.csv"                                               ║
  ║    xColumn="date"                                                            ║
  ║    :yColumns="['revenue', 'costs']"                                          ║
  ║  />                                                                          ║
  ║                                                                              ║
  ╚══════════════════════════════════════════════════════════════════════════════╝
-->

<script setup lang="ts">
    import { ref, computed, onMounted, watch } from 'vue'
    import * as echarts from 'echarts/core'
    import { LineChart as EChartsLine } from 'echarts/charts'
    import {
      TitleComponent,
      TooltipComponent,
      LegendComponent,
      GridComponent,
    } from 'echarts/components'
    import { CanvasRenderer } from 'echarts/renderers'
    import type { EChartsOption, LineSeriesOption } from 'echarts'
    
    import { 
      chartTheme, 
      getBaseChartOptions,
      seriesPresets,
      chartTypography,
    } from '../config/chartStyles'
    import { loadCSV, csvToSeries } from '../utils/csvLoader'
    import type { SeriesConfig } from '../utils/csvLoader'
    
    // Register ECharts components (tree-shaking friendly)
    echarts.use([
      EChartsLine,
      TitleComponent,
      TooltipComponent,
      LegendComponent,
      GridComponent,
      CanvasRenderer,
    ])
    
    /* ─────────────────────────────────────────────────────────────────────────────
       PROPS
       ───────────────────────────────────────────────────────────────────────────── */
    
    interface Props {
      // Dimensions (required)
      width: number
      height: number
      
      // Title
      title?: string
      subtitle?: string
      
      // Direct data input
      xAxisData?: string[]
      series?: LineSeriesOption[]
      
      // CSV file input (alternative to direct data)
      csvPath?: string
      xColumn?: string
      yColumns?: string[]
      seriesLabels?: string[]
      seriesPresets?: (keyof typeof seriesPresets)[]
      xAsDate?: boolean
      xDateFormat?: SeriesConfig['xDateFormat']
      
      // Axis labels
      xAxisLabel?: string
      yAxisLabel?: string
      
      // Y-axis range (optional, auto-calculated if not set)
      yMin?: number
      yMax?: number
      
      // Show legend
      showLegend?: boolean
      
      // Additional ECharts options to merge
      options?: Partial<EChartsOption>
    }
    
    const props = withDefaults(defineProps<Props>(), {
      title: '',
      subtitle: '',
      xAxisData: () => [],
      series: () => [],
      csvPath: '',
      xColumn: '',
      yColumns: () => [],
      seriesLabels: () => [],
      seriesPresets: () => [],
      xAsDate: false,
      xDateFormat: 'short',
      xAxisLabel: '',
      yAxisLabel: '',
      showLegend: true,
      options: () => ({}),
    })
    
    
    /* ─────────────────────────────────────────────────────────────────────────────
       STATE
       ───────────────────────────────────────────────────────────────────────────── */
    
    const chartContainer = ref<HTMLDivElement | null>(null)
    const chartInstance = ref<echarts.ECharts | null>(null)
    const csvXAxisData = ref<string[]>([])
    const csvSeries = ref<LineSeriesOption[]>([])
    const isLoading = ref(false)
    const loadError = ref<string | null>(null)
    const rowCount = ref(0)
    
    
    /* ─────────────────────────────────────────────────────────────────────────────
       COMPUTED: Final chart options
       ───────────────────────────────────────────────────────────────────────────── */
    
    const finalXAxisData = computed(() => 
      csvXAxisData.value.length > 0 ? csvXAxisData.value : props.xAxisData
    )
    
    const finalSeries = computed(() => 
      csvSeries.value.length > 0 ? csvSeries.value : props.series
    )
    
    const chartOptions = computed<EChartsOption>(() => {
      const base = getBaseChartOptions()
      
      // Build options
      const options: EChartsOption = {
        ...base,
        
        // No animation for static PDF
        animation: false,
        
        // Grid adjustments based on title/legend
        grid: {
          ...base.grid,
          top: props.title ? 45 : 25,
          bottom: props.showLegend ? 45 : 25,
        },
        
        // X-Axis
        xAxis: {
          ...base.xAxis,
          type: 'category',
          data: finalXAxisData.value,
          name: props.xAxisLabel,
          nameLocation: 'middle',
          nameGap: 30,
        },
        
        // Y-Axis
        yAxis: {
          ...base.yAxis,
          type: 'value',
          name: props.yAxisLabel,
          nameLocation: 'middle',
          nameGap: 40,
          min: props.yMin,
          max: props.yMax,
        },
        
        // Legend
        legend: {
          ...chartTheme.legend,
          show: props.showLegend && finalSeries.value.length > 1,
        },
        
        // Series
        series: finalSeries.value,
      }
      
      // Merge any custom options
      if (props.options) {
        return deepMerge(options, props.options)
      }
      
      return options
    })
    
    
    /* ─────────────────────────────────────────────────────────────────────────────
       LOAD CSV DATA
       ───────────────────────────────────────────────────────────────────────────── */
    
    async function loadCsvData() {
      if (!props.csvPath || !props.xColumn || props.yColumns.length === 0) {
        return
      }
      
      isLoading.value = true
      loadError.value = null
      
      try {
        const data = await loadCSV(props.csvPath)
        
        const result = csvToSeries(data, {
          xColumn: props.xColumn,
          yColumns: props.yColumns,
          seriesLabels: props.seriesLabels.length > 0 ? props.seriesLabels : undefined,
          seriesPresets: props.seriesPresets.length > 0 ? props.seriesPresets : undefined,
          xAsDate: props.xAsDate,
          xDateFormat: props.xDateFormat,
        })
        
        csvXAxisData.value = result.xAxisData
        csvSeries.value = result.series
        rowCount.value = result.originalRowCount
        
      } catch (err) {
        loadError.value = err instanceof Error ? err.message : 'Failed to load CSV'
        console.error('CSV load error:', err)
      } finally {
        isLoading.value = false
      }
    }
    
    
    /* ─────────────────────────────────────────────────────────────────────────────
       CHART INITIALIZATION
       ───────────────────────────────────────────────────────────────────────────── */
    
    function initChart() {
      if (!chartContainer.value) return
      
      // Dispose existing instance
      if (chartInstance.value) {
        chartInstance.value.dispose()
      }
      
      // Create new instance
      chartInstance.value = echarts.init(chartContainer.value, undefined, {
        renderer: 'canvas',
        width: props.width,
        height: props.height,
      })
      
      // Set options
      chartInstance.value.setOption(chartOptions.value)
    }
    
    
    /* ─────────────────────────────────────────────────────────────────────────────
       LIFECYCLE
       ───────────────────────────────────────────────────────────────────────────── */
    
    onMounted(async () => {
      // Load CSV if path is provided
      if (props.csvPath) {
        await loadCsvData()
      }
      
      // Initialize chart
      initChart()
    })
    
    // Update chart when options change
    watch(chartOptions, (newOptions) => {
      if (chartInstance.value) {
        chartInstance.value.setOption(newOptions, true)
      }
    }, { deep: true })
    
    // Reload CSV when path changes
    watch(() => props.csvPath, async (newPath) => {
      if (newPath) {
        await loadCsvData()
      }
    })
    
    
    /* ─────────────────────────────────────────────────────────────────────────────
       UTILITIES
       ───────────────────────────────────────────────────────────────────────────── */
    
    function deepMerge(target: any, source: any): any {
      const result = { ...target }
      for (const key of Object.keys(source)) {
        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
          result[key] = deepMerge(result[key] || {}, source[key])
        } else {
          result[key] = source[key]
        }
      }
      return result
    }
    
    // Container style
    const containerStyle = computed(() => ({
      width: `${props.width}px`,
      height: `${props.height}px`,
      position: 'relative' as const,
    }))
    </script>
    
    <template>
      <div class="line-chart-container" :style="containerStyle">
        <!-- Title (rendered outside ECharts for better control) -->
        <div v-if="title" class="chart-title">{{ title }}</div>
        <div v-if="subtitle" class="chart-subtitle">{{ subtitle }}</div>
        
        <!-- Loading state -->
        <div v-if="isLoading" class="chart-loading">
          Loading...
        </div>
        
        <!-- Error state -->
        <div v-else-if="loadError" class="chart-error">
          {{ loadError }}
        </div>
        
        <!-- Chart canvas -->
        <div 
          v-else
          ref="chartContainer"
          class="chart-canvas"
        />
        
        <!-- Row count indicator for large datasets -->
        <div v-if="rowCount > 1000" class="chart-row-count">
          {{ rowCount.toLocaleString() }} points (sampled)
        </div>
      </div>
    </template>
    
    <style scoped>
    .line-chart-container {
      font-family: 'Nunito Sans', sans-serif;
    }
    
    .chart-title {
      font-size: 13px;
      font-weight: 700;
      color: #5d8392;
      text-align: center;
      line-height: 1.4;
      position: absolute;
      top: 5px;
      left: 0;
      right: 0;
      z-index: 10;
    }
    
    .chart-subtitle {
      font-size: 10px;
      font-weight: 400;
      color: #888;
      text-align: center;
      line-height: 1.3;
      position: absolute;
      top: 22px;
      left: 0;
      right: 0;
      z-index: 10;
    }
    
    .chart-canvas {
      width: 100%;
      height: 100%;
    }
    
    .chart-loading,
    .chart-error {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      font-size: 12px;
      color: #888;
    }
    
    .chart-error {
      color: #e74c3c;
    }
    
    .chart-row-count {
      position: absolute;
      bottom: 2px;
      right: 8px;
      font-size: 8px;
      color: #aaa;
    }
    </style>