import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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

import {
  formatRupiah,
  getDiscountedPrice,
} from "../../src/utils/product.utils";
import { useCartStore } from "../../src/store/useCartStore";

import { toast } from "sonner";

import NotFound from "../NotFound/NotFound";

function ProductDetail() {
  const { id } = useParams();

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
        setQuantity(productRes.minimumOrderQuantity);
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
      // halaman 404
      <NotFound/>
    );
  }

  const originalPrice = product.price * rate;

  const discountedPrice = getDiscountedPrice(
    originalPrice,
    product.discountPercentage,
  );

  const handleAddToCart = () => {
    if (product.stock === 0) {
      toast.error("This product is out of stock.");

      return;
    }

    if (quantity < product.minimumOrderQuantity) {
      toast.error(`Minimum order is ${product.minimumOrderQuantity} items.`);

      return;
    }

    if (quantity > product.stock) {
      toast.error(`Only ${product.stock} items available.`);

      return;
    }

    addToCart(product, quantity);

    toast.success(`${quantity} item(s) added to cart successfully.`);
  };

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
                className={`shrink-0 group overflow-hidden rounded-2xl border-2 bg-[#f5f5f7] p-2 transition cursor-pointer ${
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
          {/* Category */}
          <span className="inline-flex rounded-full bg-zinc-100 px-4 py-2 text-sm capitalize text-zinc-700">
            {product.category}
          </span>

          {/* Title */}
          <h1 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {product.title}
          </h1>

          {/* Rating */}
          <div className="mt-5 flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Star size={18} className="fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{product.rating}</span>
            </div>

            <span className="text-zinc-500">
              ({product.reviews.length} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mt-8">
            <div className="flex items-center gap-3 flex-wrap">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
                {formatRupiah(discountedPrice)}
              </h2>

              <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
                -{product.discountPercentage.toFixed(0)}%
              </span>
            </div>

            <p className="mt-2 text-lg text-zinc-400 line-through">
              {formatRupiah(originalPrice)}
            </p>
          </div>

          {/* Specification */}
          <div className="mt-8 rounded-3xl bg-zinc-50 p-6">
            <div className="grid grid-cols-2 gap-y-5">
              <div>
                <p className="text-sm text-zinc-500">Brand</p>

                <p className="mt-1 font-semibold">{product.brand}</p>
              </div>

              <div>
                <p className="text-sm text-zinc-500">Stock</p>

                <p className="mt-1 font-semibold">{product.stock} items</p>
              </div>

              <div>
                <p className="text-sm text-zinc-500">Shipping</p>

                <p className="mt-1 font-semibold">
                  {product.shippingInformation}
                </p>
              </div>

              <div>
                <p className="text-sm text-zinc-500">Warranty</p>

                <p className="mt-1 font-semibold">
                  {product.warrantyInformation}
                </p>
              </div>

              <div>
                <p className="text-sm text-zinc-500">Minimum Order</p>

                <p className="mt-1 font-semibold">
                  {product.minimumOrderQuantity} items
                </p>
              </div>

              <div>
                <p className="text-sm text-zinc-500">Status</p>

                <p
                  className={`mt-1 font-semibold ${
                    product.stock > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.availabilityStatus}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold">Description</h3>

            <p className="mt-3 leading-8 text-zinc-600">
              {product.description}
            </p>
          </div>

          {/* QUANTITY */}
          <div className="mt-8 sm:mt-10">
            <h3 className="mb-4 font-semibold">Quantity</h3>

            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  if (quantity <= product.minimumOrderQuantity) {
                    toast.error(
                      `Minimum order is ${product.minimumOrderQuantity} items`,
                    );
                    return;
                  }

                  setQuantity((q) => q - 1);
                }}
                className="w-11 h-11 rounded-full border flex items-center justify-center hover:bg-zinc-100 transition cursor-pointer"
              >
                <Minus size={18} />
              </button>

              <span className="text-xl font-semibold min-w-[40px] text-center">
                {quantity}
              </span>

              <button
                onClick={() => {
                  if (quantity >= product.stock) {
                    toast.error(`Only ${product.stock} items available`);
                    return;
                  }

                  setQuantity((q) => q + 1);
                }}
                className="w-11 h-11 rounded-full border flex items-center justify-center hover:bg-zinc-100 transition cursor-pointer"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="mt-10 sm:mt-12 flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`
                  flex-1
                  rounded-2xl
                  border
                  px-6
                  py-4
                  font-semibold
                  text-white
                  transition cursor-pointer
  
                  ${
                    product.stock === 0
                      ? "cursor-not-allowed bg-zinc-400"
                      : "bg-black hover:bg-white hover:text-black"
                  }
              `}
            >
              <div className="flex items-center justify-center gap-3">
                <ShoppingCart size={20} />

                {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
              </div>
            </button>

            <button className="rounded-2xl border px-5 transition hover:bg-red-500 hover:text-white cursor-pointer">
              <Heart size={22} />
            </button>
          </div>

          {/* INFO GRID */}
          {/* <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
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
          </div> */}
        </div>
      </div>

      {/* REVIEWS */}
      <div className="mt-14">
        <h2 className="text-2xl font-bold tracking-tight">Customer Reviews</h2>

        <p className="mt-2 text-zinc-500">
          {product.reviews.length} review
          {product.reviews.length > 1 && "s"}
        </p>

        <div className="mt-8 space-y-6">
          {product.reviews.map((review, index) => (
            <div key={index} className="rounded-3xl border border-zinc-200 p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="font-semibold text-lg">
                    {review.reviewerName}
                  </h3>

                  <p className="text-sm text-zinc-500">
                    {new Date(review.date).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-zinc-300"
                      }
                    />
                  ))}
                </div>
              </div>

              <p className="mt-5 leading-7 text-zinc-600">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;
