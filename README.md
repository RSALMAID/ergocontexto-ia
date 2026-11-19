# ErgoContexto IA

Worker da Cloudflare que gera a análise assistida por IA do app [ErgoContexto](https://github.com/RSALMAID/ergocontexto).

## Endpoint

`POST /api/ergo`: recebe o JSON da triagem (`dominios`, níveis, itens de atenção, percepção, fatores de proteção) e devolve `{ "analise": "texto" }`.

- Aceita apenas as origens `https://rsalmaid.github.io` e `localhost` (desenvolvimento).
- Limite de 20 000 caracteres por requisição.
- Limite de uso de 10 análises por minuto por IP (binding `LIMITER` em `wrangler.jsonc`; se o binding não existir, o limite é ignorado).
- Modelo: `@cf/meta/llama-3.3-70b-instruct-fp8-fast`.
- A IA só comenta: não altera pontuação, nível nem prioridade, não avalia o trabalhador e não declara conformidade legal.

## Comandos

```bash
npm install
npm run dev      # servidor local em http://localhost:8787
npm run check    # tsc + deploy --dry-run
npm run deploy
```

Workers AI cobra uso mesmo em desenvolvimento local.

## Ajustes comuns

- Trocar o modelo: constante `MODELO` em `src/index.ts`.
- Mudar o comportamento da análise: constante `INSTRUCOES` em `src/index.ts`.
- Liberar outro domínio de front-end: lista `ORIGENS_PERMITIDAS`.
- A pasta `public/` é a interface de chat do template original e não é usada pelo app.
