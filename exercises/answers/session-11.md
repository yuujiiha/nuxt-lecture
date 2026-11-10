# #11 演習 解答・解説（講師用）

演習：`exercises/session-11`

> 解答は `session-11` の外に置いているので、StackBlitz で演習を開いたときのファイル一覧には表示されない。

---

## 演習1：コンポーネント名の typo

**どこに出るか**：画面はエラーにならず、**警告** だけが出る。リロードした場合はターミナルと Console の両方に、リンクから移動した場合は Console にだけ出る。

```
[Vue warn]: Failed to resolve component: UserCrad
```

**原因**：`exercise-1.vue` で `<UserCrad>` と書いているが、実際のコンポーネントは `UserCard.vue`。
Vue は知らないタグを「ただの未知のHTML要素」として扱うため、エラーにならず、何も表示されない。

**修正**

```diff
- <UserCrad :user="user" />
+ <UserCard :user="user" />
```

**伝えたいこと**

- 「エラーが出ていない ≠ 正常」。**警告（warn）も読む** 習慣をつける。
- 「表示されない」と感じたら、まず Console を開く。
- 補足：あわせて `Component <Anonymous> is missing template or render function` という警告も出る。これは同じ原因から派生したものなので、**最初に出た警告から読む** のが基本。

---

## 演習2：undefined のプロパティを読んでいる

**どこに出るか**：開き方によって変わる。この演習の一番の狙いはここ。

| 開き方 | 処理が動く場所 | エラーの見え方 |
|---|---|---|
| URL を直接開く・リロード・プレビューを別タブで開く | サーバー（SSR） | 500 のエラー画面。**ターミナル** にエラーが出る |
| 演習一覧のリンクから移動 | ブラウザ（クライアント側のページ遷移） | エラー画面。**Console** にエラーが出て、ターミナルには何も出ない |

```
TypeError (500): Cannot read properties of undefined (reading 'city')
```

> 補足：Nuxt の開発サーバーは、サーバー側のログをブラウザの Console にも転送する（`[ssr]` などの印付きで表示される）。そのため、リロードした場合も Console に似たログが出ることがある。「本来の出どころはターミナル」と説明する。
>
> StackBlitz での確認時に、リンクから移動すると「ターミナルに何も出ない」ことが分かった。受講者も同じところでつまずく可能性が高いので、README では2通りの開き方を比べる手順にしている。

**原因**：`/api/members` の3人目（高橋 三郎）には `address` がない。
そのため `member.address` が `undefined` になり、`undefined.city` を読もうとして落ちる。

**修正（2か所）**

```diff
  type Member = {
    id: number
    name: string
-   address: { city: string }
+   address?: { city: string }
  }
```

```diff
- <p>住所：{{ member.address.city }}</p>
+ <p>住所：{{ member.address?.city ?? '未登録' }}</p>
```

**伝えたいこと**

- **同じコードでも、開き方によって処理が動く場所（サーバー／ブラウザ）が変わる**。だから「ターミナルに何も出ていない＝エラーがない」ではない。#16（サーバーとブラウザの違い）の予告にもなる。
- `Cannot read properties of undefined (reading 'X')` は、**`X` の手前が undefined** という意味。最頻出のエラーなので、読み方を覚える。
- **実際のデータを見て確かめる**：`/api/members` をブラウザで直接開けば、原因がすぐ分かる。
- **型は実際のデータを保証しない**：型には「全員が `address` を持つ」と書いてあったが、実際のデータは違った。テンプレートだけ `?.` で直すのではなく、型も実際のデータに合わせる。そうすると、TypeScript が他の箇所の同じ問題も指摘してくれるようになる。
- 発展：もし `?.` だけで直していたら、「なぜ型も直す必要があるのか」を問いかける。

---

## 演習3：API の URL 間違い（404）

**どこに出るか**：ボタンを押す処理はブラウザで動くので、**Console と Network** に出る。ターミナルにはほぼ出ない。

```
FetchError: [GET] "/api/product": 404 Page not found: /api/product
```

Network タブで見ると、`product` へのリクエストが **404** になっている。

**原因**：API ファイルは `server/api/products.get.ts` なので、URL は `/api/products`。`$fetch` には `/api/product`（s がない）と書いてしまっている。

**修正**

```diff
- products.value = await $fetch<Product[]>('/api/product')
+ products.value = await $fetch<Product[]>('/api/products')
```

**伝えたいこと**

- 通信に関するエラーは **Network タブ** で見る：URL・ステータスコード・レスポンスの中身を確認する。
- `server/api/` の **ファイル名がそのまま URL になる**（規約シリーズ #7 の復習）。
- 発展：今の画面は失敗したときに何も表示しない。「失敗したらユーザーに何を見せるべきか」を #8（非同期UIとエラー処理）につなげて議論する。

---

## 3問を通したまとめ

| 演習 | 処理が動く場所 | エラーの見え方 | 見る場所 |
|---|---|---|---|
| 1 | 開き方による | 警告だけ、画面は空 | Console（リロードした場合はターミナルにも） |
| 2 | リロード：サーバー／リンク：ブラウザ | エラー画面 | リロード：ターミナル／リンク：Console。あわせて API のレスポンス |
| 3 | ブラウザ（クリック後） | 何も起きない | Console / Network |

**今日の3つの原則（案）**

1. エラーは「どこに出たか」で、処理がどこで動いたかが分かる
2. エラーメッセージは「何が・何を読もうとして・どこで」の順に読む
3. コードを直す前に、実際のデータとリクエストを見て確かめる
