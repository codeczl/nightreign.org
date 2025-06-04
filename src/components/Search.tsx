'use client';

import React, { useState, useEffect } from 'react';
import {
    GlobeIcon
} from "@radix-ui/react-icons"
import { SearchIcon, Tag } from 'lucide-react';
import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandEmpty,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils";
import { useTranslations, useLocale } from 'next-intl';

// 获取所有工具分类文件名
const TOOL_FILES = [
  'Guides.json',
  'Wikis.json',
  'News.json',
  'Community.json',
  'Videos.json',
  'Patches.json',
  'Tips.json',
  'Reddit.json',
  'Reviews.json',
  'Official.json',
];

// 简单去除 jsonc 注释
function stripJsoncComments(str: string): string {
  return str.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '');
}

export function Search({ className }: { className?: string }) {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [allTools, setAllTools] = useState<any[]>([]);
    const [hotTags, setHotTags] = useState<string[]>([]);
    const t = useTranslations('search');
    const locale = useLocale();

    // 动态加载所有工具数据
    useEffect(() => {
        async function fetchAllTools() {
            const base = `/data/json/${locale}/tools/`;
            let tools: any[] = [];
            for (const file of TOOL_FILES) {
                try {
                    const res = await fetch(base + file);
                    if (!res.ok) continue;
                    let text = await res.text();
                    text = stripJsoncComments(text);
                    const arr = JSON.parse(text);
                    if (Array.isArray(arr)) tools = tools.concat(arr);
                } catch (e) {
                    // 忽略单个文件错误
                }
            }
            setAllTools(tools);
            setResults(tools);
            // 统计热门标签
            const tagCount: Record<string, number> = {};
            tools.forEach(tool => {
                if (tool.tags && Array.isArray(tool.tags)) {
                    tool.tags.forEach((tag: string) => {
                        tagCount[tag] = (tagCount[tag] || 0) + 1;
                    });
                }
            });
            const sortedTags = Object.entries(tagCount)
                .sort((a, b) => b[1] - a[1])
                .map(([tag]) => tag)
                .slice(0, 5);
            setHotTags(sortedTags);
        }
        fetchAllTools();
    }, [locale]);

    // 搜索逻辑
    useEffect(() => {
        if (!search) {
            setResults(allTools);
            return;
        }
        const keyword = search.toLowerCase();
        setResults(
            allTools.filter(tool =>
                (tool.name && tool.name.toLowerCase().includes(keyword)) ||
                (tool.description && tool.description.toLowerCase().includes(keyword)) ||
                (tool.tags && tool.tags.some((tag: string) => tag.toLowerCase().includes(keyword)))
            )
        );
    }, [search, allTools]);

    const handleSearch = () => {
        if (results.length > 0 && results[0].url) {
            window.open(results[0].url, '_blank');
        }
    }

    return (
        <div className="flex flex-col justify-center items-center gap-2">
            <Command className={cn("rounded-lg border shadow-md", className)}>
                <CommandInput placeholder={t('input_placeholder')} value={search} onValueChange={setSearch} className="h-9" />
                <CommandList>
                    {/* 热门标签展示 */}
                    {hotTags.length > 0 && (
                        <div className="flex flex-wrap gap-2 px-4 py-2 border-b border-muted-foreground/10 mb-2">
                            {hotTags.map(tag => (
                                <button
                                    key={tag}
                                    className="inline-flex items-center px-2 py-0.5 rounded bg-gray-200 text-gray-700 text-xs hover:bg-gray-300 transition"
                                    type="button"
                                    onClick={() => setSearch(tag)}
                                >
                                    <Tag size={12} className="mr-1" />{tag}
                                </button>
                            ))}
                        </div>
                    )}
                    <CommandEmpty>{t('no_results')}</CommandEmpty>
                    <CommandGroup heading={t('heading')}>
                        {results.map((tool, idx) => (
                            <CommandItem key={tool.url + idx} onSelect={() => window.open(tool.url, '_blank')}>
                                <GlobeIcon className="mr-2 h-4 w-4" />
                                <span className="font-semibold mr-2">{tool.name}</span>
                                <span className="text-xs text-muted-foreground mr-2">{tool.description}</span>
                                {tool.tags && tool.tags.map((tag: string) => (
                                    <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded bg-gray-200 text-gray-700 text-xs ml-1"><Tag size={12} className="mr-1" />{tag}</span>
                                ))}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </Command>
            {search &&
                <Button variant="outline" className='mt-6' onClick={handleSearch}>
                    <SearchIcon size={16} className='mr-2 opacity-80' />{t('button')}
                </Button>}
        </div>
    )
}
