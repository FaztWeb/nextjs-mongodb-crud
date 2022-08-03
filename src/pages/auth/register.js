import { Button } from "components/ui/Button";
import { Input } from "components/ui/Input";
import { Label } from "components/ui/Label";
import { Formik, Form } from "formik";
import axios from "axios";
import { useRouter } from "next/router";

function Register() {
  const router = useRouter();

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: "",
          name: "",
          lastname: "",
        }}
        onSubmit={async (values, actions) => {
          try {
            const response = await axios.post("/api/auth/register", values);
            if (response.status === 200) {
              router.push("/dashboard/tasks");
            }
          } catch (error) {
            console.error(error.message);
          }

          actions.setSubmitting(false);
          actions.resetForm();
        }}
      >
        {({ handleChange }) => (
          <Form className="max-w-md bg-gray-800 p-10">
            <Label>Name</Label>
            <Input
              type="text"
              name="name"
              onChange={handleChange}
              placeholder="Enter your name"
            />

            <Label>Lastname</Label>
            <Input
              type="text"
              name="lastname"
              onChange={handleChange}
              placeholder="Enter your lastname"
            />

            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter your email"
            />

            <Label>Password</Label>
            <Input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Enter your password"
            />

            <Label>Confirm Password</Label>
            <Input
              type="password"
              name="confirmPassword"
              onChange={handleChange}
              placeholder="Confirm your password"
            />

            <div>
              <Button>Register</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Register;
