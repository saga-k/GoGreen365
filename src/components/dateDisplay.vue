<script setup>
import { ref, onMounted } from 'vue'

// Add showPrefix prop with default value true
defineProps({
  showPrefix: {
    type: Boolean,
    default: true
  }
})

const currentDate = ref('')
onMounted(() => {
  const now = new Date()
  const day = now.getDate()
  const localShortMonth = now.toLocaleString('sv-SE', { month: 'short' }).replace('.', '')
  const month = localShortMonth.charAt(0).toUpperCase() + localShortMonth.slice(1).toLowerCase()
  currentDate.value = `${day} ${month}`
})
</script>

<template>
  <div class="date-display">
    <p class="p-small">
      <span v-if="showPrefix">I dag </span>{{ currentDate }}
    </p>
  </div>
</template>

<style scoped>
.date-display {
  border: 3px solid var(--border-color);
  padding: 0.2rem 0.5rem;
  border-radius: 30px;
}
</style>
