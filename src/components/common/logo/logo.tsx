import styles from "./logo.module.css";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <svg
      className={`${styles.logo} ${className || ""}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 53 52"
      role="img"
      aria-label="Minimalissimo Logo"
    >
      <title>Minimalissimo Logo</title>
      <path d="M52.8959305 51H46v-7l7-13-.1040695 20zM0 0h7v51H0V0zm24 44l3 8L53 0h-7L24 44z" />
    </svg>
  );
}
