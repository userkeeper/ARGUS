'use client';

import { memo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plane, Satellite, Activity, Globe, Radio, Eye,
  Shield, Sun, AlertTriangle, Camera, Flame, Target,
  CloudLightning, Radiation, Tv, Anchor, Ship,
  ChevronDown, ChevronUp, ToggleLeft, ToggleRight,
} from 'lucide-react';
import { t, type Lang } from '@/lib/i18n';

interface LayerPanelProps {
  data: any;
  activeLayers: any;
  setActiveLayers: React.Dispatch<React.SetStateAction<any>>;
  lang?: Lang;
}

const LAYER_GROUPS = [
  {
    labelKey: 'aviation' as const,
    icon: Plane,
    color: '#00E5FF',
    layers: [
      { key: 'flights', labelKey: 'commercial' as const, icon: Plane, color: '#00E5FF', dataKey: 'commercial_flights' },
      { key: 'private', labelKey: 'private' as const, icon: Plane, color: '#00E676', dataKey: 'private_flights' },
      { key: 'jets', labelKey: 'private_jets' as const, icon: Plane, color: '#FF69B4', dataKey: 'private_jets' },
      { key: 'military', labelKey: 'military' as const, icon: Shield, color: '#FF3D3D', dataKey: 'military_flights' },
    ],
  },
  {
    labelKey: 'maritime_space' as const,
    icon: Ship,
    color: '#00BCD4',
    layers: [
      { key: 'maritime', labelKey: 'maritime' as const, icon: Ship, color: '#00BCD4', dataKey: 'maritime_ships' },
      { key: 'satellites', labelKey: 'satellites' as const, icon: Satellite, color: '#D4AF37', dataKey: 'satellites' },
    ],
  },
  {
    labelKey: 'surveillance' as const,
    icon: Camera,
    color: '#39FF14',
    layers: [
      { key: 'cctv', labelKey: 'cctv_layer' as const, icon: Camera, color: '#39FF14', dataKey: 'cameras' },
      { key: 'live_news', labelKey: 'live_news' as const, icon: Tv, color: '#FF4081', dataKey: 'live_feeds' },
    ],
  },
  {
    labelKey: 'natural_hazards' as const,
    icon: Activity,
    color: '#FF9500',
    layers: [
      { key: 'earthquakes', labelKey: 'earthquakes' as const, icon: Activity, color: '#FF9500', dataKey: 'earthquakes' },
      { key: 'fires', labelKey: 'active_fires' as const, icon: Flame, color: '#FF6B00', dataKey: 'fires' },
      { key: 'weather', labelKey: 'severe_weather_layer' as const, icon: CloudLightning, color: '#E040FB', dataKey: 'weather_events' },
    ],
  },
  {
    labelKey: 'threats_infra' as const,
    icon: AlertTriangle,
    color: '#FF3D3D',
    layers: [
      { key: 'infrastructure', labelKey: 'nuclear' as const, icon: Radiation, color: '#76FF03', dataKey: 'infrastructure' },
      { key: 'global_incidents', labelKey: 'global_incidents' as const, icon: AlertTriangle, color: '#FF3D3D', dataKey: 'gdelt' },
      { key: 'gps_jamming', labelKey: 'gps_jamming' as const, icon: Radio, color: '#FF4444', dataKey: 'gps_jamming' },
    ],
  },
  {
    labelKey: 'display' as const,
    icon: Sun,
    color: '#448AFF',
    layers: [
      { key: 'day_night', labelKey: 'day_night' as const, icon: Sun, color: '#448AFF', dataKey: '' },
    ],
  },
];

const ALL_LAYERS = LAYER_GROUPS.flatMap(g => g.layers);

