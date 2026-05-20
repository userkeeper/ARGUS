'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Lang } from './i18n';

// Extend Window for Telegram WebApp
declare global {
  interface Window {
    Telegram?: {
      WebApp?: {
        initData?: string;
        initDataUnsafe?: {
          user?: {
            language_code?: string;
          };
        };
        ready?: () => void;
        expand?: () => void;
        MainButton?: any;
        BackButton?: any;
        colorScheme?: string;
        themeParams?: any;
        isExpanded?: boolean;
        viewportHeight?: number;
        viewportStableHeight?: number;
        headerColor?: string;
        backgroundColor?: string;
        setHeaderColor?: (color: string) => void;
        setBackgroundColor?: (color: string) => void;
        enableClosingConfirmation?: () => void;
        disableClosingConfirmation?: () => void;
        onEvent?: (eventType: string, callback: () => void) => void;
        offEvent?: (eventType: string, callback: () => void) => void;
        sendData?: (data: string) => void;
        close?: () => void;
        platform?: string;
        version?: string;
      };
    };
  }
}

const STORAGE_KEY = 'argus_lang';

function detectInitialLang(): Lang {
  if (typeof window === 'undefined') return 'en';

  // 1. Saved preference
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'ru' || saved === 'en') return saved;
  } catch {}

  // 2. Telegram WebApp language_code
  try {
    const tgLang = window.Telegram?.WebApp?.initDataUnsafe?.user?.language_code;
    if (tgLang) {
      if (tgLang === 'ru' || tgLang === 'uk' || tgLang === 'be') return 'ru';
      return 'en';
    }
  } catch {}

  // 3. Browser language
  const browserLang = navigator.language?.toLowerCase();
  if (browserLang?.startsWith('ru') || browserLang?.startsWith('uk') || browserLang?.startsWith('be')) {
    return 'ru';
  }

  return 'en';
}

export function useLang() {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    setLangState(detectInitialLang());
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem(STORAGE_KEY, l); } catch {}
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === 'en' ? 'ru' : 'en');
  }, [lang, setLang]);

  return { lang, setLang, toggle };
}
