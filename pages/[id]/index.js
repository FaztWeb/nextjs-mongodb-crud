import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Confirm, Button, Loader } from "semantic-ui-react";
import Error from "next/error";

const Task = ({ task, error }) => {
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  console.log(error);

  useEffect(() => {
    if (isDeleting) {
      deleteTask();
    }
  }, [isDeleting]);

  const deleteTask = async () => {
    const taskId = router.query.id;
    try {
      const deleted = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: "DELETE",
      });
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const open = () => setConfirm(true);
  const close = () => setConfirm(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    close();
  };

  if (error && error.statusCode)
    return <Error statusCode={error.statusCode} title={error.statusText} />;

  return (
    <div className="task-container">
      {isDeleting ? (
        <Loader active></Loader>
      ) : (
        <>
          <h1>{task.title}</h1>
          <p>{task.description}</p>
          <Button color="red" onClick={open}>
            Delete
          </Button>
        </>
      )}

      <Confirm open={confirm} onConfirm={handleDelete} onCancel={close} />
    </div>
  );
};

export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(`http://localhost:3000/api/tasks/${id}`);

  if (res.status === 200) {
    const data = await res.json();
    return {
      props: {
        task: data.task,
      },
    };
  }

  return {
    props: {
      error: {
        statusCode: res.status,
        statusText: "Invalid Id",
      },
    },
  };
}

export default Task;
