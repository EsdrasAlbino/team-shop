import Link from "next/link";

export default function NotFound() {
  return (
    <main className="site-shell empty-state">
      <div className="empty-state__card">
        <p className="eyebrow">Página não encontrada</p>
        <h1 className="product-title">Esse produto não existe no catálogo mockado.</h1>
        <p className="product-copy">
          Volte para a vitrine e escolha outro item disponível.
        </p>
        <Link href="/" className="back-link">
          Ir para a Home
        </Link>
      </div>
    </main>
  );
}