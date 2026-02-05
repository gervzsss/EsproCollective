import { useNavigate } from "react-router-dom";
import { type ReactNode } from "react";

interface TopBarProps {
  title?: string;
  titleElement?: ReactNode;
  leftAction?: "back" | "avatar" | ReactNode;
  rightAction?: ReactNode;
  avatarUrl?: string;
  transparent?: boolean;
}

export default function TopBar({ title, titleElement, leftAction = "back", rightAction, avatarUrl, transparent = false }: TopBarProps) {
  const navigate = useNavigate();

  const renderLeftAction = () => {
    if (leftAction === "back") {
      return (
        <button
          onClick={() => navigate(-1)}
          className="text-accent-dark hover:bg-charcoal/5 flex size-12 shrink-0 items-center justify-center rounded-full transition-colors dark:text-white dark:hover:bg-white/10"
          aria-label="Go back"
        >
          <span className="material-symbols-outlined">arrow_back_ios</span>
        </button>
      );
    }
    if (leftAction === "avatar" && avatarUrl) {
      return (
        <div className="flex size-12 shrink-0 items-center">
          <div
            className="border-primary/20 aspect-square size-10 rounded-full border-2 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url("${avatarUrl}")` }}
            role="img"
            aria-label="User avatar"
          />
        </div>
      );
    }
    return leftAction;
  };

  return (
    <header
      className={`sticky top-0 z-50 flex items-center justify-between p-4 pb-2 ${
        transparent ? "bg-transparent" : "border-charcoal/5 nav-blur dark:bg-background-dark/80 border-b bg-white/80 dark:border-white/5"
      }`}
    >
      <div className="flex w-12 items-center">{renderLeftAction()}</div>

      <div className="flex-1 text-center">{titleElement || <h1 className="text-accent-dark text-lg leading-tight font-bold tracking-tight dark:text-white">{title}</h1>}</div>

      <div className="flex w-12 items-center justify-end">{rightAction || <div className="size-12" />}</div>
    </header>
  );
}
