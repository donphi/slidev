import * as echarts from 'echarts/core'
import { LineChart as EChartsLine, BarChart as EChartsBar } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  MarkLineComponent,
} from 'echarts/components'
import { SVGRenderer } from 'echarts/renderers'

// Register ECharts components ONCE at module load
// This prevents re-registration issues during HMR
echarts.use([
  EChartsLine,
  EChartsBar,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  MarkLineComponent,
  SVGRenderer,
])

export { echarts }