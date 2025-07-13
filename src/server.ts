import qrcode from "qrcode-terminal"
import { Client, LocalAuth } from "whatsapp-web.js"
import { responderATV } from "./service/gemini.js"

class WhatsAppBot {
  private client: Client
  private targetNumber: string | undefined
  private myNumber: string | undefined

  constructor() {
    this.targetNumber = process.env.TARGET_NUMBER
    this.myNumber = process.env.MY_NUMBER

    // Configuração do cliente WhatsApp Web
    this.client = new Client({
      authStrategy: new LocalAuth({ clientId: "bot-ingles" }),
      puppeteer: {
        headless: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--disable-accelerated-2d-canvas",
          "--no-first-run",
          "--no-zygote",
          "--disable-gpu",
        ],
      },
    })

    this.initializeEvents()
  }

  private initializeEvents() {
    this.client.on("qr", (qr) => {
      qrcode.generate(qr, { small: true })
      console.log("QR Code gerado. Escaneie com o WhatsApp.")
    })

    this.client.on("ready", () => {
      console.log("Cliente WhatsApp está pronto!")
    })

    this.client.on("message", async (message) => {
      await this.handleMessage(message)
    })
  }

  private async handleMessage(message: any) {
    const from = await message.getContact()
    const chat = await message.getChat()

    if (chat.isGroup) {
      if (this.targetNumber?.split(",").includes(from.number)) {
        if (message.hasMedia) {
          const media = await message.downloadMedia()

          if (
            media.mimetype === "application/pdf" ||
            media.mimetype === "application/x-pdf" ||
            media.mimetype ===
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          ) {
            try {
              await this.client.sendMessage(
                `${this.myNumber}@c.us`,
                `✅ PDF recebido com sucesso!\r\nenviado por: *${from.pushname}*\r\n📅 data: *${new Date().toLocaleString(
                  "pt-BR"
                )}*\r\n📄arquivo: *${media.filename}*\r\n🔍 enviado para analise`
              )

              // Envia o arquivo para o Gemini
              const resposta = await responderATV(media.data)

              // Envia a resposta do Gemini de volta para o usuário
              setTimeout(
                async () => {
                  await this.client.sendMessage(
                    `${this.myNumber}@c.us`,
                    `${resposta}`
                  )
                  await this.client.sendMessage(`${this.myNumber}@c.us`, media)
                },
                1000 + Math.floor(Math.random() * 1000)
              )
            } catch (error) {
              console.error("Erro ao processar PDF:", error)
            }
          } else {
            console.log(`Arquivo recebido ${media.mimetype} não é um PDF`)
          }
        }
      }
    }
  }

  public initialize() {
    this.client.initialize()
  }
}

// Inicializa o bot
const bot = new WhatsAppBot()
bot.initialize()
