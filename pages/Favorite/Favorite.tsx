import { Link } from "react-router-dom";
import { Heart, Trash2, ShoppingCart } from "lucide-react";

import { useFavoriteStore } from "../../src/store/useFavoriteStore";
import { useCartStore } from "../../src/store/useCartStore";
import { formatRupiah } from "../../src/utils/product.utils";
import { toast } from "sonner";
import { getProductById } from "../../src/services/product.services";

function FavoritePage() {
  const favorites = useFavoriteStore((state) => state.favorites);
  const removeFavorite = useFavoriteStore((state) => state.removeFavorite);

  const addToCart = useCartStore((state) => state.addToCart);

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
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Favorites
      </h1>

      <p className="mt-2 text-sm text-zinc-500 sm:text-base">
        {favorites.length} items
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {favorites.map((product) => (
          <div
            key={product.id}
            className="
              group
              overflow-hidden
              rounded-3xl
              border
              border-zinc-200
              bg-white
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-2xl
            "
          >
            <Link to={`/products/${product.id}`}>
              <div className="overflow-hidden bg-zinc-100 p-6">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="
                    h-64
                    w-full
                    object-contain
                    transition
                    duration-500
                    group-hover:scale-105
                  "
                />
              </div>
            </Link>

            <div className="space-y-4 p-6">
              <Link to={`/products/${product.id}`}>
                <h2 className="line-clamp-1 text-xl font-semibold">
                  {product.title}
                </h2>
              </Link>

              <p className="text-sm capitalize text-zinc-500">
                {product.category}
              </p>

              <p className="text-xl font-bold">
                {formatRupiah(product.price * 17000)}
              </p>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={async () => {
                    const apiProduct = await getProductById(product.id);

                    const qty = apiProduct.minimumOrderQuantity ?? 1;

                    addToCart(apiProduct, qty);

                    toast.success("Added to cart", {
                      description: `${apiProduct.title} (${qty} pcs)`,
                    });
                  }}
                  className="
                    flex-1
                    rounded-xl
                    bg-black
                    border
                    px-4
                    py-3
                    text-sm
                    text-white
                    transition
                    cursor-pointer
                    hover:bg-white
                    hover:text-black
                  "
                >
                  <span className="flex items-center justify-center gap-2">
                    <ShoppingCart size={16} />
                    Add to Cart
                  </span>
                </button>

                <button
                  onClick={() => {
                    removeFavorite(product.id);

                    toast.success("Removed from favorite", {
                      description: product.title,
                    });
                  }}
                  className="
                    rounded-xl
                    border
                    p-3
                    transition
                    cursor-pointer
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
