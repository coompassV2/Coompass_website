
import { sequelize } from "@/lib/sequelize";
import * as models from "@/models";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

// Initialize Sequelize models
export const initializeDatabase = async () => {
  try {
    // Sync all models with database
    await sequelize.sync({ alter: true });
    console.log("Database synchronized with Sequelize models");
    
    // You can seed initial data here if needed
  } catch (error) {
    console.error("Failed to sync database:", error);
  }
};

// Example function to create a user
export const createUser = async (email: string, password: string, name: string, type: string = 'volunteer') => {
  try {
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Create the user
    const user = await models.User.create({
      id: uuidv4(),
      email,
      key: hashedPassword, // Using the key field to store the hashed password
      username: name,
      type,
    });
    
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Example function to authenticate a user
export const authenticateUser = async (email: string, password: string) => {
  try {
    // Find the user
    const user = await models.User.findOne({
      where: { email }
    });
    
    if (!user) {
      return { authenticated: false, message: "User not found" };
    }
    
    // Check password
    const passwordValid = await bcrypt.compare(password, user.key);
    
    if (!passwordValid) {
      return { authenticated: false, message: "Invalid password" };
    }
    
    // Update last login
    await user.update({
      lastLogin: new Date()
    });
    
    return { authenticated: true, user };
  } catch (error) {
    console.error("Error authenticating user:", error);
    throw error;
  }
};

// Example function to create a company
export const createCompany = async (name: string, description: string, creatorId: string, type: string = 'company') => {
  try {
    // Create the company
    const company = await models.Company.create({
      id: uuidv4(),
      name,
      description,
      creator: creatorId,
      type,
    });
    
    // Associate the creator with the company
    await models.UserCompany.create({
      userId: creatorId,
      companyId: company.id
    });
    
    return company;
  } catch (error) {
    console.error("Error creating company:", error);
    throw error;
  }
};

// Example function to create a mission
export const createMission = async (
  title: string, 
  description: string, 
  companyId: string, 
  creatorId: string,
  causes: string[] = [],
  skills: string[] = [],
  whenStart?: Date,
  whenFinish?: Date
) => {
  try {
    // Create the mission
    const mission = await models.Mission.create({
      id: uuidv4(),
      title,
      description,
      companyId,
      creator: creatorId,
      causes,
      skills,
      state: 'draft',
      when_start: whenStart,
      when_finish: whenFinish
    });
    
    // Log the mission creation
    await models.MissionLog.create({
      action: 'created',
      userId: creatorId,
      missionId: mission.id,
    });
    
    return mission;
  } catch (error) {
    console.error("Error creating mission:", error);
    throw error;
  }
};
