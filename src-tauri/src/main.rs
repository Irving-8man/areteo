// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri_plugin_sql::{Migration, MigrationKind};
use tauri::api::notification::Notification;


fn main() {
    let migrations = vec![
    Migration {
        version: 1,
        description: "Crear tablas para la db",
        sql:"CREATE TABLE IF NOT EXISTS Administrador (
    id TEXT PRIMARY KEY NOT NULL,
    nombreComple TEXT NOT NULL,
    nombreUsuario TEXT NOT NULL,
    contrasenia TEXT NOT NULL
    );
CREATE INDEX IF NOT EXISTS index_id ON Administrador (id);


CREATE TABLE IF NOT EXISTS Paciente (
            id TEXT PRIMARY KEY NOT NULL,
            primerNombre TEXT NOT NULL,
            segundoNombre TEXT NULL,
            apellidoPaterno TEXT NOT NULL,
            apellidoMaterno TEXT NULL,
            fechaRegistro TEXT NOT NULL,
            fechaNacimiento TEXT NOT NULL,
            sexo TEXT NOT NULL
    
);
CREATE INDEX IF NOT EXISTS index_id_pac ON Paciente (id);

CREATE TABLE IF NOT EXISTS RegistroMedico (
    id TEXT PRIMARY KEY NOT NULL,
    paciente_id TEXT NOT NULL,
    fechaDiagnostico TEXT NOT NULL,
    sexo TEXT NOT NULL,
    edad INTEGER NOT NULL,
    edadDicha TEXT NOT NULL,
    peso REAL NOT NULL,
    estatura REAL NOT NULL,
    presionArterialPAS_0min REAL NOT NULL,
    presionArterialPAD_0min REAL NOT NULL,
    presionArterialPAS_5min REAL NOT NULL,
    presionArterialPAD_5min REAL NOT NULL,
    hba1c REAL NOT NULL,
    anioDiagnostico TEXT NOT NULL,
    antecedFamiInfa TEXT NOT NULL,
    descripcionAntecedentes TEXT NULL,
    hdl REAL NOT NULL,
    tgc REAL NOT NULL,
    educacion TEXT NOT NULL,
    detalleEducacion TEXT NULL,
    estadoCivil TEXT NOT NULL,
    usaTratamientoInyectable BOOLEAN NOT NULL,
    usaTratamientoOral BOOLEAN NOT NULL,
    FOREIGN KEY (paciente_id) REFERENCES Paciente(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS index_id_Re ON RegistroMedico(id);


CREATE TABLE IF NOT EXISTS TratamientoInyectable (
    id TEXT PRIMARY KEY NOT NULL,
    registro_id TEXT NOT NULL,
    desdeCuandoIn TEXT NOT NULL,
    dosisIn TEXT NOT NULL,
    tipoNombreIn TEXT NOT NULL,
    FOREIGN KEY (registro_id) REFERENCES RegistroMedico(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS index_id_TratIn ON TratamientoInyectable(id);


CREATE TABLE IF NOT EXISTS TratamientoOral (
    id TEXT PRIMARY KEY NOT NULL,
    registro_id TEXT NOT NULL,
    desdeCuandoOr TEXT NOT NULL,
    dosisOr TEXT NOT NULL,
    nombreMedicamentoOr TEXT NOT NULL,
    FOREIGN KEY (registro_id) REFERENCES RegistroMedico(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS index_id_TratOra ON TratamientoOral(id);


CREATE TABLE IF NOT EXISTS Instrumento(
    id TEXT PRIMARY KEY NOT NULL,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    autor TEXT NOT NULL,
    adaptacionPor TEXT NOT NULL,
    fechaCreacion TEXT NOT NULL,
    fechaModific TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS index_id_Instru ON Instrumento(id);


CREATE TABLE IF NOT EXISTS RegistroEvalACIC (
    id TEXT PRIMARY KEY NOT NULL,
    area_id INTEGER NOT NULL,
    fechaEvaluacion TEXT NOT NULL,
    puntuacionTotal REAL NOT NULL,
    promedio REAL NOT NULL,
    aplicador TEXT NOT NULL,
    respondiente TEXT NOT NULL,
    evaluacionDicha TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS index_id_RegEvalACIC ON RegistroEvalACIC(id);


CREATE TABLE IF NOT EXISTS ResEvalACIC (
    id TEXT PRIMARY KEY NOT NULL,
    registroEvalACIC_id TEXT NOT NULL,
    orden REAL NOT NULL,
    puntuacion REAL NOT NULL,
    FOREIGN KEY (registroEvalACIC_id) REFERENCES RegistroEvalACIC(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS index_id_ResEvalACIC ON ResEvalACIC(id);


",
        kind: MigrationKind::Up,
    }
    ];

    tauri::Builder::default()
        .plugin(tauri_plugin_single_instance::init(|app, _, cwd| {
            Notification::new(&app.config().tauri.bundle.identifier)
                .title("ARETEO ya ha sido iniciado.")
                .body(cwd)
                
                .show()
                .unwrap();
        }))
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
