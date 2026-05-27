## Plan: Ecommerce MVP Next.js Flow

Criar um MVP de ecommerce em Next.js com três pontos principais: Home com vitrine de produtos mockados em JSON, Página do Produto com detalhes do item selecionado, e ação de compra que redireciona para o WhatsApp com uma mensagem padrão de intenção de compra. O foco é documentar e estruturar o fluxo para implementação posterior sem banco de dados real nesta fase.

**Steps**
1. Definir a arquitetura inicial do MVP *depende de decisão de escopo*
   - Confirmar que o projeto será iniciado do zero em Next.js.
   - Escolher se o app vai usar App Router e TypeScript, com dados mockados locais.
   - Fixar o comportamento de compra como geração de link/redirect para WhatsApp, sem checkout interno.
2. Estruturar as fontes de dados mockadas *paralelo com 3*
   - Criar uma coleção local de produtos em JSON estático.
    - Definir o shape mínimo do produto no formato abaixo:

       ```json
       {
          "id": "camisa-classic-black",
          "titulo": "Camiseta Oversized Classic - Preta",
          "preco": 89.90,
          "imagem_url": ["/images/classic-black.png"],
          "descricao": "Camiseta 100% algodão fio 30.1 penteado, modelagem street.",
          "opcoes": {
             "tamanhos": ["P", "M", "G", "GG"],
             "cores": ["Preta"]
          },
          "disponivel": true
       }
       ```

    - Manter o catálogo em um array de objetos com essa estrutura.
   - Documentar como a Home consome essa lista e como a Página do Produto resolve o item pelo slug ou id.
3. Desenhar a Home *depende de 1*
   - Mapear a vitrine de produtos com cards clicáveis.
   - Definir navegação para a Página do Produto ao clicar em um item.
   - Registrar a observação de que os produtos são mockados e não dependem de API.
4. Desenhar a Página do Produto *depende de 1 e 2*
   - Reservar área visual para imagem, título, preço e botão Comprar.
   - Definir o comportamento ao carregar a página a partir da seleção vinda da Home.
   - Especificar estado de fallback para produto inexistente.
5. Definir o fluxo de WhatsApp *depende de 4*
   - Criar a mensagem padrão de compra com nome do produto, preço e intenção do usuário.
   - Determinar se a ação abre o WhatsApp Web/App em nova aba ou usa deep link.
   - Documentar que as etapas de validação de pedido, disponibilidade, pagamento e rastreio permanecem fora do MVP e podem virar fase futura.
6. Validar e consolidar a documentação *depende de 1 a 5*
   - Revisar se a documentação cobre navegação, dados mockados, produto selecionado e CTA de compra.
   - Verificar se o escopo está claro para implementação posterior sem ambiguidades.

**Relevant files**
- `/app` ou `/src/app` — estrutura de rotas da Home e Página do Produto, caso o projeto seja iniciado.
- `/data/products.json` ou equivalente — catálogo mockado local dos produtos no formato com `id`, `titulo`, `preco`, `imagem_url`, `descricao`, `opcoes` e `disponivel`.
- `/app/page.tsx` — Home com cards de produtos.
- `/app/produto/[slug]/page.tsx` — Página do Produto baseada no item selecionado.
- `/lib/products` ou equivalente — leitura/transformação dos dados mockados.
- `/README.md` — documentação do fluxo MVP e das decisões de escopo.

**Verification**
1. Confirmar que a Home exibe produtos vindos do JSON mockado.
2. Confirmar que clicar em um produto navega para a Página do Produto correta.
3. Confirmar que o botão Comprar monta a mensagem padrão e abre o WhatsApp com os dados do item selecionado.
4. Confirmar que não existe dependência de banco de dados ou backend para este MVP.

**Decisions**
- Escopo do MVP: somente vitrine, detalhe do produto e redirecionamento para WhatsApp.
- Dados do catálogo: mock local em JSON, sem persistência real.
- Checkout: não será implementado dentro da aplicação nesta fase.
- Integrações de WhatsApp mais avançadas, como acompanhamento de pedido, ficam para uma fase posterior.

**Further Considerations**
1. Vale padronizar agora se o link do WhatsApp será montado com número fixo do lojista ou configurável por ambiente.
2. Vale decidir se a página do produto vai usar slug amigável ou id simples para navegação.
3. Vale definir se o JSON mockado ficará em `data/` na raiz ou dentro de `src/` para alinhar com o padrão do projeto.