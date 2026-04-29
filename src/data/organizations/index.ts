
import { Organization } from "@/types/organization";
import { educationOrganizations } from "./education";
import { healthcareOrganizations } from "./healthcare";
import { humanitarianOrganizations } from "./humanitarian";
import { socialServicesOrganizations } from "./social-services";
import { youthAndFamilyOrganizations } from "./youth-and-family";
import { environmentalOrganizations } from "./environmental";

// Combine all organization arrays
export const organizationsData: Organization[] = [
  ...educationOrganizations,
  ...healthcareOrganizations,
  ...humanitarianOrganizations,
  ...socialServicesOrganizations,
  ...youthAndFamilyOrganizations,
  ...environmentalOrganizations,
];
