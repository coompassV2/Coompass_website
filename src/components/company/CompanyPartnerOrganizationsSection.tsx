import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { apiGet, getStoredToken } from "@/services/authApi";

interface OrganizationDirectoryItem {
  id: string;
  name: string;
  logo?: string;
}

interface OrganizationsDirectoryResponse {
  organizations: OrganizationDirectoryItem[];
}

export function CompanyPartnerOrganizationsSection() {
  const { t } = useTranslation();
  const [organizations, setOrganizations] = useState<OrganizationDirectoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const token = getStoredToken();

    const load = async () => {
      setLoading(true);
      setError(null);
      const { data, error: requestError } = await apiGet<OrganizationsDirectoryResponse>(
        "/api/organizations",
        token
      );
      if (cancelled) return;
      if (requestError) {
        setError(requestError);
        setLoading(false);
        return;
      }
      setOrganizations(data?.organizations ?? []);
      setLoading(false);
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="glass-card p-4">
      <h3 className="text-base font-semibold mb-3">{t("Nonprofits")}</h3>
      <ul className="max-h-56 overflow-y-auto space-y-1.5">
        {loading ? (
          <li className="py-2 text-xs text-muted-foreground">{t("Loading...")}</li>
        ) : organizations.length === 0 ? (
          <li className="py-2 text-xs text-muted-foreground">{t("No data yet")}</li>
        ) : (
          organizations.map((org) => (
            <li
              key={org.id}
              className="flex items-center gap-2.5 py-1.5 text-xs border-b border-border last:border-0"
            >
              {org.logo ? (
                <Avatar className="h-7 w-7 shrink-0">
                  <AvatarImage src={org.logo} alt={org.name} />
                  <AvatarFallback className="text-[10px]">
                    {org.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <Avatar className="h-7 w-7 shrink-0">
                  <AvatarFallback className="text-[10px] bg-muted">
                    {org.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}
              <span className="flex-1 font-medium truncate">{org.name}</span>
            </li>
          ))
        )}
      </ul>
      {error ? <p className="mt-2 text-xs text-destructive">{error}</p> : null}
      <div className="mt-3 text-center">
        <Link to="/organizations" className="text-xs text-coompass-success hover:underline">
          {t("View All Organizations")}
        </Link>
      </div>
    </div>
  );
}
