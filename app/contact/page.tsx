export default function ContactPage() {
  return (
    <main className="max-w-2xl mx-auto py-12 px-4 md:px-0">
      <h1
        className="text-4xl font-extrabold mb-8 text-center"
        style={{ color: "#d84315" }}
      >
        Contact Me
      </h1>
      <form
        className="flex flex-col gap-4"
        action="https://formspree.io/f/xwkzqgqg" // Replace with your Formspree endpoint or backend
        method="POST"
      >
        <label className="font-semibold" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="border rounded px-3 py-2 bg-white text-gray-900"
          autoComplete="name"
        />
        <label className="font-semibold" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="border rounded px-3 py-2 bg-white text-gray-900"
          autoComplete="email"
        />
        <label className="font-semibold" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="border rounded px-3 py-2 bg-white text-gray-900"
        />
        <button
          type="submit"
          className="mt-4 px-6 py-2 rounded bg-orange-600 text-white font-bold hover:bg-orange-700 transition"
        >
          Send Message
        </button>
      </form>
    </main>
  );
}
