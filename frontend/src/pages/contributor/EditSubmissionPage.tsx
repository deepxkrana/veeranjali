import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { contributorApi } from '@/lib/api/contributor';

export default function EditSubmissionPage() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => { void contributorApi.get(id).then((submission) => { setTitle(submission.title); setContent(submission.content); setStatus(submission.status); }).catch(() => setError('Unable to load submission.')).finally(() => setLoading(false)); }, [id]);
  const save = async (submit: boolean) => { try { await contributorApi.update(id, { title, content }); if (submit) await (status === 'NEEDS_CHANGES' ? contributorApi.resubmit(id) : contributorApi.submit(id)); navigate('/contributor/submissions'); } catch { setError('Unable to update submission.'); } };
  if (loading) return <p className="text-slate-500">Loading submission...</p>;
  return <div><h1 className="font-serif text-2xl font-bold text-navy">Edit Submission</h1>{error && <p className="mt-4 text-red-700">{error}</p>}<div className="mt-8 space-y-6 rounded-lg border border-ivory-400 bg-white p-6"><p className="text-sm text-slate-500">Status: {status.replace(/_/g, ' ')}</p><input value={title} onChange={(event) => setTitle(event.target.value)} className="w-full rounded-lg border border-ivory-400 px-4 py-2" /><textarea rows={16} value={content} onChange={(event) => setContent(event.target.value)} className="w-full rounded-lg border border-ivory-400 px-4 py-3" /><div className="flex gap-3"><button type="button" onClick={() => void save(false)} className="rounded-lg bg-navy px-6 py-3 text-ivory">Save Draft</button><button type="button" onClick={() => void save(true)} className="rounded-lg bg-saffron px-6 py-3 text-ivory">Submit</button></div></div></div>;
}
