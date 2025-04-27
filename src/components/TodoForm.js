"use client";
import { useState } from "react";
import { createTask } from "@/services/api";
import { useTodo } from "@/Contexts/TodoContext";

export default function TodoForm() {
  // 從 Context 獲取刷新任務的方法
  const { fetchTasks } = useTodo();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // 如果使用者開始輸入，error init
    if (name === "name" && value.trim()) {
      setError("");
    }
  }

  function handleSubmit(e) {
    if (e) e.preventDefault();

    // 表單驗證
    if (!formData.name.trim()) {
      setError("任務名稱不能為空！");
      return;
    }

    createTask(formData)
      .then((res) => {
        console.log("新增成功", res);
        setFormData({
          name: "",
          description: "",
        });
        fetchTasks();
      })
      .catch((err) => {
        console.log("新增失敗", err);
        setError("新增任務失敗，請稍後再試");
      });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <input
            type="text"
            value={formData.name}
            name="name"
            onChange={handleChange}
            placeholder="任務名稱 (必填，最多10個字)"
            maxLength="10"
            className={`border ${
              error ? "border-red-500" : "border-gray-300"
            } rounded px-4 py-2 mb-2`}
          />
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <input
            type="text"
            value={formData.description}
            name="description"
            onChange={handleChange}
            placeholder="任務描述 (選填，最多30個字)"
            maxLength="30"
            className="border border-gray-300 rounded px-4 py-2 mb-4"
          />
          <button
            className="border border-amber-300 bg-amber-200 py-2 rounded hover:bg-amber-300"
            type="submit"
          >
            新增任務
          </button>
        </div>
      </form>
    </>
  );
}
