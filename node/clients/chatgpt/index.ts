import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export default class ChatGPTClient extends ExternalClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super('https://api.openai.com', ctx, {
      ...options,
      headers: {
        ...options?.headers,
        Authorization: `Bearer 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`,
      },
      timeout: 1000 * 60,
    })
  }

  public async getDescription(content: string) {
    return this.http
      .post('/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content,
          },
        ],
      })
      .then((data: any) => {
        const [choice] = data.choices

        const description: string = choice.message.content

        return description
      })
  }
}
