"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const NewTask = () => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });
  const params = useParams();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const getTask = async () => {
    const res = await fetch(`/api/tasks/${params.id}`);
    const data = await res.json();
    setNewTask({ title: data.title, description: data.description });
  };

  useEffect(() => {
    if (params.id) {
      getTask();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errs = validate();

    if (Object.keys(errs).length) return setErrors(errs);

    setIsSubmitting(true);

    if (params.id) {
      await updateTask();
    } else {
      await createTask();
    }

    router.push("/");
  };

  const handleChange = (e) =>
    setNewTask({ ...newTask, [e.target.name]: e.target.value });

  const validate = () => {
    let errors = {};

    if (!newTask.title) {
      errors.title = "Title is required";
    }
    if (!newTask.description) {
      errors.description = "Description is required";
    }

    return errors;
  };

  const createTask = async () => {
    try {
      await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        const res = await fetch(`/api/tasks/${params.id}`, {
          method: "DELETE",
        });
        router.push("/");
        router.refresh();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const updateTask = async () => {
    try {
      await fetch(`/api/tasks/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-7rem)] flex justify-center items-center">
      <form onSubmit={handleSubmit}>
        <header className="flex justify-between">
          <h1 className="font-bold text-3xl">
            {!params.id ? "Create Task" : "Update task"}
          </h1>
          {params.id && (
            <button
              className="bg-red-500 px-3 py-1 rounded-md"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
        </header>
        <input
          type="text"
          placeholder="Task title"
          name="title"
          onChange={handleChange}
          value={newTask.title}
          autoFocus
          className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4"
        />

        <textarea
          name="description"
          placeholder="Task description"
          onChange={handleChange}
          value={newTask.description}
          className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4"
          rows={3}
        ></textarea>

        <button className="bg-green-600 text-white font-semibold px-8 py-2 rounded-lg">
          {params.id ? "Update" : "Save"}
        </button>
      </form>
    </div>
  );
};

export default NewTask;
