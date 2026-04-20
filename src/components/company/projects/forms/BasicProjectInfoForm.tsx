
import { useTranslation } from "react-i18next";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface BasicProjectInfoFormProps {
  formData: {
    title: string;
    description: string;
    category: string;
    projectMode: string;
    locationType: string;
    periodicidade: string;
    locationDetails: string;
  };
  onInputChange: (field: string, value: string) => void;
  errors?: {
    title?: string;
    description?: string;
    projectMode?: string;
    category?: string;
    locationType?: string;
    periodicidade?: string;
  };
}

export function BasicProjectInfoForm({ formData, onInputChange, errors }: BasicProjectInfoFormProps) {
  const { t } = useTranslation();

  const categories = [
    "Voluntariado",
    "Workshop",
    "Team building",
    "Doações e filantropia",
    "Parceria estratégica",
    "Inclusão e diversidade",
    "Emergência e Resposta Rápida"
  ];

  const districts = [
    "Aveiro",
    "Beja",
    "Braga",
    "Bragança",
    "Castelo Branco",
    "Coimbra",
    "Évora",
    "Faro",
    "Guarda",
    "Leiria",
    "Lisboa",
    "Portalegre",
    "Porto",
    "Santarém",
    "Setúbal",
    "Viana do Castelo",
    "Vila Real",
    "Viseu"
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">{t('Project name')} *</Label>
        <Input
          id="title"
          placeholder={t('Enter project name...')}
          value={formData.title}
          onChange={(e) => onInputChange('title', e.target.value)}
          aria-invalid={Boolean(errors?.title)}
          className={cn(errors?.title && "border-destructive focus-visible:ring-destructive")}
          required
        />
        {errors?.title && <p className="text-sm text-destructive">{errors.title}</p>}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">{t('Description')} *</Label>
        <Textarea
          id="description"
          placeholder={t('Describe project objectives and impact...')}
          value={formData.description}
          onChange={(e) => onInputChange('description', e.target.value)}
          aria-invalid={Boolean(errors?.description)}
          className={cn(errors?.description && "border-destructive focus-visible:ring-destructive")}
          rows={4}
          required
        />
        {errors?.description && <p className="text-sm text-destructive">{errors.description}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="projectMode">{t('Format')} *</Label>
          <Select value={formData.projectMode} onValueChange={(value) => onInputChange('projectMode', value)}>
            <SelectTrigger
              aria-invalid={Boolean(errors?.projectMode)}
              className={cn(errors?.projectMode && "border-destructive focus:ring-destructive")}
            >
              <SelectValue placeholder={t('Select format')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="presencial">{t('In-person')}</SelectItem>
              <SelectItem value="virtual">{t('Virtual')}</SelectItem>
            </SelectContent>
          </Select>
          {errors?.projectMode && <p className="text-sm text-destructive">{errors.projectMode}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">{t('Category')} *</Label>
          <Select value={formData.category} onValueChange={(value) => onInputChange('category', value)}>
            <SelectTrigger
              aria-invalid={Boolean(errors?.category)}
              className={cn(errors?.category && "border-destructive focus:ring-destructive")}
            >
              <SelectValue placeholder={t('Select category')} />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors?.category && <p className="text-sm text-destructive">{errors.category}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="locationType">{t('Local')} *</Label>
          <Select value={formData.locationType} onValueChange={(value) => onInputChange('locationType', value)}>
            <SelectTrigger
              aria-invalid={Boolean(errors?.locationType)}
              className={cn(errors?.locationType && "border-destructive focus:ring-destructive")}
            >
              <SelectValue placeholder={t('Select district')} />
            </SelectTrigger>
            <SelectContent>
              {districts.map((district) => (
                <SelectItem key={district} value={district}>
                  {district}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors?.locationType && <p className="text-sm text-destructive">{errors.locationType}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="periodicidade">{t('Periodicity')} *</Label>
          <Select value={formData.periodicidade} onValueChange={(value) => onInputChange('periodicidade', value)}>
            <SelectTrigger
              aria-invalid={Boolean(errors?.periodicidade)}
              className={cn(errors?.periodicidade && "border-destructive focus:ring-destructive")}
            >
              <SelectValue placeholder={t('Select')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pontual">{t('One-off')}</SelectItem>
              <SelectItem value="recorrente">{t('Recurring')}</SelectItem>
            </SelectContent>
          </Select>
          {errors?.periodicidade && <p className="text-sm text-destructive">{errors.periodicidade}</p>}
        </div>
      </div>

      {formData.locationType && (
        <div className="space-y-2">
          <Label htmlFor="locationDetails">{t('Location details')}</Label>
          <Input
            id="locationDetails"
            placeholder={t('Enter address or specific location...')}
            value={formData.locationDetails}
            onChange={(e) => onInputChange('locationDetails', e.target.value)}
          />
        </div>
      )}
    </div>
  );
}
