
import User from "./User";
import AssistantThreads from "./AssistantThreads";
import Calendar from "./Calendar";
import Certificates from "./Certificates";
import Company from "./Company";
import CompanyDistricts from "./CompanyDistricts";
import Districts from "./Districts";
import Features from "./Features";
import HourLog from "./HourLog";
import Mission from "./Mission";
import MissionLog from "./MissionLog";
import MissionParticipants from "./MissionParticipants";
import Partnership from "./Partnership";
import Permission from "./Permission";
import ResetAccount from "./ResetAccount";
import SendgridLog from "./SendgridLog";
import UserCompany from "./UserCompany";
import UserLog from "./UserLog";
import UsersFeatures from "./UsersFeatures";
import ZohoToken from "./ZohoToken";
import { sequelize } from "@/lib/sequelize";

// Define associations
User.hasMany(UserLog, { foreignKey: 'userId', as: 'userLogs' });
User.hasMany(Calendar, { foreignKey: 'userId', as: 'calendars' });
User.hasMany(MissionParticipants, { foreignKey: 'userId', as: 'missionParticipants' });
User.hasOne(Permission, { foreignKey: 'userId', as: 'permissions' });
User.hasMany(UsersFeatures, { foreignKey: 'userId', as: 'userFeatures' });
User.hasMany(AssistantThreads, { foreignKey: 'userId', as: 'assistantThreads' });
User.hasMany(Company, { foreignKey: 'creator', as: 'createdCompanies' });

UserLog.belongsTo(User, { foreignKey: 'userId' });
Calendar.belongsTo(User, { foreignKey: 'userId' });
MissionParticipants.belongsTo(User, { foreignKey: 'userId' });
Permission.belongsTo(User, { foreignKey: 'userId' });
UsersFeatures.belongsTo(User, { foreignKey: 'userId' });
AssistantThreads.belongsTo(User, { foreignKey: 'userId' });
Company.belongsTo(User, { foreignKey: 'creator', as: 'creatorUser' });

Mission.hasMany(MissionLog, { foreignKey: 'missionId', as: 'missionLogs' });
Mission.hasMany(Calendar, { foreignKey: 'missionId', as: 'calendars' });
Mission.hasMany(MissionParticipants, { foreignKey: 'missionId', as: 'missionParticipants' });
Mission.hasMany(UserLog, { foreignKey: 'missionId', as: 'userLogs' });

MissionLog.belongsTo(Mission, { foreignKey: 'missionId' });
Calendar.belongsTo(Mission, { foreignKey: 'missionId' });
MissionParticipants.belongsTo(Mission, { foreignKey: 'missionId' });
UserLog.belongsTo(Mission, { foreignKey: 'missionId' });

Company.hasMany(Mission, { foreignKey: 'companyId', as: 'missions' });
Company.hasMany(Certificates, { foreignKey: 'companyId', as: 'certificates' });
Company.belongsToMany(Districts, { through: CompanyDistricts, foreignKey: 'company_id', as: 'districts' });
Company.belongsToMany(User, { through: UserCompany, foreignKey: 'companyId', as: 'users' });
Company.belongsToMany(Company, { through: Partnership, foreignKey: 'companyId', as: 'partnerOrgs' });
Company.belongsToMany(Company, { through: Partnership, foreignKey: 'partnerOrgId', as: 'partneredWithOrgs' });

Mission.belongsTo(Company, { foreignKey: 'companyId' });
Certificates.belongsTo(Company, { foreignKey: 'companyId' });
Districts.belongsToMany(Company, { through: CompanyDistricts, foreignKey: 'district_id', as: 'companies' });
User.belongsToMany(Company, { through: UserCompany, foreignKey: 'userId', as: 'companies' });

Features.hasMany(UsersFeatures, { foreignKey: 'featureId', as: 'userFeatures' });
UsersFeatures.belongsTo(Features, { foreignKey: 'featureId' });

// MissionLog has HourLog relation
MissionLog.hasMany(HourLog, { foreignKey: 'missionLogId', as: 'hourLogs' });
HourLog.belongsTo(MissionLog, { foreignKey: 'missionLogId' });

// Export models
export {
  User,
  AssistantThreads,
  Calendar,
  Certificates,
  Company,
  CompanyDistricts,
  Districts,
  Features,
  HourLog,
  Mission,
  MissionLog,
  MissionParticipants,
  Partnership,
  Permission,
  ResetAccount,
  SendgridLog,
  UserCompany,
  UserLog,
  UsersFeatures,
  ZohoToken,
  sequelize,
};
