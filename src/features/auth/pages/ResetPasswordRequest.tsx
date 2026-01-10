import { useState } from 'react'
import apiClient from '../../../services/config-client/apiClient';

const ResetPasswordRequest = () => {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { data } = await apiClient.post(
        `/auth/reset-password-post/${email}`
      );

      setMessage(data.message);
    } catch (error) {
      setMessage("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Reset your Password
        </h2>

        {message && (
          <p className="text-center text-sm mb-4 text-blue-600 font-semibold">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="you@example.com"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition disabled:bg-gray-400"
          >
            {loading ? "Sending..." : "Send Reset Email"}
          </button>
        </form>

      </div>
    </div>
  );
};

export default ResetPasswordRequest;
