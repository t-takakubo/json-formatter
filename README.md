# JSON Formatter

JSONを整形して見やすく表示し、AWS S3にアップロードできるWebアプリケーションです。

## 機能

- JSONの整形とシンタックスハイライト表示
- フォーマット済みJSONのクリップボードへのコピー
- AWS S3へのアップロード機能
- ダークモード対応

## セットアップ

### 前提条件

- Node.js 20以上
- AWS アカウント (S3アップロード機能を使用する場合)

### インストール

```bash
npm install
```

### 環境変数の設定

`.env.local`ファイルを作成し、以下の環境変数を設定してください:

```bash
# AWS S3 Configuration
AWS_REGION=ap-northeast-1
AWS_ACCESS_KEY_ID=your_access_key_id
AWS_SECRET_ACCESS_KEY=your_secret_access_key
AWS_S3_BUCKET_NAME=your_bucket_name
```

`.env.local.example`ファイルをテンプレートとして使用できます。

### AWS S3の設定

1. AWS コンソールで S3 バケットを作成
2. IAM ユーザーを作成し、以下のポリシーを付与:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:PutObjectAcl"
      ],
      "Resource": "arn:aws:s3:::your_bucket_name/*"
    }
  ]
}
```

3. IAM ユーザーのアクセスキーとシークレットキーを`.env.local`に設定

## 開発

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

## ビルド

```bash
npm run build
npm start
```

## 使い方

1. 左側の入力エリアにJSONを入力
2. "Format"ボタンをクリックして整形
3. 右側に整形済みのJSONが表示されます
4. "Copy"ボタンでクリップボードにコピー
5. "Upload to S3"ボタンでAWS S3にアップロード

## 技術スタック

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- AWS SDK for JavaScript v3
- Radix UI
- Lucide Icons
