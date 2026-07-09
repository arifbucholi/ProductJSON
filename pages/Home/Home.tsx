import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getProducts } from "../../src/services/product.services";
import { getCurrency } from "../../src/services/currency.services";

import type { Product } from "../../src/types/product";

import { formatRupiah } from "../../src/utils/currency";

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [rate, setRate] = useState(17000);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productRes, currencyRes] = await Promise.all([
          getProducts(0, 4),
          getCurrency(),
        ]);

        setProducts(productRes.products);
        setRate(currencyRes.rates.IDR);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-gradient-to-b from-white to-zinc-100">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-zinc-500">
            Designed by Arif Bucholi
          </p>

          <h1 className="text-5xl font-semibold tracking-tight text-zinc-900 md:text-7xl">
            Discover
            <br />
            Premium Products.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
            Explore a thoughtfully curated collection of premium products that
            combine quality, innovation, and everyday simplicity.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <Link
              to="/products"
              className="rounded-full bg-black px-8 py-3 text-white transition hover:bg-zinc-800"
            >
              Shop Now
            </Link>

            <Link
              to="/products"
              className="rounded-full border border-zinc-300 px-8 py-3 transition hover:bg-zinc-100"
            >
              Explore
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-semibold tracking-tight">
            Featured Products
          </h2>

          <p className="mt-3 text-zinc-500">
            Carefully selected products just for you.
          </p>
        </div>

        {loading ? (
          <div className="flex h-60 items-center justify-center">
            <p className="text-lg font-medium text-zinc-500">Loading...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="group rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-56 items-center justify-center rounded-2xl bg-zinc-100 p-6">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="max-h-full object-contain transition duration-300 group-hover:scale-105"
                  />
                </div>

                <h3 className="mt-6 line-clamp-2 text-xl font-medium">
                  {product.title}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm text-zinc-500">
                  {product.description}
                </p>

                <p className="mt-5 text-lg font-semibold">
                  {formatRupiah(product.price * rate)}
                </p>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-12 flex justify-center">
          <Link
            to="/products"
            className="rounded-full border border-black px-8 py-3 font-medium transition hover:bg-black hover:text-white"
          >
            View All Products
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;