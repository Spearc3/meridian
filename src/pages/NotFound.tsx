import { Link } from "react-router-dom";
import { usePageMeta } from "../usePageMeta";

export default function NotFound() {
  usePageMeta("Page not found — Travel Port Leisure", "The page you're looking for doesn't exist or has been moved.");

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="display text-7xl">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
        <div className="mt-6">
          <Link to="/" className="btn btn-primary">
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
