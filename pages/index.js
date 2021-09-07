import Link from "next/link";

import { Button, Card, Container, Grid } from "semantic-ui-react";

const Index = ({ tasks }) => {
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
              <Link href="/new">
                <Button primary>Create Task</Button>
              </Link>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );

  return (
    <Container>
      <Card.Group itemsPerRow={4}>
        {tasks.map((task) => (
          <Card key={task._id}>
            <Card.Content>
              <Card.Header>
                <Link href={`/${task._id}`}>
                  <a>{task.title}</a>
                </Link>
              </Card.Header>
              <p>{task.description}</p>
            </Card.Content>
            <Card.Content extra>
              <Link href={`/${task._id}`}>
                <Button primary>View</Button>
              </Link>
              <Link href={`/${task._id}/edit`}>
                <Button primary>Edit</Button>
              </Link>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
};

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/tasks");
  const { tasks } = await res.json();
  return {
    props: {
      tasks,
    },
  };
}

export default Index;
