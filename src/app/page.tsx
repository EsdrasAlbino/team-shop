import Link from "next/link";
import SearchBar from "./components/SearchBar.client";
import { filterTeamsBySearchTerm, formatPrice, getDefaultVariation, getTeams } from "@/lib/products";

type HomePageProps = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const { q } = await searchParams;
  const teams = await getTeams();
  const filteredTeams = filterTeamsBySearchTerm(teams, q ?? "");

  return (
    <main className="site-shell">
      <section className="hero">
        <span className="eyebrow">Genius Shop</span>
        <div className="hero-grid">
          <div>
            <h1>Use as camisas mais bonitas da copa 2026.</h1>
          </div>
          <div className="hero-panel search-panel">
            <div className="search-panel__header">
              <p className="search-panel__label">Pesquisar selecao</p>
              <span className="badge">{filteredTeams.length} resultados</span>
            </div>
            <SearchBar initialQuery={q ?? ""} />
            <p className="search-panel__hint">
              Busque pelo nome da selecao para localizar rapidamente a vitrine.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <h2>Camisas</h2>
          </div>
          <span className="badge">
            {filteredTeams.length} de {teams.length} selecoes
          </span>
        </div>

        {filteredTeams.length === 0 ? (
          <div className="empty-search">
            <div className="empty-state__card">
              <p className="eyebrow">Nenhum resultado</p>
              <h3>Nao encontramos selecoes com esse termo.</h3>
              <p className="small-copy">
                Tente outro nome ou limpe a busca para voltar a vitrine completa.
              </p>
            </div>
          </div>
        ) : (
          <div className="products-grid">
            {filteredTeams.map((team, index) => {
              const variation = getDefaultVariation(team);

              if (!variation) return null;

              return (
                <Link key={team.id} href={`/produto/${team.id}`} className="product-card">
                  <article>
                    <div
                      className={`product-visual ${index % 3 === 1 ? "product-visual--light" : ""} ${index % 3 === 2 ? "product-visual--mid" : ""}`}
                    >
                      <img
                        src={variation.imagem_url?.[0] ?? "/camisa/placeholder.jpg"}
                        alt={variation.titulo}
                        className="product-visual__img"
                        loading="lazy"
                      />
                    </div>

                    <div className="summary-stack">
                      <div className="summary-row">
                        <h3>{team.nome}</h3>
                        <span className={`badge ${variation.disponivel ? "badge--available" : ""}`}>
                          {variation.disponivel ? "Disponivel" : "Indisponivel"}
                        </span>
                      </div>

                      <p className="small-copy">{variation.descricao}</p>

                      <div className="card-meta">
                        <strong className="price">{formatPrice(variation.preco)}</strong>
                        <span className="badge">Ver variacoes</span>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}