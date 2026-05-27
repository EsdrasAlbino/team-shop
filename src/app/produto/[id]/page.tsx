import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice, getProductById, getProducts } from "@/lib/products";
import ProductActions from "./ProductActions.client";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateStaticParams() {
  const products = await getProducts();

  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: "Produto não encontrado | Genius Shop MVP",
    };
  }

  return {
    title: `${product.titulo} | Genius Shop MVP`,
    description: product.descricao,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="site-shell">
      <div className="product-layout">
        <section className="product-gallery">
          <div className="product-frame">
            <div className="product-frame__preview">
              <div>
                <strong>{product.titulo}</strong>
                <img
                  src={product.imagem_url?.[0] ?? "/camisa/placeholder.jpg"}
                  alt={product.titulo}
                  className="product-frame__img"
                />
              </div>
            </div>

            <div className="summary-row">
              <span className={`badge ${product.disponivel ? "badge--available" : ""}`}>
                {product.disponivel ? "Produto disponível" : "Produto indisponível"}
              </span>
            </div>
          </div>
        </section>

        <aside className="product-summary">
          <div className="summary-stack">
            <div>
              <p className="eyebrow">Página do produto</p>
              <h1 className="product-title">{product.titulo}</h1>
            </div>

            <div className="summary-row">
              <strong className="price">{formatPrice(product.preco)}</strong>
              <span className="badge">ID: {product.id}</span>
            </div>

            <p className="product-copy">{product.descricao}</p>

            <div className="option-group">

              <p className="meta-note">
                Selecione o tamanho e a quantidade. O botão Comprar abre o
                WhatsApp com uma mensagem padrão para iniciar a conversa de
                compra.
              </p>
            </div>

            {/* Componente cliente para seleção interativa de tamanho e quantidade */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <ProductActions product={product} />

            <Link href="/" className="back-link">
              Voltar para a vitrine
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}