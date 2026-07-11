import {
  useEffect,
  // useState
} from "react";
import { Link } from "react-router-dom";

// import { getProducts } from "../../src/services/product.services";
// import { getCurrency } from "../../src/services/currency.services";

// import type { Product } from "../../src/types/product";

// import { formatRupiah } from "../../src/utils/product.utils";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

function Home() {
  //   const [products, setProducts] = useState<Product[]>([]);
  //   const [rate, setRate] = useState(17000);
  //   const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // const [productRes, currencyRes] = await Promise.all([
        //   getProducts(0, 4),
        //   getCurrency(),
        // ]);
        // setProducts(productRes.products);
        // setRate(currencyRes.rates.IDR);
      } catch (error) {
        console.error(error);
      } finally {
        // setLoading(false);
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

          <h1 className="text-5xl font-semibold tracking-tight text-zinc-900 md:text-8xl">
            Discover
            <br />
            Premium Products.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
            Explore a thoughtfully curated collection of premium products that
            combine quality, innovation, and everyday simplicity.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            {/* <Link
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
            </Link> */}
          </div>
        </div>
      </section>
      {/* Product Gallery */}
      <section className="bg-white">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {[
            {
              id: 1,
              title: "Smartphone",
              category: "Technology",
              image:
                "https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/3.webp",
            },
            {
              id: 2,
              title: "Laptop",
              category: "Computers",
              image:
                "https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/1.webp",
            },
            {
              id: 3,
              title: "Luxury Watch",
              category: "Accessories",
              image:
                "https://cdn.dummyjson.com/product-images/mens-watches/rolex-submariner-watch/1.webp",
            },
            {
              id: 4,
              title: "Perfume",
              category: "Beauty",
              image:
                "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/1.webp",
            },
          ].map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className={`
          group
          relative
          flex
          h-[650px]
          items-center
          justify-center
          overflow-hidden
          ${product.id === 2 || product.id === 3 ? "bg-white" : "bg-zinc-950"}
        `}
            >
              <img
                src={product.image}
                alt={product.title}
                className="
            h-full
            w-full
            object-contain
            p-20
            transition
            duration-700
            group-hover:scale-110
          "
              />

              <div
                className="
            absolute
            inset-0
            flex
            items-end
            bg-gradient-to-t
            from-black
            via-transparent
            opacity-0
            transition
            duration-500
            group-hover:opacity-100
          "
              >
                <div className="p-12 text-white">
                  <p className="text-sm uppercase tracking-[0.35em] text-zinc-400">
                    {product.category}
                  </p>

                  <h3 className="mt-3 text-4xl font-semibold">
                    {product.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Customer Lifestyle Banner */}

      <section className="bg-zinc-100 py-20">
        <div className="mx-auto mb-10 max-w-7xl px-6 text-center">
          <h2 className="text-4xl font-semibold tracking-tight">
            Made for everyday moments.
          </h2>

          <p className="mt-3 text-zinc-500">
            Technology that fits seamlessly into your daily lifestyle.
          </p>
        </div>

        <div className="mx-auto max-w-8xl px-6">
          {/* Main Banner */}
          <Swiper
            modules={[Autoplay]}
            loop
            centeredSlides
            spaceBetween={24}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 1.1,
              },
              1024: {
                slidesPerView: 1.25,
              },
              1280: {
                slidesPerView: 1.35,
              },
            }}
          >
            <SwiperSlide>
              <img
                src="https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop"
                alt="Modern Workspace"
                className="h-[520px] w-full object-cover"
              />
            </SwiperSlide>

            <SwiperSlide>
              <img
                src="https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop"
                alt="Laptop Workspace"
                className="h-[520px] w-full object-cover"
              />
            </SwiperSlide>

            <SwiperSlide>
              <img
                src="https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop"
                alt="Office Desk"
                className="h-[520px] w-full object-cover"
              />
            </SwiperSlide>

            <SwiperSlide>
              <img
                src="https://images.pexels.com/photos/374074/pexels-photo-374074.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop"
                alt="Laptop Coffee"
                className="h-[520px] w-full object-cover"
              />
            </SwiperSlide>

            <SwiperSlide>
              <img
                src="https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop"
                alt="Coding Setup"
                className="h-[520px] w-full object-cover"
              />
            </SwiperSlide>

            <SwiperSlide>
              <img
                src="https://images.pexels.com/photos/1591060/pexels-photo-1591060.jpeg?auto=compress&cs=tinysrgb&w=1600&h=900&fit=crop"
                alt="Technology Workspace"
                className="h-[520px] w-full object-cover"
              />
            </SwiperSlide>
          </Swiper>

          {/* Small Banner Gallery */}
