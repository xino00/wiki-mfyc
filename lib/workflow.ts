export const revisionStatuses = ["DRAFT", "REVIEW", "PUBLISHED", "RETIRED"] as const;
export type RevisionStatus = (typeof revisionStatuses)[number];
export type EditorialRole = "ADMIN" | "EDITOR" | "REVIEWER";

const transitions: Record<RevisionStatus, readonly RevisionStatus[]> = {
  DRAFT: ["REVIEW"],
  REVIEW: ["DRAFT", "PUBLISHED"],
  PUBLISHED: ["RETIRED"],
  RETIRED: [],
};

export function canTransition(from: RevisionStatus, to: RevisionStatus, roles: EditorialRole[]) {
  if (!transitions[from].includes(to)) return false;
  if (to === "PUBLISHED" || to === "RETIRED") return roles.includes("REVIEWER") || roles.includes("ADMIN");
  return roles.some((role) => role === "EDITOR" || role === "REVIEWER" || role === "ADMIN");
}

export function assertTransition(from: RevisionStatus, to: RevisionStatus, roles: EditorialRole[]) {
  if (!canTransition(from, to, roles)) throw new Error(`Transición editorial no permitida: ${from} → ${to}`);
}

export function latestPublished<T extends { status: RevisionStatus; version: number }>(revisions: T[]) {
  return revisions.filter((revision) => revision.status === "PUBLISHED").sort((a, b) => b.version - a.version)[0] ?? null;
}
