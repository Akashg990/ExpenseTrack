import { create } from "zustand";

const useThemeStore = create((set) => ({

  darkMode:
    localStorage.getItem("theme") === "dark",


  toggleTheme: () => {

    const newTheme =
      !(
        localStorage.getItem("theme") ===
        "dark"
      );

    localStorage.setItem(
      "theme",
      newTheme ? "dark" : "light"
    );

    set({
      darkMode: newTheme,
    });
  },

}));

export default useThemeStore;