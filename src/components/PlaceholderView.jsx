export default function PlaceholderView({ title }) {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <h2 className="text-3xl font-bold text-text-main mb-4">{title}</h2>
      <p className="text-text-muted">This section is currently under construction.</p>
    </div>
  );
}
