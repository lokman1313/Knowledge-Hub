// app/loading.jsx

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-5">
        <div className="flex gap-2">
          <span className="h-4 w-4 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
          <span className="h-4 w-4 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
          <span className="h-4 w-4 animate-bounce rounded-full bg-primary" />
        </div>

        <div className="text-center">
          <h2 className="text-lg font-semibold">Loading</h2>
          <p className="text-sm text-default-500">
            Fetching the latest data...
          </p>
        </div>
      </div>
    </div>
  );
}