function LayerPanel({ data, activeLayers, setActiveLayers, lang = 'en' }: LayerPanelProps) {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    LAYER_GROUPS.forEach(g => { initial[g.labelKey] = true; });
    return initial;
  });

  const toggle = (key: string) => setActiveLayers((prev: any) => ({ ...prev, [key]: !prev[key] }));
  const getCount = (dk: string): number | null => {
    if (!dk || !data[dk]) return null;
    return Array.isArray(data[dk]) ? data[dk].length : null;
  };
  const totalEntities = ALL_LAYERS.reduce((s: number, l: any) => s + (getCount(l.dataKey) || 0), 0);
  const activeCount = Object.values(activeLayers).filter(Boolean).length;

  const toggleGroup = (groupKey: string) => {
    setExpandedGroups(prev => ({ ...prev, [groupKey]: !prev[groupKey] }));
  };

  const toggleAllInGroup = (group: typeof LAYER_GROUPS[0]) => {
    const allActive = group.layers.every(l => activeLayers[l.key]);
    setActiveLayers((prev: any) => {
      const next = { ...prev };
      group.layers.forEach(l => { next[l.key] = !allActive; });
      return next;
    });
  };

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.6 }} className="glass-panel p-3 pointer-events-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Eye className="w-4 h-4 text-[var(--gold-primary)]" />
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[var(--alert-green)] animate-argus-pulse" />
          </div>
          <span className="hud-text text-[12px] text-[var(--text-primary)] tracking-widest">{t('data_layers', lang)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[9px] font-mono px-2 py-0.5 rounded-full" style={{
            background: activeCount > 10 ? 'rgba(255,61,61,0.12)' : activeCount > 5 ? 'rgba(255,149,0,0.12)' : 'rgba(0,230,118,0.12)',
            color: activeCount > 10 ? '#FF3D3D' : activeCount > 5 ? '#FF9500' : '#00E676',
            border: `1px solid ${activeCount > 10 ? 'rgba(255,61,61,0.25)' : activeCount > 5 ? 'rgba(255,149,0,0.25)' : 'rgba(0,230,118,0.25)'}`,
          }}>
            {activeCount}/{ALL_LAYERS.length}
          </span>
          <span className="text-[8px] font-mono text-[var(--text-muted)]">{totalEntities.toLocaleString()} ENT</span>
        </div>
      </div>

      {/* Groups */}
      <div className="space-y-1">
        {LAYER_GROUPS.map((group) => {
          const isExpanded = expandedGroups[group.labelKey];
          const groupActiveCount = group.layers.filter(l => activeLayers[l.key]).length;
          const allActive = groupActiveCount === group.layers.length;
          const GroupIcon = group.icon;

          return (
            <div key={group.labelKey}>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => toggleGroup(group.labelKey)}
                  className="flex-1 flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/[0.03] transition-colors"
                >
                  <GroupIcon className="w-3 h-3 flex-shrink-0" style={{ color: group.color }} />
                  <span className="text-[9px] font-mono tracking-[0.15em] text-[var(--text-secondary)] font-bold flex-1 text-left">{t(group.labelKey, lang)}</span>
                  <span className="text-[8px] font-mono tabular-nums" style={{ color: groupActiveCount > 0 ? group.color : 'var(--text-muted)' }}>
                    {groupActiveCount}/{group.layers.length}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-3 h-3 text-[var(--text-muted)]" />
                  ) : (
                    <ChevronDown className="w-3 h-3 text-[var(--text-muted)]" />
                  )}
                </button>
                <button
                  onClick={() => toggleAllInGroup(group)}
                  className="p-1 rounded hover:bg-white/[0.05] transition-colors"
                  title={allActive ? 'Disable all' : 'Enable all'}
                >
                  {allActive ? (
                    <ToggleRight className="w-3.5 h-3.5" style={{ color: group.color }} />
                  ) : (
                    <ToggleLeft className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                  )}
                </button>
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="ml-2 pl-2 border-l border-[var(--border-secondary)]/40 space-y-px">
                      {group.layers.map((layer) => {
                        const Icon = layer.icon;
                        const isActive = activeLayers[layer.key];
                        const count = getCount(layer.dataKey);
                        return (
                          <button
                            key={layer.key}
                            onClick={() => toggle(layer.key)}
                            className={`w-full flex items-center gap-2.5 px-2 py-[5px] rounded-md transition-all duration-200 group ${
                              isActive
                                ? 'bg-white/[0.04] border border-white/[0.06]'
                                : 'border border-transparent hover:bg-white/[0.02]'
                            }`}
                          >
                            <div
                              className={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300 ${isActive ? 'scale-100' : 'scale-50 opacity-30'}`}
                              style={{
                                backgroundColor: layer.color,
                                boxShadow: isActive ? `0 0 6px ${layer.color}60` : 'none',
                              }}
                            />
                            <Icon
                              className="w-3.5 h-3.5 flex-shrink-0 transition-colors duration-200"
                              style={{ color: isActive ? layer.color : 'var(--text-muted)' }}
                            />
                            <span className={`text-[11px] font-mono tracking-wide flex-1 text-left transition-colors duration-200 ${
                              isActive ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]'
                            }`}>
                              {t(layer.labelKey, lang)}
                            </span>
                            {count !== null && (
                              <span
                                className="text-[9px] font-mono tabular-nums font-bold transition-colors duration-200"
                                style={{ color: isActive ? layer.color : 'var(--text-muted)' }}
                              >
                                {count.toLocaleString()}
                              </span>
                            )}
                            <div className={`layer-toggle ${isActive ? 'active' : ''}`} />
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default memo(LayerPanel);
