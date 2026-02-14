import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1e1e2e 0%, #2d2d44 100%)",
        fontFamily: "sans-serif",
        padding: "60px",
      }}
    >
      {/* タイトルエリア */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            width: "64px",
            height: "64px",
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "32px",
          }}
        >
          {"{}"}
        </div>
        <h1
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
            backgroundClip: "text",
            color: "transparent",
            margin: 0,
          }}
        >
          JSON Formatter
        </h1>
      </div>

      {/* サブタイトル */}
      <p
        style={{
          fontSize: "28px",
          color: "#a1a1aa",
          margin: "0 0 48px 0",
          textAlign: "center",
        }}
      >
        無料オンラインJSONフォーマッター・バリデーター
      </p>

      {/* 機能リスト */}
      <div
        style={{
          display: "flex",
          gap: "24px",
        }}
      >
        {[
          "JSON整形・美化",
          "シンタックスハイライト",
          "バリデーション",
          "登録不要・無料",
        ].map((feature) => (
          <div
            key={feature}
            style={{
              background: "rgba(59, 130, 246, 0.15)",
              border: "1px solid rgba(59, 130, 246, 0.4)",
              borderRadius: "12px",
              padding: "12px 20px",
              color: "#93c5fd",
              fontSize: "20px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ color: "#4ade80" }}>✓</span>
            {feature}
          </div>
        ))}
      </div>
    </div>,
    { ...size },
  );
}
