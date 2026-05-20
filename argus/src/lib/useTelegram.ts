'use client';

import { useEffect, useState } from 'react';

export function useTelegram() {
  const [isTelegram, setIsTelegram] = useState(false);
  const [tgUser, setTgUser] = useState<any>(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;

    setIsTelegram(true);
    setTgUser(tg.initDataUnsafe?.user ?? null);

    // Init Mini App
    tg.ready?.();
    tg.expand?.();

    // Dark theme matching
    try {
      tg.setHeaderColor?.('#06060C');
      tg.setBackgroundColor?.('#06060C');
    } catch {}

    // Confirm before close (optional)
    try { tg.enableClosingConfirmation?.(); } catch {}
  }, []);

  return { isTelegram, tgUser };
}
