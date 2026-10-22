import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="page-transition mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 py-20 text-center">
      <span className="font-mono text-4xl font-extrabold text-[var(--accent)] sm:text-6xl">
        404
      </span>
      <h1 className="mt-4 text-2xl font-bold tracking-tight text-[var(--fg)] sm:text-3xl">
        Halaman Tidak Ditemukan
      </h1>
      <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed">
        Maaf, tautan atau halaman dokumentasi yang Anda tuju tidak tersedia atau telah dipindahkan.
      </p>
      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent)] px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:brightness-95 transition-all"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
