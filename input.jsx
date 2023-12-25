import React, { useState } from "react";

const Input = ({ todo, setTodo }) => {
  const [text, setText] = useState("");
  const textInput = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Sayfanın yeniden yüklenmesini önlemek için
      const trimmedText = text.trim(); // boşlukları temizler
      if (trimmedText !== "") {
        setTodo((prevTodo) => [
          ...prevTodo,
          { text: trimmedText, completed: false, hidden: false },
        ]); // yeni oluşturulmuş todolarımızı bir üst componente gönderir (aslında göndermez sadece bir üst componenteki degerleri ...todo ile önceki degerleri de alıcak şekilde günceller )
        setText(""); // textInput foksiyonundaki herşey bitince inputumuz valuesini temizler
      }
    }
  };

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={textInput} // Enter e basılınca textInput tetikler
        className="new-todo"
        placeholder="What needs to be done?"
      />
    </div>
  );
};

export default Input;
