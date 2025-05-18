<script setup lang="ts">
import { onMounted, markRaw } from 'vue'
import {
  Box3,
  Vector3,
  TextureLoader,
  MeshPhysicalMaterial,
  SRGBColorSpace,
  NoColorSpace,
  PMREMGenerator,
  EquirectangularReflectionMapping,
  MathUtils,
} from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { useTresContext } from '@tresjs/core'

import bootUrl from '@/assets/model/boot3.glb?url'
import colorUrl from '@/assets/model/color.jpg'
import roughUrl from '@/assets/model/rough.jpg'
import hdrUrl from '@/assets/hdr/hdr2.hdr?url'

const { scene, renderer } = useTresContext()

onMounted(async () => {
  /* ---------- HDR → PMREM ---------- */
  const hdr = await new RGBELoader().loadAsync(hdrUrl)
  hdr.mapping = EquirectangularReflectionMapping
  const pmrem = new PMREMGenerator(renderer.value)
  const envMap = pmrem.fromEquirectangular(hdr).texture
  pmrem.dispose()
  hdr.dispose()

  scene.value.environment = envMap

  /* ---------- textures ---------- */
  const loader = new TextureLoader()
  const [albedo, roughTex] = await Promise.all([
    loader.loadAsync(colorUrl),
    loader.loadAsync(roughUrl),
  ])
  ;[albedo, roughTex].forEach((t) => {
    t.flipY = false
    t.anisotropy = 8
  })
  albedo.colorSpace = SRGBColorSpace
  roughTex.colorSpace = NoColorSpace

  /* ---------- leather material (Physical) ---------- */
  const leather = new MeshPhysicalMaterial({
    map: albedo,
    roughnessMap: roughTex,
    roughness: 0.99,
    envMap,
    envMapIntensity: 1,
  })
  leather.needsUpdate = true

  /* ---------- boot geometry ---------- */
  const { scene: boot } = await new GLTFLoader().loadAsync(bootUrl)

  // Rotate boot 45° around its local X-axis
  boot.rotation.y = MathUtils.degToRad(100)
  boot.position.y += -0.45

  /* ---------- strip vertex colours, recompute normals, assign material ---------- */
  boot.traverse((o) => {
    if (!o.isMesh) return
    if (o.geometry.getAttribute('color')) o.geometry.deleteAttribute('color')
    o.geometry.computeVertexNormals()
    o.material = leather
    o.castShadow = true
    o.receiveShadow = true
  })

  scene.value.add(markRaw(boot))
})
</script>

<template></template>
