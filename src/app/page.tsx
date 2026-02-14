import JsonFormatter from "@/components/JsonFormatter";

const FEATURES = [
  "JSON整形・フォーマット（インデント2/4スペース/タブ選択）",
  "シンタックスハイライト（ライト/ダークモード対応）",
  "構文エラーの自動検出・バリデーション",
  "ワンクリックコピー",
  "登録不要・完全無料",
  "ネストしたオブジェクト・配列にも対応",
  "JSONファイルのドラッグ＆ドロップ読み込み",
  "JSON ↔ YAML 相互変換",
  "JSON圧縮（Minify）",
];

const FAQS = [
  {
    q: "JSON Formatterは無料で使えますか？",
    a: "はい、完全無料・登録不要でご利用いただけます。",
  },
  {
    q: "JSONのバリデーション（構文チェック）はできますか？",
    a: "はい、入力されたJSONの構文エラーを自動で検出し、エラー内容を表示します。",
  },
  {
    q: "どんなJSONに対応していますか？",
    a: "標準的なJSON形式すべてに対応しています。ネストしたオブジェクト・配列も正しく整形できます。",
  },
  {
    q: "YAML変換はできますか？",
    a: "はい、JSONをYAML形式に変換する機能を搭載しています。「→ YAML」ボタンをクリックするだけで変換できます。",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-50 via-zinc-100 to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <JsonFormatter />

        {/* 機能紹介セクション */}
        <section className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-4">
            JSON Formatterの機能
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {FEATURES.map((text) => (
              <li
                key={text}
                className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400"
              >
                <span className="text-blue-500 mt-0.5 shrink-0">✦</span>
                {text}
              </li>
            ))}
          </ul>
        </section>

        {/* FAQセクション */}
        <section className="mt-8 mb-4">
          <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-4">
            よくある質問
          </h2>
          <dl className="space-y-4">
            {FAQS.map((item) => (
              <div
                key={item.q}
                className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4"
              >
                <dt className="font-medium text-zinc-800 dark:text-zinc-200 mb-1">
                  {item.q}
                </dt>
                <dd className="text-sm text-zinc-600 dark:text-zinc-400">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  );
}
