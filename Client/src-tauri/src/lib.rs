mod filepicker;

use serde::{Deserialize, Serialize};
use std::io::Write;
use tauri::Manager;

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Config {
    pub initialized: bool,
    pub sync_folder: Option<String>,
    pub user_id: Option<String>,
    pub last_sync: Option<i64>,
}

fn create_config_file(app: &tauri::AppHandle) -> Result<(), Box<dyn std::error::Error>> {
    let config_dir = app.path().app_config_dir()?;

    std::fs::create_dir_all(&config_dir)?;

    let config_path = config_dir.join("config.json");

    let config = Config {
        initialized: true,
        sync_folder: None,
        user_id: None,
        last_sync: None,
    };

    if config_path.exists() {
        println!("Config already exists.");
        return Ok(());
    }

    let json = serde_json::to_string_pretty(&config)?;
    std::fs::write(&config_path, json)?;

    println!("Config created : {:?}", config_path);
    Ok(())
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            if let Err(e) = create_config_file(app.handle()) {
                eprintln!("Error while creating config file : {}", e);
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet, filepicker::pick_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
