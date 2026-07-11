import { Link } from "react-router-dom";
import { Heart, Trash2, ShoppingCart } from "lucide-react";

import { useFavoriteStore } from "../../src/store/useFavoriteStore";
import { useCartStore } from "../../src/store/useCartStore";
import { formatRupiah } from "../../src/utils/product.utils";

function FavoritePage() {
  const favorites = useFavoriteStore((state) => state.favorites);
  const removeFavorite = useFavoriteStore((state) => state.removeFavorite);

  const addToCart = useCartStore((state) => state.addToCart);

  /* EMPTY STATE */
  if (favorites.length === 0) {
    return (
      <section className="flex min-h-[calc(100vh-64px-120px)] items-center justify-center px-6">
        <div className="max-w-md text-center">
          <Heart
            size={80}
            strokeWidth={1.5}
            className="mx-auto text-zinc-300"
          />

          <h1 className="mt-6 text-3xl font-semibold tracking-tight">
            Your Favorites is Empty
          </h1>

          <p className="mt-3 text-sm text-zinc-500">
            Start adding products you like and they will appear here.
          </p>

          <Link
            to="/products"
            className="mt-8 inline-flex rounded-full bg-black px-8 py-4 text-white transition hover:scale-105 cursor-pointer"
          >
            Browse Products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">

      {/* HEADER */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="flex items-center gap-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          <Heart className="text-red-500" />
          My Favorites
        </h1>

        <span className="text-sm text-zinc-500">
          {favorites.length} items
        </span>
      </div>


      {/* FAVORITE LIST */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

        {favorites.map((product) => (
          <div
            key={product.id}
            className="
              group
              overflow-hidden
              rounded-3xl
              border
              bg-white
              transition
              hover:shadow-md
            "
          >

            {/* IMAGE */}
            <Link to={`/products/${product.id}`}>
              <div className="flex h-56 items-center justify-center bg-zinc-100 p-6">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="
                    max-h-full
                    object-contain
                    transition
                    duration-300
                    group-hover:scale-105
                  "
                />
              </div>
            </Link>


            {/* CONTENT */}
            <div className="p-5">

              <Link to={`/products/${product.id}`}>
                <h3
                  className="
                    line-clamp-2
                    text-lg
                    font-semibold
                    hover:underline
                  "
                >
                  {product.title}
                </h3>
              </Link>


              <p className="mt-1 text-sm capitalize text-zinc-500">
                {product.category}
              </p>


              <p className="mt-3 text-lg font-semibold">
                {formatRupiah(product.price * 17000)}
              </p>


              {/* ACTION */}
              <div className="mt-5 flex items-center gap-3">

                <button
                  onClick={() => addToCart(product, 1)}
                  className="
                    flex-1
                    rounded-xl
                    bg-black
                    px-4
                    py-3
                    text-sm
                    text-white
                    transition
                    hover:scale-[1.02]
                  "
                >
                  <span className="flex items-center justify-center gap-2">
                    <ShoppingCart size={16} />
                    Add to Cart
                  </span>
                </button>


                <button
                  onClick={() => removeFavorite(product.id)}
                  className="
                    rounded-xl
                    border
                    p-3
                    transition
                    hover:bg-red-500
                    hover:text-white
                  "
                >
                  <Trash2 size={18} />
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}

export default FavoritePage;