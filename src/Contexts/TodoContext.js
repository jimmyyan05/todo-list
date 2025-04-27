"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { getTasks } from "@/services/api";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [type, setType] = useState("all");

  const fetchTasks = useCallback(async () => {
    await getTasks(page, type)
      .then((res) => {
        console.log("data", res.data);
        setTasks(res.data);
      })
      .catch((err) => console.log(err));
  }, [page, type]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <TodoContext.Provider
      value={{ tasks, fetchTasks, page, setPage, type, setType }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => useContext(TodoContext);


