import { useState } from 'react';

function RegisterForm({ onLoggedIn }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');          // NEW: the register route needs a name
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();                           // stop the page reloading
    const res = await fetch('/api/register', {    // CHANGED: register route
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',                     // send/receive the session cookie
      body: JSON.stringify({ email, name, password }), // CHANGED: all three fields
    });
    const data = await res.json();
    if (data.error) setError(data.error);
    else onLoggedIn(data);                        // registered = logged in
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Name <input value={name} onChange={(e) => setName(e.target.value)} /></label>
      <label>Email <input value={email} onChange={(e) => setEmail(e.target.value)} /></label>
      <label>Password <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
      <button>Create account</button>
      {error && <p role="alert">{error}</p>}
    </form>
  );
}
export default RegisterForm;