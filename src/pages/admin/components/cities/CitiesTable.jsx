import { CheckCircle, Edit2, MapPin, Trash2, XCircle } from "lucide-react";

export function CitiesTable({
  tableHeads,
  isLoading,
  cities,
  onToggleStatus,
  onEditCity,
  onDeleteCity,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-175">
        <thead>
          <tr className="border-b border-border dark:border-border-dark bg-background-light dark:bg-surface-alt">
            {tableHeads.map((heading, index) => (
              <th
                key={heading}
                className={`px-4 py-3 text-left text-[11px] font-body font-semibold uppercase tracking-wider text-muted dark:text-muted-dark whitespace-nowrap ${
                  index === tableHeads.length - 1 ? "text-right" : ""
                }`}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border dark:divide-border-dark">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <tr key={i}>
                {tableHeads.map((heading) => (
                  <td key={heading} className="px-4 py-3.5">
                    <div className="skeleton h-4 rounded-lg w-full" />
                  </td>
                ))}
              </tr>
            ))
          ) : cities.length === 0 ? (
            <tr>
              <td colSpan={tableHeads.length} className="px-6 py-12 text-center">
                <div className="flex flex-col items-center gap-3 text-muted dark:text-muted-dark">
                  <MapPin className="w-8 h-8 opacity-30" />
                  <p className="text-sm font-body">No cities found.</p>
                </div>
              </td>
            </tr>
          ) : (
            cities.map((city) => (
              <tr
                key={city._id}
                className="hover:bg-background-light dark:hover:bg-surface-alt transition-colors group"
              >
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-primary-light dark:bg-primary/20 rounded-lg flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4 text-primary dark:text-blue-400" />
                    </div>
                    <span className="font-body text-sm font-semibold text-foreground dark:text-foreground-dark">
                      {city.name}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className="text-sm font-body text-muted dark:text-muted-dark">{city.state}</span>
                </td>

                <td className="px-4 py-3.5 whitespace-nowrap">
                  <button
                    onClick={() => onToggleStatus(city)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-body font-semibold transition-colors ${
                      city.status
                        ? "bg-accent-light dark:bg-accent/10 text-accent-hover dark:text-green-400 border border-green-200 dark:border-green-900/50 hover:bg-green-100 dark:hover:bg-green-900/40"
                        : "bg-background-light dark:bg-surface-alt text-muted dark:text-gray-400 border border-border dark:border-border-dark hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`}
                  >
                    {city.status ? (
                      <>
                        <CheckCircle className="w-3 h-3" /> Active
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3 h-3" /> Inactive
                      </>
                    )}
                  </button>
                </td>

                <td className="px-4 py-3.5 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onEditCity(city)}
                      className="p-1.5 text-muted dark:text-muted-dark hover:text-primary dark:hover:text-blue-400 hover:bg-primary-light dark:hover:bg-primary/10 rounded-lg transition-colors"
                      title="Edit City"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteCity(city._id)}
                      className="p-1.5 text-muted dark:text-muted-dark hover:text-danger dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Delete City"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
