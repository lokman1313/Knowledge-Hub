import Link from "next/link";

// Stripe payment সফল হলে এই page দেখাবে
const PaymentSuccessPage = async ({ searchParams }) => {
  const { book_id } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center border border-gray-200 rounded-2xl p-10 shadow-sm">
        
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
        <p className="text-gray-500 mb-8">
          Your payment successfully complited. Thank you !
        </p>

        <div className="flex flex-col gap-3">
          {book_id && (
            <Link
              href={`/browse/${book_id}`}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition"
            >
              ← Back to Book
            </Link>
          )}
          <Link
            href="/dashboard/user"
            className="border border-gray-200 hover:bg-gray-50 font-semibold py-3 px-6 rounded-xl transition"
          >
            My Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;