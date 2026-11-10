<script setup lang="ts">
type Product = {
  id: number
  name: string
  price: number
}

const products = ref<Product[]>([])

async function loadProducts() {
  products.value = await $fetch<Product[]>('/api/product')
}
</script>

<template>
  <div>
    <h1>演習3：商品一覧</h1>
    <p>ボタンを押すと商品が3件表示されるはずですが、何も起きません。</p>
    <button type="button" @click="loadProducts">商品を読み込む</button>
    <div v-for="product in products" :key="product.id" class="card">
      <p><strong>{{ product.name }}</strong></p>
      <p>{{ product.price.toLocaleString() }}円</p>
    </div>
  </div>
</template>
