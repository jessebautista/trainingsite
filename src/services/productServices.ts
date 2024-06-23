// src/services/productService.ts
import swell from 'swell-js'; // Assuming swell-js is the library you are using

export async function getProductData({ params, searchParams }: PageProps): Promise<ProductProps> {
  try {
    const product = await swell.products.get(params.slug);
    let productVariant;

    if (!isEmpty(searchParams)) {
      productVariant = await swell.products.variation(product, searchParams);
    }

    return productVariant || product;
  } catch (error) {
    console.error('Error fetching product data:', error);
    throw error; // Re-throw to handle it in the component
  }
}
