const ORIGEM = "https://rsalmaid.github.io";

const CORS = {
  "Access-Control-Allow-Origin": ORIGEM,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const INSTRUCOES = `Você é um assistente técnico de ergonomia e fatores humanos.
Analise uma triagem preliminar do aplicativo ErgoContexto.
Regras obrigatórias:
- Responda em português do Brasil, com linguagem técnica e objetiva.
- Não altere a pontuação, a média nem a classificação calculadas pelo aplicativo.
- Não avalie desempenho, atitude, capacidade ou culpa do trabalhador.
- Não emita diagnóstico, não declare conformidade legal e não libere a atividade.
- Use somente as informações recebidas. Se faltar informação, diga o que falta.
- Toda sugestão depende da validação do avaliador.
Responda exatamente nesta estrutura, em texto simples:
SÍNTESE: (2 a 3 frases)
PONTOS PRIORITÁRIOS: (até 3 itens, priorizando respostas 3 e depois 2)
INFORMAÇÕES PARA APROFUNDAR: (até 3 perguntas)
SUGESTÕES DE AÇÃO: (até 3 ações específicas e verificáveis)
NECESSIDADE DE AVALIAÇÃO ESPECIALIZADA: (sim ou não, com justificativa curta)`;

export default {
  async fetch(request: Request, env: any): Promise {
    const url = new URL(request.url);

    if (url.pathname === "/api/ergo") {
      if (request.method === "OPTIONS") {
        return new Response(null, {
