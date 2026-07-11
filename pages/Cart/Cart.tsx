import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";

import { useCartStore } from "../../src/store/useCartStore";
import { getCurrency } from "../../src/services/currency.services";
import { formatRupiah } from "../../src/utils/product.utils";

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
      <section className="flex min-h-[calc(100vh-64px-120px)] items-center justify-center px-6">
        <div className="max-w-md text-center">

          <ShoppingBag
            size={80}
            strokeWidth={1.5}
            className="mx-auto text-zinc-300"
          />


          <h1 className="mt-6 text-3xl font-semibold tracking-tight">
            Your Bag is Empty
          </h1>


          <p className="mt-3 text-sm text-zinc-500">
            Start adding products you like and they will appear here.
          </p>


          <button
            onClick={() => navigate("/products")}
            className="
              mt-8
              rounded-full
              bg-black
              px-8
              py-4
              text-white
              transition
              hover:scale-105 cursor-pointer
            "
          >
            Browse Products
          </button>

        </div>
      </section>
    );
  }


  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">

      {/* HEADER */}
      <button
        onClick={() => navigate("/products")}
        className="
          flex
          items-center
          gap-2
          text-sm
          text-zinc-500
          transition
          hover:text-black
        "
      >
        <ArrowLeft size={18} />
        Continue Shopping
      </button>


      <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
        Shopping Bag
      </h1>


      <p className="mt-2 text-sm text-zinc-500 sm:text-base">
        {items.length} items
      </p>



      {/* CONTENT */}
      <div className="mt-10 grid gap-8 lg:grid-cols-3">


        {/* ITEMS */}
        <div className="space-y-5 lg:col-span-2">

          {items.map((item) => (

            <div
              key={item.product.id}
              className="
                flex
                gap-4
                rounded-3xl
                border
                bg-white
                p-4
                transition
                hover:shadow-md
                sm:gap-6
                sm:p-6
              "
            >

              {/* IMAGE */}
              <div className="
                h-20
                w-20
                flex-shrink-0
                rounded-2xl
                bg-zinc-100
                p-2
                sm:h-28
                sm:w-28
              ">
                <img
                  src={item.product.thumbnail}
                  alt={item.product.title}
                  className="h-full w-full object-contain"
                />
              </div>



              {/* INFO */}
              <div className="flex flex-1 flex-col justify-between">

                <div>
                  <h2 className="line-clamp-1 text-sm font-semibold sm:text-lg">
                    {item.product.title}
                  </h2>

                  <p className="text-xs capitalize text-zinc-500 sm:text-sm">
                    {item.product.category}
                  </p>
                </div>


                <div className="mt-3 flex items-center gap-3">

                  <button
                    onClick={() => dec(item.product.id)}
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      border
                      transition
                      hover:bg-zinc-100
                    "
                  >
                    <Minus size={14}/>
                  </button>


                  <span className="min-w-[24px] text-center font-medium">
                    {item.quantity}
                  </span>


                  <button
                    onClick={() => inc(item.product.id)}
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      border
                      transition
                      hover:bg-zinc-100
                    "
                  >
                    <Plus size={14}/>
                  </button>

                </div>

              </div>



              {/* PRICE */}
              <div className="flex flex-col items-end justify-between">

                <p className="text-sm font-semibold sm:text-lg">
                  {formatRupiah(
                    item.product.price * rate * item.quantity
                  )}
                </p>


                <button
                  onClick={() => remove(item.product.id)}
                  className="
                    flex
                    items-center
                    gap-1
                    text-xs
                    text-red-500
                    transition
                    hover:text-red-700
                    sm:text-sm
                  "
                >
                  <Trash2 size={14}/>
                  Remove
                </button>

              </div>

            </div>

          ))}

        </div>



        {/* SUMMARY */}
        <div className="
          h-fit
          rounded-3xl
          border
          bg-white
          p-6
          lg:sticky
          lg:top-24
        ">

          <h2 className="text-xl font-semibold">
            Order Summary
          </h2>


          <div className="mt-6 space-y-3 text-sm">

            <div className="flex justify-between">
              <span className="text-zinc-500">
                Subtotal
              </span>

              <span>
                {formatRupiah(subtotal)}
              </span>
            </div>


            <div className="flex justify-between">
              <span className="text-zinc-500">
                Shipping
              </span>

              <span>
                Free
              </span>
            </div>


            <div className="flex justify-between">
              <span className="text-zinc-500">
                Tax
              </span>

              <span className="text-zinc-400">
                Included
              </span>
            </div>


            <div className="flex justify-between border-t pt-4 text-lg font-semibold">
              <span>
                Total
              </span>

              <span>
                {formatRupiah(subtotal)}
              </span>
            </div>

          </div>


          <button
            className="
              mt-6
              w-full
              rounded-full
              bg-black
              py-4
              text-white
              transition
              hover:scale-[1.02]
            "
          >
            Checkout
          </button>


        </div>

      </div>

    </section>
  );
}

export default Cart;