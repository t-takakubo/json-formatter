"use client";

import { AlertCircle, Check, Copy, Sparkles, Trash2 } from "lucide-react";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  prism,
  tomorrow,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import { toast } from "sonner";
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

export default function JsonFormatter() {
  const [inputJson, setInputJson] = useState("");
  const [outputJson, setOutputJson] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFormat = async () => {
    if (!inputJson.trim()) {
      setError("JSONを入力してください");
      setOutputJson("");
      toast.error("JSONを入力してください");
      return;
    }

    try {
      const parsed = JSON.parse(inputJson);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutputJson(formatted);
      setError(null);
      toast.success("JSONを整形しました");

      // 自動的にS3にアップロード
      await uploadToS3(formatted);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "無効なJSONです";
      setError(errorMessage);
      setOutputJson("");
      toast.error(errorMessage);
    }
  };

  const handleClear = () => {
    setInputJson("");
    setOutputJson("");
    setError(null);
    toast.info("クリアしました");
  };

  const handleCopy = async () => {
    if (!outputJson) return;

    try {
      await navigator.clipboard.writeText(outputJson);
      toast.success("クリップボードにコピーしました");
    } catch (e) {
      console.error("コピーに失敗しました:", e);
      toast.error("コピーに失敗しました");
    }
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

      toast.success(`S3にアップロードしました: ${data.fileName}`);
    } catch (e) {
      console.error("S3アップロードエラー:", e);
      toast.error(
        e instanceof Error ? e.message : "S3へのアップロードに失敗しました",
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* ヘッダー */}
        <header className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              JSON Formatter
            </h1>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg">
            JSONを整形して見やすく表示します
          </p>
        </header>

        {/* メインコンテンツ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* 入力エリア */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>入力</span>
              </CardTitle>
              <CardDescription>
                整形したいJSONを入力してください
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                id="json-input"
                value={inputJson}
                onChange={(e) => setInputJson(e.target.value)}
                placeholder='{"name": "example", "value": 123, "items": [1, 2, 3]}'
                className="min-h-100 font-mono text-sm resize-y"
              />
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
                      language="json"
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
                      language="json"
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
            {isUploading ? "Formatting & Uploading..." : "Format"}
          </Button>
          <Button
            type="button"
            onClick={handleClear}
            variant="outline"
            size="lg"
            className="gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Clear
          </Button>
        </div>

        {/* エラーメッセージ */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
