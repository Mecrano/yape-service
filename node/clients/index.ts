import { IOClients } from '@vtex/api'

import ChatGPTClient from './chatgpt'
import CatalogClient from './catalog'

export class Clients extends IOClients {
  public get chatgpt() {
    return this.getOrSet('chatgpt', ChatGPTClient)
  }

  public get catalog() {
    return this.getOrSet('catalog', CatalogClient)
  }
}
