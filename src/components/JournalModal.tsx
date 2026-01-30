import React, { useEffect, useState } from "react";
import { JournalEntry, loadEntries, saveEntries, loadDraft, saveDraft, createId } from "@/lib/journal";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const JournalModal: React.FC<Props> = ({ open, onClose }) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [mood, setMood] = useState<number | undefined>(undefined);
  const [tags, setTags] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    setEntries(loadEntries());
    const draft = loadDraft();
    if (draft) {
      setTitle(draft.title || "");
      setText(draft.text || "");
      setMood(draft.mood as number | undefined);
      setTags((draft.tags || []).join(","));
    }
  }, [open]);

  // Auto-save draft
  useEffect(() => {
    const handler = setTimeout(() => {
      const draft = { title, text, mood, tags: tags ? tags.split(",").map(t => t.trim()).filter(Boolean) : [] };
      if (text || title) saveDraft(draft);
    }, 500);
    return () => clearTimeout(handler);
  }, [title, text, mood, tags]);

  function resetForm() {
    setTitle("");
    setText("");
    setMood(undefined);
    setTags("");
    setEditingId(null);
    saveDraft(null);
  }

  function handleSave() {
    const now = new Date().toISOString();
    const entry: JournalEntry = editingId
      ? { id: editingId, title, text, mood, tags: tags ? tags.split(",").map(t => t.trim()).filter(Boolean) : [], createdAt: entries.find(e => e.id === editingId)?.createdAt || now, updatedAt: now }
      : { id: createId(), title, text, mood, tags: tags ? tags.split(",").map(t => t.trim()).filter(Boolean) : [], createdAt: now };

    const next = editingId ? entries.map(e => e.id === editingId ? { ...e, ...entry } : e) : [entry, ...entries];
    setEntries(next);
    saveEntries(next);
    resetForm();
  }

  function handleEdit(id: string) {
    const e = entries.find(x => x.id === id);
    if (!e) return;
    setEditingId(e.id);
    setTitle(e.title || "");
    setText(e.text || "");
    setMood(e.mood);
    setTags((e.tags || []).join(","));
  }

  function handleDelete(id: string) {
    const next = entries.filter(e => e.id !== id);
    setEntries(next);
    saveEntries(next);
    if (editingId === id) resetForm();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white dark:bg-slate-900 rounded-lg shadow-lg w-full max-w-3xl mx-4 p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold">Journal</h3>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={() => { resetForm(); onClose(); }}>Close</Button>
          </div>
        </div>

        <div className="space-y-3">
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title (optional)" className="w-full px-3 py-2 border rounded text-black dark:text-white bg-white dark:bg-slate-800" />
          <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Write your thoughts..." rows={6} className="w-full px-3 py-2 border rounded text-black dark:text-white bg-white dark:bg-slate-800" />
          <div className="flex gap-3 items-center">
            <label className="text-sm">Mood</label>
            <select value={mood ?? ""} onChange={e => setMood(e.target.value ? Number(e.target.value) : undefined)} className="px-2 py-1 border rounded">
              <option value="">Select</option>
              <option value={1}>😞 1</option>
              <option value={2}>😕 2</option>
              <option value={3}>😐 3</option>
              <option value={4}>🙂 4</option>
              <option value={5}>😄 5</option>
            </select>

            <label className="text-sm">Tags</label>
            <input value={tags} onChange={e => setTags(e.target.value)} placeholder="comma,separated,tags" className="px-2 py-1 border rounded flex-1 text-black dark:text-white bg-white dark:bg-slate-800" />
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSave}>{editingId ? "Update" : "Save"}</Button>
            <Button variant="outline" onClick={resetForm}>Clear</Button>
          </div>
        </div>

        <hr className="my-4" />

        <div className="space-y-3 max-h-56 overflow-auto">
          {entries.length === 0 && <p className="text-sm text-muted-foreground">No entries yet.</p>}
          {entries.map(e => (
            <div key={e.id} className="p-3 border rounded bg-gray-50 dark:bg-slate-800">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm font-medium text-black dark:text-white">{e.title || "Untitled"}</div>
                  <div className="text-xs text-muted-foreground">{new Date(e.createdAt).toLocaleString()}</div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => handleEdit(e.id)}>Edit</Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(e.id)}>Delete</Button>
                </div>
              </div>
              <p className="mt-2 text-sm whitespace-pre-wrap text-black dark:text-white">{e.text.slice(0, 300)}{e.text.length > 300 ? '…' : ''}</p>
              {e.tags?.length ? <div className="mt-2 flex gap-2">{e.tags.map(t => <span key={t} className="text-xs px-2 py-1 bg-primary/10 rounded">#{t}</span>)}</div> : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JournalModal;
