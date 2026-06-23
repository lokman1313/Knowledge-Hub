import { getBookDeteils } from "@/lib/apis/books";
import Link from "next/link";

const BookDetailsPage = async ({ params }) => {
  const { id } = await params;
  const book = await getBookDeteils(id);

  if (!book) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-medium text-gray-800">Book not found</h1>
        <Link href="/browse" className="text-blue-600 hover:underline mt-4 inline-block">
          ← Back to browse
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">

      {/* Back link */}
      <Link href="/browse?page=1" className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-6">
        ← Back to browse
      </Link>

      {/* Top row — cover + title */}
      <div className="flex gap-6 mb-6">
        <div className="w-36 h-52 min-w-[144px] rounded-lg bg-purple-100 flex items-center justify-center border border-gray-200">
          {book.coverImage ? (
            <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover rounded-lg" />
          ) : (
            <span className="text-4xl text-purple-400">📖</span>
          )}
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-green-100 text-green-700">
              ✓ {book.approvalStatus}
            </span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-100 text-blue-700">
              {book.category}
            </span>
          </div>

          <h1 className="text-2xl font-medium mb-1">{book.title}</h1>
          <p className="text-gray-500 mb-4">{book.author}</p>
        </div>
      </div>

      {/* Description */}
      {book.description && (
        <div className="border border-gray-200 rounded-xl p-5 mb-4">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">About this book</p>
          <p className="text-gray-700 leading-relaxed">{book.description}</p>
        </div>
      )}

      {/* Metadata */}
      <div className="border border-gray-200 rounded-xl p-5">
        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-2">Details</p>
        {[
          { label: "Category",  value: book.category },
          { label: "Author",    value: book.author },
          { label: "Publisher", value: book.publisher },
          { label: "Published", value: book.publishedDate },
          { label: "ISBN",      value: book.isbn },
          { label: "Status",    value: book.approvalStatus },
        ].map(({ label, value }) =>
          value ? (
            <div key={label} className="flex gap-2 py-2.5 border-b border-gray-100 last:border-none text-sm">
              <span className="text-gray-400 w-28 shrink-0">{label}</span>
              <span className="font-medium text-gray-800">{value}</span>
            </div>
          ) : null
        )}
      </div>

    </div>
  );
};

export default BookDetailsPage;