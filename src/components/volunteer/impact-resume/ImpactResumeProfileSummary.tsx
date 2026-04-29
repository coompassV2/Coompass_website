import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ImpactResumeShareButton } from "./ImpactResumeShareButton";
import { ImpactResumeProfileSummaryProps } from "./types";

export function ImpactResumeProfileSummary({ profile }: ImpactResumeProfileSummaryProps) {
  const { t } = useTranslation();

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback>{profile.name.slice(0, 2).toUpperCase() || "—"}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold">{profile.name}</h3>
              <p className="text-muted-foreground">{profile.company}</p>
              <Badge className="mt-1">{t('Level')} {profile.level}</Badge>
            </div>
          </div>
          
          <ImpactResumeShareButton />
        </div>
      </CardContent>
    </Card>
  );
}
