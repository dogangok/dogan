import type { ReactNode } from "react";
import styles from "./content-editor.module.css";

interface ContentEditorProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "gallery" | "mood";
}

export default function ContentEditor({
  children,
  className,
  variant = "default",
}: ContentEditorProps) {
  return (
    <main className={`${styles.editor} ${styles[variant]} ${className || ""}`}>
      {children}
    </main>
  );
}
