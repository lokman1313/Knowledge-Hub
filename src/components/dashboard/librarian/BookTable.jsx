"use client";

import { publishBook, unpublishBook } from "@/lib/action/books";
import { Button } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function BooksTable({ books }) {
  const router = useRouter();

  const handelPublish = async (id) => {
    try {
      const payload = { publishStatus: "published" };
      const res = await publishBook(payload, id);

      if (res) {
        toast.success("Your book has been published successfully");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to publish book");
    }
  };

  const handelUnPublish = async (id) => {
    try {
      const payload = { publishStatus: "unpublished" };
      const res = await unpublishBook(payload, id);

      if (res) {
        toast.warning("Book unpublished successfully");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to unpublish book");
    }
  };

  const approvalStyles = {
    approved:
      "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    pending:
      "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    rejected: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-2xl border border-zinc-800  shadow-xl">
        <div className="overflow-x-auto">
          <table className="min-w-[1100px] w-full text-left text-sm ">
            {/* Header */}
            <thead className="bg-zinc-900/50">
              <tr className="border-b border-zinc-800 text-xs uppercase tracking-wider ">
                {[
                  "Cover",
                  "Title",
                  "Author",
                  "Category",
                  "Language",
                  "Price",
                  "Year",
                  "Approval",
                  "Status",
                  "Actions",
                ].map((item) => (
                  <th key={item} className="px-4 py-4 font-medium">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Body */}
            <tbody className="divide-y divide-zinc-800/60">
              {books?.length > 0 ? (
                books.map((book) => {
                  const isPublished =
                    book.publishStatus === "published";

                  return (
                    <tr
                      key={book._id}
                      className="transition hover:bg-zinc-900/40"
                    >
                      {/* Cover */}
                      <td className="px-4 py-3">
                        <Image
                          src={book.coverImage}
                          alt={book.title}
                          width={70}
                          height={90}
                          className="h-14 w-10 rounded-md border border-zinc-700 object-cover"
                        />
                      </td>

                      {/* Title */}
                      <td className="px-4 py-3 max-w-[220px]">
                        <p className="truncate font-medium ">
                          {book.title}
                        </p>
                      </td>

                      {/* Author */}
                      <td className="px-4 py-3 max-w-[160px]">
                        <p className="truncate">{book.author}</p>
                      </td>

                      {/* Category */}
                      <td className="px-4 py-3 capitalize">
                        {book.category}
                      </td>

                      {/* Language */}
                      <td className="px-4 py-3 capitalize">
                        {book.language}
                      </td>

                      {/* Price */}
                      <td className="px-4 py-3 font-medium ">
                        ${book.price}
                      </td>

                      {/* Year */}
                      <td className="px-4 py-3">
                        {book.publicationYear}
                      </td>

                      {/* Approval Status */}
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-medium ${
                            approvalStyles[
                              book.approvalStatus
                            ] ||
                            "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
                          }`}
                        >
                          {book.approvalStatus}
                        </span>
                      </td>

                      {/* Publish Status */}
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-medium ${
                            isPublished
                              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              : "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
                          }`}
                        >
                          {book.publishStatus}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-2">
                          {isPublished ? (
                            <Button
                              size="sm"
                              onClick={() =>
                                handelUnPublish(book._id)
                              }
                              className="border border-red-500/20 bg-red-500/10 text-red-400"
                            >
                              Unpublish
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              onClick={() =>
                                handelPublish(book._id)
                              }
                              disabled={
                                book.approvalStatus !== "approved"
                              }
                              className="border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              Publish
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={10}
                    className="py-12 text-center "
                  >
                    No books found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}