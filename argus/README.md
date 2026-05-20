# 👁 ARGUS — Global Intelligence Platform

**Real-Time OSINT Dashboard — Telegram Mini App**

Open-source geospatial intelligence platform with live flight tracking, satellite monitoring, CCTV, OSINT tools, and global incident feeds. Built as a Telegram Mini App with EN/RU language support.

---

## ⚡ Deploy to Railway

1. Push to your GitHub repo
2. New project on [railway.app](https://railway.app) → connect repo
3. Railway auto-detects `Dockerfile`
4. Set env vars from `.env.example`
5. Deploy — Railway exposes port 3000

## 🤖 Connect as Telegram Mini App

1. Message [@BotFather](https://t.me/BotFather)
2. `/newbot` → create bot
3. `/newapp` → add Web App
4. Set URL: `https://your-project.up.railway.app`
5. Done

---

## ✨ Features

- 10,000+ Aircraft — ADS-B real-time via adsb.lol
- 2,000+ Satellites — SGP4 orbital tracking
- CCTV cameras worldwide
- OSINT Toolkit (DNS, WHOIS, port scan, SSL, threats)
- Earthquakes, fires, weather, GPS jamming
- Global conflict events (GDELT)
- Defense markets ticker
- **EN/RU interface** — auto-detects Telegram language
- Telegram Mini App optimized

## 🌐 Languages

Auto-detects from Telegram `language_code` (ru/uk/be → Russian). Manual toggle button in header.

## 🏗️ Stack

Next.js 15 · MapLibre GL · TypeScript · Railway Docker · Telegram Mini App SDK

## 📁 Key Files

```
src/lib/i18n.ts          — EN/RU translations
src/lib/useLang.ts       — language detection hook
src/lib/useTelegram.ts   — Telegram Mini App init
src/components/ArgusMap.tsx     — MapLibre GL renderer
src/components/LayerPanel.tsx   — layer toggles (i18n)
src/components/ViewPresets.tsx  — region presets (i18n)
```

---

MIT License · Based on [Osiris](https://github.com/simplifaisoul/osiris)
