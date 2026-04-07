export function Avatar({ user, size = 80 }) {
  if (user?.photoUrl) {
    return (
      <img
        src={user.photoUrl}
        alt={user.fullName}
        className="rounded-full object-cover border-4 border-white dark:border-surface-dark shadow-md"
        style={{ width: size, height: size }}
      />
    );
  }

  const initials = user?.fullName
    ? user.fullName
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div
      className="rounded-full bg-primary-light dark:bg-border-dark flex items-center justify-center font-display font-bold text-primary border-4 border-white dark:border-surface-dark shadow-md shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.32 }}
    >
      {initials}
    </div>
  );
}
