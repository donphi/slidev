/* ╔══════════════════════════════════════════════════════════════════════════════╗
   ║                                                                              ║
   ║                        ECHARTS STYLE CONFIGURATION                           ║
   ║                                                                              ║
   ║   Master chart style configuration. Controls all visual aspects of charts.  ║
   ║   Mirrors the structure of style.css for consistency.                       ║
   ║                                                                              ║
   ╠══════════════════════════════════════════════════════════════════════════════╣
   ║                                                                              ║
   ║   TABLE OF CONTENTS                                                          ║
   ║   ─────────────────                                                          ║
   ║                                                                              ║
   ║   1. COLOR PALETTE .................... Series colors, backgrounds           ║
   ║   2. TYPOGRAPHY ....................... Fonts, sizes, weights                ║
   ║   3. GRID & AXES ...................... Grid lines, axis styling             ║
   ║   4. LINE STYLES ...................... Line width, smoothing, symbols       ║
   ║   5. LARGE DATA SETTINGS .............. Sampling, performance                ║
   ║   6. ECHARTS THEME .................... Complete theme object                ║
   ║   7. DEFAULT SERIES OPTIONS ........... Pre-configured line styles           ║
   ║                                                                              ║
   ╚══════════════════════════════════════════════════════════════════════════════╝ */

   import type { EChartsOption, LineSeriesOption } from 'echarts'


   /* ══════════════════════════════════════════════════════════════════════════════
      1. COLOR PALETTE
      
      Matches your presentation theme from style.css:
      - Primary: #5d8392
      - Secondary: #42b883
      - Text: #333
      ══════════════════════════════════════════════════════════════════════════════ */
   
   export const chartColors = {
     // Primary series colors (used in order for multiple lines)
     series: [
       '#5d8392',    // Primary - matches --slidev-theme-primary
       '#42b883',    // Secondary - matches --slidev-theme-secondary
       '#e67e22',    // Orange accent
       '#9b59b6',    // Purple accent
       '#1abc9c',    // Teal accent
       '#3498db',    // Blue accent
       '#e74c3c',    // Red accent
       '#f39c12',    // Yellow accent
     ],
     
     // Semantic colors for specific meanings
     positive: '#27ae60',
     negative: '#e74c3c',
     neutral: '#95a5a6',
     
     // Grid and axis
     axisLine: '#ddd',
     axisTick: '#ddd',
     axisLabel: '#666',
     splitLine: '#e8e8e8',
     
     // Background
     background: 'transparent',
   }
   
   
   /* ══════════════════════════════════════════════════════════════════════════════
      2. TYPOGRAPHY
      
      Matches Nunito Sans from your presentation.
      ══════════════════════════════════════════════════════════════════════════════ */
   
   export const chartTypography = {
     fontFamily: 'Nunito Sans, sans-serif',
     
     // Title
     titleFontSize: 14,
     titleFontWeight: 700,
     titleColor: '#5d8392',
     
     // Subtitle
     subtitleFontSize: 11,
     subtitleColor: '#888',
     
     // Axis labels
     axisNameFontSize: 11,
     axisNameColor: '#666',
     
     // Tick labels
     axisLabelFontSize: 10,
     axisLabelColor: '#666',
     
     // Legend
     legendFontSize: 11,
     legendColor: '#333',
     
     // Tooltip
     tooltipFontSize: 12,
   }
   
   
   /* ══════════════════════════════════════════════════════════════════════════════
      3. GRID & AXES
      
      Control chart area and axis appearance.
      ══════════════════════════════════════════════════════════════════════════════ */
   
   export const chartGrid = {
     // Chart area margins (px)
     left: 50,
     right: 20,
     top: 40,
     bottom: 50,
     
     // Grid lines
     showXSplitLine: false,
     showYSplitLine: true,
     splitLineColor: '#e8e8e8',
     splitLineWidth: 1,
     splitLineType: 'solid' as const,
     
     // Axis lines
     showXAxisLine: true,
     showYAxisLine: false,
     axisLineColor: '#ddd',
   }
   
   
   /* ══════════════════════════════════════════════════════════════════════════════
      4. LINE STYLES
      
      Default styling for line series.
      ══════════════════════════════════════════════════════════════════════════════ */
   
   export const lineStyles = {
     // Line appearance
     lineWidth: 2,
     smooth: 0.3,              // 0 = straight, 1 = very smooth (0.3 is subtle)
     
     // Symbols (data points)
     showSymbol: true,         // Show points on line
     symbolSize: 4,            // Point size
     symbolSizeHover: 8,       // Point size on hover
     
     // Area fill
     areaOpacity: 0,           // 0 = no fill, 0.3 = subtle fill
   }
   
   
   /* ══════════════════════════════════════════════════════════════════════════════
      5. LARGE DATA SETTINGS
      
      Critical for handling 16,000+ row datasets.
      
      SAMPLING ALGORITHMS:
      - 'lttb'    : Largest Triangle Three Buckets (best for preserving shape)
      - 'average' : Average value in each bucket
      - 'max'     : Maximum value in each bucket
      - 'min'     : Minimum value in each bucket
      - 'sum'     : Sum of values in each bucket
      ══════════════════════════════════════════════════════════════════════════════ */
   
   export const largeDataSettings = {
     // Enable large data mode (optimizes rendering for >5000 points)
     large: true,
     
     // Threshold to trigger large mode
     largeThreshold: 2000,
     
     // Sampling algorithm - 'lttb' preserves visual shape best
     sampling: 'lttb' as const,
     
     // Target number of points after sampling (adjust based on chart width)
     // Rule of thumb: ~1-2 points per pixel of chart width
     // For a 280px wide chart, 300-500 points is plenty
     progressiveThreshold: 3000,
     
     // Disable animation for static PDF output
     animation: false,
   }
   
   
   /* ══════════════════════════════════════════════════════════════════════════════
      5.1 DISTRIBUTION CHART SETTINGS
      
      Settings specific to histogram/distribution charts with normal curve overlay.
      ══════════════════════════════════════════════════════════════════════════════ */
   
   export const distributionSettings = {
     // Normal curve and mean line color
     overlayColor: '#8B0000',       // Dark red for normal curve and mean line
     
     // Normal curve style
     normalCurveWidth: 2,
     normalCurveType: 'dashed' as const,
     
     // Mean line style  
     meanLineWidth: 2,
     meanLineType: 'dotted' as const,
     
    // Default histogram settings (matches Python's bins=30)
    defaultBinCount: 30,
     defaultFillOpacity: 0.35,

    // Distribution chart colors (used in order) - distinct colors
    seriesColors: ['#5d8392', '#E07A5F', '#81B29A'],  // Blue-gray, Coral, Sage green
   }
   
   
   /* ══════════════════════════════════════════════════════════════════════════════
      6. ECHARTS THEME OBJECT
      
      Complete theme that can be registered with ECharts.
      Applied globally to all charts.
      ══════════════════════════════════════════════════════════════════════════════ */
   
   export const chartTheme = {
     color: chartColors.series,
     
     backgroundColor: chartColors.background,
     
     textStyle: {
       fontFamily: chartTypography.fontFamily,
     },
     
     title: {
       textStyle: {
         fontFamily: chartTypography.fontFamily,
         fontSize: chartTypography.titleFontSize,
         fontWeight: chartTypography.titleFontWeight,
         color: chartTypography.titleColor,
       },
       subtextStyle: {
         fontFamily: chartTypography.fontFamily,
         fontSize: chartTypography.subtitleFontSize,
         color: chartTypography.subtitleColor,
       },
       left: 'center',
       top: 5,
     },
     
     legend: {
       textStyle: {
         fontFamily: chartTypography.fontFamily,
         fontSize: chartTypography.legendFontSize,
         color: chartTypography.legendColor,
       },
       bottom: 5,
       itemWidth: 15,
       itemHeight: 10,
       itemGap: 20,
     },
     
     tooltip: {
       trigger: 'axis',
       backgroundColor: 'rgba(0, 0, 0, 0.8)',
       borderColor: 'rgba(255, 255, 255, 0.1)',
       borderWidth: 1,
       textStyle: {
         fontFamily: chartTypography.fontFamily,
         fontSize: chartTypography.tooltipFontSize,
         color: '#fff',
       },
       axisPointer: {
         type: 'cross',
         crossStyle: {
           color: '#999',
         },
       },
     },
     
     xAxis: {
       axisLine: {
         show: chartGrid.showXAxisLine,
         lineStyle: {
           color: chartGrid.axisLineColor,
         },
       },
       axisTick: {
         show: true,
         lineStyle: {
           color: chartColors.axisTick,
         },
       },
       axisLabel: {
         fontFamily: chartTypography.fontFamily,
         fontSize: chartTypography.axisLabelFontSize,
         color: chartTypography.axisLabelColor,
       },
       splitLine: {
         show: chartGrid.showXSplitLine,
         lineStyle: {
           color: chartGrid.splitLineColor,
           width: chartGrid.splitLineWidth,
           type: chartGrid.splitLineType,
         },
       },
       nameTextStyle: {
         fontFamily: chartTypography.fontFamily,
         fontSize: chartTypography.axisNameFontSize,
         color: chartTypography.axisNameColor,
       },
     },
     
     yAxis: {
       axisLine: {
         show: chartGrid.showYAxisLine,
         lineStyle: {
           color: chartGrid.axisLineColor,
         },
       },
       axisTick: {
         show: false,
       },
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
           type: chartGrid.splitLineType,
         },
       },
       nameTextStyle: {
         fontFamily: chartTypography.fontFamily,
         fontSize: chartTypography.axisNameFontSize,
         color: chartTypography.axisNameColor,
       },
     },
     
     grid: {
       left: chartGrid.left,
       right: chartGrid.right,
       top: chartGrid.top,
       bottom: chartGrid.bottom,
       containLabel: false,
     },
     
     line: {
       smooth: lineStyles.smooth,
       symbol: 'circle',
       symbolSize: lineStyles.symbolSize,
       showSymbol: lineStyles.showSymbol,
       lineStyle: {
         width: lineStyles.lineWidth,
       },
       emphasis: {
         symbolSize: lineStyles.symbolSizeHover,
       },
     },
   }
   
   
   /* ══════════════════════════════════════════════════════════════════════════════
      7. DEFAULT SERIES OPTIONS
      
      Pre-configured series styles for common use cases.
      Spread these into your series definitions.
      
      USAGE:
      series: [{
        ...seriesPresets.primary,
        name: 'Revenue',
        data: myData,
      }]
      ══════════════════════════════════════════════════════════════════════════════ */
   
   export const seriesPresets: Record<string, Partial<LineSeriesOption>> = {
     // Standard line (uses theme color automatically)
     standard: {
       type: 'line',
       smooth: lineStyles.smooth,
       symbol: 'circle',
       symbolSize: lineStyles.symbolSize,
       showSymbol: lineStyles.showSymbol,
       sampling: largeDataSettings.sampling,
       large: largeDataSettings.large,
       largeThreshold: largeDataSettings.largeThreshold,
       animation: largeDataSettings.animation,
     },
     
     // Primary line (explicit blue-gray)
     primary: {
       type: 'line',
       smooth: lineStyles.smooth,
       symbol: 'circle',
       symbolSize: lineStyles.symbolSize,
       showSymbol: lineStyles.showSymbol,
       sampling: largeDataSettings.sampling,
       large: largeDataSettings.large,
       largeThreshold: largeDataSettings.largeThreshold,
       animation: largeDataSettings.animation,
       lineStyle: { color: chartColors.series[0], width: lineStyles.lineWidth },
       itemStyle: { color: chartColors.series[0] },
     },
     
     // Secondary line (explicit green)
     secondary: {
       type: 'line',
       smooth: lineStyles.smooth,
       symbol: 'circle',
       symbolSize: lineStyles.symbolSize,
       showSymbol: lineStyles.showSymbol,
       sampling: largeDataSettings.sampling,
       large: largeDataSettings.large,
       largeThreshold: largeDataSettings.largeThreshold,
       animation: largeDataSettings.animation,
       lineStyle: { color: chartColors.series[1], width: lineStyles.lineWidth },
       itemStyle: { color: chartColors.series[1] },
     },
     
     // Positive trend (green with area fill)
     positive: {
       type: 'line',
       smooth: lineStyles.smooth,
       symbol: 'circle',
       symbolSize: lineStyles.symbolSize,
       showSymbol: lineStyles.showSymbol,
       sampling: largeDataSettings.sampling,
       large: largeDataSettings.large,
       animation: largeDataSettings.animation,
       lineStyle: { color: chartColors.positive, width: lineStyles.lineWidth },
       itemStyle: { color: chartColors.positive },
       areaStyle: { color: chartColors.positive, opacity: 0.15 },
     },
     
     // Negative trend (red with area fill)
     negative: {
       type: 'line',
       smooth: lineStyles.smooth,
       symbol: 'circle',
       symbolSize: lineStyles.symbolSize,
       showSymbol: lineStyles.showSymbol,
       sampling: largeDataSettings.sampling,
       large: largeDataSettings.large,
       animation: largeDataSettings.animation,
       lineStyle: { color: chartColors.negative, width: lineStyles.lineWidth },
       itemStyle: { color: chartColors.negative },
       areaStyle: { color: chartColors.negative, opacity: 0.15 },
     },
     
     // Reference/baseline (dashed gray, no points)
     reference: {
       type: 'line',
       smooth: 0,
       symbol: 'none',
       showSymbol: false,
       sampling: largeDataSettings.sampling,
       large: largeDataSettings.large,
       animation: largeDataSettings.animation,
       lineStyle: { 
         color: chartColors.neutral, 
         width: 1.5,
         type: 'dashed',
       },
       itemStyle: { color: chartColors.neutral },
     },
     
     // Large dataset optimized (no points, thinner line)
     largeData: {
       type: 'line',
       smooth: 0.2,
       symbol: 'none',
       showSymbol: false,
       sampling: 'lttb',
       large: true,
       largeThreshold: 1000,
       animation: false,
       lineStyle: { width: 1.5 },
     },
   }
   
   
   /* ══════════════════════════════════════════════════════════════════════════════
      HELPER: Get base chart options
      
      Returns a complete options object with theme defaults applied.
      ══════════════════════════════════════════════════════════════════════════════ */
   
   export function getBaseChartOptions(overrides?: Partial<EChartsOption>): EChartsOption {
     const base: EChartsOption = {
       animation: largeDataSettings.animation,
       textStyle: {
         fontFamily: chartTypography.fontFamily,
       },
       grid: {
         left: chartGrid.left,
         right: chartGrid.right,
         top: chartGrid.top,
         bottom: chartGrid.bottom,
         containLabel: false,
       },
       tooltip: chartTheme.tooltip,
       legend: {
         ...chartTheme.legend,
         show: true,
       },
       xAxis: {
         type: 'category',
         ...chartTheme.xAxis,
       },
       yAxis: {
         type: 'value',
         ...chartTheme.yAxis,
       },
     }
     
     if (overrides) {
       return deepMerge(base, overrides)
     }
     return base
   }
   
   // Deep merge utility
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