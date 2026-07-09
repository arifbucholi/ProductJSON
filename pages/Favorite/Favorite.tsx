import { Link } from "react-router-dom";
import { Heart, Trash2, ShoppingCart } from "lucide-react";

import { useFavoriteStore } from "../../src/store/useFavoriteStore";
import { useCartStore } from "../../src/store/useCartStore";
import { formatRupiah } from "../../src/utils/currency";

function FavoritePage() {
  const favorites = useFavoriteStore((state) => state.favorites);
  const removeFavorite = useFavoriteStore((state) => state.removeFavorite);

  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
          <Heart className="text-red-500" />
          My Favorites
        </h1>

        <span className="text-sm text-zinc-500">
          {favorites.length} items
        </span>
      </div>

      {/* Empty State */}
      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Heart size={60} className="text-zinc-300" />
          <h2 className="mt-4 text-xl font-semibold">No favorites yet</h2>
          <p className="text-zinc-500 mt-2">
            Start adding products you like ❤️
          </p>

          <Link
            to="/products"
            className="mt-6 rounded-xl bg-black px-6 py-3 text-white"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((product) => (
            <div
              key={product.id}
              className="group rounded-2xl border bg-white overflow-hidden hover:shadow-md transition"
            >
              {/* IMAGE */}
              <Link to={`/products/${product.id}`}>
                <div className="h-56 bg-zinc-100 flex items-center justify-center p-6">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="max-h-full object-contain group-hover:scale-105 transition"
                  />
                </div>
              </Link>

              {/* CONTENT */}
              <div className="p-5">
                <Link to={`/products/${product.id}`}>
                  <h3 className="font-semibold text-lg line-clamp-2 hover:underline">
                    {product.title}
                  </h3>
                </Link>

                <p className="text-sm text-zinc-500 mt-1 capitalize">
                  {product.category}
                </p>

                <p className="mt-3 font-bold text-lg">
                  {formatRupiah(product.price * 17000)}
                </p>

                {/* ACTIONS */}
                <div className="mt-5 flex items-center gap-3">
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-black px-4 py-2 text-white text-sm hover:scale-[1.02] transition"
                  >
                    <ShoppingCart size={16} />
                    Add to Cart
                  </button>

                  <button
                    onClick={() => removeFavorite(product.id)}
                    className="rounded-xl border p-2 hover:bg-red-500 hover:text-white transition"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default FavoritePage;