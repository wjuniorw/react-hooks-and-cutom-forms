import React, { useEffect } from "react";
import "./style.css";

// import { useFormValues, Form, Input, useFormErrors } from "./hooks";

import useForm from "./hooks";

const formShape = [
  {
    name: "name",
    label: "Nome: ",
    type: "text",
    required: true,
    placeholder: "nome...",
    validations: ["required", "name"]
  },
  {
    name: "email",
    label: "Email:",
    type: "text",
    required: true,
    placeholder: "email...",
    validations: ["email", "required"]
  },
  {
    name: "password",
    type: "password",
    required: true,
    placeholder: "pass...",
    label: "Password:",
    validations: ["password", "required"]
  }
];

const initial = { name: "", email: "", password: "" };

// formConfig params...
// initial state = form state
// actions = set of functions wich validates fields { email: value => !!value.match(...)}
// messages = set of error messages { email: 'invalid email!' }
// scheme = set of input descriptions [{ name: '', type: '', ... validations: ['required']}]
const formConfig = {
  state: initial,
  actions: {},
  messages: {},
  scheme: formShape
};
export default function App() {
  const { useFormValues, Form, Input, useFormErrors } = useForm(formConfig);
  const { values, ...hook } = useFormValues(initial);
  const { errors, getErrors } = useFormErrors(values, formShape);
  useEffect(() => console.log("<===main comp. errors===>", errors), [errors]);
  return (
    <div>
      <h1>Building something cool!</h1>
      {Object.keys(values).map((it, i) => (
        <h4>
          Input value {it}: {values[it]}
        </h4>
      ))}
      <p> :-)</p>
      <Form data={formShape} values={values} {...hook} errors={errors} />
      <button onClick={() => getErrors()}> verify </button>
    </div>
  );
}
