const CORS = {
  "Access-Control-Allow-Origin": "https://rsalmaid.github.io",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const INSTRUCOES = "Você é assistente técnico de ergonomia e fatores humanos. Analise a triagem preliminar do app ErgoContexto. Regras: responda em português do Brasil, de forma técnica e objetiva; não altere pontuação, média ou classificação; não avalie desempenho, atitude, capacidade ou culpa do trabalhador; não emita diagnóstico, não declare conformidade legal e não libere a atividade; use só as informações recebidas e diga o que falta; toda sugestão depende de validação do avaliador. Responda em texto simples nesta estrutura: SÍNTESE: (2 a 3 frases) PONTOS PRIORITÁRIOS: (até 3, priorizando respostas 3 e depois 2) INFORMAÇÕES PARA APROFUNDAR: (até 3 perguntas) SUGESTÕES DE AÇÃO: (até 3 ações específicas e verificáveis) NECESSIDADE DE AVALIAÇÃO ESPECIALIZADA: (sim ou não, com justificativa curta)";

export default {
  async fetch(request: Request, env: any): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname !== "/api/ergo") {
      return env.ASSETS ? env.ASSETS.fetch(request) : new Response("Não encontrado", { status: 404 });
    }
    if (request.method === "OPTIONS") return new Response(null, { headers: CORS });
    if (request.method !== "POST") return new Response("Método não permitido", { status: 405, headers: CORS });
    try {
      const texto = await request.text();
      if (texto.length > 20000) return Response.json({ erro: "Avaliação muito longa." }, { status: 413, headers: CORS });
      const r: any = await env.AI.run("@cf/meta/llama-3.1-8b-instruct-fp8-fast", {
        messages: [
          { role: "system", content: INSTRUCOES },
          { role: "user", content: "Dados da triagem:\n" + texto },
        ],
        max_tokens: 700,
      });
      return Response.json({ analise: r.response }, { headers: CORS });
    } catch (e) {
      return Response.json({ erro: "Falha ao gerar a análise." }, { status: 500, headers: CORS });
    }
  },
};
