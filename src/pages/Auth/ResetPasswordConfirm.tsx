import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../services/apiClient";


const ResetPasswordConfirm = () => {
  const { id: token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setServerMessage("");

    if (password !== password2) {
      setServerMessage("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        token,
        newPassword: password
      };

      const { data } = await apiClient.post(
        "/auth/reset-password-confirm",
        payload
      );

      // Mensaje correcto desde backend
      setServerMessage(data.message);
      setIsSuccess(true);

      // Opcional: redirigir después de 2 segundos al login
      setTimeout(() => navigate("/login"), 2000);

    } catch (error: any) {
      const msg =
        error.response?.data?.message ||
        "Something went wrong while changing password.";

      setServerMessage(msg);
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Set a New Password
        </h2>

        {serverMessage && (
          <p
            className={`text-center text-sm font-semibold mb-4 ${
              isSuccess ? "text-green-600" : "text-red-600"
            }`}
          >
            {serverMessage}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              New Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 
                         focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="New password"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              required
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 
                         focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="Repeat new password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold 
                       py-2 rounded-lg transition disabled:bg-gray-400"
          >
            {loading ? "Saving..." : "Save New Password"}
          </button>

        </form>

      </div>
    </div>
  );
};

export default ResetPasswordConfirm;
