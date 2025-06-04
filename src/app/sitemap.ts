import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapRoutes: MetadataRoute.Sitemap = [
    {
      url: '', // 首页
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'category', // 分类页
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'article', // 文章列表页
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: 'article/nightreign-revenant-unlock-guide', // Revenant职业解锁攻略
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'article/nightreign-duchess-unlock-guide', // Duchess职业解锁攻略
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'article/nightreign-characters-unlock-guide', // 全角色解锁攻略
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: 'changelog', // 更新日志
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    }
  ];

  const sitemapData = sitemapRoutes.flatMap((route) => {
    const routeUrl = route.url === '' ? '' : `/${route.url}`;
    return {
      ...route,
      url: `https://nightreign.org${routeUrl}`,
    };
  });

  return sitemapData;
}
