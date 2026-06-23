"use client";

import { useEffect, useState } from "react";
import {
  Input,
  Button,
  Chip,
  Skeleton,
  Select,
  ListBox,
  TextField,
  InputGroup,
  Pagination,
} from "@heroui/react";
import { FaSearch, FaTimes, FaBookOpen, FaFilter } from "react-icons/fa";
import BookCard from "./BookCard";
// 1. ভুল ইমপোর্ট সংশোধন (next/router এর বদলে next/navigation)
import { useRouter, useSearchParams } from "next/navigation";

const CATEGORIES = [
  "All",
  "Fiction",
  "Non-Fiction",
  "Science",
  "History",
  "Technology",
  "Romance",
  "Mystery",
  "Biography",
];

export default function BookGrid({ books , total, isLoading = false }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "All");
  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const totalItems = total;
  const itemsPerPage = 12;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

 const getPageNumbers = () => {
  if (totalPages <= 1) return [1];
  const pages = [];
  pages.push(1);
  if (page > 3) {
    pages.push("ellipsis");
  }
  const start = Math.max(2, page - 1);
  const end = Math.min(totalPages - 1, page + 1);
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  if (page < totalPages - 2) {
    pages.push("ellipsis");
  }
  pages.push(totalPages);
  return pages;
};
const startItem = (page - 1) * itemsPerPage + 1;
const endItem = Math.min(page * itemsPerPage, totalItems);


  const hasFilters = search || category !== "All";
  const clearAll = () => {
    setSearch("");
    setCategory("All");
  };

  useEffect(() => {
    const sp = new URLSearchParams();
    if (search) sp.set("search", search);
    if (category !== "All") sp.set("category", category);
    if(page){sp.set("page",page) }
    const path = `?${sp.toString()}`;
    router.push(path);
  }, [category, search, router,page]);

  return (
    <div className="min-h-screen px-4 py-10 md:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <FaBookOpen className="text-purple-400 text-2xl" />
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-serif">
            Browse Books
          </h1>
        </div>
        <p className="text-zinc-500 text-sm ml-10">
          {total} titles in the collection
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-4 mb-6">
        {/* Row 1: Search + Sort */}
        <TextField value={search} onChange={setSearch}>
          <InputGroup>
            <InputGroup.Prefix>
              <FaSearch />
            </InputGroup.Prefix>
            <InputGroup.Input
              placeholder="Search…"
              onChange={(e) => setSearch(e.target.value)} // standard HTML event
            />
            {search && (
              <InputGroup.Suffix>
                <FaTimes />
              </InputGroup.Suffix>
            )}
          </InputGroup>
        </TextField>
      </div>

      {/* Row 2: Category pills + Clear */}
      <div className="flex flex-wrap gap-2 items-center">
        <FaFilter className="text-zinc-600 text-xs mr-1 shrink-0" />
        {CATEGORIES.map((cat) => (
          <Chip
            key={cat}
            variant={category === cat ? "solid" : "bordered"}
            color={category === cat ? "secondary" : "default"}
            onClick={() => setCategory(cat)}
            className={`cursor-pointer text-xs font-medium transition-all select-none ${
              category === cat
                ? "font-semibold"
                : "text-zinc-400 border-zinc-700 hover:border-zinc-500 hover:text-zinc-200"
            }`}
          >
            {cat}
          </Chip>
        ))}
        {hasFilters && (
          <Button
            size="sm"
            variant="light"
            color="danger"
            startContent={<FaTimes className="text-xs" />}
            onPress={clearAll}
            className="text-xs ml-auto"
          >
            Clear all
          </Button>
        )}
      </div>

      {/* Result count */}
      <p className="text-zinc-500 text-xs my-5">
        {isLoading
          ? "Loading books…"
          : `Showing ${books.length} of ${total} books`}
        {!isLoading && category !== "All" && ` · ${category}`}
        {!isLoading && search && ` · "${search}"`}
      </p>

      {/* Grid */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="bg-zinc-900 rounded-[20px] overflow-hidden">
              <Skeleton className="h-44 w-full bg-zinc-800" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-3 w-3/4 rounded-lg bg-zinc-800" />
                <Skeleton className="h-3 w-1/2 rounded-lg bg-zinc-800" />
              </div>
            </div>
          ))}
        </div>
      ) : books.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {books.map((book, i) => (
            <BookCard key={book._id || book.id || i} book={book} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
          <FaBookOpen className="text-6xl text-zinc-700" />
          <p className="text-zinc-400 text-base">
            No books match your filters.
          </p>
          {hasFilters && (
            <Button
              color="secondary"
              variant="flat"
              size="sm"
              startContent={<FaTimes />}
              onPress={clearAll}
            >
              Clear filters
            </Button>
          )}
        </div>
      )}
       <Pagination className="w-full mt-4">
      <Pagination.Summary>
        Showing {startItem}-{endItem} of {totalItems} results
      </Pagination.Summary>
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous isDisabled={page === 1} onPress={() => setPage((p) => p - 1)}>
            <Pagination.PreviousIcon />
            <span>Previous</span>
          </Pagination.Previous>
        </Pagination.Item>
        {getPageNumbers().map((p, i) =>
          p === "ellipsis" ? (
            <Pagination.Item key={`ellipsis-${i}`}>
              <Pagination.Ellipsis />
            </Pagination.Item>
          ) : (
            <Pagination.Item key={`${p}-${i}`}>
              <Pagination.Link isActive={p === page} onPress={() => setPage(p)}>
                {p}
              </Pagination.Link>
            </Pagination.Item>
          ),
        )}
        <Pagination.Item>
          <Pagination.Next isDisabled={page === totalPages} onPress={() => setPage((p) => p + 1)}>
            <span>Next</span>
            <Pagination.NextIcon />
          </Pagination.Next>
        </Pagination.Item>
      </Pagination.Content>
    </Pagination>
    </div>
  );
}
