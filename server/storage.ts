import { users, scenarios, type User, type InsertUser, type Scenario, type InsertScenario } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getScenario(id: number): Promise<Scenario | undefined>;
  getScenariosByUser(userId: number): Promise<Scenario[]>;
  createScenario(scenario: InsertScenario & { userId?: number }): Promise<Scenario>;
  updateScenario(id: number, scenario: Partial<InsertScenario>): Promise<Scenario | undefined>;
  deleteScenario(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private scenarios: Map<number, Scenario>;
  private currentUserId: number;
  private currentScenarioId: number;

  constructor() {
    this.users = new Map();
    this.scenarios = new Map();
    this.currentUserId = 1;
    this.currentScenarioId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getScenario(id: number): Promise<Scenario | undefined> {
    return this.scenarios.get(id);
  }

  async getScenariosByUser(userId: number): Promise<Scenario[]> {
    return Array.from(this.scenarios.values()).filter(
      (scenario) => scenario.userId === userId,
    );
  }

  async createScenario(insertScenario: InsertScenario & { userId?: number }): Promise<Scenario> {
    const id = this.currentScenarioId++;
    const scenario: Scenario = {
      ...insertScenario,
      id,
      userId: insertScenario.userId || null,
    };
    this.scenarios.set(id, scenario);
    return scenario;
  }

  async updateScenario(id: number, updates: Partial<InsertScenario>): Promise<Scenario | undefined> {
    const scenario = this.scenarios.get(id);
    if (!scenario) return undefined;

    const updatedScenario = { ...scenario, ...updates };
    this.scenarios.set(id, updatedScenario);
    return updatedScenario;
  }

  async deleteScenario(id: number): Promise<boolean> {
    return this.scenarios.delete(id);
  }
}

export const storage = new MemStorage();
