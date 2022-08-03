import { Button } from "./ui/Button";
import Link from "next/link";
import { useRouter } from "next/router";

export function TaskCard({ task }) {
  const router = useRouter();

  return (
    <div className="bg-gray-800 p-10 text-white rounded-md">
      <Link href={`/${task._id}`}>
        <h1 className="text-xl font-bold">{task.title}</h1>
      </Link>
      <p>{task.description}</p>
      <Button onClick={() => router.push(`/tasks/${task._id}`)}>View</Button>
      <Button onClick={() => router.push(`/tasks/${task._id}/edit`)}>
        Edit
      </Button>
    </div>
  );
}

export default TaskCard;
