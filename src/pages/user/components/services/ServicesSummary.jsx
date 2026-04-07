export default function ServicesSummary({ services, activeCategoryName, query }) {
  return (
    <p className="text-sm text-muted dark:text-muted-dark font-body mb-4">
      {services.length} service{services.length !== 1 ? "s" : ""} found
      {activeCategoryName ? ` in ${activeCategoryName}` : query ? ` for "${query}"` : ""}
    </p>
  );
}
