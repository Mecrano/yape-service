import { json } from 'co-body'

export async function getDescriptionGPT(
  ctx: Context,
  next: () => Promise<void>
) {
  const { req, clients } = ctx

  const body = await json(req)

  const product = await clients.catalog.getProductById(body.productId)

  const TEMPLATE = `Actúa como si fueras un experto en copywriter, experto en marketing digital y un experto en comercio electrónico, quiero que me generes la mejor descripción  para el producto llamado "${product?.Name}", el texto debe estar optimizado para SEO web y debe ser lo mas amigable posible para los clientes de nuestro ecommerce, usa un tono serio pero amistoso, la descripción debe tener un máximo de 200 caracteres`

  const description = await clients.chatgpt.getDescription(TEMPLATE)

  ctx.state.description = description
  ctx.state.product = product

  await next()
}

export async function setDescriptionCatalog(
  ctx: Context,
  next: () => Promise<void>
) {
  const { clients } = ctx

  const { description, product } = ctx.state

  const newProduct = {
    ...product,
    Description: description,
  }

  const response = await clients.catalog.updateProductById(
    product.Id,
    newProduct
  )

  ctx.status = 200
  ctx.body = response

  await next()
}
