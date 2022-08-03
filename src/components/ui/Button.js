export function Button({ children, ...rest }) {
  return (
    <button className="bg-indigo-500 px-3 py-2 text-white my-4 rounded-md" {...rest}>
      {children}
    </button>
  );
}
