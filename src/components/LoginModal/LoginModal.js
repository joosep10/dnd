export const LoginModal = ({ closeClick }) => {
  return (
    <div className="fade fixed top-0 left-0 z-50 h-full w-full overflow-y-auto overflow-x-hidden bg-gray-300/50 p-10 outline-none">
      <div className="mx-auto max-w-lg overflow-hidden rounded-md bg-white ">
        <header className="flex h-10 w-full items-center bg-gray-50">
          <svg
            onClick={closeClick}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6 stroke-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </header>
        <body className="bg-white ">
          <form action="" className="p-6">
            <label class="block">
              <span class="block text-sm font-medium text-slate-700">
                Username
              </span>
              <input
                type="email"
                class="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm
      invalid:border-pink-500 invalid:text-pink-600 focus:border-sky-500 focus:outline-none
      focus:ring-1 focus:ring-sky-500 focus:invalid:border-pink-500 focus:invalid:ring-pink-500
      disabled:border-slate-200 disabled:bg-slate-50
      disabled:text-slate-500 disabled:shadow-none
    "
              />
            </label>
          </form>
        </body>
      </div>
    </div>
  );
};
