<script setup lang="ts">
type Member = {
  id: number
  name: string
  address: { city: string }
}

const { data: members } = await useFetch<Member[]>('/api/members')
</script>

<template>
  <div>
    <h1>演習2：メンバー一覧</h1>
    <div v-for="member in members" :key="member.id" class="card">
      <p><strong>{{ member.name }}</strong></p>
      <p>住所：{{ member.address.city }}</p>
    </div>
  </div>
</template>
