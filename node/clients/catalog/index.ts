import type { InstanceOptions, IOContext } from '@vtex/api'
import { JanusClient } from '@vtex/api'

export default class CatalogClient extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
      headers: {
        ...options?.headers,
        VtexIdclientAutCookie: ctx.authToken,
      },
    })
  }

  /**
   * getProductById
   */
  public getProductById(productId: number) {
    return this.http.get(`/api/catalog/pvt/product/${productId}`)
  }

  /**
   * updateProductById
   */
  public updateProductById(productId: number, newProduct: any) {
    return this.http.put(`/api/catalog/pvt/product/${productId}`, newProduct)
  }
}
