<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import FooterBar from '@/components/FooterBar.vue'
import StickyMobileBar from '@/components/StickyMobileBar.vue'
</script>

<template>
  <div class="app-shell">
    <NavBar />

    <main class="main-content">
      <RouterView v-slot="{ Component }">
        <Transition name="fade-slide" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>

    <FooterBar />
    <StickyMobileBar />
  </div>
</template>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
}

.main-content {
  flex: 1;
  position: relative;
  z-index: 1;
}
</style>
