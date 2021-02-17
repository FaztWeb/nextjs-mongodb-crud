import Link from "next/link";

import { Button, Card } from "semantic-ui-react";

const Index = ({ tasks }) => {
  return (
    <div className="tasks-container">
      <h1>Tasks</h1>

      <div className="grid wrapper">
        {tasks.map((task) => (
          <div key={task._id}>
            <Card>
              <Card.Content>
                <Card.Header>
                  <Link href={`/${task._id}`}>
                    <a>{task.title}</a>
                  </Link>
                </Card.Header>
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
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/tasks");
  const data = await res.json();
  return {
    props: {
      tasks: data.tasks,
    },
  };
}

export default Index;
