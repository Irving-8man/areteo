import Database from "tauri-plugin-sql-api";
import { join, appDataDir } from "@tauri-apps/api/path";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let db: any = null;
export const dbPath = await join(await appDataDir(), "db.sqlite");

export async function getDbInstance() {
    if (!db) {
        db = await Database.load('sqlite:' + dbPath);
    }
    return db;
}


