import { useState } from 'react';

function RegisterForm({ onLoggedIn, disabled }) {          // `disabled` comes from App.jsx: true on the live site
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, name, password }),
    });
    const data = await res.json();
    if (data.error) setError(data.error);                  // e.g. the 403 "sign-up disabled" or "email in use"
    else onLoggedIn(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* disabled={disabled} greys out each field when sign-up is closed (live site) */}
      <label>Email <input value={email} onChange={(e) => setEmail(e.target.value)} disabled={disabled} /></label>
      <label>Name <input value={name} onChange={(e) => setName(e.target.value)} disabled={disabled} /></label>
      <label>Password <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={disabled} /></label>
      <button disabled={disabled}>Register</button>
      {disabled && <p role="note">Sign-up is disabled for this educational demo — new accounts can't be created on the live site. Use an account made during development.</p>}
      {error && <p role="alert">{error}</p>}
    </form>
  );
}
export default RegisterForm;