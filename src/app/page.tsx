import Link from "next/link";
import { formatPrice, getProducts } from "@/lib/products";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="site-shell">
      <section className="hero">
        <span className="eyebrow">Genius Shop</span>
        <div className="hero-grid">
          <div>
            <h1>Use as camisas mais bonitas da copa 2026.</h1>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <h2>Camisas</h2>
          </div>
          <span className="badge">{products.length} itens na vitrine</span>
        </div>

        <div className="products-grid">
          {products.map((product, index) => (
            <Link key={product.id} href={`/produto/${product.id}`} className="product-card">
              <article>
                <div
                  className={`product-visual ${index % 3 === 1 ? "product-visual--light" : ""} ${index % 3 === 2 ? "product-visual--mid" : ""}`}
                >
                  <img
                    src={product.imagem_url?.[0] ?? "/camisa/placeholder.jpg"}
                    alt={product.titulo}
                    className="product-visual__img"
                    loading="lazy"
                  />
                </div>

                <div className="summary-stack">
                  <div className="summary-row">
                    <h3>{product.titulo}</h3>
                    <span className={`badge ${product.disponivel ? "badge--available" : ""}`}>
                      {product.disponivel ? "Disponível" : "Indisponível"}
                    </span>
                  </div>

                  <p className="small-copy">{product.descricao}</p>

                  <div className="card-meta">
                    <strong className="price">{formatPrice(product.preco)}</strong>
                    <span className="badge">Ver produto</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}