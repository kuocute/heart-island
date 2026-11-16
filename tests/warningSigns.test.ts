import { describe, expect, it } from 'vitest';
import { TEAM_PENDING, WARNING } from '../src/content/warningSigns';
import { STATIONS } from '../src/content/stations';

describe('10 警訊燈塔：紅燈、黃燈、每天自我檢查、警訊練習', () => {
  it('紅燈：指定警訊與「立即撥打 119，依派遣員指示處理」，每項都有圖示', () => {
    const texts = WARNING.red.signs.map((s) => s.text).join('／');
    for (const k of ['嚴重呼吸困難', '喘到說不完一句話', '胸痛', '昏倒或意識不清', '嘴唇發紫', '咳粉紅色泡沫痰']) expect(texts).toContain(k);
    expect(WARNING.red.action).toBe('立即撥打 119，依派遣員指示處理');
    expect(WARNING.red.signs.every((s) => s.icon.trim().length > 0)).toBe(true);
    expect(WARNING.red.label).toBe('紅燈');
  });

  it('黃燈：指定例子與行動提醒；未核定前不放固定體重門檻或電話', () => {
    const texts = WARNING.yellow.signs.map((s) => s.text).join('／');
    for (const k of ['體重比平常明顯增加', '走路比平常喘', '夜間喘醒', '枕頭', '腳腫或腹脹加劇', '尿量明顯減少']) expect(texts).toContain(k);
    expect(WARNING.yellow.action).toBe('請依個人出院照護計畫行動，用藥有疑問先聯絡團隊');
    expect(TEAM_PENDING.weightThreshold).toBe('');
    expect(TEAM_PENDING.teamPhone).toBe('');
    const all = JSON.stringify([WARNING.yellow, WARNING.daily]);
    expect(all).not.toMatch(/\d+\s*公斤/);
  });

  it('每天自我檢查六張卡，體重卡寫明測量方式', () => {
    expect(WARNING.daily.checks.map((c) => c.title)).toEqual(['體重', '呼吸', '水腫', '血壓與心跳', '尿量', '用藥']);
    expect(WARNING.daily.checks[0].how).toContain('起床排尿後、早餐前，用同一台體重計，穿相近衣著測量');
  });

  it('警訊練習三題，答案依序為繼續觀察、今天聯絡團隊、立即撥打 119，每個選項都有原因', () => {
    expect(WARNING.drill.options.map((o) => o.label)).toEqual(['繼續每天觀察', '今天聯絡照護團隊', '立即撥打 119']);
    expect(WARNING.drill.questions.map((q) => q.answer)).toEqual(['observe', 'contact', 'call119']);
    for (const q of WARNING.drill.questions) for (const o of WARNING.drill.options) expect(q.feedback[o.id].length).toBeGreaterThan(10);
    expect(WARNING.drill.questions[1].situation).toContain('鞋子變緊');
    expect(WARNING.drill.questions[2].situation).toContain('說不完一句話');
  });

  it('完整衛教圖卡檔案存在，目前標示為參考版', () => {
    const files = Object.keys(import.meta.glob('../public/assets/*.webp'));
    expect(files).toContain(`../public/assets/${WARNING.card.file}`);
    expect(WARNING.card.status).toBe('draft');
  });

  it('保留原有照護重點與任務', () => {
    const w = STATIONS.find((s) => s.id === 'warning')!;
    expect(w.items.map((i) => i.id)).toEqual(['describe', 'where-help', 'observe']);
    expect(w.missions.map((m) => m.id)).toEqual(['warning-describe', 'warning-contact', 'warning-observe']);
  });
});
