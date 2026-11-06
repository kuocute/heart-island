// 步道路網、最短路徑、改變目的地與抵達事件。
// 不依賴 3D 引擎，方便單元測試（見 tests/navigation.test.ts）。

export type Point = { x: number; y: number };
export type Graph = { nodes: Record<string, Point>; edges: { a: string; b: string }[] };
export type Facing = 'down' | 'left' | 'right' | 'up';

export type NavEvent =
  | { type: 'depart'; stationId: string }
  | { type: 'retarget'; from: string; to: string }
  | { type: 'arrive'; stationId: string };

const dist = (p: Point, q: Point) => Math.hypot(q.x - p.x, q.y - p.y);

export function adjacency(g: Graph): Map<string, string[]> {
  const adj = new Map<string, string[]>();
  for (const id of Object.keys(g.nodes)) adj.set(id, []);
  for (const { a, b } of g.edges) {
    if (!adj.has(a) || !adj.has(b)) throw new Error(`步道連線 ${a}–${b} 指向不存在的節點`);
    adj.get(a)!.push(b);
    adj.get(b)!.push(a);
  }
  return adj;
}

/** Dijkstra 最短路徑；回傳包含起點與終點的節點序列，無路可走時回傳 null */
export function shortestPath(g: Graph, from: string, to: string): string[] | null {
  if (!(from in g.nodes) || !(to in g.nodes)) return null;
  if (from === to) return [from];
  const adj = adjacency(g);
  const d = new Map<string, number>([[from, 0]]);
  const prev = new Map<string, string>();
  const open = new Set<string>([from]);
  const done = new Set<string>();
  while (open.size) {
    let cur = '';
    let best = Infinity;
    for (const n of open) if ((d.get(n) ?? Infinity) < best) { best = d.get(n)!; cur = n; }
    open.delete(cur);
    if (cur === to) break;
    done.add(cur);
    for (const nb of adj.get(cur) ?? []) {
      if (done.has(nb)) continue;
      const nd = best + dist(g.nodes[cur], g.nodes[nb]);
      if (nd < (d.get(nb) ?? Infinity)) { d.set(nb, nd); prev.set(nb, cur); open.add(nb); }
    }
  }
  if (!prev.has(to)) return null;
  const path = [to];
  while (path[0] !== from) path.unshift(prev.get(path[0])!);
  return path;
}

export function facingOf(dx: number, dy: number, fallback: Facing = 'down'): Facing {
  if (Math.abs(dx) < 0.001 && Math.abs(dy) < 0.001) return fallback;
  if (Math.abs(dx) >= Math.abs(dy)) return dx >= 0 ? 'right' : 'left';
  return dy >= 0 ? 'down' : 'up';
}

type Target = { stationId: string; nodeId: string };

/**
 * 角色在路網上的移動狀態。
 * ・goTo() 設定目的地。若正在走某一段步道，會先走完這一段，再從下一個節點重新規劃。
 * ・只有「最後選取」的站會觸發 arrive 事件。
 */
export class Navigator {
  pos: Point;
  facing: Facing = 'down';
  /** 停在節點上時的節點 id；走在步道中時為 null */
  node: string | null;
  private segFrom: string | null = null;
  private segTo: string | null = null;
  private queue: string[] = [];
  private target: Target | null = null;
  private pending: Target | null = null;

  constructor(
    private graph: Graph,
    startNode: string,
    public speed = 170, // 世界像素／秒
    private onEvent: (e: NavEvent) => void = () => {},
  ) {
    if (!(startNode in graph.nodes)) throw new Error(`起點 ${startNode} 不在路網中`);
    this.node = startNode;
    this.pos = { ...graph.nodes[startNode] };
  }

  get moving() { return this.segTo !== null; }
  get destination() { return (this.pending ?? this.target)?.stationId ?? null; }
  /** 目前正在走的步道（測試與除錯用） */
  get segment() { return this.segTo ? { from: this.segFrom!, to: this.segTo } : null; }

  /** 瞬間移到節點（減少動態效果模式、或重置時使用），不觸發事件 */
  teleport(nodeId: string) {
    this.segFrom = this.segTo = null;
    this.queue = [];
    this.target = this.pending = null;
    this.node = nodeId;
    this.pos = { ...this.graph.nodes[nodeId] };
  }

  goTo(stationId: string, nodeId: string, opts: { instant?: boolean } = {}) {
    const t: Target = { stationId, nodeId };
    const prev = this.destination;
    if (opts.instant) {
      if (prev && prev !== stationId) this.onEvent({ type: 'retarget', from: prev, to: stationId });
      this.teleport(nodeId);
      this.onEvent({ type: 'arrive', stationId });
      return;
    }
    if (this.moving) {
      if (prev === stationId) return; // 同一站，不重複規劃
      if (prev) this.onEvent({ type: 'retarget', from: prev, to: stationId });
      // 取消舊目的地：走完目前這段，從下一個節點重新規劃
      this.queue = [];
      this.pending = t;
      this.target = null;
      return;
    }
    this.target = t;
    this.onEvent({ type: 'depart', stationId });
    this.plan(this.node!);
  }

  private plan(from: string) {
    const t = this.target!;
    const path = shortestPath(this.graph, from, t.nodeId);
    if (!path) throw new Error(`找不到從 ${from} 到 ${t.nodeId} 的步道`);
    this.queue = path.slice(1);
    this.nextSegment();
  }

  private nextSegment() {
    if (this.queue.length === 0) {
      const done = this.target!;
      this.target = null;
      this.segFrom = this.segTo = null;
      this.onEvent({ type: 'arrive', stationId: done.stationId });
      return;
    }
    this.segFrom = this.node!;
    this.segTo = this.queue.shift()!;
    this.node = null;
    const a = this.graph.nodes[this.segFrom], b = this.graph.nodes[this.segTo];
    this.facing = facingOf(b.x - a.x, b.y - a.y, this.facing);
  }

  /** 每一影格呼叫；dtMs 為經過的毫秒數 */
  update(dtMs: number) {
    let budget = (this.speed * dtMs) / 1000;
    while (this.segTo && budget > 0) {
      const goal = this.graph.nodes[this.segTo];
      const remain = dist(this.pos, goal);
      if (remain > budget) {
        this.pos.x += ((goal.x - this.pos.x) / remain) * budget;
        this.pos.y += ((goal.y - this.pos.y) / remain) * budget;
        budget = 0;
      } else {
        budget -= remain;
        this.pos = { ...goal };
        this.node = this.segTo;
        this.segFrom = this.segTo = null;
        if (this.pending) {
          this.target = this.pending;
          this.pending = null;
          this.plan(this.node);
        } else if (this.target) {
          this.nextSegment();
        }
      }
    }
  }
}
