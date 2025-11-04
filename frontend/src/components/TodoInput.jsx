import { Plus } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

const TodoInput = ({ setTodos }) => {
  const [todo, setTodo] = useState("");

  const handleAdd = async () => {
    if (todo == "") {
      return toast.error("🚫 Todo cannot be empty!");
    }

    const newTodo = { task: todo };

    try {
      const res = await axios.post(`${API_URL}/todo`, newTodo);
      setTodos((prev) => [...prev, res.data]);
      toast.success("✅ Todo added successfully!");
      setTodo("");
    } catch (err) {
      toast.error("❌ Failed to add todo. Check your server.");
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

      <button
        className="flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-300"
        onClick={handleAdd}
      >
        <Plus size={20} />
        <span>Add Task</span>
        {/* <span className="sm:hidden">Add</span>D */}
      </button>
    </div>
  );
};

export default TodoInput;
