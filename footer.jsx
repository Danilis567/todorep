import React, { useEffect, useState } from "react";

const Footer = ({ todo, setTodo }) => {
  // State'lerin tanımlanması
  const [visibleCount, setVisibleCount] = useState(0);
  const [selectedButton, setSelectedButton] = useState("All");
  const [canClearCompleted, setCanClearCompleted] = useState(false);

  // Herhangi bir değişiklik olduğunda çalışacak olan useEffect
  useEffect(() => {
    // Tamamlanmamış todo sayısını hesapla ve visibleCount state'ini güncelle
    const count = todo.filter((item) => !item.completed).length;
    setVisibleCount(count);

    // En az bir tane tamamlanmış todo var mı kontrol et ve canClearCompleted state'ini güncelle
    const hasHiddenItem = todo.some((item) => item.completed);
    setCanClearCompleted(hasHiddenItem);
  }, [todo]); // todo state'i değiştiğinde useEffect'i tetikle

  // Filtre butonlarına tıklanınca çalışacak olan fonksiyon
  const handleButtonClick = (buttonName) => {
    // Seçili butonu güncelle
    setSelectedButton(buttonName);
    
    // Güncellenecek todo listesi
    let updatedTodo;

    if (buttonName === "Active") {
      // 'Active' butonuna basıldığında tamamlanmışları gizle
      updatedTodo = todo.map((item) => ({
        ...item,
        hidden: item.completed ? true : false,
      }));
    } else if (buttonName === "Completed") {
      // 'Completed' butonuna basıldığında tamamlanmamışları gizle
      updatedTodo = todo.map((item) => ({
        ...item,
        hidden: item.completed ? false : true,
      }));
    } else if (buttonName === "All") {
      // 'All' butonuna basıldığında tüm todo'ları göster
      updatedTodo = todo.map((item) => ({ ...item, hidden: false }));
    }

    // Güncellenmiş todo listesini ana bileşene iletilmesi
    setTodo(updatedTodo);
  };

  // Tamamlanmış todoları temizleme işlemi
  const handleClearCompleted = () => {
    // Tamamlanmamış todoları filtrele ve ana bileşene iletilmesi
    const filteredTodo = todo.filter((item) => !item.completed);
    setTodo(filteredTodo);
  };

  return (
    <footer className="footer">
      {/* Todo sayacı */}
      <span className="todo-count">
        <strong>{visibleCount}</strong> Todo kaldı
      </span>

      {/* Filtreleme butonları */}
      <ul className="filters">
        <li>
          <a
            href="#/"
            className={selectedButton === "All" ? "selected" : ""}
            onClick={() => handleButtonClick("All")}
          >
            All
          </a>
        </li>
        <li>
          <a
            href="#/"
            className={selectedButton === "Active" ? "selected" : ""}
            onClick={() => handleButtonClick("Active")}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="#/"
            className={selectedButton === "Completed" ? "selected" : ""}
            onClick={() => handleButtonClick("Completed")}
          >
            Completed
          </a>
        </li>
      </ul>

      {/* Tamamlanmış todoları temizleme butonu */}
      {canClearCompleted && (
        <button
          className="clear-completed"
          onClick={handleClearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

export default Footer;
