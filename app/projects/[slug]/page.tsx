type Params = { slug: string };
export default function ProjectDetail({ params }: { params: Params }) {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-bold">{params.slug}</h1>
      <p className="text-muted-foreground mt-2">Case study coming soon.</p>
    </main>
  );
}
