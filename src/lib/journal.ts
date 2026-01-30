export interface JournalEntry {
  id: string;
  title?: string;
  text: string;
  mood?: number; // 1-5
  tags?: string[];
  createdAt: string;
  updatedAt?: string;
}

const ENTRIES_KEY = "mindlink:journal:entries";
const DRAFT_KEY = "mindlink:journal:draft";

export function loadEntries(): JournalEntry[] {
  try {
    const raw = localStorage.getItem(ENTRIES_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as JournalEntry[];
  } catch (e) {
    console.error("Failed to load journal entries", e);
    return [];
  }
}

export function saveEntries(entries: JournalEntry[]) {
  try {
    localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
  } catch (e) {
    console.error("Failed to save journal entries", e);
  }
}

export function saveDraft(draft: Partial<JournalEntry> | null) {
  try {
    if (!draft) {
      localStorage.removeItem(DRAFT_KEY);
      return;
    }
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
  } catch (e) {
    console.error("Failed to save draft", e);
  }
}

export function loadDraft(): Partial<JournalEntry> | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Partial<JournalEntry>;
  } catch (e) {
    console.error("Failed to load draft", e);
    return null;
  }
}

export function createId() {
  // simple id - fine for local storage
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`;
}
