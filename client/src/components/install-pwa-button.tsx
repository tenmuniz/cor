import { useInstallPrompt } from "@/hooks/use-install-prompt";
import { Button3d } from "@/components/ui/button-3d";

export function InstallPWAButton() {
  const { canInstall, showInstallPrompt } = useInstallPrompt();

  if (!canInstall) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button3d
        onClick={showInstallPrompt}
        className="px-4 py-2 text-sm font-medium shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2"
        >
          <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
          <path d="M12 7V2" />
          <path d="M12 22v-4" />
          <path d="M17 22H7" />
          <path d="M19 11h2" />
          <path d="M3 11h2" />
          <path d="m19 7-3 3" />
          <path d="m8 10-3-3" />
          <circle cx="12" cy="14" r="4" />
        </svg>
        Instalar App
      </Button3d>
    </div>
  );
}