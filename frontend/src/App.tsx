import { useState } from "react";

type EmotionResponse = {
  emotion: string;
  confidence: number;
};

  function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<EmotionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) throw new Error("Failed to get emotion analysis.");

      const data: EmotionResponse = await res.json();
      setResult(data);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-indigo-200 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced background decorative elements */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-gradient-to-br from-purple-300 to-purple-400 rounded-full opacity-30 animate-pulse shadow-xl"></div>
      <div className="absolute bottom-16 right-16 w-20 h-20 bg-gradient-to-br from-blue-300 to-blue-400 rounded-full opacity-40 animate-bounce shadow-lg"></div>
      <div className="absolute top-24 right-24 w-16 h-16 bg-gradient-to-br from-indigo-300 to-indigo-400 rounded-full opacity-35 animate-ping shadow-lg"></div>
      <div className="absolute bottom-32 left-16 w-12 h-12 bg-gradient-to-br from-pink-300 to-pink-400 rounded-full opacity-25 animate-pulse delay-500 shadow-md"></div>
      <div className="absolute top-1/3 left-1/4 w-14 h-14 bg-gradient-to-br from-cyan-300 to-cyan-400 rounded-full opacity-20 animate-bounce delay-700 shadow-md"></div>
      <div className="absolute bottom-1/3 right-1/3 w-10 h-10 bg-gradient-to-br from-violet-300 to-violet-400 rounded-full opacity-30 animate-ping delay-1000 shadow-md"></div>

      {/* Floating geometric shapes */}
      <div className="absolute top-20 right-1/4 w-8 h-8 bg-gradient-to-r from-purple-200 to-blue-200 rotate-45 opacity-40 animate-spin shadow-sm" style={{animationDuration: '8s'}}></div>
      <div className="absolute bottom-1/4 left-1/3 w-6 h-6 bg-gradient-to-r from-indigo-200 to-purple-200 rotate-12 opacity-30 animate-bounce shadow-sm"></div>
      <div className="absolute top-1/2 right-12 w-4 h-4 bg-gradient-to-r from-blue-200 to-cyan-200 rotate-45 opacity-50 animate-pulse shadow-sm"></div>

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-50/50 via-transparent to-blue-50/50 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-indigo-50/30 to-purple-50/40 pointer-events-none"></div>

      <div className="w-full max-w-lg bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-2xl border border-white/30 relative z-10 transform hover:scale-[1.02] transition-all duration-300">
        {/* Header with icon */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4 shadow-lg animate-pulse">
            <span className="text-2xl">🧠</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Emotion Reflection Tool
          </h1>
          <p className="text-gray-600 text-sm">Discover your emotional insights with AI</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
          <div className="relative">
            <textarea
              className="w-full p-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-400 resize-none transition-all duration-300 placeholder-gray-400 text-gray-700 shadow-sm hover:shadow-md"
              rows={4}
              placeholder="✨ Share your thoughts and feelings here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-400 bg-white/80 px-2 py-1 rounded-lg">
              {text.length} characters
            </div>
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold py-4 px-6 rounded-2xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
            disabled={loading}
          >
            <span className="flex items-center justify-center space-x-2">
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                  <span>Analyzing emotions...</span>
                </>
              ) : (
                <>
                  <span className="text-lg">🔍</span>
                  <span>Analyze Emotions</span>
                </>
              )}
            </span>
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-r-xl animate-pulse">
            <div className="flex items-center">
              <span className="text-red-400 mr-2 text-lg">⚠️</span>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          </div>
        )}

        {result && (
          <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl text-center transform transition-all duration-500 animate-pulse">
            <div className="mb-4">
              <span className="text-4xl mb-2 block animate-bounce">🎭</span>
              <p className="text-lg font-semibold text-gray-700 mb-2">Detected Emotion</p>
            </div>

            <div className="bg-white/60 rounded-xl p-4 mb-4 shadow-sm">
              <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent capitalize">
                {result.emotion}
              </p>
            </div>

            <div className="flex items-center justify-center space-x-3">
              <div className="flex-1 bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${result.confidence * 100}%` }}
                ></div>
              </div>
              <span className="text-sm font-semibold text-gray-600 min-w-[60px] bg-white/50 px-2 py-1 rounded-lg">
                {(result.confidence * 100).toFixed(1)}%
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Confidence Level</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default App