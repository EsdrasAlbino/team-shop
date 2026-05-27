import { promises as fs } from "fs";
import path from "path";

export type ProductVariation = {
  id: string;
  tipo: string;
  temporada: string;
  titulo: string;
  preco: number;
  imagem_url: string[];
  descricao: string;
  opcoes: {
    tamanhos: string[];
    cores: string[];
  };
  disponivel: boolean;
};

export type TeamProduct = {
  id: string;
  nome: string;
  variations: ProductVariation[];
};

const productsFilePath = path.join(process.cwd(), "data", "products.json");
const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5581989114268";

export async function getTeams(): Promise<TeamProduct[]> {
  const rawProducts = await fs.readFile(productsFilePath, "utf8");

  return JSON.parse(rawProducts) as TeamProduct[];
}

export async function getProducts(): Promise<TeamProduct[]> {
  return getTeams();
}

export async function getTeamById(id: string): Promise<TeamProduct | null> {
  const teams = await getTeams();

  return teams.find((team) => team.id === id) ?? null;
}

function normalizeSearchTerm(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function filterTeamsBySearchTerm(teams: TeamProduct[], term: string): TeamProduct[] {
  const normalizedTerm = normalizeSearchTerm(term);

  if (!normalizedTerm) {
    return teams;
  }

  return teams.filter((team) => normalizeSearchTerm(team.nome).includes(normalizedTerm));
}

export function getDefaultVariation(team: TeamProduct): ProductVariation | null {
  return team.variations[0] ?? null;
}

export function getVariationById(
  team: TeamProduct,
  variationId: string | null | undefined,
): ProductVariation | null {
  if (!variationId) {
    return getDefaultVariation(team);
  }

  return team.variations.find((variation) => variation.id === variationId) ?? getDefaultVariation(team);
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function buildWhatsAppLink(variation: ProductVariation, teamName?: string): string {
  const productLabel = teamName ? `${teamName} - ${variation.titulo}` : variation.titulo;
  const message = `Olá! Quero a peça ${productLabel}, 1 unidade, tamanho a definir.`;

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}