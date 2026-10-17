import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '@/lib/api/auth';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await authApi.register({ name, email, password });
      navigate('/login', { state: { message: 'Registration successful. Please sign in.' } });
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center py-12">
      <div className="w-full max-w-md">
        <div className="rounded-xl border border-ivory-400 bg-white p-8">
          <h1 className="font-serif text-2xl font-bold text-navy">Create Account</h1>
          <p className="mt-2 text-slate-600">
            Join Veeranjali to bookmark stories and contribute.
          </p>

          {error && (
            <div className="mt-4 rounded-lg bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-charcoal">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-ivory-400 bg-white px-4 py-2 text-charcoal focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-charcoal">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 w-full rounded-lg border border-ivory-400 bg-white px-4 py-2 text-charcoal focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-charcoal">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="mt-1 w-full rounded-lg border border-ivory-400 bg-white px-4 py-2 text-charcoal focus:border-saffron focus:outline-none focus:ring-2 focus:ring-saffron/20"
              />
              <p className="mt-1 text-xs text-slate-500">Minimum 8 characters</p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-navy py-3 font-medium text-ivory transition-colors hover:bg-navy-700 disabled:opacity-50"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-saffron hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
