import { Link } from "react-router-dom";

const variants = {
  primary:
    "bg-saffron-500 !text-white shadow-lg shadow-saffron-500/25 hover:bg-saffron-600",
  secondary:
    "bg-white !text-navy-950 shadow-lg shadow-white/10 hover:bg-slate-100",
  outline:
    "border border-white/35 bg-white/10 text-white backdrop-blur hover:bg-white/20",
  dark: "bg-navy-900 !text-white shadow-lg shadow-navy-900/20 hover:bg-navy-800",
};

export default function CTAButton({
  to,
  children,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false,
  onClick,
}) {
  const classes = `inline-flex items-center justify-center rounded-full px-5 py-2.5 text-[0.9rem] font-bold transition duration-200 focus:outline-none focus:ring-4 focus:ring-saffron-500/20 disabled:cursor-not-allowed disabled:opacity-70 ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} data-button-variant={variant} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      data-button-variant={variant}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
