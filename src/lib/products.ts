import { promises as fs } from "fs";
import path from "path";

export type Product = {
  id: string;
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

const productsFilePath = path.join(process.cwd(), "data", "products.json");
const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5581989114268";

export async function getProducts(): Promise<Product[]> {
  const rawProducts = await fs.readFile(productsFilePath, "utf8");

  return JSON.parse(rawProducts) as Product[];
}

export async function getProductById(id: string): Promise<Product | null> {
  const products = await getProducts();

  return products.find((product) => product.id === id) ?? null;
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function buildWhatsAppLink(product: Product): string {
  const message = `Olá! Quero a peça ${product.titulo}, 1 unidade, tamanho a definir.`;

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}