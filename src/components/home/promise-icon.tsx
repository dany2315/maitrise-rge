import type { PromiseIcon as IconName } from "@/content/company";

const paths: Record<IconName, React.ReactNode> = {
  // Maison et coche : la visite du logement
  diagnostic: (
    <>
      <path d="M3.5 11 12 4l8.5 7M6 9.5V20h12V9.5" />
      <path d="m9.2 14.2 2 2 3.8-4" />
    </>
  ),
  // Écusson et feuille : la qualification RGE
  rge: (
    <>
      <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z" />
      <path d="M12 16c-2-1.2-2.6-3.6-1-6 1.8.4 3.3 2.2 1 6Zm0 0v-3" />
    </>
  ),
  // Étoile : les grandes marques
  brands: <path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3.5Z" />,
  // Dossier : les démarches administratives
  admin: (
    <>
      <path d="M3.5 7.5V18a1.5 1.5 0 0 0 1.5 1.5h14a1.5 1.5 0 0 0 1.5-1.5V9.5A1.5 1.5 0 0 0 19 8h-7l-2-2.5H5A1.5 1.5 0 0 0 3.5 7v.5Z" />
      <path d="m9 13.5 2 2 4-4" />
    </>
  ),
  // Personne avec casque : l'interlocuteur unique
  contact: (
    <>
      <path d="M12 12.5a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM5 20.5a7 7 0 0 1 14 0" />
      <path d="M7.5 8.5a4.5 4.5 0 0 1 9 0M16.5 8.5v1.5" />
    </>
  ),
};

export function PromiseIcon({ name, className = "size-5" }: { name: IconName; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}
