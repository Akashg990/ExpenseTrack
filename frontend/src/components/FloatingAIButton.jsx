import {
  Bot,
} from "lucide-react";

import useAIUIStore from "../store/aiUIStore";

const FloatingAIButton = () => {

  const { toggleAI } = useAIUIStore();

  return (
    <button
      onClick={toggleAI}
      className="
       floating-ai-button
        fixed bottom-6 right-6
        z-50
        bg-black text-white
        w-16 h-16
        rounded-full
        shadow-2xl
        flex items-center justify-center
        hover:scale-110
        transition-all duration-300
      "
    >
      <Bot size={28} />
    </button>
  );
};

export default FloatingAIButton;