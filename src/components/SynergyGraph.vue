<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { defineConfigs } from 'v-network-graph'
import type { SynergyGraphResult } from '@/domain/types'
import { useNetworkGraph } from '@/composables/useNetworkGraph'

const props = defineProps<{
  graph: SynergyGraphResult | null
}>()

const graphRef = ref(props.graph)
watch(
  () => props.graph,
  (value) => {
    graphRef.value = value
  },
)

const { nodes, edges } = useNetworkGraph(graphRef)

const configs = defineConfigs({
  view: {
    scalingObjects: true,
    minZoomLevel: 0.4,
    maxZoomLevel: 2.5,
  },
  node: {
    selectable: true,
    normal: {
      radius: 36,
      color: '#e8e8e8',
      strokeWidth: 1.5,
      strokeColor: '#333',
    },
    label: {
      visible: true,
      fontSize: 13,
      fontFamily: 'system-ui, sans-serif',
      color: '#111',
    },
  },
  edge: {
    normal: {
      width: 2,
      color: '#666',
      dasharray: '0',
    },
    label: {
      visible: true,
      fontSize: 11,
      fontFamily: 'system-ui, sans-serif',
      color: '#444',
      background: {
        visible: true,
        color: '#fafafa',
        padding: 3,
        borderRadius: 3,
      },
    },
    margin: 12,
    marker: {
      target: {
        type: 'arrow',
        width: 8,
        height: 8,
      },
    },
  },
})

const layouts = computed(() => ({
  nodes: {
    type: 'force' as const,
    options: {
      numIterations: 120,
      noverlap: true,
      nodeStrength: -400,
      edgeLength: 140,
    },
  },
}))

const hasGraph = computed(
  () => props.graph && (props.graph.links.length > 0 || props.graph.elementIds.length > 0),
)
</script>

<template>
  <div v-if="hasGraph" class="graph-wrap">
    <v-network-graph
      class="graph"
      :nodes="nodes"
      :edges="edges"
      :configs="configs"
      :layouts="layouts"
    />
  </div>
  <p v-else class="empty">{{ $t('result.empty') }}</p>
</template>

<style scoped>
.graph-wrap {
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
}

.graph {
  width: 100%;
  height: 520px;
  border: 1px solid #000;
  background: #fff;
}

.empty {
  text-align: center;
  font-family: system-ui, sans-serif;
}
</style>
