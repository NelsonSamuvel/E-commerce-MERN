const Message = ({ variant = "default", children }) => {
  const msgVariants = {
    success: "bg-green-100 text-green-800",
    error: "bg-red-100 text-red-800",
    default: "bg-blue-200 text-blue-800",
  };

  return (
    <div className="flex min-h-[80vh] justify-center items-center">
      <div className={`py-2 px-4 rounded ${msgVariants[variant]}`}>{children}</div>
    </div>
  );
};

export default Message;
