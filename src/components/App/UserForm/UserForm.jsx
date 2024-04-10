import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const UserSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "to short")
    .max(10, "to long")
    .required("this is required"),
  email: Yup.string()
    .email("must be in email format")
    .required("this is required"),
  role: Yup.string()
    .oneOf(["guest", "user", "admin"])
    .required("this is required"),
});

export default function UserForm() {
  const usernameFieldId = useId();
  const emailFieldId = useId();
  const roleFieldId = useId();

  return (
    <Formik
      initialValues={{
        username: "",
        email: "",
        role: "user",
      }}
      validationSchema={UserSchema}
      onSubmit={(values, actions) => {
        console.log(values);
        actions.resetForm();
      }}
    >
      <Form>
        <div>
          <label htmlFor={usernameFieldId}>Name:</label>
          <Field type="text" name="username" id={usernameFieldId} />
          <ErrorMessage name="username" component="span" />
        </div>

        <div>
          <label htmlFor={emailFieldId}>Email:</label>
          <Field type="email" name="email" id={emailFieldId} />
          <ErrorMessage name="email" component="span" />
        </div>

        {/* <Field as="textarea" />
              <Field type="checkbox" /> */}

        <div>
          <label htmlFor={roleFieldId}>Role:</label>
          <Field as="select" type="text" name="role" id={roleFieldId}>
            <option value="guest">Guest</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </Field>
          <ErrorMessage name="role" component="span" />
        </div>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}
