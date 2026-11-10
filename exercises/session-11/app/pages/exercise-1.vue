<script setup lang="ts">
const user = {
  name: '山田 花子',
  role: 'フロントエンドエンジニア'
}
</script>

<template>
  <div>
    <h1>演習1：プロフィール</h1>
    <p>下にプロフィールカードが表示されるはずですが、何も出てきません。</p>
    <UserCrad :user="user" />
  </div>
</template>
