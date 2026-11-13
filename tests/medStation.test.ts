import { describe, expect, it } from 'vitest';
import { MED_STATION } from '../src/content/medStation';
import { STATIONS } from '../src/content/stations';
import { validateStations } from '../src/content/validate';

describe('07 用藥小站：認識我的心衰藥、藥師櫃台', () => {
  const med = STATIONS.find((s) => s.id === 'medication')!;

  it('保留原有四個照護重點與兩個任務，新增兩張可點選卡片', () => {
    expect(med.items.map((i) => i.id)).toEqual(['no-stop', 'pillbox', 'missed', 'otc', 'hf-meds', 'pharmacy-desk']);
    expect(med.items.slice(4).map((i) => i.title)).toEqual(['認識我的心衰藥', '藥師櫃台：遇到這件事怎麼辦？']);
    expect(med.missions.map((m) => m.id)).toEqual(['med-stop', 'med-missed']);
    expect(validateStations(STATIONS)).toEqual([]);
  });

  it('四類 HFrEF 核心用藥卡，每張只有「幫我什麼」與「要留意什麼」；排水藥獨立一張', () => {
    const c = MED_STATION.cards;
    expect(c.core.map((x) => x.title)).toEqual(['ARNI／ACEi／ARB', '乙型阻斷劑', 'MRA', 'SGLT2 抑制劑']);
    for (const x of [...c.core, c.diuretic]) {
      expect(x.helps.length).toBeGreaterThan(10);
      expect(x.watch.length).toBeGreaterThan(0);
    }
    expect(c.diuretic.examples).toContain('furosemide');
    expect(c.diuretic.helps).toContain('緩解水分堆積');
    expect(c.note).toBe('用藥組合、劑量和追蹤時間依個人處方及團隊指示。對藥物有疑問，請問醫師、藥師或個管師。');
  });

  it('藥師櫃台三個情境，正確選項存在，每題都有一句原因與一句開口的話', () => {
    const list = MED_STATION.desk.scenarios;
    expect(list.map((s) => s.title)).toEqual(['新舊藥袋都在桌上', '在藥局想買止痛藥', '下週要手術，正在吃 SGLT2 抑制劑']);
    for (const s of list) {
      expect(s.choices).toHaveLength(3);
      expect(s.choices.map((c) => c.id)).toContain(s.bestChoiceId);
      expect(s.why.length).toBeGreaterThan(10);
      expect(s.say.startsWith('「')).toBe(true);
    }
    expect(list[0].say).toContain('哪一包停用？新藥什麼時候開始吃？');
    expect(list[1].why).toContain('ibuprofen');
    expect(list[1].why).toContain('NSAIDs');
    expect(list[1].why).toContain('留住水分');
    expect(list[2].demoBag?.label).toContain('虛構');
    expect(list[2].say).toContain('什麼時候要先停');
  });

  it('口頭回覆示教', () => {
    expect(MED_STATION.practice.question).toBe('如果出院後發現新舊藥袋都還在，你會帶什麼去找誰？你會問哪一句？');
    expect(MED_STATION.practice.sentenceFrame).toBe('我會帶＿＿＿去找＿＿＿，請他幫我確認＿＿＿。');
  });
});
