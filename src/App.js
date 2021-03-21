import React, { useEffect } from "react";
import "./style.css";

import { useFormValues, Form, Input } from "./hooks";

const formShape = [
  {
    name: "name",
    label: "Nome: ",
    type: "text",
    required: true,
    placeholder: "nome...",
    validations: []
  },
  {
    name: "email",
    label: "Email:",
    type: "text",
    required: true,
    placeholder: "email...",
    validations: ["email"]
  },
  {
    name: "password",
    type: "password",
    required: true,
    placeholder: "pass...",
    label: "pass:",
    validations: ["password"]
  }
];

const initial = { name: "", email: "", password: "" };

export default function App() {
  const { values, ...hook } = useFormValues(initial);
  return (
    <div>
      <h1>Building something cool!</h1>
      {Object.keys(values).map((it, i) => (
        <h4>
          Input value {it}: {values[it]}
        </h4>
      ))}
      <p> :-)</p>
      <Form data={formShape} values={values} {...hook} />
    </div>
  );
}
