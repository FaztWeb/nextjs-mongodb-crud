import Link from "next/link";

export function TaskCard({ task }) {
  return (
    <Link href={`/tasks/${task._id}`}>
      <div className="bg-gray-800 p-10 text-white rounded-md hover:cursor-pointer hover:bg-gray-700">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <p className="text-slate-300">{task.description}</p>
        <p className="text-slate-400 my-2">
          <span className="mr-1">Created at:</span>
          {new Date(task.createdAt).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
}

export default TaskCard;
