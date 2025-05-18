<script setup lang="ts">
import { useRoute } from 'vue-router'
import BootScene from '@/components/BootScene.vue'
import { MOUSE } from 'three'
import { OrbitControls } from '@tresjs/cientos'

const route = useRoute()
</script>

<template>
  <TresCanvas
    :key="route.fullPath"
    window-size
    preset="realistic"
    shadows
    class="w-screen h-[calc(100vh-64px)]"
    :tone-mapping-exposure="0.9"
  >
    <TresPerspectiveCamera makeDefault :position="[0, 1.5, 3.5]" />
    <OrbitControls
      makeDefault
      :mouseButtons="{ LEFT: MOUSE.ROTATE, MIDDLE: MOUSE.PAN, RIGHT: MOUSE.DOLLY }"
    />
    <TresDirectionalLight :position="[4, 6, 2]" :intensity="2" cast-shadow />
    <TresAmbientLight :intensity="0.2" />
    <BootScene />
  </TresCanvas>
</template>

<style scoped>
/* nothing else needed—the utility classes take over */
canvas {
  outline: none;
}
</style>
