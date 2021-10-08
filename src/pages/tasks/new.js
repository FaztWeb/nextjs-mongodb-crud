import { useState, useEffect } from "react";
import { Button, Form, Grid, Loader } from "semantic-ui-react";

import { useRouter } from "next/router";

const NewTask = () => {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });
  const { query, push } = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const getTask = async () => {
    const res = await fetch("http://localhost:3000/api/tasks/" + query.id);
    const data = await res.json();
    setNewTask({ title: data.title, description: data.description });
  };

  useEffect(() => {
    if (query.id) getTask();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errs = validate();

    if (Object.keys(errs).length) return setErrors(errs);

    setIsSubmitting(true);

    if (query.id) {
      await updateTask();
    } else {
      await createTask();
    }

    await push("/");
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
      await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async () => {
    try {
      await fetch("http://localhost:3000/api/tasks/" + query.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns="3"
      style={{ height: "80vh" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <div className="form-container">
            <h1>{!query.id ? "Create Task" : "Update task"}</h1>
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
                    value={newTask.title}
                    autoFocus
                  />
                  <Form.TextArea
                    error={
                      errors.description
                        ? {
                            content: "Please enter a Description",
                            pointing: "below",
                          }
                        : null
                    }
                    label="Description"
                    placeholder="Description"
                    name="description"
                    onChange={handleChange}
                    value={newTask.description}
                  />
                  <Button type="submit" primary>
                    {query.id ? "Update" : "Save"}
                  </Button>
                </Form>
              )}
            </div>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default NewTask;
