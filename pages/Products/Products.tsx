import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

import ProductCard from "../../components/ProductCard";

import { getCurrency } from "../../src/services/currency.services";
import { getProducts } from "../../src/services/product.services";
import { searchProducts } from "../../src/services/search.services";

import type { Product } from "../../src/types/product";

const LIMIT = 12;

function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  const [rate, setRate] = useState(17000);

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);

  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState("");

  const [isMobile, setIsMobile] = useState(false);

  //Pagination Mobile
  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 640);
    };

    check();

    window.addEventListener("resize", check);

    return () => {
      window.removeEventListener("resize", check);
    };
  }, []);

  const getMobilePagination = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    pages.push(1);

    if (page > 3) {
      pages.push("...");
    }

    if (page !== 1 && page !== totalPages) {
      pages.push(page);
    }

    if (page < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  // Load currency sekali
  useEffect(() => {
    const loadCurrency = async () => {
      try {
        const res = await getCurrency();

        setRate(res.rates.IDR);
      } catch (error) {
        console.error(error);
      }
    };

    loadCurrency();
  }, []);

  // Initial load
  useEffect(() => {
    const loadInitialProducts = async () => {
      try {
        setLoading(true);

        const res = await getProducts(0, LIMIT);

        setProducts(res.products);
        setTotal(res.total);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialProducts();
  }, []);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(keyword.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [keyword]);

  // Reset page ketika search berubah
  //   useEffect(() => {
  //     setPage(1);
  //   }, [search]);

  // Search + pagination
  useEffect(() => {
    if (loading) return;

    const loadProducts = async () => {
      try {
        setSearching(true);

        const skip = (page - 1) * LIMIT;

        let res;

        if (search) {
          res = await searchProducts(search, LIMIT, skip);
        } else {
          res = await getProducts(skip, LIMIT);
        }

        setProducts(res.products);
        setTotal(res.total);
      } catch (error) {
        console.error(error);
      } finally {
        setSearching(false);
      }
    };

    loadProducts();
  }, [page, search, loading]);

  const totalPages = Math.ceil(total / LIMIT);

  const getPagination = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    pages.push(1);

    if (page > 3) {
      pages.push("...");
    }

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  const pages = isMobile ? getMobilePagination() : getPagination();

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-5xl font-bold tracking-tight">Products</h1>

          <p className="mt-3 text-zinc-500">
            Discover thoughtfully curated products for your everyday life.
          </p>
        </div>

        <div className="w-full max-w-md">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
            />

            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search products..."
              className="
                w-full
                rounded-xl
                border
                border-zinc-300
                bg-white
                py-3
                pl-11
                pr-4
                outline-none
                transition
                focus:border-black
              "
            />
          </div>

          <div className="mt-2 h-5">
            {searching && (
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <div className="h-3 w-3 animate-spin rounded-full border-2 border-zinc-300 border-t-black" />
                Searching...
              </div>
            )}
          </div>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="flex h-72 items-center justify-center text-zinc-500">
          No products found.
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} rate={rate} />
          ))}
        </div>
      )}
      {totalPages > 1 && (
        <div className="mt-20 flex items-center justify-center px-4">
          <div
            className="
      flex
      max-w-full
      items-center
      gap-2
      overflow-x-auto
      rounded-2xl
      border
      border-zinc-200
      bg-white
      p-2
      shadow-sm
    "
          >
            {/* Previous */}
            <button
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page === 1}
              className="
        flex
        h-10
        w-10
        shrink-0
        items-center
        justify-center
        rounded-xl
        text-sm
        font-medium
        transition
        hover:bg-zinc-100
        disabled:pointer-events-none
        disabled:opacity-40
        cursor-pointer

        sm:h-11
        sm:w-auto
        sm:gap-2
        sm:px-4
      "
            >
              <ChevronLeft size={18} />

              <span className="hidden sm:block">Previous</span>
            </button>

            {/* Page Number */}
            <div className="flex shrink-0 items-center gap-1 sm:gap-2">
              {pages.map((item, index) =>
                item === "..." ? (
                  <span key={index} className="px-1 text-zinc-400 sm:px-2">
                    •••
                  </span>
                ) : (
                  <button
                    key={index}
                    onClick={() => setPage(item as number)}
                    className={`
              h-10
              w-10
              shrink-0
              rounded-xl
              text-sm
              font-semibold
              transition-all
              duration-300
              cursor-pointer

              sm:h-11
              sm:w-11

              ${
                page === item
                  ? "scale-105 bg-black text-white shadow-lg"
                  : "text-zinc-700 hover:bg-zinc-100"
              }
            `}
                  >
                    {item}
                  </button>
                ),
              )}
            </div>

            {/* Next */}
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page === totalPages}
              className="
        flex
        h-10
        w-10
        shrink-0
        items-center
        justify-center
        rounded-xl
        text-sm
        font-medium
        transition
        hover:bg-zinc-100
        disabled:pointer-events-none
        disabled:opacity-40
        cursor-pointer

        sm:h-11
        sm:w-auto
        sm:gap-2
        sm:px-4
      "
            >
              <span className="hidden sm:block">Next</span>

              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Products;
