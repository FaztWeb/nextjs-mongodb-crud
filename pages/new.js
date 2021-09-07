import { useState, useEffect } from "react";
import { Button, Form, Grid, Loader } from "semantic-ui-react";

import { useRouter } from "next/router";

const NewTask = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        createTask();
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

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

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

  const createTask = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/tasks", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      router.push("/");
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
                  />
                  <Button type="submit">Save</Button>
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
