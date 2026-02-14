'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-5 sm:px-6">
      <div className="text-center max-w-lg">
        {/* Error icon */}
        <div className="w-20 h-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <h1 className="text-2xl sm:text-3xl font-semibold mb-4">
          Something Went Wrong
        </h1>

        <p className="text-gray-400 text-sm sm:text-base mb-8 leading-relaxed">
          An unexpected error occurred. Please try again or contact us if the problem persists.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="px-8 py-3.5 rounded-full bg-white text-black font-medium text-sm hover:bg-gray-100 transition-colors"
          >
            Try Again
          </button>
          <a
            href="/"
            className="px-8 py-3.5 rounded-full border border-white/10 text-white font-medium text-sm hover:bg-white/5 transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
