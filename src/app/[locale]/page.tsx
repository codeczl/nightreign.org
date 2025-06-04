// pages/index.js
import React, { Suspense } from 'react'; // 确保导入 React
import { getSortedPostsData } from '@/lib/posts'
import { getCategories } from '@/lib/data';

import { ToolsList } from '@/components/ToolsList';
import { ArticleList } from '@/components/ArticleList'

import { Search } from '@/components/Search';
import {getTranslations, getLocale} from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('home');
  return {
    title: t("meta_title"),
    description: t("meta_description"),
  };
}


type categoryType = { 
  name: string; 
  src: string; 
  description: string;
  link: string; 
}


export default async function Home() {
  const locale = await getLocale();
  const t = await getTranslations('home');
  // categories data
  const categories = getCategories(locale);
  const allPostsData = getSortedPostsData(locale).slice(0, 6)
  
  return (
    <div className="container mx-auto py-12 space-y-16 ">
      <section className="flex flex-col items-center justify-center text-center space-y-6">
        <h1 className="mx-auto max-w-3xl text-3xl font-bold lg:text-7xl tracking-tighter">
          {t("h1")}
        </h1>
        <h2 className="text-2xl tracking-tight sm:text-3xl md:text-3xl lg:text-3xl">{t("h2")}</h2>
        <p className="mx-auto max-w-[700px] md:text-xl tracking-tight">
          {t("intro")}
        </p>
        {/* <div className='w-full px-2 pt-10 lg:w-1/2'>
          <Search />
        </div> */}
      </section>

      {/* Overview Section */}
      <section id="overview" className="space-y-6">
        <h2 className="text-3xl font-bold">{t("overview.title")}</h2>
        <p>{t("overview.content")}</p>
      </section>

      {/* Release Info Section */}
      <section id="release" className="space-y-6">
        <h2 className="text-3xl font-bold">{t("release.title")}</h2>
        <p>{t("release.content")}</p>
      </section>

      {/* Characters Section */}
      <section id="characters" className="space-y-6">
        <h2 className="text-3xl font-bold">{t("characters.title")}</h2>
        <p>{t("characters.content")}</p>
      </section>

      {/* Bosses Section */}
      <section id="bosses" className="space-y-6">
        <h2 className="text-3xl font-bold">{t("bosses.title")}</h2>
        <p>{t("bosses.content")}</p>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="space-y-6">
        <h2 className="text-3xl font-bold">{t("faq.title")}</h2>
        <ul className="space-y-4">
          {[
            { q: t("faq.questions.0.q"), a: t("faq.questions.0.a") },
            { q: t("faq.questions.1.q"), a: t("faq.questions.1.a") },
            { q: t("faq.questions.2.q"), a: t("faq.questions.2.a") }
          ].map((item, index) => (
            <li key={index}>
              <strong>{item.q}</strong> {item.a}
            </li>
          ))}
        </ul>
      </section>

      <div className='border-t'></div>
      
      {/* 保持原有的 ToolsList 和 ArticleList */}
      {categories.map((category: categoryType, index: React.Key | null | undefined) => (
        <ToolsList key={index} category={category} locale={locale} />
      ))}
      <div className='border-t'></div>
      <Suspense fallback={<div>Loading editor...</div>}>
        <ArticleList articles={allPostsData} />
      </Suspense>
    </div>
  )
}