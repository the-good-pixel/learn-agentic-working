<script setup lang="ts">
import { ref, onMounted } from 'vue'

const stars = ref<string | null>(null)

onMounted(async () => {
  try {
    const cached = sessionStorage.getItem('gh-stars')
    if (cached) {
      stars.value = cached
      return
    }
    const res = await fetch('https://api.github.com/repos/the-good-pixel/learn-agentic-working')
    if (!res.ok) return
    const data = await res.json()
    const n = Number(data.stargazers_count ?? 0)
    const formatted = n >= 1000 ? (n / 1000).toFixed(1) + 'k' : String(n)
    stars.value = formatted
    sessionStorage.setItem('gh-stars', formatted)
  } catch {
    /* silent — fall back to plain star link */
  }
})
</script>

<template>
  <a
    class="gh-star"
    href="https://github.com/the-good-pixel/learn-agentic-working"
    target="_blank"
    rel="noopener"
    aria-label="Star Learn Agentic Working on GitHub"
  >
    <svg class="gh-star__icon" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
      <path
        fill="currentColor"
        d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"
      />
    </svg>
    <span class="gh-star__label">Star</span>
    <span v-if="stars !== null" class="gh-star__count">{{ stars }}</span>
  </a>
</template>

<style scoped>
.gh-star {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 28px;
  padding: 0 10px;
  margin-left: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  text-decoration: none;
  background: var(--vp-c-bg-soft);
  transition: border-color 0.2s, color 0.2s, background 0.2s;
}

.gh-star:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  background: var(--vp-c-bg);
}

.gh-star__icon {
  flex-shrink: 0;
}

.gh-star__count {
  padding-left: 6px;
  margin-left: 2px;
  border-left: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  font-variant-numeric: tabular-nums;
}

@media (max-width: 768px) {
  .gh-star {
    display: none;
  }
}
</style>
