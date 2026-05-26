# TAEM Shop MVP

MVP de ecommerce em Next.js com catálogo mockado em JSON e compra enviada para o WhatsApp.

## Fluxo

1. A Home exibe uma vitrine de produtos lidos de `data/products.json`.
2. Cada card navega para `/produto/[id]`.
3. A página de produto mostra imagem mockada, título, preço, descrição, opções e CTA.
4. O botão Comprar abre o WhatsApp com uma mensagem padrão de intenção de compra.

## Estrutura de dados

Cada item do catálogo segue este formato:

```json
{
  "id": "camisa-classic-black",
  "titulo": "Camiseta Oversized Classic - Preta",
  "preco": 89.9,
  "imagem_url": ["/images/classic-black.png"],
  "descricao": "Camiseta 100% algodão fio 30.1 penteado, modelagem street.",
  "opcoes": {
    "tamanhos": ["P", "M", "G", "GG"],
    "cores": ["Preta"]
  },
  "disponivel": true
}
```

## Rodar o projeto

```bash
npm install
npm run dev
```

## Observação

O número do WhatsApp pode ser definido via `NEXT_PUBLIC_WHATSAPP_NUMBER`. Se não for informado, o projeto usa um número placeholder para o MVP.