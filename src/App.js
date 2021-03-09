import React, { useEffect } from "react";
import "./style.css";

import { useFormValues, Form, Input } from "./hooks";

const formShape = [
  { name: "nome", type: "text", required: true, placeholder: "nome..." },
  { name: "email", type: "text", required: true, placeholder: "email..." },
  {
    name: "password",
    type: "password",
    required: true,
    placeholder: "pass...",
    label: "pass:"
  }
];

const initial = { name: "" };
export default function App() {
  const { values, ...hook } = useFormValues(initial);
  useEffect(() => {
    console.log(values);
  }, [values]);
  return (
    <div>
      <h1>Building something cool!</h1>
      {Object.keys(values).map((it, i) => (
        <h4>
          Input value {it}: {values[it]}
        </h4>
      ))}
      <p> :-)</p>
      <Form data={formShape} values={values} {...hook}>
        {/* <Input {...hook} /> */}
      </Form>
    </div>
  );
}
