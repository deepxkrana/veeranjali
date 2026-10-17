import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { contributorApi } from '@/lib/api/contributor';

export default function NewSubmissionPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const save = async (submit: boolean) => {
    setError('');
    if (title.trim().length < 5 || content.trim().length < 100) {
      setError('Enter a title of at least 5 characters and content of at least 100 characters.');
      return;
    }
    setIsSaving(true);
    try {
      const submission = await contributorApi.create({ title: title.trim(), content: content.trim() });
      if (submit) await contributorApi.submit(submission.id);
      navigate('/contributor/submissions');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to save submission.');
    } finally { setIsSaving(false); }
  };

  return <div><h1 className="font-serif text-2xl font-bold text-navy">New Story Submission</h1><p className="mt-2 text-slate-600">Create a new tribute story for review.</p>
    {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
    <div className="mt-8 space-y-6 rounded-lg border border-ivory-400 bg-white p-6">
      <div><label htmlFor="title" className="block text-sm font-medium text-charcoal">Title</label><input id="title" value={title} onChange={(event) => setTitle(event.target.value)} className="mt-1 w-full rounded-lg border border-ivory-400 px-4 py-2" /></div>
      <div><label htmlFor="content" className="block text-sm font-medium text-charcoal">Biography</label><textarea id="content" rows={16} value={content} onChange={(event) => setContent(event.target.value)} className="mt-1 w-full rounded-lg border border-ivory-400 px-4 py-3" placeholder="Write a detailed biography including service history and sources..." /></div>
      <div className="flex gap-3"><button type="button" disabled={isSaving} onClick={() => void save(false)} className="rounded-lg bg-navy px-6 py-3 font-medium text-ivory">Save Draft</button><button type="button" disabled={isSaving} onClick={() => void save(true)} className="rounded-lg bg-saffron px-6 py-3 font-medium text-ivory">Submit for Review</button></div>
    </div>
  </div>;
}
