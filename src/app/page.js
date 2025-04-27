import TodoList from "@/components/TodoList";
import TodoForm from "@/components/TodoForm";
import { TodoProvider } from "@/Contexts/TodoContext";
export default function Home() {
  return (
    <main
      className="flex flex-col items-center
      w-full px-4 py-8 "
    >
      <h1 className="text-2xl font-bold mb-6">Todo List</h1>
      <TodoProvider>
        <div className="w-full max-w-2xl">
          <TodoForm />
          <TodoList />
        </div>
      </TodoProvider>
    </main>
  );
}
