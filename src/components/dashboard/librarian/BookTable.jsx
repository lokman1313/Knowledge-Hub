"use client";

export default function BooksTable({ books }) {
  return (
    <div className="relative w-full">
      <div className="w-full bg-[#1e1e1e] border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-zinc-400">
            
            {/* TABLE HEAD */}
            <thead>
              <tr className="border-b border-zinc-800 text-xs text-zinc-500">
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
                ].map((h) => (
                  <th key={h} className="py-4 px-4 font-normal">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody className="divide-y divide-zinc-800/60">
              {books?.map((book, i) => {
                const isPublished = book.publishStatus === "published";
                const isPending = book.approvalStatus === "pending";

                return (
                  <tr key={book._id} className="hover:bg-zinc-900/40 transition">

                    <td className="py-3 px-4">
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-9 h-12 object-cover rounded border border-zinc-700"
                      />
                    </td>

                    <td className="py-3 px-4 truncate max-w-[140px] text-zinc-200">
                      {book.title}
                    </td>

                    <td className="py-3 px-4 truncate max-w-[100px]">
                      {book.author}
                    </td>

                    <td className="py-3 px-4 capitalize">{book.category}</td>
                    <td className="py-3 px-4 capitalize">{book.language}</td>
                    <td className="py-3 px-4">${book.price}</td>
                    <td className="py-3 px-4">{book.publicationYear}</td>

                    {/* Approval */}
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs border ${
                        isPending
                          ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                          : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      }`}>
                        {book.approvalStatus}
                      </span>
                    </td>

                    {/* Publish Status */}
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs border ${
                        isPublished
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
                      }`}>
                        {book.publishStatus}
                      </span>
                    </td>

                    {/* Actions (simple version) */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="px-2.5 py-1 text-xs rounded bg-zinc-700/40 border border-zinc-700">
                          Edit
                        </button>
                        <button className="px-2.5 py-1 text-xs rounded bg-red-500/10 text-red-400 border border-red-500/20">
                          Delete
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}