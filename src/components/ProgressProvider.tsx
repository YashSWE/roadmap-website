"use client";

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import { chapters, blocks } from "@/content/roadmap";

interface ProgressData {
  checked: string[];
  updatedAt: string;
}

interface ProgressContextType {
  mounted: boolean;
  checkedTopics: string[];
  toggleTopic: (topicId: string) => void;
  resetGlobal: () => void;
  resetChapter: (chapterSlug: string) => void;
  overallPercent: number;
  currentChapterNode: number | null; // which chapter gets the glow (1-12)
  getChapterPercent: (chapterSlug: string) => number;
  getBlockPercent: (blockId: number) => number;
  getChapterCheckedCount: (chapterSlug: string) => number;
  getChapterTotalCount: (chapterSlug: string) => number;
  markChapterAsDone: (chapterSlug: string) => void;
}

const ProgressContext = createContext<ProgressContextType | null>(null);

const STORAGE_KEY = "bhm-roadmap-v1";

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [checkedTopics, setCheckedTopics] = useState<string[]>([]);

  // Load from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ProgressData;
        if (Array.isArray(parsed.checked)) {
          setCheckedTopics(parsed.checked);
        }
      }
    } catch (e) {
      console.error("Failed to parse progress from localStorage");
    }
    setMounted(true);
  }, []);

  // Listen to cross-tab storage events
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue) as ProgressData;
          setCheckedTopics(parsed.checked);
        } catch (e) {
          // ignore
        }
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const saveToStorage = useCallback((newChecked: string[]) => {
    const data: ProgressData = {
      checked: newChecked,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, []);

  const toggleTopic = useCallback((topicId: string) => {
    setCheckedTopics((prev) => {
      const next = prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId];
      saveToStorage(next);
      return next;
    });
  }, [saveToStorage]);

  const resetGlobal = useCallback(() => {
    if (confirm("Reset all progress? This cannot be undone.")) {
      setCheckedTopics([]);
      saveToStorage([]);
    }
  }, [saveToStorage]);

  const resetChapter = useCallback((chapterSlug: string) => {
    if (confirm("Reset progress for this chapter?")) {
      setCheckedTopics((prev) => {
        const next = prev.filter((id) => !id.startsWith(`${chapterSlug}:`));
        saveToStorage(next);
        return next;
      });
    }
  }, [saveToStorage]);

  const markChapterAsDone = useCallback((chapterSlug: string) => {
    const ch = chapters.find(c => c.slug === chapterSlug);
    if (!ch) return;
    const allTopicIds = ch.groups.flatMap(g => g.topics.map(t => t.id));
    setCheckedTopics((prev) => {
      const toAdd = allTopicIds.filter(id => !prev.includes(id));
      if (toAdd.length === 0) return prev;
      const next = [...prev, ...toAdd];
      saveToStorage(next);
      return next;
    });
  }, [saveToStorage]);

  // Derived values
  const totalTopics = useMemo(() => {
    return chapters.reduce((sum, ch) => sum + ch.groups.reduce((gSum, g) => gSum + g.topics.length, 0), 0);
  }, []);

  const overallPercent = useMemo(() => {
    if (totalTopics === 0) return 0;
    return Math.round((checkedTopics.length / totalTopics) * 100);
  }, [checkedTopics.length, totalTopics]);

  const getChapterTotalCount = useCallback((chapterSlug: string) => {
    const ch = chapters.find(c => c.slug === chapterSlug);
    if (!ch) return 0;
    return ch.groups.reduce((sum, g) => sum + g.topics.length, 0);
  }, []);

  const getChapterCheckedCount = useCallback((chapterSlug: string) => {
    return checkedTopics.filter(id => id.startsWith(`${chapterSlug}:`)).length;
  }, [checkedTopics]);

  const getChapterPercent = useCallback((chapterSlug: string) => {
    const total = getChapterTotalCount(chapterSlug);
    if (total === 0) return 0;
    return Math.round((getChapterCheckedCount(chapterSlug) / total) * 100);
  }, [getChapterTotalCount, getChapterCheckedCount]);

  const getBlockPercent = useCallback((blockId: number) => {
    const blockChapters = chapters.filter(c => c.block === blockId);
    let total = 0;
    let checked = 0;
    for (const ch of blockChapters) {
      total += getChapterTotalCount(ch.slug);
      checked += getChapterCheckedCount(ch.slug);
    }
    if (total === 0) return 0;
    return Math.round((checked / total) * 100);
  }, [getChapterTotalCount, getChapterCheckedCount]);

  const currentChapterNode = useMemo(() => {
    // Current chapter = the lowest-numbered chapter below 100%
    if (!mounted || checkedTopics.length === 0) return 1; // Default to Chapter 1 if nothing checked
    if (overallPercent === 100) return null; // Complete state, no glow
    
    for (let i = 0; i < chapters.length; i++) {
      const ch = chapters[i];
      // Skip chapter 1 if it has 0 topics but others have topics
      if (getChapterTotalCount(ch.slug) > 0 && getChapterPercent(ch.slug) < 100) {
        return ch.number;
      }
    }
    return 1;
  }, [mounted, checkedTopics.length, overallPercent, getChapterTotalCount, getChapterPercent]);

  return (
    <ProgressContext.Provider
      value={{
        mounted,
        checkedTopics,
        toggleTopic,
        resetGlobal,
        resetChapter,
        overallPercent,
        currentChapterNode,
        getChapterPercent,
        getBlockPercent,
        getChapterCheckedCount,
        getChapterTotalCount,
        markChapterAsDone,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
}
