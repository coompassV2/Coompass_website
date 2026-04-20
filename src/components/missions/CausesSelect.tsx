import { MultiSelect } from "./MultiSelect";
import { useTaxonomyLists } from "@/hooks/useTaxonomyLists";
import { useTranslation } from "react-i18next";
import { translateCauseName } from "@/utils/taxonomyI18n";

export function CausesSelect({ form }: { form: any }) {
  const { t } = useTranslation();
  const { causes } = useTaxonomyLists();
  const causeOptions = causes.map((cause) => cause.name);
  const causeOptionLabels = Object.fromEntries(
    causes.map((cause) => [cause.name, translateCauseName(cause, t)])
  );

  return (
    <MultiSelect
      form={form}
      name="causes"
      label="Causes"
      placeholder="Select causes"
      options={causeOptions}
      optionLabels={causeOptionLabels}
    />
  );
}