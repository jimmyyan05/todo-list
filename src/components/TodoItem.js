import { FaTrash, FaCheck } from "react-icons/fa";

export default function TodoItem({ task, onDelete, toggleComplete }) {
  return (
    <div
      className={`flex justify-between items-center p-4 mb-2 rounded-lg border shadow-sm transition-transform duration-200 hover:scale-[1.05] ${
        task.is_completed
          ? "bg-gray-50 border-gray-200"
          : "bg-white border-gray-200 hover:border-amber-200"
      }`}
    >
      <div className="flex-1 mr-4">
        <h2
          className={`text-lg font-medium ${
            task.is_completed ? "text-gray-400 line-through" : "text-gray-700"
          }`}
        >
          {task.name}
        </h2>
        {task.description && (
          <p
            className={`text-sm mt-1 ${
              task.is_completed ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {task.description}
          </p>
        )}
        <div className="flex items-center mt-2 text-xs text-gray-400">
          <span>建立於 {new Date(task.created_at).toLocaleString()}</span>
        </div>
      </div>

      {/*button section*/}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => toggleComplete(task.id, task.is_completed)}
          className={`p-2 rounded-full transition-colors ${
            task.is_completed
              ? "bg-gray-100 text-green-500 hover:bg-gray-200"
              : "bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-green-500"
          }`}
          title={task.is_completed ? "標記為未完成" : "標記為已完成"}
        >
          <FaCheck size={14} />
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="p-2 text-gray-400 bg-gray-100 rounded-full hover:bg-red-50 hover:text-red-500 transition-colors"
          title="刪除任務"
        >
          <FaTrash size={14} />
        </button>
      </div>
    </div>
  );
}
