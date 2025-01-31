import Database from "tauri-plugin-sql-api";
import { join, appDataDir } from "@tauri-apps/api/path";
import { InterDatabase } from "@/models/interfaceModul";

export class SqliteDatabase implements InterDatabase {

    private static instance: SqliteDatabase | null = null;
    private db: Database | null = null;
    private constructor() {}

    public static async getInstance(): Promise<SqliteDatabase> {
        if (!this.instance) {
            this.instance = new SqliteDatabase();
            const dbPath = await join(await appDataDir(), "db.sqlite");
            this.instance.db = await Database.load(`sqlite:${dbPath}`);
        }
        return this.instance;
    }

    public async select<T>(query: string, params: unknown[] = []): Promise<T[]> {
        if (!this.db) throw new Error("La base de datos no está inicializada.");
        return await this.db.select(query, params);
    }

    public async execute(query: string, params: unknown[] = []): Promise<boolean> {
        if (!this.db) throw new Error("La base de datos no está inicializada.");
        await this.db.execute(query, params);
        return true;
    }
}
