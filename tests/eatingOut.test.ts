import { describe, expect, it } from 'vitest';
import { EATING_OUT, packageSodium, type EatOutQuestion } from '../src/content/eatingOut';
import { STATIONS } from '../src/content/stations';

describe('08 低鹽餐桌：今天外食，怎麼點？', () => {
  it('展開原本的外食照護重點，四個情境依序是便當／自助餐、麵店／小吃攤、火鍋、超商', () => {
    const diet = STATIONS.find((s) => s.id === 'diet')!;
    const item = diet.items.find((i) => i.id === EATING_OUT.itemId)!;
    expect(item.title).toBe('今天外食，怎麼點？');
    expect(EATING_OUT.scenes.map((s) => s.label)).toEqual(['便當／自助餐', '麵店／小吃攤', '火鍋', '超商']);
    // 原有任務與限鹽、水分提醒不變
    expect(diet.missions.map((m) => m.id)).toEqual(['diet-salt', 'diet-first']);
    expect(diet.notice).toBe('每個人的限鹽與水分建議不同，請依醫囑與營養師說明。本站不提供個別數字。');
  });

  it('每一題都有三個選項、正確選項存在，作答後有一句說明，以及對店家說的話或購買技巧', () => {
    for (const s of EATING_OUT.scenes) {
      for (const q of s.questions) {
        expect(q.choices).toHaveLength(3);
        expect(q.choices.map((c) => c.id)).toContain(q.bestChoiceId);
        expect(q.why.length).toBeGreaterThan(10);
        expect(Boolean(q.say || q.tip)).toBe(true);
      }
    }
  });

  it('依指定情境出題', () => {
    const [bento, noodle, hotpot, store] = EATING_OUT.scenes;
    const best = (q: EatOutQuestion) => q.choices.find((c) => c.id === q.bestChoiceId)!.label;
    expect(best(bento.questions[0])).toContain('白飯不要淋滷汁');
    expect(best(bento.questions[0])).toContain('青菜請幫我少鹽');
    expect(bento.questions[1].situation).toContain('沒辦法少鹽');
    expect(best(bento.questions[1])).toBe('「那有沒有調味比較少的主菜？」');
    expect(best(noodle.questions[0])).toContain('麵湯我會少喝');
    expect(best(noodle.questions[0])).toContain('肉燥和醬油膏少一點');
    expect(noodle.questions[1].situation).toContain('乾麵');
    expect(best(noodle.questions[1])).toContain('拌醬少一點');
    expect(best(hotpot.questions[0])).toContain('加工火鍋料少拿');
    expect(best(hotpot.questions[1])).toContain('湯少喝');
    expect(store.questions[0].labels).toHaveLength(2);
  });

  it('超商：兩張示範用標示，用每份鈉 × 份數比較整包；每份較低的那包整包反而較多', () => {
    const q = EATING_OUT.scenes[3].questions[0];
    const [a, b] = q.labels!;
    expect(a.name.startsWith('示範用')).toBe(true);
    expect(b.name.startsWith('示範用')).toBe(true);
    expect(packageSodium(a)).toBe(450);
    expect(packageSodium(b)).toBe(360);
    expect(a.sodiumPerServing).toBeLessThan(b.sodiumPerServing);
    const lower = packageSodium(a) < packageSodium(b) ? a.id : b.id;
    expect(q.bestChoiceId).toBe(lower);
    expect(q.tip).toContain('每份鈉含量 × 包裝份數');
  });

  it('口頭回覆示教的問題與句型', () => {
    expect(EATING_OUT.practice.question).toBe('如果明天要買便當，你會怎麼點？如果店家說沒辦法少鹽，你會怎麼換？');
    expect(EATING_OUT.practice.sentenceFrame).toBe('我會請店家＿＿＿。如果不能調整，我會改選＿＿＿。');
    expect(EATING_OUT.practice.doneLabel).toBe('我練習好了');
  });
});
