import axios from "axios";
import { useState } from "react";

function EmailGeneration() {
  const [form, setForm] = useState({
    tone: "",
    recipient: "",
    subject: "",
    keypoints: "",
  });
  const [loading, setLoading] = useState(false);
  const [generatedEmail, setGeneratedEmail] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setGeneratedEmail("");

    try {
      const res = await axios.post(
        "http://localhost:7000/api/generate-email",
        {
          ...form,
          keypoints: form.keypoints,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = res.data;
      setGeneratedEmail(data.email || "No email generated");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.error || "Error generating email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Email Generator
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Tone</label>
            <input
              type="text"
              name="tone"
              value={form.tone}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Recipient</label>
            <input
              type="text"
              name="recipient"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={form.recipient}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={form.subject}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Keypoints (comma separated)</label>
            <input
              type="text"
              name="keypoints"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              value={form.keypoints}
              onChange={handleChange}
            />
          </div>
          <button
            className={`w-full py-2 px-4 rounded-lg font-semibold text-white ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 transition"
            }`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Email"}
          </button>
        </form>

        {generatedEmail && (
          <div className="mt-8 bg-gray-100 p-4 rounded-lg shadow-inner">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Generated Email:
            </h3>
            <pre className="whitespace-pre-wrap text-gray-700">
              {generatedEmail}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmailGeneration;
