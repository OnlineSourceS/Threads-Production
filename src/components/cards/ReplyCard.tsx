function ReplyCard({ reply }) {
  const author = reply?.author;

  return (
    <div
      key={reply._id}
      className="bg-gray-500/10 px-4 py-3 my-2 rounded-2xl shadow-md"
    >
      <div className="flex items-center space-x-3">
        <img
          src={author.image}
          alt="Profile Picture"
          className="w-7 h-7 rounded-full border-2 border-gray-600 self-start"
        />
        <div>
          <div className="flex justify-start gap-2 items-center">
            <span
              title={"Author: " + author.name}
              className="font-semibold text-gray-100 text-xs cursor-pointer hover:text-white"
            >
              {author.name}
            </span>
            <span className="text-gray-400 text-xs">
              ({reply.createdAt.toString()})
            </span>
          </div>
          <p className="text-gray-300 text-xs">{reply.threadText}</p>
        </div>
      </div>
    </div>
  );
}

export default ReplyCard;
