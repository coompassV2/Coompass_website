import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { Mail, Calendar, MapPin, ImagePlus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import { BasicMissionDetails } from "./BasicMissionDetails";
import { CausesSelect } from "./CausesSelect";
import { SkillsSelect } from "./SkillsSelect";
import { ODSSelect } from "./ODSSelect";
import { PORTUGAL_DISTRICTS } from "@/constants/portugalDistricts";
import type { MissionAttachmentItem } from "@/services/authApi";

interface MissionDetailsStepProps {
  initialData: any;
  onContinue: (data: any) => void;
  missionImagePreviewUrl?: string | null;
  onMissionImageChange?: (file: File | null) => void;
  hideRequiresInterview?: boolean;
  missionDocuments?: File[];
  onMissionDocumentsChange?: (files: File[]) => void;
  existingMissionDocuments?: MissionAttachmentItem[];
  onDeleteExistingMissionDocument?: (fileId: string) => void;
}

export function MissionDetailsStep({
  initialData,
  onContinue,
  missionImagePreviewUrl,
  onMissionImageChange,
  hideRequiresInterview = false,
  missionDocuments = [],
  onMissionDocumentsChange,
  existingMissionDocuments = [],
  onDeleteExistingMissionDocument,
}: MissionDetailsStepProps) {
  const { t } = useTranslation();
  const [isVirtual, setIsVirtual] = useState(initialData.isVirtual);
  const startDateInputRef = useRef<HTMLInputElement | null>(null);
  const endDateInputRef = useRef<HTMLInputElement | null>(null);
  const pointOfContactDefault =
    typeof initialData.pointOfContact === "string"
      ? initialData.pointOfContact
      : Array.isArray(initialData.contacts)
        ? (initialData.contacts[0] ?? "")
        : "";
  const form = useForm({
    defaultValues: { ...initialData, pointOfContact: pointOfContactDefault },
    mode: "onChange",
    reValidateMode: "onChange",
    shouldUnregister: true,
  });
  const title = form.watch("title");
  const description = form.watch("description");
  const hoursRequired = form.watch("hoursRequired");
  const volunteersRequired = form.watch("volunteersRequired");
  const startDate = form.watch("startDate");
  const endDate = form.watch("endDate");
  const address = form.watch("address");
  const district = form.watch("district");
  const pointOfContact = form.watch("pointOfContact");
  const ods = form.watch("ods");
  const causes = form.watch("causes");
  const skills = form.watch("skills");

  useEffect(() => {
    const pointOfContact =
      typeof initialData.pointOfContact === "string"
        ? initialData.pointOfContact
        : Array.isArray(initialData.contacts)
          ? (initialData.contacts[0] ?? "")
          : "";
    form.reset({ ...initialData, pointOfContact });
    setIsVirtual(Boolean(initialData.isVirtual));
  }, [form, initialData]);

  const openDatePicker = (input: HTMLInputElement | null) => {
    if (!input) return;
    const inputWithPicker = input as HTMLInputElement & { showPicker?: () => void };
    if (typeof inputWithPicker.showPicker === "function") {
      inputWithPicker.showPicker();
    }
  };

  const hasRequiredFields =
    typeof title === "string" &&
    title.trim().length > 0 &&
    typeof description === "string" &&
    description.trim().length > 0 &&
    Number(hoursRequired) > 0 &&
    Number(volunteersRequired) > 0 &&
    (isVirtual || (typeof district === "string" && district.length > 0)) &&
    typeof startDate === "string" &&
    startDate.length > 0 &&
    typeof endDate === "string" &&
    endDate.length > 0 &&
    (isVirtual || (typeof address === "string" && address.trim().length > 0)) &&
    typeof pointOfContact === "string" &&
    pointOfContact.trim().length > 0 &&
    Array.isArray(ods) &&
    ods.length > 0 &&
    Array.isArray(causes) &&
    causes.length > 0 &&
    Array.isArray(skills) &&
    skills.length > 0;

  const handleSubmit = (data: any) => {
    const email = typeof data.pointOfContact === "string" ? data.pointOfContact.trim() : "";
    const contacts = email ? [email] : [];

    onContinue({
      ...data,
      district: isVirtual ? "" : (typeof data.district === "string" ? data.district : ""),
      contacts,
      pointOfContact: email || (typeof data.pointOfContact === "string" ? data.pointOfContact : ""),
      isVirtual,
      requiresInterview: Boolean(data.requiresInterview),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <BasicMissionDetails form={form} />

          {/* Right Column */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="scheduleType"
                render={({ field }) => (
                  <FormItem className="col-span-2">
                    <FormLabel className="text-foreground dark:text-white">{t("Initiative type")}</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background bg-background dark:bg-black/30 border-input dark:border-white/10 text-foreground dark:text-white"
                        value={field.value ?? "one_time"}
                        onChange={(event) => field.onChange(event.target.value)}
                      >
                        <option value="one_time">{t("One-time")}</option>
                        <option value="recurring">{t("Recurring")}</option>
                      </select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="startDate"
                rules={{ required: t("Start date is required") }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground dark:text-white">{t("Start Date")}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground dark:text-white h-4 w-4 pointer-events-none" />
                        <Input 
                          type="date"
                          {...field}
                          ref={(node) => {
                            field.ref(node);
                            startDateInputRef.current = node;
                          }}
                          onClick={() => openDatePicker(startDateInputRef.current)}
                          className={cn(
                            "bg-background dark:bg-black/30 border-input dark:border-white/10 pl-10 text-foreground dark:text-white",
                            form.formState.errors.startDate && "border-red-500"
                          )}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endDate"
                rules={{
                  required: t("End date is required"),
                  validate: (value) => {
                    const startDate = form.getValues("startDate");
                    if (!value || !startDate) return true;
                    return new Date(value) >= new Date(startDate) || t("End date must be after start date");
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground dark:text-white">{t("End Date")}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground dark:text-white h-4 w-4 pointer-events-none" />
                        <Input 
                          type="date"
                          {...field}
                          ref={(node) => {
                            field.ref(node);
                            endDateInputRef.current = node;
                          }}
                          onClick={() => openDatePicker(endDateInputRef.current)}
                          className={cn(
                            "bg-background dark:bg-black/30 border-input dark:border-white/10 pl-10 text-foreground dark:text-white",
                            form.formState.errors.endDate && "border-red-500"
                          )}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex items-center justify-between">
              <FormLabel className="text-foreground dark:text-white">{t("Virtual Mission")}</FormLabel>
              <Switch
                checked={isVirtual}
                onCheckedChange={(checked) => {
                  setIsVirtual(checked);
                  if (checked) {
                    form.clearErrors("address");
                    form.clearErrors("district");
                  } else {
                    void form.trigger("address");
                    void form.trigger("district");
                  }
                }}
                className="data-[state=checked]:bg-coompass-success"
              />
            </div>

            {!hideRequiresInterview ? (
              <FormField
                control={form.control}
                name="requiresInterview"
                render={({ field }) => (
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-foreground dark:text-white">
                      {t("Requires prior interview")}
                    </FormLabel>
                    <Switch
                      checked={Boolean(field.value)}
                      onCheckedChange={field.onChange}
                      className="data-[state=checked]:bg-coompass-success"
                    />
                  </div>
                )}
              />
            ) : null}

            {!isVirtual && (
              <>
                <FormField
                  control={form.control}
                  name="address"
                  rules={{
                    validate: (value) => {
                      if (isVirtual) return true;
                      return typeof value === "string" && value.trim().length > 0
                        ? true
                        : t("Address is required for in-person missions");
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground dark:text-white">{t("Address")}</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground dark:text-white h-4 w-4 pointer-events-none" />
                          <Input
                            placeholder={t("Enter address")}
                            className="bg-background dark:bg-black/30 border-input dark:border-white/10 pl-10 text-foreground dark:text-white"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="district"
                  rules={{
                    validate: (value) => {
                      if (isVirtual) return true;
                      return typeof value === "string" && value.length > 0
                        ? true
                        : t("District is required");
                    },
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground dark:text-white">{t("District")}</FormLabel>
                      <FormControl>
                        <select
                          className={cn(
                            "flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background bg-background dark:bg-black/30 border-input dark:border-white/10 text-foreground dark:text-white",
                            form.formState.errors.district && "border-red-500"
                          )}
                          value={field.value ?? ""}
                          onChange={(event) => field.onChange(event.target.value)}
                        >
                          <option value="">{t("Select district")}</option>
                          {PORTUGAL_DISTRICTS.map((districtName) => (
                            <option key={districtName} value={districtName}>
                              {districtName}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <FormField
              control={form.control}
              name="pointOfContact"
              rules={{
                required: t("Point of contact email is required"),
                validate: (value) => {
                  const email = String(value ?? "").trim();
                  if (!email) return t("Point of contact email is required");
                  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
                    ? true
                    : t("Please enter a valid email");
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground dark:text-white">{t("Point of Contact (Email)")}</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground dark:text-white h-4 w-4 pointer-events-none" />
                      <Input
                        type="email"
                        placeholder={t("Placeholder contact email")}
                        className="bg-background dark:bg-black/30 border-input dark:border-white/10 pl-10 text-foreground dark:text-white"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <ODSSelect form={form} />
            <CausesSelect form={form} />
            <SkillsSelect form={form} />

            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-foreground dark:text-white">{t("Additional requirements")}</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={t("Additional requirements...")}
                      className="bg-background dark:bg-black/30 border-input dark:border-white/10 text-foreground dark:text-white"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {onMissionImageChange != null && (
              <div className="space-y-2">
                <FormLabel className="text-foreground dark:text-white">{t("Mission image (optional)")}</FormLabel>
                <p className="text-xs text-muted-foreground -mt-1">
                  {t("Mission image recommended dimensions")}
                </p>
                <div className="rounded-lg border border-dashed border-input dark:border-white/10 bg-background dark:bg-black/20 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-input dark:border-white/10 px-3 py-2 text-sm text-foreground dark:text-white hover:bg-muted dark:hover:bg-white/10">
                      <ImagePlus className="h-4 w-4" />
                      {t("Upload mission image")}
                      <input
                        type="file"
                        accept="image/png,image/jpeg"
                        className="hidden"
                        onChange={(event) => {
                          const file = event.target.files?.[0] ?? null;
                          onMissionImageChange(file);
                          event.currentTarget.value = "";
                        }}
                      />
                    </label>

                    {missionImagePreviewUrl ? (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-foreground"
                        onClick={() => onMissionImageChange(null)}
                      >
                        <X className="mr-1 h-4 w-4" />
                        {t("Remove")}
                      </Button>
                    ) : null}
                  </div>

                  {missionImagePreviewUrl ? (
                    <img
                      src={missionImagePreviewUrl}
                      alt={t("Mission image preview")}
                      className="mt-3 h-40 w-full rounded-md object-cover"
                    />
                  ) : (
                    <p className="mt-3 text-xs text-muted-foreground">
                      {t("JPG or PNG, up to 5MB.")}
                    </p>
                  )}
                </div>
              </div>
            )}

            {onMissionDocumentsChange != null ? (
              <div className="space-y-2">
                <FormLabel className="text-foreground dark:text-white">
                  {t("Mission documents (max 5)")}
                </FormLabel>
                <div className="rounded-lg border border-dashed border-input dark:border-white/10 bg-background dark:bg-black/20 p-3">
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-input dark:border-white/10 px-3 py-2 text-sm text-foreground dark:text-white hover:bg-muted dark:hover:bg-white/10">
                    <ImagePlus className="h-4 w-4" />
                    {t("Upload files")}
                    <Input
                      type="file"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.zip"
                      multiple
                      className="hidden"
                      onChange={(event) => {
                        const incoming = Array.from(event.target.files ?? []);
                        const merged = [...missionDocuments, ...incoming].slice(0, 5);
                        onMissionDocumentsChange(merged);
                        event.currentTarget.value = "";
                      }}
                    />
                  </label>
                  {existingMissionDocuments.length === 0 && missionDocuments.length === 0 ? (
                    <p className="mt-3 text-xs text-muted-foreground">{t("No documents uploaded.")}</p>
                  ) : null}
                  {existingMissionDocuments.length > 0 ? (
                    <div className="mt-3 space-y-1">
                      {existingMissionDocuments.map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center justify-between gap-2 rounded border px-3 py-2 text-sm"
                        >
                          <span className="truncate">{file.file_name}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => onDeleteExistingMissionDocument?.(file.id)}
                          >
                            {t("Remove")}
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  {missionDocuments.length > 0 ? (
                    <div className="mt-3 space-y-1">
                      {missionDocuments.map((file, idx) => (
                        <div
                          key={`${file.name}-${idx}`}
                          className="flex items-center justify-between gap-2 rounded border px-3 py-2 text-sm"
                        >
                          <span className="truncate">{file.name}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              onMissionDocumentsChange(
                                missionDocuments.filter((_, currentIdx) => currentIdx !== idx)
                              )
                            }
                          >
                            {t("Remove")}
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <Button
          type="button"
          onClick={form.handleSubmit(handleSubmit)}
          className="w-full bg-coompass-success hover:bg-coompass-success/90 text-white"
          disabled={!hasRequiredFields}
        >
          {t("Continue")}
        </Button>
      </form>
    </Form>
  );
}