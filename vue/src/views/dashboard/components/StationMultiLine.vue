<template>
  <div :class="className" ref="multiLineRef" :style="{height:height,width:width}" />
</template>

<script setup>
import * as echarts from 'echarts'
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps({
  className: {
    type: String,
    default: 'chart'
  },
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '350px'
  },
  xName: {
    type: String,
    default: '日'
  },
  yName: {
    type: String,
    default: '件'
  },
  chartData: {
    type: Object,
    default: () => {
      return {
        xData: ['01-01','01-02','01-03','01-04','01-05','01-06','01-07'],
        series: [
          { name: '退货', color: '#c7a428', data: [120, 100, 150, 170, 90, 140, 95] },
          { name: '投诉', color: '#ee4368', data: [50, 30, 70, 40, 35, 60, 55] },
          { name: '换货', color: '#5470c6', data: [20, 28, 35, 18, 32, 25, 22] }
        ]
      }
    }
  }
})

const multiLineRef = ref(null)
const chart = ref(null)

onMounted(() => {
  nextTick(() => {
    initChart()
  })
})

onBeforeUnmount(() => {
  if (!chart.value) return
  chart.value.dispose()
  chart.value = null
})

watch(() => props.chartData, (value) => {
  nextTick(() => {
    if (!chart.value) {
      initChart()
      return
    }
    chart.value.dispose()
    chart.value = null
    initChart()
  })
})

function initChart() {
  chart.value = echarts.init(multiLineRef.value, 'lightTheme')
  chart.value.setOption({
    xAxis: {
      name: props.xName,
      data: props.chartData.xData,
      boundaryGap: false,
      axisTick: { show: false }
    },
    grid: {
      top: '15%',
      left: '2%',
      right: '10%',
      bottom: '0%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        const date = params[0]?.axisValue || ''
        const lines = params.map(p => `${p.marker}${p.seriesName}：${p.data}`)
        return `${date}<br/>${lines.join('<br/>')}`
      }
    },
    legend: {
      data: props.chartData.series.map(s => s.name)
    },
    yAxis: {
      name: props.yName,
      axisTick: { show: false }
    },
    series: props.chartData.series.map(s => ({
      name: s.name,
      type: 'line',
      smooth: true,
      data: s.data,
      itemStyle: { color: s.color },
      lineStyle: { width: 3 },
      areaStyle: {
        opacity: 0.15,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: s.color },
          { offset: 1, color: 'rgba(255,255,255,0.0)' }
        ])
      },
      animationDuration: 1200
    }))
  })
}
</script>

