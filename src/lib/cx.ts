// src/lib/cx.ts
export function cx(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
  }
  