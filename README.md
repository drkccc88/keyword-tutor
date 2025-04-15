# `keyword-tutor`
学習したいキーワードを入力すると、詳細を教えてくれたり、理解度テストを出題してくれます。

## 動作環境
- Node.js v18.18以上

## 主な開発技術
- TypeScript
- Next.js
- MongoDB
- OpenAI
- Material UI

## 事前準備
- openaiのapi-keyの取得
- MongoDBの登録

## セットアップ

環境変数の設定
```
# .env.local
OPENAI_API_KEY=‘your_key’ # OpenAIのapi-key
DATABASE_URL=‘your_url’ # MongoDBの接続URL
```

ローカル環境で実行
```
# pnpmをインストール
npm install -g pnpm

# 必要なライブラリをインストール
pnpm install

# 実行
pnpm run dev
```
