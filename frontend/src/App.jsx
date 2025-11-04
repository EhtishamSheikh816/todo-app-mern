import { Toaster } from "react-hot-toast";

import ListTodo from "./components/ListTodo";
import TodoInput from "./components/TodoInput";
import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 dark:from-[#0d0d0d] dark:via-[#121212] dark:to-[#1a1a1a] transition-all duration-500 px-4">
      <div className="w-full max-w-xl mx-auto bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-2xl py-6 px-3 sm:py-8 sm:px-4 md:py-10 md:px-5 flex flex-col items-center text-center border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:shadow-[0_0_40px_-10px_rgba(79,70,229,0.3)]">
        <header className="mb-6 space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 dark:text-gray-100 tracking-tight">
            ✨ My Tasks
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
            Stay organized and productive
          </p>
        </header>

        <section className="w-full mb-4 sm:mb-6">
          <TodoInput todos={todos} setTodos={setTodos} />
        </section>

        <div className="relative w-full my-4 flex items-center justify-center">
          <span className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200 dark:border-gray-700" />
          </span>
          <span className="relative bg-white dark:bg-[#1E1E1E] px-3 text-gray-400 text-sm">
            Your Tasks
          </span>
        </div>

        <section className="w-full flex-1 overflow-hidden text-left">
          <ListTodo todos={todos} setTodos={setTodos} />
        </section>

        <footer className="mt-6 text-xs text-gray-400 dark:text-gray-600">
          Built with 💜 by <span className="font-semibold">Ehtisham</span> using{" "}
          <span className="font-semibold text-indigo-500">MERN Stack</span>
        </footer>
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1E1E1E",
            color: "#fff",
            borderRadius: "10px",
            padding: "12px 18px",
          },
        }}
      />
    </div>
  );
}

export default App;
