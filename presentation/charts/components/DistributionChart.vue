<!--
  ╔══════════════════════════════════════════════════════════════════════════════╗
  ║                       DISTRIBUTION CHART COMPONENT                           ║
  ╠══════════════════════════════════════════════════════════════════════════════╣
  ║                                                                              ║
  ║  Histogram with normal distribution curve overlay.                           ║
  ║  Features:                                                                   ║
  ║  - Automatic binning of raw data                                             ║
  ║  - Normal distribution curve fit                                             ║
  ║  - Mean line indicator                                                       ║
  ║  - CSV file support for large datasets                                       ║
  ║                                                                              ║
  ║  USAGE:                                                                      ║
  ║  ──────                                                                      ║
  ║  <DistributionChart                                                          ║
  ║    title="General Score"                                                     ║
  ║    :width="280"                                                              ║
  ║    :height="250"                                                             ║
  ║    csvPath="/data/bam.csv"                                                   ║
  ║    valueColumn="general_score"                                               ║
  ║    color="#5d8392"                                                           ║
  ║    :binCount="30"                                                            ║
  ║  />                                                                          ║
  ║                                                                              ║
  ╚══════════════════════════════════════════════════════════════════════════════╝
-->

<script setup lang="ts">
    import { ref, computed, onMounted, watch } from 'vue'
    import type { EChartsOption, BarSeriesOption, LineSeriesOption } from 'echarts'
    
    import { echarts } from '../config/echartsSetup'
    
    /* ─────────────────────────────────────────────────────────────────────────────
       PROPS
       ───────────────────────────────────────────────────────────────────────────── */
    
    interface Props {
      // Dimensions
      width: number
      height: number
      
      // Title
      title?: string
      
      // Data source - CSV
      csvPath?: string
      valueColumn?: string
      
      // Or direct data array
      values?: number[]
      
      // Histogram settings
      binCount?: number
      
      // Styling
      color?: string
      fillOpacity?: number
      
      // Axis
      xAxisLabel?: string
      yAxisLabel?: string
      xMin?: number
      xMax?: number
      yMax?: number  // Fixed Y-axis maximum for consistent scaling across charts
    }
    
    const props = withDefaults(defineProps<Props>(), {
      title: '',
      csvPath: '',
      valueColumn: '',
      values: () => [],
      binCount: 30,
      color: '#5d8392',
      fillOpacity: 0.4,
      xAxisLabel: 'Score',
      yAxisLabel: 'Frequency',
    })
    
    
    /* ─────────────────────────────────────────────────────────────────────────────
       STATE
       ───────────────────────────────────────────────────────────────────────────── */
    
    const chartContainer = ref<HTMLDivElement | null>(null)
    const chartInstance = ref<echarts.ECharts | null>(null)
    const rawValues = ref<number[]>([])
    const isLoading = ref(false)
    const loadError = ref<string | null>(null)
    
    
    /* ─────────────────────────────────────────────────────────────────────────────
       STATISTICS CALCULATIONS
       ───────────────────────────────────────────────────────────────────────────── */
    
    function calculateStats(data: number[]) {
        if (data.length === 0) return { mean: 0, std: 0, min: 0, max: 0 }
        
        const n = data.length
        let sum = 0
        let min = Infinity
        let max = -Infinity
        
        // Single pass for mean, min, max (handles large arrays)
        for (let i = 0; i < n; i++) {
            const val = data[i]
            sum += val
            if (val < min) min = val
            if (val > max) max = val
        }
        
        const mean = sum / n
        
        // Second pass for variance
        let varianceSum = 0
        for (let i = 0; i < n; i++) {
            varianceSum += (data[i] - mean) ** 2
        }
        const std = Math.sqrt(varianceSum / n)
        
        return { mean, std, min, max }
        }
    
    function createHistogram(data: number[], binCount: number, min: number, max: number) {
      const binWidth = (max - min) / binCount
      const bins: number[] = new Array(binCount).fill(0)
      const binCenters: number[] = []
      
      // Calculate bin centers
      for (let i = 0; i < binCount; i++) {
        binCenters.push(min + binWidth * (i + 0.5))
      }
      
      // Count values in each bin
      for (const val of data) {
        const binIndex = Math.min(
          Math.floor((val - min) / binWidth),
          binCount - 1
        )
        if (binIndex >= 0 && binIndex < binCount) {
          bins[binIndex]++
        }
      }
      
      return { bins, binCenters, binWidth }
    }
    
    function normalPDF(x: number, mean: number, std: number): number {
      const coefficient = 1 / (std * Math.sqrt(2 * Math.PI))
      const exponent = -0.5 * Math.pow((x - mean) / std, 2)
      return coefficient * Math.exp(exponent)
    }
    
    function createNormalCurve(
      xMin: number,
      xMax: number, 
      mean: number, 
      std: number, 
      totalCount: number,
      binWidth: number,
      numPoints: number = 100  // Match Python's 100 points for smooth curve
    ): [number, number][] {
      // Scale the normal PDF to match histogram counts
      const scaleFactor = totalCount * binWidth
      const step = (xMax - xMin) / (numPoints - 1)
      const curve: [number, number][] = []
      
      for (let i = 0; i < numPoints; i++) {
        const x = xMin + i * step
        const y = normalPDF(x, mean, std) * scaleFactor
        curve.push([x, y])
      }
      
      return curve
    }
    
    
    /* ─────────────────────────────────────────────────────────────────────────────
       COMPUTED: Chart options
       ───────────────────────────────────────────────────────────────────────────── */
    
    const chartOptions = computed<EChartsOption>(() => {
      const data = rawValues.value.length > 0 ? rawValues.value : props.values
      if (data.length === 0) {
        return {}
      }
      
      const stats = calculateStats(data)
      const xMin = props.xMin ?? Math.floor(stats.min - 0.5)
      const xMax = props.xMax ?? Math.ceil(stats.max + 0.5)
      
      const { bins, binCenters, binWidth } = createHistogram(data, props.binCount, xMin, xMax)
      
      // Convert histogram to [x, y] pairs for value-based axis
      const histogramData: [number, number][] = binCenters.map((x, i) => [x, bins[i]])
      
      // Generate smooth normal curve with 100 points (matches Python)
      const normalCurve = createNormalCurve(xMin, xMax, stats.mean, stats.std, data.length, binWidth, 100)
      
      return {
        animation: false,
        
        grid: {
          left: 60,  // Increased for Y-axis label spacing
          right: chartGrid.right,
          top: props.title ? 30 : 15,
          bottom: 75,  // More space for legend at bottom
          containLabel: false,
        },
        
        legend: {
          show: true,
          top: 'bottom',
          left: 'center',
          orient: 'horizontal',
          itemWidth: 15,
          itemHeight: 10,
          itemGap: 10,
          textStyle: {
            fontFamily: chartTypography.fontFamily,
            fontSize: 8,
            color: chartTypography.legendColor,
          },
        },
        
        tooltip: {
          ...chartTheme.tooltip,
          formatter: (params: any) => {
            const score = params[0]?.axisValue || ''
            const freq = params[0]?.value || 0
            return `Score: ${score}<br/>Frequency: ${freq}`
          },
        },
        
        xAxis: {
          type: 'value',
          min: xMin,
          max: xMax,
          name: props.xAxisLabel,
          nameLocation: 'middle',
          nameGap: 28,
          nameTextStyle: {
            fontFamily: chartTypography.fontFamily,
            fontSize: chartTypography.axisNameFontSize,
            color: chartTypography.axisNameColor,
          },
          axisLine: {
            show: chartGrid.showXAxisLine,
            lineStyle: { color: chartGrid.axisLineColor },
          },
          axisTick: {
            show: true,
            lineStyle: { color: chartColors.axisTick },
          },
          axisLabel: {
            fontFamily: chartTypography.fontFamily,
            fontSize: chartTypography.axisLabelFontSize,
            color: chartTypography.axisLabelColor,
            formatter: (value: number) => value.toFixed(1),
          },
          splitLine: { show: chartGrid.showXSplitLine },
        },
        
        yAxis: {
          type: 'value',
          name: props.yAxisLabel,
          nameLocation: 'middle',
          nameGap: 50,  // Increased gap from numbers
          nameTextStyle: {
            fontFamily: chartTypography.fontFamily,
            fontSize: chartTypography.axisNameFontSize,
            color: chartTypography.axisNameColor,
          },
          max: props.yMax ?? undefined,  // Fixed max if provided
          min: 0,
          splitNumber: 4,  // Consistent number of grid lines
          axisLine: { show: chartGrid.showYAxisLine },
          axisTick: { show: false },
          axisLabel: {
            fontFamily: chartTypography.fontFamily,
            fontSize: chartTypography.axisLabelFontSize,
            color: chartTypography.axisLabelColor,
          },
          splitLine: {
            show: chartGrid.showYSplitLine,
            lineStyle: { 
              color: chartGrid.splitLineColor,
              width: chartGrid.splitLineWidth,
            },
          },
        },
        
        series: [
          // Histogram (no smoothing - angular like true histogram)
          {
            name: 'Dist',
            type: 'line',
            data: histogramData,
            smooth: 0.1,     // No smoothing - matches histogram behavior
            symbol: 'none',
            lineStyle: {
              color: props.color,
              width: 2,
            },
            itemStyle: {
              color: props.color,
            },
            areaStyle: {
              color: props.color,
              opacity: props.fillOpacity,
            },
            // Mean line as markLine
            markLine: {
              silent: true,
              symbol: 'none',
              label: { show: false },
              lineStyle: {
                color: distributionSettings.overlayColor,
                width: distributionSettings.meanLineWidth,
                type: distributionSettings.meanLineType,
              },
              data: [
                {
                  name: `Mean`,
                  xAxis: stats.mean,  // Now using actual value since x-axis is value type
                },
              ],
            },
          },
          // Normal distribution curve (100 points for smooth curve)
          {
            name: `Norm (μ=${stats.mean.toFixed(1)})`,
            type: 'line',
            data: normalCurve,
            smooth: true,      // Smooth interpolation for bell curve
            symbol: 'none',
            lineStyle: {
              color: distributionSettings.overlayColor,
              width: distributionSettings.normalCurveWidth,
              type: distributionSettings.normalCurveType,
            },
            itemStyle: {
              color: distributionSettings.overlayColor,
            },
          },
          // Invisible series for mean legend entry
          {
            name: `Mean`,
            type: 'line',
            data: [],
            symbol: 'none',
            lineStyle: {
              color: distributionSettings.overlayColor,
              width: distributionSettings.meanLineWidth,
              type: distributionSettings.meanLineType,
            },
            itemStyle: {
              color: distributionSettings.overlayColor,
            },
          },
        ],
      }
    })
    
    
    /* ─────────────────────────────────────────────────────────────────────────────
       LOAD CSV DATA
       ───────────────────────────────────────────────────────────────────────────── */
    
    async function loadCsvData() {
      if (!props.csvPath || !props.valueColumn) return
      
      isLoading.value = true
      loadError.value = null
      
      try {
        const data = await loadCSV(props.csvPath)
        
        // Extract the value column as numbers
        rawValues.value = data.rows
          .map(row => {
            const val = row[props.valueColumn]
            return typeof val === 'number' ? val : parseFloat(String(val))
          })
          .filter(val => !isNaN(val) && val !== null && val !== undefined)
        
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
      
      if (chartInstance.value) {
        chartInstance.value.dispose()
      }
      
      chartInstance.value = echarts.init(chartContainer.value, undefined, {
        renderer: 'svg',
        width: props.width,
        height: props.height,
      })
      
      chartInstance.value.setOption(chartOptions.value)
    }
    
    
    /* ─────────────────────────────────────────────────────────────────────────────
       LIFECYCLE
       ───────────────────────────────────────────────────────────────────────────── */
    
    onMounted(async () => {
        if (props.csvPath) {
            await loadCsvData()
            await nextTick()  // Wait for Vue reactivity to update
        }
        initChart()
        })
    
    watch(chartOptions, (newOptions) => {
        if (Object.keys(newOptions).length === 0) return
        
        if (chartInstance.value) {
            chartInstance.value.setOption(newOptions, true)
        } else {
            // Chart wasn't initialized yet, do it now
            initChart()
        }
        }, { deep: true })
    
    watch(() => props.csvPath, async () => {
      if (props.csvPath) {
        await loadCsvData()
      }
    })
    
    
    /* ─────────────────────────────────────────────────────────────────────────────
       STYLES
       ───────────────────────────────────────────────────────────────────────────── */
    
    const containerStyle = computed(() => ({
      width: `${props.width}px`,
      height: `${props.height}px`,
      position: 'relative' as const,
    }))
    </script>
    
    <template>
      <div class="distribution-chart-container" :style="containerStyle">
        <!-- Title -->
        <div v-if="title" class="chart-title">{{ title }}</div>
        
        <!-- Loading -->
        <div v-if="isLoading" class="chart-loading">Loading...</div>
        
        <!-- Error -->
        <div v-else-if="loadError" class="chart-error">{{ loadError }}</div>
        
        <!-- Chart -->
        <div v-else ref="chartContainer" class="chart-canvas" />
      </div>
    </template>
    
    <style scoped>
    .distribution-chart-container {
      font-family: 'Nunito Sans', sans-serif;
    }
    
    .chart-title {
      font-size: 12px;
      font-weight: 700;
      color: #333;
      text-align: center;
      position: absolute;
      top: 5px;
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
    </style>