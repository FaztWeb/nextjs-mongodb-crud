import { useState, useEffect } from "react";
import { Button, Form, Loader } from "semantic-ui-react";

import { useRouter } from "next/router";

const EditTask = ({ task }) => {
  const [form, setForm] = useState({
    title: task.title,
    description: task.description,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        updateTask();
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let errs = validate();
    setErrors(errs);
    setIsSubmitting(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let err = {};
    if (!form.title) {
      err.title = "Title is required";
    }
    if (!form.description) {
      err.description = "Description is required";
    }

    return err;
  };

  const updateTask = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/tasks/${router.query.id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h1>Create Task</h1>
      <div>
        {isSubmitting ? (
          <Loader active inline="centered" />
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Input
              error={
                errors.title
                  ? { content: "Please enter a title", pointing: "below" }
                  : null
              }
              label="Title"
              placeholder="Title"
              name="title"
              onChange={handleChange}
              value={form.title}
            />
            <Form.TextArea
              error={
                errors.description
                  ? { content: "Please enter a Description", pointing: "below" }
                  : null
              }
              label="Description"
              placeholder="Description"
              name="description"
              onChange={handleChange}
              value={form.description}
            />
            <Button type="submit">Create</Button>
          </Form>
        )}
      </div>
    </div>
  );
};

export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(`http://localhost:3000/api/tasks/${id}`);
  const task = await res.json();

  return {
    props: {
      task,
    },
  };
}

export default EditTask;
