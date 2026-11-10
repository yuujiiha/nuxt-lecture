<template>
  <div class="container">
    <header class="header">
      <NuxtLink to="/">#11 エラーの読み方とデバッグ</NuxtLink>
    </header>
    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: system-ui, sans-serif;
  line-height: 1.7;
  color: #1f2933;
  background: #f7f8fa;
}
.container {
  max-width: 720px;
  margin: 0 auto;
  padding: 24px 16px;
}
.header a {
  font-weight: bold;
  color: #00a36c;
  text-decoration: none;
}
.card {
  padding: 16px;
  margin: 12px 0;
  background: #fff;
  border: 1px solid #dde2e8;
  border-radius: 8px;
}
button {
  padding: 8px 16px;
  font-size: 1rem;
  cursor: pointer;
}
</style>
