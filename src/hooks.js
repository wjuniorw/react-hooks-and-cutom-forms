import React, { useState, useEffect, Fragment } from "react";

const Input = props => {
  const { errors } = props;
  return (
    <div style={styles.inputContainner}>
      {props.label && <label for={`${props.name}`}> {props.label} </label>}
      <input
        id={props.name}
        {...props}
        style={{ ...(!!errors ? styles.input_error : styles.input) }}
      />
      {errors &&
        Object.values(errors).map((it, i) => (
          <strong style={{ color: "red" }} key={i}>
            {" "}
            * {it}
          </strong>
        ))}
    </div>
  );
};

const Form = ({ data, submit, values, onChange, errors }) => {
  return (
    <form>
      {data.map((it, i) => {
        return (
          <Input
            {...it}
            onChange={e => onChange(e)}
            value={values[it.name]}
            errors={errors[it.name]}
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
    borderWidth: "2px",
    borderColor: "#000000"
  },
  input_error: {
    height: "20px",
    marginTop: "5px",
    borderRadius: "5px",
    border: "solid",
    borderWidth: "2px",
    borderColor: "#ff0000"
  },
  inputContainner: {}
};

export { useFormValues, useFormErrors, Form, Input };

const main = ({ state, actions, messages, scheme }) => {
  // manage state of form...
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

  // actions validations...
  const validationErrors = {
    required: value => !!value,
    email: email => {
      const valid = !!email.match(
        /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
      );
      return valid;
    },
    name: value => {
      const valid = value.split(" ").length > 1;
      return valid;
    },
    password: value => {
      const valid = value.length < 8;
      return !valid;
    },
    ...actions
  };

  // errors error essages
  const errorMessages = {
    required: "campo Obrigatorio!",
    email: "email invalido!",
    name: "digite seu nome completo!",
    password: "senha invalida!",
    ...messages
  };

  // error handling...

  const useFormErrors = (state, scheme) => {
    const [errors, setErrors] = useState({});

    const getErrors = () => {
      const fields = Object.keys(state);
      const objects = fields.reduce((acc, it) => {
        const val = state[it];
        let item = { ...acc };
        const { validations } = scheme.find(f => f.name === it);

        validations.forEach(v => {
          const valid = validationErrors[v](val);
          if (!valid) {
            item = { ...item, [it]: { ...acc[it], [v]: errorMessages[v] } };
          }
        });
        return item;
      }, {});
      console.log("<======getErrors objects====>", objects);
      setErrors(prev => ({ ...objects }));
    };

    return {
      errors,
      getErrors
    };
  };

  return { useFormValues, useFormErrors, Form, Input };
};

export default main;
