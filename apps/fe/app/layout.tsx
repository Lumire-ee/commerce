import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  display: "swap",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://atelier-commerce.com"),
  title: {
    default: "ATELIER | 프리미엄 라이프스타일 셀렉트샵",
    template: "%s | ATELIER",
  },
  description: "일상에 감각을 더하는 패션, 스마트 테크, 홈 리빙 큐레이션 셀렉트샵. 신규 가입 시 15% 웰컴 쿠폰 및 무료배송 혜택을 드립니다.",
  keywords: [
    "커머스",
    "라이프스타일",
    "베스트셀러",
    "패션",
    "디지털 테크",
    "홈리빙",
    "셀렉트샵",
    "타임특가",
    "노이즈캔슬링 헤드폰",
  ],
  authors: [{ name: "ATELIER Inc." }],
  creator: "ATELIER",
  publisher: "ATELIER",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "ATELIER | 프리미엄 라이프스타일 셀렉트샵",
    description: "새로운 감각, 일상에 스며드는 미학. ATELIER에서 엄선된 큐레이션을 경험하세요.",
    url: "https://atelier-commerce.com",
    siteName: "ATELIER",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&h=630&q=85",
        width: 1200,
        height: 630,
        alt: "ATELIER 프리미엄 라이프스타일 셀렉트샵 대표 이미지",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ATELIER | 프리미엄 라이프스타일 셀렉트샵",
    description: "새로운 감각, 일상에 스며드는 미학. ATELIER에서 엄선된 큐레이션을 경험하세요.",
    images: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&h=630&q=85"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://atelier-commerce.com",
  },
};

// JSON-LD 구조화 데이터 (검색엔진 리치 스니펫)
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://atelier-commerce.com/#website",
      "url": "https://atelier-commerce.com",
      "name": "ATELIER",
      "description": "프리미엄 라이프스타일 큐레이션 커머스 셀렉트샵",
      "inLanguage": "ko-KR",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://atelier-commerce.com/?search={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "OnlineStore",
      "@id": "https://atelier-commerce.com/#organization",
      "name": "ATELIER",
      "url": "https://atelier-commerce.com",
      "logo": "https://atelier-commerce.com/logo.png",
      "description": "일상의 미학과 삶의 질을 높이는 프리미엄 라이프스타일 커머스",
      "priceRange": "₩₩",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Seoul",
        "addressCountry": "KR",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* Unsplash 외부 이미지 로딩 지연을 단축하는 리소스 힌트 */}
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://plus.unsplash.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://plus.unsplash.com" />

        {/* 구조화 데이터 주입 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <a href="#main-content" className="skip-link">
          본문 바로가기 (Skip to Content)
        </a>
        {children}
      </body>
    </html>
  );
}
