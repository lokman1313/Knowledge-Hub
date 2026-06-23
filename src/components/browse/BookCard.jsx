import { Card, Chip } from "@heroui/react";
import { FaBookOpen, FaStar, FaTag, FaUser } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const CATEGORY_STYLES = {
  Fiction:      { chip: "secondary", spine: "bg-purple-500" },
  "Non-Fiction":{ chip: "warning",   spine: "bg-amber-500"  },
  Science:      { chip: "success",   spine: "bg-teal-500"   },
  History:      { chip: "danger",    spine: "bg-red-500"    },
  Technology:   { chip: "primary",   spine: "bg-blue-500"   },
  Romance:      { chip: "danger",    spine: "bg-pink-500"   },
  Mystery:      { chip: "secondary", spine: "bg-violet-500" },
  Biography:    { chip: "success",   spine: "bg-green-500"  },
};

const DEFAULT_STYLE = { chip: "default", spine: "bg-zinc-500" };

const formatPrice = (price) => {
  if (price === 0 || price === "0") return "Free";
  return price ? `$${parseFloat(price).toFixed(2)}` : "—";
};

export default function BookCard({ book }) {
  if (!book) return null;

  const {
    title = "Unknown Title",
    author = "Unknown Author",
    category = "General",
    price,
    coverImage,
    rating,
    description,
  } = book;

  const bookId = book._id?.$oid || book._id;
  const { chip, spine } = CATEGORY_STYLES[category] || DEFAULT_STYLE;

  return (
    <Card className="relative bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-2xl overflow-hidden shadow-lg hover:shadow-black/40 hover:-translate-y-1 transition-all duration-300 group cursor-pointer p-0">

      {/* Spine */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${spine} z-10`} />

      {/* Cover */}
      <div className="relative h-44 w-full bg-zinc-800 overflow-hidden">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FaBookOpen className="text-5xl text-zinc-700" />
          </div>
        )}
        <div className="absolute top-2 right-2 z-10">
          <Chip color={chip} variant="flat" size="sm" className="text-[10px] font-semibold uppercase tracking-wide">
            {category}
          </Chip>
        </div>
      </div>

      {/* Body */}
      <div className="pl-6 pr-4 pt-3 pb-2 flex flex-col gap-1">
        <h3 className="text-zinc-100 font-semibold text-sm leading-snug line-clamp-2">{title}</h3>
        <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
          <FaUser className="text-[10px] shrink-0" />
          <span className="italic truncate">{author}</span>
        </div>
        {description && (
          <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2 mt-0.5">{description}</p>
        )}
      </div>

      {/* Footer */}
      <div className="pl-6 pr-4 py-3 flex justify-between items-center border-t border-zinc-800">
        <div className="flex items-center gap-1 text-amber-400 text-xs">
          <FaStar />
          <span className="text-zinc-400">{rating ? parseFloat(rating).toFixed(1) : "—"}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs">
            <FaTag className="text-purple-400 text-[10px]" />
            <span className="text-zinc-200 font-bold">{formatPrice(price)}</span>
          </div>
          {bookId && (
            <Link href={`/browse/${bookId}`} className="text-[11px] text-purple-400 hover:text-purple-300 font-medium transition-colors">
              Details →
            </Link>
          )}
        </div>
      </div>
    </Card>
  );
}