export type ManagedRecord = {
  key: string;
  kind: "project" | "site" | "section";
  data: Record<string, unknown>;
  sort_order: number;
  is_visible: boolean;
  updated_at?: string;
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function deepMerge<T>(base: T, override: unknown): T {
  if (!isPlainObject(base) || !isPlainObject(override)) return (override ?? base) as T;

  const result: Record<string, unknown> = { ...base };
  for (const [key, value] of Object.entries(override)) {
    const current = result[key];
    result[key] = isPlainObject(current) && isPlainObject(value)
      ? deepMerge(current, value)
      : value;
  }
  return result as T;
}

export function mergeManagedProjects<T extends { id: string }>(
  defaults: T[],
  records: ManagedRecord[],
): T[] {
  const projectRecords = records.filter((record) => record.kind === "project");
  const recordsById = new Map(
    projectRecords.map((record) => [record.key.replace(/^project:/, ""), record]),
  );

  const merged = defaults.flatMap((project, defaultIndex) => {
    const record = recordsById.get(project.id);
    recordsById.delete(project.id);
    if (record?.is_visible === false) return [];
    return [{
      project: record ? deepMerge(project, record.data) : project,
      order: record?.sort_order ?? defaultIndex,
    }];
  });

  for (const [id, record] of recordsById) {
    if (!record.is_visible || !isPlainObject(record.data)) continue;
    const candidate = { ...record.data, id } as T;
    if (typeof candidate.id !== "string") continue;
    merged.push({ project: candidate, order: record.sort_order });
  }

  return merged.sort((a, b) => a.order - b.order).map(({ project }) => project);
}

export function getManagedRecord<T>(records: ManagedRecord[], key: string, fallback: T): T {
  const record = records.find((item) => item.key === key && item.is_visible);
  return record ? deepMerge(fallback, record.data) : fallback;
}
