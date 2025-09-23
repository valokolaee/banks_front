// src/pages/ExperimentalPage.tsx
import React from "react";

const ExperimentalPage = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden font-alcxTitles text-white">
      {/* --- لایه ۰: بک‌گراند اصلی --- */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(171.08deg, #010101 -11.16%, #141921 6.1%, #0a0d11 49.05%, #000000 93.22%)'
        }}
      />

      {/* --- لایه -۲۰: ستاره‌ها (پایین‌ترین لایه) --- */}
      <div
        className="absolute top-3/4 left-1/2 -z-20 hidden w-full h-full -translate-x-1/2 bg-[url('/images/landing-page/stars.svg')] bg-contain opacity-30 dark:block pointer-events-none"
      />

      {/* --- لایه -۱۰: نور اصلی سبز (با blur و pulse) --- */}
      <div className="absolute top-1/2 left-1/2 -z-10 h-1/3 w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary opacity-20 blur-[128px] animate-pulse" />

      {/* --- لایه -۹: نور طلایی ملایم (بالاتر از سبز، اما شفاف‌تر) --- */}
      <div className="absolute top-1/2 left-1/2 -z-9 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold opacity-5 blur-[200px]" />

      {/* --- لایه ۱۰: محتوای تستی --- */}
      <div className="relative z-10 text-center space-y-6 px-6">
        <h1 className="text-4xl font-bold">صفحه آزمایشی بک‌گراند</h1>
        <p className="text-lg text-white-inverse/80">
          اینجا فقط برای تست لایه‌ها، نور و انیمیشن‌ها است.
        </p>
        <div className="space-y-2 text-sm opacity-70">
          <p>🔴 لایه ۰: گرادیان مشکی</p>
          <p>🟢 لایه -۱۰: نور سبز با animate-pulse</p>
          <p>🟡 لایه -۹: نور طلایی با blur بیشتر</p>
          <p>⭐ لایه -۲۰: ستاره‌ها (فقط در حالت تاریک)</p>
        </div>
      </div>
    </div>
  );
};

export default ExperimentalPage;