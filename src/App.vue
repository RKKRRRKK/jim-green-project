<script setup>
/* No RouterLink import needed any more */
import { RouterView } from 'vue-router'

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')
</script>

<template>
  <!-- fixed header bar -->
  <header class="app-header">
    <nav class="nav-bar">
      <a :href="`${BASE}/`" class="nav-link">Home</a>

      <!-- <a :href="`${BASE}/#/about`" class="nav-link">About</a> -->
    </nav>
  </header>

  <!-- router still renders whichever page we just loaded -->
  <RouterView class="page-area" />
</template>

<style scoped>
/* wipe default body margin so header hugs the top edge */
:global(body) {
  margin: 0;
}

/* layout vars */
:root {
  --header-h: 64px;
  --content-max: 80rem;
}

/* header */
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--header-h);
  background: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  z-index: 10;
}

/* nav */
.nav-bar {
  width: 100%;
  max-width: var(--content-max);
  margin: 0 auto;
  display: flex;
  gap: 1.5rem;
  padding: 0 0.75rem;
}

/* links */
.nav-link {
  font-weight: 600;
  color: #374151;
  text-decoration: none;
  transition: color 0.2s ease;
}
.nav-link:hover {
  color: #2563eb;
}

/* page area */
.page-area {
  width: 100%;
  min-height: calc(100vh - var(--header-h));
}
</style>
