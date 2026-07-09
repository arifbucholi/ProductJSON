import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";

import { useCartStore } from "../../src/store/useCartStore";
import { getCurrency } from "../../src/services/currency.services";
import { formatRupiah } from "../../src/utils/currency";

function Cart() {
  const navigate = useNavigate();

  const items = useCartStore((state) => state.items);
  const remove = useCartStore((state) => state.removeFromCart);
  const inc = useCartStore((state) => state.increaseQty);
  const dec = useCartStore((state) => state.decreaseQty);

  const [rate, setRate] = useState(17000);

  useEffect(() => {
    const loadRate = async () => {
      try {
        const res = await getCurrency();
        setRate(res.rates.IDR);
      } catch (err) {
        console.error(err);
      }
    };

    loadRate();
  }, []);

  const subtotal = items.reduce(
    (acc, item) =>
      acc + item.product.price * rate * item.quantity,
    0
  );

  /* EMPTY */
  if (items.length === 0) {
    return (
      <section className="flex min-h-screen items-center justify-center px-6">
        <div className="text-center max-w-md">
          <ShoppingBag size={80} className="mx-auto text-zinc-300" />

          <h1 className="mt-6 text-3xl font-semibold">
            Your Bag is Empty
          </h1>

          <p className="mt-3 text-zinc-500 text-sm">
            Start adding products you like and they will appear here.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="mt-8 rounded-full bg-black px-8 py-4 text-white hover:scale-105 transition"
          >
            Browse Products
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-12">

      {/* HEADER */}
      <button
        onClick={() => navigate("/products")}
        className="flex items-center gap-2 text-sm text-zinc-500 hover:text-black transition"
      >
        <ArrowLeft size={18} />
        Continue Shopping
      </button>

      <h1 className="mt-6 text-3xl sm:text-4xl font-semibold tracking-tight">
        Shopping Bag
      </h1>

      <p className="mt-2 text-zinc-500 text-sm sm:text-base">
        {items.length} items
      </p>

      {/* GRID */}
      <div className="mt-10 grid gap-8 lg:grid-cols-3">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-5">

          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex gap-4 sm:gap-6 rounded-3xl border bg-white p-4 sm:p-6 hover:shadow-md transition"
            >

              {/* IMAGE */}
              <div className="h-20 w-20 sm:h-28 sm:w-28 flex-shrink-0 rounded-2xl bg-zinc-100 p-2">
                <img
                  src={item.product.thumbnail}
                  className="h-full w-full object-contain"
                />
              </div>

              {/* INFO */}
              <div className="flex flex-1 flex-col justify-between">

                <div>
                  <h2 className="text-sm sm:text-lg font-semibold line-clamp-1">
                    {item.product.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-zinc-500 capitalize">
                    {item.product.category}
                  </p>
                </div>

                {/* QUANTITY (APPLE STYLE BUTTONS) */}
                <div className="flex items-center gap-3 mt-3">

                  <button
                    onClick={() => dec(item.product.id)}
                    className="h-9 w-9 flex items-center justify-center rounded-full border bg-white hover:bg-zinc-100 active:scale-95 transition"
                  >
                    <Minus size={14} />
                  </button>

                  <span className="min-w-[24px] text-center font-medium">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => inc(item.product.id)}
                    className="h-9 w-9 flex items-center justify-center rounded-full border bg-white hover:bg-zinc-100 active:scale-95 transition"
                  >
                    <Plus size={14} />
                  </button>

                </div>
              </div>

              {/* PRICE + REMOVE */}
              <div className="flex flex-col items-end justify-between">

                <p className="text-sm sm:text-lg font-semibold">
                  {formatRupiah(
                    item.product.price * rate * item.quantity
                  )}
                </p>

                <button
                  onClick={() => remove(item.product.id)}
                  className="flex items-center gap-1 text-xs sm:text-sm text-red-500 hover:text-red-700 transition"
                >
                  <Trash2 size={14} />
                  Remove
                </button>

              </div>
            </div>
          ))}

        </div>

        {/* RIGHT SUMMARY */}
        <div className="lg:sticky lg:top-24 h-fit rounded-3xl border bg-white p-6">

          <h2 className="text-xl font-semibold">
            Order Summary
          </h2>

          <div className="mt-6 space-y-3 text-sm">

            <div className="flex justify-between">
              <span className="text-zinc-500">Subtotal</span>
              <span>{formatRupiah(subtotal)}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-500">Shipping</span>
              <span>Free</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-500">Tax</span>
              <span className="text-zinc-400">Included</span>
            </div>

            <div className="border-t pt-4 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>{formatRupiah(subtotal)}</span>
            </div>

          </div>

          <button className="mt-6 w-full rounded-full bg-black py-4 text-white hover:scale-[1.02] transition">
            Checkout
          </button>

        </div>

      </div>
    </section>
  );
}

export default Cart;