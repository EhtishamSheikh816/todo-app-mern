"use client";

import { useEffect } from "react";
import { Edit2, Trash2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

const ListTodo = ({ todos, setTodos }) => {
  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await axios.get(`${API_URL}/todo`);
        setTodos(res.data.data);
      } catch (err) {
        console.error("Error fetching todos:", err);
        toast.error("Failed to load todos 😢");
      }
    };

    fetchTodo();
  }, [setTodos]);

  const toggleTodo = async (id) => {
    try {
      await axios.put(`${API_URL}/todo/${id}`);

      setTodos((prev) =>
        prev.map((todo) =>
          todo._id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
        )
      );
    } catch (err) {
      console.error("Error toggling todo:", err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/todo/${id}`);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
      toast.success("🗑️ Todo deleted successfully!");
    } catch (err) {
      toast.error("❌ Failed to delete todo.");
      console.error(err);
    }
  };

  return (
    <div className="mt-6 w-full max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent space-y-3">
      {todos.length === 0 ? (
        <p className="text-center text-gray-400 dark:text-gray-500 py-8 text-sm">
          No tasks yet. Add one above! ✨
        </p>
      ) : (
        todos.map((todo) => (
          <div
            key={todo._id}
            className={`flex items-center gap-3 p-4 rounded-xl border border-gray-100 dark:border-gray-800 
              bg-white dark:bg-[#2A2A2A] shadow-sm hover:shadow-md transition-all duration-300 group`}
          >
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() => toggleTodo(todo._id)}
              className="w-5 h-5 accent-indigo-500 cursor-pointer"
            />

            <span
              className={`flex-1 text-base font-medium ${
                todo.isCompleted
                  ? "line-through text-gray-400 dark:text-gray-600"
                  : "text-gray-700 dark:text-gray-200"
              }`}
            >
              {todo.task}
            </span>

            <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleEdit(todo._id)}
                className="text-blue-400 hover:text-blue-600 transition-colors"
              >
                <Edit2 size={20} />
              </button>

              <button
                onClick={() => deleteTodo(todo._id)}
                className="text-red-400 hover:text-red-600 transition-colors"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ListTodo;
