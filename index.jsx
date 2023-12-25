import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Input from "./Input";
import List from "./List";
import Footer from "./footer";

function Todo({ title }) {
  const getInitialTodo = () => {
    const storedTodo = localStorage.getItem("todo");
    return storedTodo ? JSON.parse(storedTodo) : [];
  };

  const [form, setForm] = useState(getInitialTodo);

  useEffect(() => {
    console.log(form);
    localStorage.setItem("todo", JSON.stringify(form));
  }, [form]);

  return (
    <main>
      <section className="todoapp">
        <header className="header">
          <h1>{title}</h1>
          <Input todo={form} setTodo={setForm} />
        </header>
        {form.length > 0 ? (
          <div>
            <List todo={form} setTodo={setForm} />
            <Footer todo={form} setTodo={setForm} />
          </div>
        ) : (
          <div className="alert">
            <p>Lütfen todo girin</p>
            <br />
          </div>
        )}
      </section>
    </main>
  );
}

Todo.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Todo;
