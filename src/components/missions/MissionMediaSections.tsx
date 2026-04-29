import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { MissionAttachmentItem } from "@/services/authApi";

interface MissionMediaSectionsProps {
  files: MissionAttachmentItem[];
  isCompleted: boolean;
}

export function MissionMediaSections({ files, isCompleted }: MissionMediaSectionsProps) {
  const { t } = useTranslation();
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const documents = useMemo(
    () => files.filter((file) => file.category === "documents"),
    [files]
  );
  const finalDocuments = useMemo(
    () => files.filter((file) => file.category === "final_documents"),
    [files]
  );
  const photos = useMemo(
    () => files.filter((file) => file.category === "photos"),
    [files]
  );

  const openPhoto = (index: number) => {
    setGalleryIndex(index);
    setGalleryOpen(true);
  };

  if (files.length === 0) return null;

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h2 className="mb-4 text-xl font-semibold">{t("Documents")}</h2>
          {documents.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t("No documents uploaded.")}</p>
          ) : (
            <div className="space-y-2">
              {documents.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between gap-3 rounded-md border p-3"
                >
                  <p className="truncate text-sm">{file.file_name}</p>
                  <Button asChild size="sm" variant="outline" disabled={!file.signed_url}>
                    <a
                      href={file.signed_url ?? "#"}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t("Download")}
                    </a>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {isCompleted ? (
        <Card>
          <CardContent className="pt-6">
            <h2 className="mb-4 text-xl font-semibold">{t("Final Documents")}</h2>
            {finalDocuments.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t("No final documents uploaded.")}</p>
            ) : (
              <div className="space-y-2">
                {finalDocuments.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between gap-3 rounded-md border p-3"
                  >
                    <p className="truncate text-sm">{file.file_name}</p>
                    <Button asChild size="sm" variant="outline" disabled={!file.signed_url}>
                      <a
                        href={file.signed_url ?? "#"}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {t("Download")}
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ) : null}

      {isCompleted ? (
        <Card>
          <CardContent className="pt-6">
            <h2 className="mb-4 text-xl font-semibold">{t("Photos")}</h2>
            {photos.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t("No photos uploaded.")}</p>
            ) : (
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                {photos.map((photo, index) => (
                  <button
                    key={photo.id}
                    type="button"
                    className="overflow-hidden rounded-md border"
                    onClick={() => openPhoto(index)}
                  >
                    {photo.signed_url ? (
                      <img
                        src={photo.signed_url}
                        alt={photo.file_name}
                        className="h-36 w-full object-cover transition-transform hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-36 items-center justify-center text-sm text-muted-foreground">
                        {t("Unavailable")}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ) : null}

      <Dialog open={galleryOpen} onOpenChange={setGalleryOpen}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>{t("Photo Gallery")}</DialogTitle>
          </DialogHeader>
          {photos.length > 0 && photos[galleryIndex]?.signed_url ? (
            <div className="space-y-3">
              <img
                src={photos[galleryIndex].signed_url!}
                alt={photos[galleryIndex].file_name}
                className="max-h-[65vh] w-full rounded-md object-contain"
              />
              <div className="flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={() =>
                    setGalleryIndex((prev) =>
                      prev === 0 ? photos.length - 1 : prev - 1
                    )
                  }
                >
                  {t("Previous")}
                </Button>
                <p className="text-sm text-muted-foreground">
                  {galleryIndex + 1} / {photos.length}
                </p>
                <Button
                  variant="outline"
                  onClick={() =>
                    setGalleryIndex((prev) =>
                      prev === photos.length - 1 ? 0 : prev + 1
                    )
                  }
                >
                  {t("Next")}
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">{t("No photo available.")}</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

