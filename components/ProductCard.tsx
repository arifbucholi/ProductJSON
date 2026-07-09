import { Heart, ShoppingCart, Star } from "lucide-react";
import type { Product } from "../src/types/product";
import { formatRupiah } from "../src/utils/currency";
import { Link } from "react-router-dom";
import { useCartStore } from "../src/store/useCartStore";
import { useFavoriteStore } from "../src/store/useFavoriteStore";

interface Props {
  product: Product;
  rate: number;
}

function ProductCard({ product, rate }: Props) {
  const addToCart = useCartStore((state) => state.addToCart);
  const addFavorites = useFavoriteStore((state) => state.toggleFavorite);
//   console.log("STORE READY", addToCart);

  return (
    <div className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* LINK AREA (hanya untuk detail page) */}
      <Link to={`/products/${product.id}`} className="block">
        <div className="overflow-hidden bg-zinc-100 p-6">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-64 w-full object-contain transition duration-500 group-hover:scale-105"
          />
        </div>

        <div className="space-y-4 p-6">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium capitalize">
              {product.category}
            </span>

            <div className="flex items-center gap-1">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <span className="text-sm">{product.rating}</span>
            </div>
          </div>

          <h2 className="line-clamp-1 text-xl font-semibold">
            {product.title}
          </h2>

          <p className="line-clamp-2 text-sm text-zinc-500">
            {product.description}
          </p>

          <h3 className="text-2xl font-bold">
            {formatRupiah(product.price * rate)}
          </h3>
        </div>
      </Link>

      {/* ACTION BUTTONS (di luar Link biar tidak redirect) */}
      <div className="flex justify-between px-6 pb-6 pt-2">
        <button onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addFavorites(product);
        }} className="rounded-full border p-3 transition hover:bg-red-500 hover:text-white">
          <Heart size={18} />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToCart(product, 1);
          }}
          className="rounded-full bg-black p-3 text-white transition hover:scale-110"
        >
          <ShoppingCart size={18} />
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
