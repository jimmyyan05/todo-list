"use client";
import { deleteTask, patchTask, getTasks } from "@/services/api";
import TodoItem from "./TodoItem";
import { useTodo } from "@/Contexts/TodoContext";
import { useState, useEffect, useCallback } from "react";

export default function TodoList() {
  // 使用 Context 中的狀態和方法
  const { tasks, page, setPage, type, setType, fetchTasks } = useTodo();
  const [isLastPage, setIsLastPage] = useState(false);

  function handlePageChange(newPage) {
    if (newPage < 1) return;
    setPage(newPage);
  }

  function handleTypeChange(newType) {
    setType(newType);
    setPage(1);
  }

  // 刪除Todo
  function handleDelete(id) {
    deleteTask(id)
      .then(() => {
        fetchTasks();
        alert("刪除成功");
      })
      .catch((err) => {
        console.log("刪除失敗", err);
      });
  }

  //切換已完成／未完成
  function toggleComplete(id, is_completed) {
    patchTask(id, {
      is_completed: !is_completed,
    })
      .then(() => {
        console.log("更新狀態成功");
        fetchTasks(); // 更新成功後重新獲取任務
      })
      .catch((err) => {
        console.log("更新狀態失敗", err);
      });
  }

  // 檢查是否為最後一頁
  const checkIfLastPage = useCallback(async () => {
    try {
      const nextPageData = await getTasks(page + 1, type);

      // 如果下一頁沒有資料，表示當前頁是最後一頁
      if (!nextPageData.data || nextPageData.data.length === 0) {
        setIsLastPage(true);
      } else {
        setIsLastPage(false);
      }
    } catch (err) {
      console.error("檢查最後一頁失敗", err);
    }
  }, [page, type]);

  // 當頁面render檢查下一頁按鈕
  useEffect(() => {
    if (tasks && tasks.length > 0) {
      checkIfLastPage();
    } else {
      setIsLastPage(true);
    }
  }, [checkIfLastPage, tasks]);

  return (
    <>
      <select
        value={type}
        className="border border-gray-300 rounded px-4 py-2 mb-4 mt-4"
        onChange={(e) => handleTypeChange(e.target.value)}
      >
        <option value="all">全部任務</option>
        <option value="completed">已完成任務</option>
        <option value="uncompleted">未完成任務</option>
      </select>

      {tasks && tasks.length > 0 ? (
        // 有任務時顯示任務列表
        tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            onDelete={handleDelete}
            onPageChange={handlePageChange}
            onTypeChange={handleTypeChange}
            toggleComplete={toggleComplete}
          />
        ))
      ) : (
        <div className="text-center py-8">
          <p>目前沒有任務</p>
        </div>
      )}

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className={`px-4 py-2 border rounded ${
            page === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          上一頁
        </button>
        <span className="text-sm">第 {page} 頁</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={isLastPage}
          className={`px-4 py-2 border rounded ${
            isLastPage
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          下一頁
        </button>
      </div>
    </>
  );
}
