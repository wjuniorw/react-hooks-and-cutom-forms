import React, { useState, useEffect, Fragment } from "react";

const useFormValues = initial => {
  const [values, setValues] = useState(initial);

  const onChange = ({ target }) => {
    const { name, value } = target;
    setValues({ ...values, [name]: value });
  };
  return {
    values,
    onChange
  };
};

const Input = props => {
  return (
    <div style={styles.inputContainner}>
      {props.label && <label for={`${props.name}`}> {props.label} </label>}
      <input id={props.name} {...props} style={styles.input} />
    </div>
  );
};

const Form = ({ data, submit, values, onChange }) => {
  // const { values, ...hook } = useFormValues({});
  return (
    <form>
      {data.map((it, i) => {
        return (
          <Input
            {...it}
            onChange={e => onChange(e)}
            value={values[it.name]}
            key={i}
          />
        );
      })}
    </form>
  );
};

const styles = {
  input: {
    height: "20px",
    marginTop: "5px",
    borderRadius: "5px",
    border: "solid",
    borderWidth: "2px"
  },
  error: { border: "solid", borderWidth: "2px", borderColor: "#ff0000" },
  inputContainner: {}
};

export { useFormValues, Form, Input };
