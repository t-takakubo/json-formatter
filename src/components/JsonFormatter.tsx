"use client";

import * as yaml from "js-yaml";
import {
  AlertCircle,
  Check,
  Copy,
  FileCode2,
  Minimize2,
  Sparkles,
  Trash2,
  Upload,
} from "lucide-react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  prism,
  tomorrow,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

type IndentType = 2 | 4 | "\t";
type OutputLang = "json" | "yaml";

export default function JsonFormatter() {
  const [inputJson, setInputJson] = useState("");
  const [outputJson, setOutputJson] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [indent, setIndent] = useState<IndentType>(2);
  const [isDragging, setIsDragging] = useState(false);
  const [outputLang, setOutputLang] = useState<OutputLang>("json");

  const handleFormat = async () => {
    if (!inputJson.trim()) {
      setError("JSONを入力してください");
      setOutputJson("");
      return;
    }

    try {
      const parsed = JSON.parse(inputJson);
      const formatted = JSON.stringify(parsed, null, indent);
      setOutputJson(formatted);
      setOutputLang("json");
      setError(null);

      // 自動的にS3にアップロード
      await uploadToS3(formatted);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "無効なJSONです";
      setError(errorMessage);
      setOutputJson("");
    }
  };

  const handleMinify = async () => {
    if (!inputJson.trim()) {
      setError("JSONを入力してください");
      setOutputJson("");
      return;
    }

    try {
      const parsed = JSON.parse(inputJson);
      const minified = JSON.stringify(parsed);
      setOutputJson(minified);
      setOutputLang("json");
      setError(null);

      // 自動的にS3にアップロード
      await uploadToS3(minified);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "無効なJSONです";
      setError(errorMessage);
      setOutputJson("");
    }
  };

  const handleToYaml = () => {
    if (!inputJson.trim()) {
      setError("JSONを入力してください");
      setOutputJson("");
      return;
    }

    try {
      const parsed = JSON.parse(inputJson);
      const yamlStr = yaml.dump(parsed, { indent: 2 });
      setOutputJson(yamlStr);
      setOutputLang("yaml");
      setError(null);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "無効なJSONです";
      setError(errorMessage);
      setOutputJson("");
    }
  };

  const handleClear = () => {
    setInputJson("");
    setOutputJson("");
    setError(null);
  };

  const handleCopy = async () => {
    if (!outputJson) return;

    try {
      await navigator.clipboard.writeText(outputJson);
    } catch (e) {
      console.error("コピーに失敗しました:", e);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setInputJson(text);
      setError(null);
    };
    reader.readAsText(file);
  };

  const uploadToS3 = async (jsonContent: string) => {
    if (!jsonContent) {
      return;
    }

    setIsUploading(true);
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ jsonContent }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "アップロードに失敗しました");
      }
    } catch (e) {
      console.error("S3アップロードエラー:", e);
      // エラーはコンソールにのみ出力し、ユーザーには通知しない
    } finally {
      setIsUploading(false);
    }
  };

  const indentOptions: { label: string; value: IndentType }[] = [
    { label: "2", value: 2 },
    { label: "4", value: 4 },
    { label: "Tab", value: "\t" },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-50 via-zinc-100 to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* ヘッダー */}
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-4xl font-bold bg-linear-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">
              JSON Formatter
            </h1>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg">
            JSONを整形して見やすく表示します
          </p>
        </header>

        {/* インデントサイズ選択 */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            インデント：
          </span>
          <div className="flex rounded-md border border-zinc-200 dark:border-zinc-700 overflow-hidden">
            {indentOptions.map((opt) => (
              <button
                key={String(opt.value)}
                type="button"
                onClick={() => setIndent(opt.value)}
                className={`px-3 py-1 text-sm transition-colors ${
                  indent === opt.value
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* メインコンテンツ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* 入力エリア */}
          <Card
            className={`shadow-lg hover:shadow-xl transition-shadow ${isDragging ? "ring-2 ring-blue-500 ring-offset-2" : ""}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <span>入力</span>
                  </CardTitle>
                  <CardDescription>
                    JSONを入力するか、.jsonファイルをドロップしてください
                  </CardDescription>
                </div>
                {inputJson && (
                  <Button
                    type="button"
                    onClick={handleClear}
                    variant="secondary"
                    size="sm"
                    className="gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {isDragging ? (
                <div className="min-h-100 flex flex-col items-center justify-center rounded-md border-2 border-dashed border-blue-400 bg-blue-50 dark:bg-blue-950/20 text-blue-500 gap-2">
                  <Upload className="w-8 h-8" />
                  <span className="text-sm font-medium">ここにドロップ</span>
                </div>
              ) : (
                <Textarea
                  id="json-input"
                  value={inputJson}
                  onChange={(e) => setInputJson(e.target.value)}
                  placeholder='{"name": "example", "value": 123, "items": [1, 2, 3]}'
                  className="min-h-100 font-mono text-sm resize-y"
                />
              )}
            </CardContent>
          </Card>

          {/* 出力エリア */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span>出力</span>
                  </CardTitle>
                  <CardDescription>
                    フォーマット済みのJSONが表示されます
                  </CardDescription>
                </div>
                {outputJson && (
                  <Button
                    type="button"
                    onClick={handleCopy}
                    variant="secondary"
                    size="sm"
                    className="gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="min-h-100 rounded-md overflow-auto border bg-muted/30">
                {outputJson ? (
                  <>
                    <SyntaxHighlighter
                      language={outputLang}
                      style={tomorrow}
                      customStyle={{
                        margin: 0,
                        padding: "1rem",
                        background: "transparent",
                        fontSize: "0.875rem",
                      }}
                      className="dark:block hidden"
                    >
                      {outputJson}
                    </SyntaxHighlighter>
                    <SyntaxHighlighter
                      language={outputLang}
                      style={prism}
                      customStyle={{
                        margin: 0,
                        padding: "1rem",
                        background: "transparent",
                        fontSize: "0.875rem",
                      }}
                      className="dark:hidden block"
                    >
                      {outputJson}
                    </SyntaxHighlighter>
                  </>
                ) : (
                  <div className="h-full min-h-100 flex items-center justify-center text-muted-foreground">
                    フォーマット済みJSONがここに表示されます
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ボタン群 */}
        <div className="flex flex-wrap gap-3 mb-4">
          <Button
            type="button"
            onClick={handleFormat}
            size="lg"
            className="gap-2"
            disabled={isUploading}
          >
            <Sparkles className="w-4 h-4" />
            Format
          </Button>
          <Button
            type="button"
            onClick={handleMinify}
            variant="outline"
            size="lg"
            className="gap-2"
            disabled={isUploading}
          >
            <Minimize2 className="w-4 h-4" />
            Minify
          </Button>
          <Button
            type="button"
            onClick={handleToYaml}
            variant="outline"
            size="lg"
            className="gap-2"
            disabled={isUploading}
          >
            <FileCode2 className="w-4 h-4" />
            → YAML
          </Button>
        </div>

        {/* エラーメッセージ */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* 機能紹介セクション */}
        <section className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-4">
            JSON Formatterの機能
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { icon: "✦", text: "JSON整形・フォーマット（インデント2/4スペース/タブ選択）" },
              { icon: "✦", text: "シンタックスハイライト（ライト/ダークモード対応）" },
              { icon: "✦", text: "構文エラーの自動検出・バリデーション" },
              { icon: "✦", text: "ワンクリックコピー" },
              { icon: "✦", text: "登録不要・完全無料" },
              { icon: "✦", text: "ネストしたオブジェクト・配列にも対応" },
              { icon: "✦", text: "JSONファイルのドラッグ＆ドロップ読み込み" },
              { icon: "✦", text: "JSON ↔ YAML 相互変換" },
              { icon: "✦", text: "JSON圧縮（Minify）" },
            ].map((item) => (
              <li
                key={item.text}
                className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400"
              >
                <span className="text-blue-500 mt-0.5 shrink-0">{item.icon}</span>
                {item.text}
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
            {[
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
            ].map((item) => (
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
