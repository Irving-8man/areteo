// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri_plugin_sql::{Migration, MigrationKind};


fn main() {
    let migrations = vec![
    Migration {
        version: 1,
        description: "Crear tabla Administrador",
        sql:"CREATE TABLE IF NOT EXISTS Administrador (
    id TEXT PRIMARY KEY NOT NULL,
    nombre TEXT NOT NULL,
    contrasenia TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS index_id ON Administrador (id);",
        kind: MigrationKind::Up,
    },
    ];

    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::default().build())
        .setup(|app| {
            let app_handle = app.handle();
            //1. Configuracion de la db
            let app_data_dir = app.path_resolver().app_data_dir().unwrap();
            let db_path = app_data_dir.join("db.sqlite");
            let db_path_str = String::from("sqlite:") + db_path.to_str().unwrap();

            app_handle
                .plugin(
                    tauri_plugin_sql::Builder::default()
                        .add_migrations(&db_path_str, migrations)
                        .build(),
                )
                .expect("error while building sql plugin");

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
