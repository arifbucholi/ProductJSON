import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Minus,
  Plus,
  ShoppingCart,
  Star,
} from "lucide-react";

import { getCurrency } from "../../src/services/currency.services";
import { getProductById } from "../../src/services/product.services";

import type { Product } from "../../src/types/product";

import { formatRupiah } from "../../src/utils/currency";
import { useCartStore } from "../../src/store/useCartStore";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [rate, setRate] = useState(17000);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");

  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);

        const [productRes, currencyRes] = await Promise.all([
          getProductById(Number(id)),
          getCurrency(),
        ]);

        setProduct(productRes);
        setSelectedImage(productRes.images[0] || productRes.thumbnail);
        setRate(currencyRes.rates.IDR);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center gap-5">
        <h1 className="text-4xl font-bold">Product Not Found</h1>
        <button
          onClick={() => navigate("/products")}
          className="rounded-xl bg-black px-6 py-3 text-white"
        >
          Back to Products
        </button>
      </div>
    );
  }

  const price = product.price * rate;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-12">
      {/* Breadcrumb */}
      <div className="mb-8 sm:mb-10 flex items-center gap-3 text-sm text-zinc-500">
        <Link
          to="/products"
          className="flex items-center gap-2 hover:text-black"
        >
          <ArrowLeft size={18} />
          Back to Products
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
        {/* IMAGE SECTION */}
        <div className="flex flex-col lg:flex-row gap-6 lg:sticky lg:top-24 h-fit">
          {/* Thumbnail */}
          <div className="flex lg:flex-col gap-3 sm:gap-4 overflow-x-auto lg:overflow-visible">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(image)}
                className={`shrink-0 group overflow-hidden rounded-2xl border-2 bg-[#f5f5f7] p-2 transition ${
                  selectedImage === image
                    ? "border-black shadow-md"
                    : "border-transparent hover:border-zinc-300"
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="h-16 w-16 sm:h-20 sm:w-20 object-contain transition group-hover:scale-105"
                />
              </button>
            ))}
          </div>

          {/* Main Image */}
          <div className="relative flex-1 overflow-hidden rounded-[24px] sm:rounded-[32px] bg-[#f5f5f7]">
            {/* Counter */}
            <div className="absolute right-4 sm:right-6 top-4 sm:top-6 z-10 rounded-full bg-white/90 px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm font-medium shadow">
              {product.images.indexOf(selectedImage) + 1} /{" "}
              {product.images.length}
            </div>

            <div className="group flex h-[320px] sm:h-[480px] lg:h-[720px] items-center justify-center p-6 sm:p-10 lg:p-16">
              <img
                src={selectedImage}
                alt={product.title}
                className="max-h-full object-contain transition-all duration-500 group-hover:scale-110"
              />
            </div>

            {/* Dot Indicator */}
            <div className="absolute bottom-5 sm:bottom-8 left-1/2 flex -translate-x-1/2 gap-2 sm:gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full transition ${
                    selectedImage === image
                      ? "bg-black"
                      : "bg-zinc-300 hover:bg-zinc-500"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* INFO SECTION */}
        <div>
          <span className="rounded-full bg-zinc-100 px-4 py-2 text-sm capitalize">
            {product.category}
          </span>

          <h1 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {product.title}
          </h1>

          <div className="mt-4 sm:mt-5 flex items-center gap-2">
            <Star size={18} className="fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{product.rating}</span>
            <span className="text-zinc-500">({product.stock} in stock)</span>
          </div>

          <h2 className="mt-6 sm:mt-8 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
            {formatRupiah(price)}
          </h2>

          <div className="mt-8">
            <h3 className="mb-2 text-lg font-semibold">Brand</h3>
            <p className="text-zinc-600">{product.brand}</p>
          </div>

          <div className="mt-6 sm:mt-8">
            <h3 className="mb-2 text-lg font-semibold">Description</h3>
            <p className="leading-7 sm:leading-8 text-zinc-600">
              {product.description}
            </p>
          </div>

          {/* QUANTITY */}
          <div className="mt-8 sm:mt-10">
            <h3 className="mb-4 font-semibold">Quantity</h3>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-11 h-11 rounded-full border flex items-center justify-center hover:bg-zinc-100 transition"
              >
                <Minus size={18} />
              </button>

              <span className="text-xl font-semibold min-w-[40px] text-center">
                {quantity}
              </span>

              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-11 h-11 rounded-full border flex items-center justify-center hover:bg-zinc-100 transition"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="mt-10 sm:mt-12 flex gap-4">
            <button className="flex-1 rounded-2xl bg-black px-6 py-4 font-semibold text-white transition hover:scale-[1.02]">
              <div
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addToCart(product, quantity);
                }}
                className="flex items-center justify-center gap-3 text-sm sm:text-base"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </div>
            </button>

            <button className="rounded-2xl border px-5 transition hover:bg-red-500 hover:text-white">
              <Heart size={22} />
            </button>
          </div>

          {/* INFO GRID */}
          <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-zinc-100 p-5">
              <p className="text-sm text-zinc-500">Brand</p>
              <p className="mt-2 font-semibold">{product.brand}</p>
            </div>

            <div className="rounded-2xl bg-zinc-100 p-5">
              <p className="text-sm text-zinc-500">Category</p>
              <p className="mt-2 font-semibold capitalize">
                {product.category}
              </p>
            </div>

            <div className="rounded-2xl bg-zinc-100 p-5">
              <p className="text-sm text-zinc-500">Stock</p>
              <p className="mt-2 font-semibold">{product.stock}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;