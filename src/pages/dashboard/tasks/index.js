import { Button, Card, Grid } from "semantic-ui-react";
import { useRouter } from "next/router";
import TaskCard from "components/TaskCard";
import { Container } from "components/ui/Container";

export default function Index({ tasks = [] }) {
  const router = useRouter();

  // Render a not task view
  if (tasks.length === 0)
    return (
      <Grid
        centered
        verticalAlign="middle"
        columns="1"
        style={{ height: "80vh" }}
      >
        <Grid.Row>
          <Grid.Column textAlign="center">
            <h1>There are no tasks yet.</h1>
            <img src="https://img.freepik.com/vector-gratis/ningun-concepto-ilustracion-datos_108061-573.jpg?size=338&ext=jpg" />
            <div>
              <Button primary onClick={() => router.push("/tasks/new")}>
                Create Task
              </Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );

  // Render a list of tasks
  return (
    <Container>
      <div className="grid grid-cols-4 gap-4">
        {tasks.map((task) => (
          <TaskCard task={task} key={task._id} />
        ))}
      </div>
    </Container>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/tasks");
  const tasks = await res.json();

  return {
    props: {
      tasks,
    },
  };
}
