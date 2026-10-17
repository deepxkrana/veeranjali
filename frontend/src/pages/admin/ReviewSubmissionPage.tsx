import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminApi } from '@/lib/api/admin';

export default function ReviewSubmissionPage() {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const [submission, setSubmission] = useState<Awaited<ReturnType<typeof adminApi.submission>>>();
  const [note, setNote] = useState('');
  useEffect(() => { void adminApi.submission(id).then(setSubmission); }, [id]);
  const review = async (action: 'request-changes' | 'approve' | 'publish' | 'reject' | 'archive') => { await adminApi.reviewSubmission(id, action, note); navigate('/admin/submissions'); };
  if (!submission) return <p className="text-slate-500">Loading submission...</p>;
  return <div><h1 className="font-serif text-2xl font-bold text-navy">{submission.title}</h1><p className="mt-2 text-sm text-slate-500">Status: {submission.status.replace(/_/g, ' ')}</p><article className="mt-8 whitespace-pre-line rounded-lg border border-ivory-400 bg-white p-6 text-slate-700">{submission.content}</article><textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Admin note (optional)" className="mt-6 w-full rounded-lg border border-ivory-400 p-3" rows={4} /><div className="mt-4 flex flex-wrap gap-3"><button onClick={() => void review('request-changes')} className="rounded bg-saffron px-4 py-2 text-white">Request Changes</button><button onClick={() => void review('approve')} className="rounded bg-green-700 px-4 py-2 text-white">Approve</button><button onClick={() => void review('publish')} className="rounded bg-navy px-4 py-2 text-white">Publish</button><button onClick={() => void review('reject')} className="rounded bg-maroon px-4 py-2 text-white">Reject</button></div></div>;
}
