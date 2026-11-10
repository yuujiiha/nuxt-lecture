# Nuxt勉強会 演習

「Nuxtの裏側」シリーズ（#11〜）の演習用プロジェクトです。
回ごとに、独立した Nuxt プロジェクトをディレクトリとして置いています。

| 回 | テーマ | ディレクトリ |
|---|---|---|
| #11 | エラーの読み方とデバッグ | [`session-11`](./session-11) |

## StackBlitz で開く（おすすめ）

ブラウザだけで動かせます。インストールもアカウント登録も不要です（Chrome / Edge 推奨）。

```
https://stackblitz.com/github/yuujiiha/nuxt-lecture/tree/main/exercises/session-11
```

StackBlitz にはそのディレクトリだけが読み込まれます。開くと自動で `npm install` と `npm run dev` が実行され、右側にプレビューが表示されます。

> ログインせずに編集した内容は保存されません。
> 途中で中断して後日続けたい場合は、GitHub アカウントで StackBlitz にログインしてから Fork してください。

## ローカルで開く

Node.js **22.12 以上** が必要です（各ディレクトリの `.node-version` は 24 系にしています）。

```bash
cd exercises/session-11
npm install
npm run dev
```
