<!--
  ╔══════════════════════════════════════════════════════════════════════════════╗
  ║                            CHART ROW COMPONENT                               ║
  ╠══════════════════════════════════════════════════════════════════════════════╣
  ║                                                                              ║
  ║  Container for displaying multiple charts side-by-side.                      ║
  ║                                                                              ║
  ║  USAGE:                                                                      ║
  ║  ──────                                                                      ║
  ║  <ChartRow :gap="20" align="top">                                            ║
  ║    <LineChart ... />                                                         ║
  ║    <LineChart ... />                                                         ║
  ║    <LineChart ... />                                                         ║
  ║  </ChartRow>                                                                 ║
  ║                                                                              ║
  ╚══════════════════════════════════════════════════════════════════════════════╝
-->

<script setup lang="ts">
    import { computed } from 'vue'
    
    interface Props {
      gap?: number
      align?: 'top' | 'center' | 'bottom'
      justify?: 'start' | 'center' | 'between' | 'around' | 'evenly'
    }
    
    const props = withDefaults(defineProps<Props>(), {
      gap: 24,
      align: 'top',
      justify: 'start',
    })
    
    const alignMap = {
      top: 'flex-start',
      center: 'center',
      bottom: 'flex-end',
    }
    
    const justifyMap = {
      start: 'flex-start',
      center: 'center',
      between: 'space-between',
      around: 'space-around',
      evenly: 'space-evenly',
    }
    
    const containerStyle = computed(() => ({
      display: 'flex',
      flexDirection: 'row' as const,
      gap: `${props.gap}px`,
      alignItems: alignMap[props.align],
      justifyContent: justifyMap[props.justify],
      width: '100%',
    }))
    </script>
    
    <template>
      <div class="chart-row" :style="containerStyle">
        <slot />
      </div>
    </template>
    
    <style scoped>
    .chart-row {
      flex-wrap: nowrap;
    }
    </style>