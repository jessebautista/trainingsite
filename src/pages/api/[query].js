// src/pages/api/search.js
import swell from 'swell-js';

swell.init('jesse-swell-internal-horizon1112', 'pk_test_e8uqpwFEn8HF2l7uvxaU0qK7FjDxxmlC');

const fetchProducts = async (query = '') => {
  const response = await swell.products.list({
    search: query,
    limit: 25,
    page: 1,
  });
  return response;
};

export async function get({ request }) {
  const searchQuery = new URL(request.url).searchParams.get('query');
  const products = await fetchProducts(searchQuery);
  return new Response(JSON.stringify(products), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}