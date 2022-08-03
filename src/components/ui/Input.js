export function Input({ ...rest }) {
  return (
    <input
      className="bg-gray-100 border-2 border-gray-200 rounded-lg py-2 px-4 text-gray-700 focus:outline-none focus:border-gray-400 focus:bg-gray-200 w-full"
      {...rest}
    />
  );
}
