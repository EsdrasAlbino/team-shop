## Plan: Agrupar camisas por seleção com variations

Migrar o catálogo de produtos de lista plana para estrutura aninhada por seleção (time) com variations (Home/Away 2026), preservando navegação por slug e atualizando a rota de produto para abrir a seleção e permitir troca de variação na página. A estratégia minimiza regressões com uma camada de normalização em src/lib/products.ts e mudança coordenada nas páginas de listagem e detalhe.

**Steps**
1. Definir contrato de dados alvo para data/products.json com nível raiz por seleção e variations internas por uniforme/ano. Cada seleção terá um id estável (ex.: brasil), nome/título-base e array variations contendo id de variação (ex.: brasil-home-2026), tipo (home/away), temporada, preço, imagens, descrição, opções e disponibilidade.
2. Criar camada de normalização no carregamento em src/lib/products.ts: adicionar tipos TeamProduct e ProductVariation e atualizar getProducts() para retornar seleção+variações conforme novo JSON. *Base para os próximos passos.*
3. Implementar helpers de consulta em src/lib/products.ts para a nova navegação. *depende do passo 2*:
   - getTeams(): lista seleções para a vitrine.
   - getTeamById(teamId): busca seleção por id de time.
   - getVariationById(team, variationId): resolve variação ativa na página de produto.
   - getDefaultVariation(team): define a variação padrão como a primeira posição do array variations.
4. Atualizar a vitrine em src/app/page.tsx para renderizar por seleção (1 card por time) e trocar o link para /produto/{teamId}. Exibir preço/thumbnail da variação padrão calculada pelos helpers. *depende do passo 3*.
5. Refatorar a rota de detalhe em src/app/produto/[id]/page.tsx para tratar id como teamId. *depende do passo 3*:
   - generateStaticParams() passa a gerar ids de seleção.
   - generateMetadata() usa seleção + variação ativa padrão e respeita query param v quando presente.
   - Render principal mostra dados da variação selecionada e lista de variações para troca na própria página.
6. Evoluir src/app/produto/[id]/ProductActions.client.tsx para receber seleção e variação ativa (ou shape compatível) e manter compra por WhatsApp incluindo nome da seleção + variação escolhida. *depende do passo 5*.
7. Ajustar consistência de tipos e mensagens em src/lib/products.ts e componentes consumidores para evitar duplicação de tipo local e centralizar contratos. *paralelo parcial com passo 6, finaliza após passo 6*.
8. Rodar validação funcional/manual e checagens de build para confirmar que listagem, rota dinâmica e troca de variação funcionam com o novo schema. *depende dos passos 4-7*.

**Relevant files**
- /Users/esdrasalbino/Documents/taem-shop-mvp/data/products.json — converter de Product[] plano para TeamProduct[] com variations.
- /Users/esdrasalbino/Documents/taem-shop-mvp/src/lib/products.ts — novos tipos TeamProduct/ProductVariation, loaders e helpers de resolução de variação padrão.
- /Users/esdrasalbino/Documents/taem-shop-mvp/src/app/page.tsx — card por seleção e link para rota por teamId.
- /Users/esdrasalbino/Documents/taem-shop-mvp/src/app/produto/[id]/page.tsx — detalhe por seleção com seletor de variações e metadata coerente.
- /Users/esdrasalbino/Documents/taem-shop-mvp/src/app/produto/[id]/ProductActions.client.tsx — compra considerando variação ativa.
- /Users/esdrasalbino/Documents/taem-shop-mvp/src/app/not-found.tsx — apenas confirmar comportamento quando teamId inválido (sem mudança estrutural obrigatória).

**Verification**
1. Verificar parsing do JSON novo por getTeams()/getTeamById() sem erro de tipo em build TypeScript.
2. Confirmar que a home lista uma entrada por seleção e que o contador de itens reflete número de seleções, não de variações.
3. Validar /produto/brasil exibindo variação padrão Home 2026.
4. Validar troca de variação na página de produto (ex.: Home -> Away) atualizando imagem, título, preço, disponibilidade e mensagem de compra.
5. Confirmar generateStaticParams() gerando apenas ids de seleção e rotas estáticas válidas.
6. Executar build do Next.js para detectar regressões de tipagem/SSR e testar fluxo manual de compra no WhatsApp.

**Decisions**
- Escopo desta etapa: planejamento detalhado, sem implementação agora.
- Modelo escolhido: aninhado por seleção com variations[] (não lista plana com metadados).
- Navegação escolhida: /produto/[id] representa seleção (teamId), com escolha de variação na própria página.
- A variação selecionada será persistida em query param v (ex.: /produto/brasil?v=brasil-away-2026).
- Variação padrão será sempre a primeira posição do array variations.
- Estratégia de compatibilidade: preservar ids das variações para rastreabilidade e usar fallback de variação padrão no loader.

**Further Considerations**
1. Regras de disponibilidade: se seleção tiver Home indisponível e Away disponível, definir badge principal com base na variação ativa e não em agregação global.
