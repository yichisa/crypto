import React, { useState } from 'react';

const Login: React.FC = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    if (form.email === '' || form.password === '') {
      setError('Please fill in all fields');
    } else {
      setError(null);
      // Submit form
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-white text-center mb-6">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 text-white mt-1 focus:ring focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 text-white mt-1 focus:ring focus:ring-blue-500 outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="mt-6 text-center text-gray-400">
          Don't have an account? <a href="/register" className="text-blue-400 hover:text-blue-300">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
