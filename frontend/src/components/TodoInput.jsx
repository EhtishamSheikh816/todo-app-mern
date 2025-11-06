import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_API_URL;

const TodoInput = ({ setTodos }) => {
  const [todo, setTodo] = useState("");

  const handleAdd = async () => {
    if (todo.trim() === "") {
      return toast.error("🚫 Todo cannot be empty!");
    }

    const newTodo = { task: todo };

    try {
      const res = await axios.post(`${API_URL}/todo`, newTodo);
      setTodos((prev) => [...prev, res.data.data]);
      toast.success("✅ Todo added successfully!");
      setTodo("");
    } catch (err) {
      toast.error("❌ Failed to add todo. Check your server.");
      console.error(err);
    }
  };

  const handleDeleteAll = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "⚠️ This will permanently delete all your todos!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete all",
      cancelButtonText: "Cancel",
      background: "#1E1E1E",
      color: "#fff",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`${API_URL}/todos`);

      setTodos([]);
      toast.success("🗑️ All todos deleted successfully!");
    } catch (err) {
      toast.error("❌ Failed to delete all todos.");
      console.error(err);
    }
  };

  return (
    <div className="w-full flex flex-col sm:flex-row gap-3 bg-white dark:bg-[#1E1E1E] p-4 rounded-2xl shadow-md border border-gray-100 dark:border-gray-800 transition-all duration-300">
      <input
        type="text"
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
        onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        placeholder="✨ Add a new task..."
        className="flex-1 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 bg-gray-50 dark:bg-[#2A2A2A] border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
      />

      <div className="flex flex-col md:flex-row gap-3">
        <button
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300"
          onClick={handleAdd}
        >
          <Plus size={20} />
          <span>Add Task</span>
        </button>

        <button
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300"
          onClick={handleDeleteAll}
        >
          <Trash2 size={20} />
          <span>Delete All</span>
        </button>
      </div>
    </div>
  );
};

export default TodoInput;
