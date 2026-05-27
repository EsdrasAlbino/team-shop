import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice, getTeamById, getTeams, getVariationById } from "@/lib/products";
import ProductActions from "./ProductActions.client";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    v?: string;
  }>;
};

export async function generateStaticParams() {
  const teams = await getTeams();

  return teams.map((team) => ({
    id: team.id,
  }));
}

export async function generateMetadata({ params, searchParams }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const { v } = await searchParams;
  const team = await getTeamById(id);

  if (!team) {
    return {
      title: "Selecao nao encontrada | Genius Shop MVP",
    };
  }

  const variation = getVariationById(team, v);

  if (!variation) {
    return {
      title: `${team.nome} | Genius Shop MVP`,
      description: `Conheca as variacoes de camisa da selecao ${team.nome}.`,
    };
  }

  return {
    title: `${team.nome} - ${variation.tipo.toUpperCase()} ${variation.temporada} | Genius Shop MVP`,
    description: variation.descricao,
  };
}

export default async function ProductPage({ params, searchParams }: ProductPageProps) {
  const { id } = await params;
  const { v } = await searchParams;
  const team = await getTeamById(id);

  if (!team) {
    notFound();
  }

  const activeVariation = getVariationById(team, v);

  if (!activeVariation) {
    notFound();
  }

  return (
    <main className="site-shell">
      <div className="product-layout">
        <section className="product-gallery">
          <div className="product-frame">
            <div className="product-frame__preview">
              <div>
                <strong>{activeVariation.titulo}</strong>
                <img
                  src={activeVariation.imagem_url?.[0] ?? "/camisa/placeholder.jpg"}
                  alt={activeVariation.titulo}
                  className="product-frame__img"
                />
              </div>
            </div>

            <div className="summary-row">
              <span className={`badge ${activeVariation.disponivel ? "badge--available" : ""}`}>
                {activeVariation.disponivel ? "Produto disponivel" : "Produto indisponivel"}
              </span>
            </div>
          </div>
        </section>

        <aside className="product-summary">
          <div className="summary-stack">
            <div>
              <p className="eyebrow">Pagina da selecao</p>
              <h1 className="product-title">{team.nome}</h1>
            </div>

            <div className="summary-row">
              <strong className="price">{formatPrice(activeVariation.preco)}</strong>
              <span className="badge">Variacao: {activeVariation.tipo.toUpperCase()}</span>
            </div>

            <p className="product-copy">{activeVariation.descricao}</p>

            <div className="option-group">
              <span className="option-label">Variacoes</span>
              <div className="chips" role="list">
                {team.variations.map((variation) => {
                  const isSelected = variation.id === activeVariation.id;

                  return (
                    <Link
                      key={variation.id}
                      href={`/produto/${team.id}?v=${variation.id}`}
                      className={`chip ${isSelected ? "chip--selected" : ""}`}
                      aria-current={isSelected ? "page" : undefined}
                    >
                      {variation.tipo.toUpperCase()} {variation.temporada}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="option-group">
              <p className="meta-note">
                Selecione o tamanho e a quantidade. O botão Comprar abre o
                WhatsApp com uma mensagem padrão para iniciar a conversa de
                compra.
              </p>
            </div>

            {/* Componente cliente para seleção interativa de tamanho e quantidade */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <ProductActions teamName={team.nome} variation={activeVariation} />

            <Link href="/" className="back-link">
              Voltar para a vitrine
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}