<div className="mt-8">
  <Swiper
    modules={[Autoplay]}
    loop
    spaceBetween={20}
    autoplay={{
      delay: 3000,
      disableOnInteraction: false,
    }}
    breakpoints={{
      0: {
        slidesPerView: 1.5,
      },
      640: {
        slidesPerView: 2.2,
      },
      768: {
        slidesPerView: 3,
      },
      1024: {
        slidesPerView: 4,
      },
      1280: {
        slidesPerView: 5,
      },
    }}
  >
    <SwiperSlide>
      <img
        src="https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=900&h=810&fit=crop"
        alt="Smartphone Lifestyle"
        className="h-[260px] w-full object-cover"
      />
    </SwiperSlide>

    <SwiperSlide>
      <img
        src="https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=900&h=810&fit=crop"
        alt="Laptop Setup"
        className="h-[260px] w-full object-cover"
      />
    </SwiperSlide>

    <SwiperSlide>
      <img
        src="https://images.pexels.com/photos/1036808/pexels-photo-1036808.jpeg?auto=compress&cs=tinysrgb&w=900&h=810&fit=crop"
        alt="Headphones"
        className="h-[260px] w-full object-cover"
      />
    </SwiperSlide>

    <SwiperSlide>
      <img
        src="https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=900&h=810&fit=crop"
        alt="Camera Technology"
        className="h-[260px] w-full object-cover"
      />
    </SwiperSlide>

    <SwiperSlide>
      <img
        src="https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=900&h=810&fit=crop"
        alt="Smartwatch"
        className="h-[260px] w-full object-cover"
      />
    </SwiperSlide>

    <SwiperSlide>
      <img
        src="https://images.pexels.com/photos/3945657/pexels-photo-3945657.jpeg?auto=compress&cs=tinysrgb&w=900&h=810&fit=crop"
        alt="Gaming Setup"
        className="h-[260px] w-full object-cover"
      />
    </SwiperSlide>

    <SwiperSlide>
      <img
        src="https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=900&h=810&fit=crop"
        alt="Mobile Device"
        className="h-[260px] w-full object-cover"
      />
    </SwiperSlide>

    <SwiperSlide>
      <img
        src="https://images.pexels.com/photos/129208/pexels-photo-129208.jpeg?auto=compress&cs=tinysrgb&w=900&h=810&fit=crop"
        alt="Desk Accessories"
        className="h-[260px] w-full object-cover"
      />
    </SwiperSlide>
  </Swiper>
</div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-black py-40 text-white">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <p className="text-sm uppercase tracking-[0.5em] text-zinc-500">
            Discover More
          </p>

          <h2
            className="
        mt-8
        text-5xl
        font-semibold
        tracking-tight
        md:text-8xl
      "
          >
            Find what
            <br />
            inspires you.
          </h2>

          <p
            className="
        mx-auto
        mt-8
        max-w-xl
        text-lg
        leading-8
        text-zinc-400
      "
          >
            Explore a collection of products designed to bring quality, style,
            and simplicity into your everyday life.
          </p>

          <div className="mt-12 flex justify-center gap-4">
            <Link
              to="/products"
              className="
          rounded-full
          bg-white
          px-10
          py-4
          font-medium
          text-black
          transition
          duration-300
          hover:bg-zinc-200
        "
            >
              Explore Collection
            </Link>
          </div>

          {/* Decorative Line */}

          <div className="mx-auto mt-32 h-px max-w-4xl bg-zinc-800" />

          <p className="mt-10 text-sm text-zinc-600">
            Designed by Arif Bucholi
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;
