import { useTranslation } from "react-i18next";
import { useState, useMemo } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, X, ChevronDown, Search } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface ProjectParticipantOption {
  id: string;
  name: string;
  email: string | null;
}

interface ProjectParticipantSelectorProps {
  formData: {
    invitedParticipants: string[];
  };
  participants: ProjectParticipantOption[];
  onParticipantSelect: (volunteerId: string) => void;
  onRemoveParticipant: (volunteerId: string) => void;
}

export function ProjectParticipantSelector({
  formData,
  participants,
  onParticipantSelect,
  onRemoveParticipant,
}: ProjectParticipantSelectorProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) setSearchQuery("");
  };

  const selectedParticipants = useMemo(
    () => participants.filter((v) => formData.invitedParticipants.includes(v.id)),
    [participants, formData.invitedParticipants]
  );

  const availableVolunteers = useMemo(() => {
    const selectedIds = new Set(formData.invitedParticipants);
    return participants.filter((v) => !selectedIds.has(v.id));
  }, [participants, formData.invitedParticipants]);

  const filteredVolunteers = useMemo(() => {
    if (!searchQuery.trim()) return availableVolunteers;
    const query = searchQuery.toLowerCase();
    return availableVolunteers.filter((v) =>
      v.name.toLowerCase().includes(query) || (v.email ?? "").toLowerCase().includes(query)
    );
  }, [availableVolunteers, searchQuery]);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium flex items-center gap-2">
          <Users className="h-4 w-4 shrink-0" />
          {t("companyProject.organizersTitle")}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          {t("companyProject.organizersSubtitle")}
        </p>
      </div>

      <div className="space-y-2">
        <Popover open={open} onOpenChange={handleOpenChange}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between font-normal"
            >
              <span className="truncate">
                {selectedParticipants.length > 0
                  ? `${selectedParticipants.length} ${t('selected')}`
                  : t('Select participants...')}
              </span>
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
            <div className="p-2 border-b">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t('Search name...')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 h-9"
                  onKeyDown={(e) => e.stopPropagation()}
                />
              </div>
            </div>
            <div className="max-h-60 overflow-y-auto p-1">
              {filteredVolunteers.length === 0 ? (
                <p className="py-6 text-center text-sm text-muted-foreground">
                  {t('No volunteers found')}
                </p>
              ) : (
                filteredVolunteers.map((volunteer) => (
                  <button
                    key={volunteer.id}
                    type="button"
                    onClick={() => {
                      onParticipantSelect(volunteer.id);
                      setSearchQuery("");
                    }}
                    className={cn(
                      "w-full flex items-center px-2 py-1.5 text-left text-sm rounded-sm hover:bg-accent hover:text-accent-foreground cursor-default"
                    )}
                  >
                    <span className="truncate">{volunteer.name}</span>
                  </button>
                ))
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {selectedParticipants.length > 0 && (
        <div className="space-y-2">
          <Label>{t('Selected participants')}</Label>
          <div className="flex flex-wrap gap-2">
            {selectedParticipants.map((volunteer) => (
              <Badge
                key={volunteer.id}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {volunteer.name}
                <button
                  type="button"
                  onClick={() => onRemoveParticipant(volunteer.id)}
                  className="ml-1 hover:bg-destructive/20 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
