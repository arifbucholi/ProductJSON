import { ArrowLeft, House, Search } from "lucide-react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fbfbfd] px-6">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-200/40 blur-[120px]" />

        <div className="absolute -left-24 top-24 h-60 w-60 rounded-full bg-zinc-100 blur-3xl" />

        <div className="absolute -right-24 bottom-24 h-60 w-60 rounded-full bg-zinc-100 blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        {/* Error Code */}
        <h1
          className="
            select-none
            text-[90px]
            font-black
            leading-none
            tracking-[-6px]
            text-zinc-200

            sm:text-[130px]
            md:text-[170px]
            lg:text-[220px]
          "
        >
          404
        </h1>

        {/* Heading */}
        <h2
          className="
            -mt-3
            text-3xl
            font-semibold
            tracking-tight
            text-zinc-900

            sm:text-4xl
            md:text-5xl
          "
        >
          Page not found.
        </h2>

        {/* Description */}
        <p
          className="
            mt-6
            max-w-xl
            text-base
            leading-7
            text-zinc-500

            md:text-lg
          "
        >
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
          It may have been moved, deleted, or the URL is incorrect.
        </p>

        {/* Action */}
        <div className="mt-12 flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
          <Link
            to="/"
            className="
              inline-flex
              h-14
              items-center
              justify-center
              gap-2
              rounded-full
              bg-black
              px-8
              font-medium
              text-white
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-zinc-800
              hover:shadow-xl
            "
          >
            <House size={20} />
            Back to Home
          </Link>

          <Link
            to="/products"
            className="
              inline-flex
              h-14
              items-center
              justify-center
              gap-2
              rounded-full
              border
              border-zinc-300
              bg-white
              px-8
              font-medium
              text-zinc-900
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-black
              hover:shadow-lg
            "
          >
            <Search size={20} />
            Browse Products
          </Link>
        </div>

        {/* Divider */}
        <div className="my-12 h-px w-full max-w-xs bg-zinc-200" />

        {/* Back */}
        <Link
          to="/"
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            text-zinc-500
            transition-colors
            hover:text-black
          "
        >
          <ArrowLeft size={18} />
          Return to previous page
        </Link>
      </div>
    </main>
  );
}

export default NotFound;