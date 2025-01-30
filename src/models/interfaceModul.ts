export interface InterDatabase{
    select<T>(query: string, params?: unknown[]): Promise<T[]>;
    execute(query: string, params?: unknown[]): Promise<boolean>;
}