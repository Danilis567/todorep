import React from "react";

const List = ({ todo, setTodo }) => {
  const visibleTodo = todo.filter((item) => !item.hidden);

  const onTextChange = (e, index) => {
    const text = e.target.value; // inputtan gelen value texte aktarılır
    const newTodo = [...todo]; // yani bir arr oluşturulup todo arr tüm degerleri içine aktarılır
    newTodo[index].text = text; // yeni ve todo arr tüm degerlerini alan arrimizin texti güncellenir
    setTodo(newTodo); // üst componentend props ettigimiz setTodo ile güncellenir
  };

  const onCheckedChange = (e, index) => {
    const newTodo = [...todo]; // yani bir arr oluşturulup todo arr tüm degerleri içine aktarılır
    newTodo[index].completed = !newTodo[index].completed; // true ise false false ise true a çeker
    setTodo(newTodo); // üst componentend props ettigimiz setTodo ile güncellenir
  };

  const onDeleteTodoItem = (index) => {
    const newTodo = [...todo]; // yani bir arr oluşturulup todo arr tüm degerleri içine aktarılır
    newTodo.splice(index, 1); // splice methodu ile seçitigimz todonun indexine göre kaldırır
    setTodo(
      newTodo.map((item, index) => ({
        ...item,
        completed: item.completed,
        text: item.text,
      })) // üst componentend props etmeden önce artık gösterilmicek todoları ayıklar 
    ); // üst componentend props ettigimiz setTodo ile güncellenir
  };

  return (
    <section className="main">
      <input className="toggle-all" type="checkbox" />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list">
        {visibleTodo.map((item, index) => (
          <li key={index}>
            <div className="view">
              <input
                className="toggle"
                type="checkbox"
                checked={item.checked}
                onChange={(e) => onCheckedChange(e, index)}
              />
              <label>
                <input
                  className={`${
                    item.completed === true
                      ? "todo-item-text-complated"
                      : "todo-item-text"
                  }`} //todo true ise üstünü çizer
                  type="text"
                  value={item.text}
                  onChange={(e) => onTextChange(e, index)}
                />
              </label>

              <button
                className="destroy"
                onClick={() => onDeleteTodoItem(index)}
              ></button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default List;
