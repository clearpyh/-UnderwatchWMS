<template>
  <div :class="className" ref="barChartRef" :style="{height:height,width:width}" />
</template>

<script setup>
import * as echarts from 'echarts'
import { nextTick, onMounted, onBeforeUnmount, ref, watch } from 'vue'

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
    default: '300px'
  },
  yName: {
    type: String,
    default: 'kM·h'
  },
  barColor: {
    type: Array,
    default: () => {
      return ['#00d0ff','#2969e8']
    }
  },
  xData: {
    type: Array,
    default: () => {
      return ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    }
  },
  yData: {
    type: Array,
    default: () => {
      return [79, 52, 200, 334, 390, 330, 34,79, 52, 123, 334, 34, 56]
    }
  }
})

const chart = ref(null)
const barChartRef = ref()

onMounted(() => {
  nextTick(() => {
    initChart()
  })
})

onBeforeUnmount(() => {
  if (!chart.value) {
    return
  }
  chart.value.dispose()
  chart.value = null
})

watch(() => props.yData, (value) => {
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
  chart.value = echarts.init(barChartRef.value)
  chart.value.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      backgroundColor: 'rgba(28, 37, 80, 0.9)',
      borderColor: '#2969e8',
      textStyle: {
        color: '#fff'
      }
    },
    grid: {
      top: '16%',
      left: '2%',
      right: '5%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: props.xData,
      axisTick: {
        alignWithLabel: true
      },
      nameTextStyle: {
        color: '#fff'
      },
      splitLine: {
        lineStyle: {
          color: '#1d3666'
        }
      },
      axisLabel: {
        color: '#fff'
      },
      axisLine: {
        lineStyle: {
          color: '#00d0fe'
        }
      }
    },
    yAxis: {
      type: 'value',
      name: props.yName,
      nameTextStyle: {
        color: '#fff'
      },
      splitLine: {
        lineStyle: {
          color: '#1d3666'
        }
      },
      axisLabel: {
        color: '#fff'
      }
    },
    series: [
      {
        type: 'bar',
        data: props.yData,
        barWidth: '50%',
        itemStyle: {
          borderRadius: [4, 4, 0, 0], // 圆角柱体
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: props.barColor[0] },
            { offset: 1, color: props.barColor[1] }
          ]),
          shadowColor: 'rgba(0, 208, 255, 0.5)', // 发光效果
          shadowBlur: 10
        },
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.1)',
          borderRadius: [4, 4, 0, 0]
        },
        animationDuration: 1200,
        animationEasing: 'elasticOut', // 弹性动画
        animationDelay: function (idx) {
          return idx * 100; // 依次出现
        }
      }
    ]
  })
}
</script>
