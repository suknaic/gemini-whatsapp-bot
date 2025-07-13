import { GoogleGenAI } from "@google/genai"

const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
})

const model = "gemini-2.5-flash"

export async function responderATV(pdf: any) {
  const resolvepdf =
    `Analise cuidadosamente este documento PDF e siga as instruções abaixo:
- Verifique se o conteúdo possui atividades, tarefas ou exercícios (como questões objetivas, dissertativas, tabelas incompletas ou comandos para preenchimento).
- Detecte automaticamente o idioma predominante das instruções. Responda os cabeçalhos em português do Brasil, e comandos no mesmo idioma das atividades.
- Se houver múltiplos idiomas, selecione o idioma mais utilizado nas instruções e siga o mesmo padrão: comandos nesse idioma e cabeçalhos em português do Brasil.
- Resolva todas as atividades com clareza, precisão e objetividade.
- Organize as respostas numerando as questões e agrupando por tipo ou tópico, se necessário.
- Caso não haja atividades no documento, envie apenas: "Nenhuma atividade foi detectada neste documento PDF." Retorno deve conter somente as respostas, organizadas de forma simples e clara para encaminhamento via WhatsApp.
`.trim()

  // Leia e codifique o PDF em base64
  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: resolvepdf,
      },
      {
        inlineData: {
          mimeType: "application/pdf",
          data: pdf,
        },
      },
    ],
  })
  if (!response.text) {
    throw new Error("Failed to transcrever pdf")
  }

  return response.text
}
