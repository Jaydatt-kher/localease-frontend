import { FiEye, FiEyeOff } from "react-icons/fi";

export function PwdInput({ label, value, onChange, error, show, onToggle }) {
  return (
    <div>
      <label className="block text-xs font-body font-semibold text-foreground dark:text-foreground-dark mb-1.5">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="........"
          className={`w-full px-3 pr-10 py-2.5 text-sm rounded-xl font-body border ${error ? "border-red-400" : "border-border dark:border-border-dark"} bg-background-light dark:bg-background-dark text-foreground dark:text-foreground-dark outline-none focus:border-primary transition-colors`}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted dark:text-muted-dark hover:text-foreground dark:hover:text-foreground-dark"
        >
          {show ? <FiEyeOff size={15} /> : <FiEye size={15} />}
        </button>
      </div>
      {error ? <p className="text-[11px] text-red-500 font-body mt-1">{error}</p> : null}
    </div>
  );
}
