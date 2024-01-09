import { Readable } from 'stream'

const JSON_MIME_TYPE = 'application/json'
const HTML_MIME_TYPE = 'text/html'

interface GetJSONFromHTMLOptions {
  extractFromWebsites: boolean
}

export class JSONExtractor {
  private linksResponse: Map<string, Response> = new Map()

  constructor() {}

  async getJSONFromHtml(html: string, options?: GetJSONFromHTMLOptions): Promise<Readable | null> {
    const linksRegexp = /\b(https?|file):\/\/[-A-Za-z0-9+&@#\/%?=~_|!:,.;]+[-A-Za-z0-9+&@#\/%=~_|]/gm
    const links = Array.from(html.matchAll(linksRegexp), (match) => match[0])
    links.sort((a, b) => {
      if (a.endsWith('.json')) return 1
      if (b.endsWith('.json')) return -1
      return 0
    })

    const json = await this.extractFromLinks(links)
    if (json !== null) return json

    const extractFromWebsites = options?.extractFromWebsites ?? true
    return extractFromWebsites ? await this.extractFromWebsites(links) : null
  }

  private async extractFromLinks(links: string[]): Promise<Readable | null> {
    for (const link of links) {
      const response = this.linksResponse.has(link) ? (this.linksResponse.get(link) as Response) : await fetch(link)

      const contentType = response.headers.get('content-type')

      const isJSON = contentType !== null && contentType.includes(JSON_MIME_TYPE)
      if (isJSON && response.body) {
        return Readable.fromWeb(response.body)
      }

      this.linksResponse.set(link, response)
    }

    return null
  }

  private async extractFromWebsites(links: string[]): Promise<Readable | null> {
    for (const link of links) {
      const response = this.linksResponse.has(link) ? (this.linksResponse.get(link) as Response) : await fetch(link)
      const contentType = response.headers.get('content-type')

      const isHTML = contentType !== null && contentType.includes(HTML_MIME_TYPE)
      if (isHTML) {
        const blob = await response.blob()
        const html = await blob.text()

        return this.getJSONFromHtml(html, { extractFromWebsites: false })
      }

      this.linksResponse.set(link, response)
    }

    return null
  }
}
