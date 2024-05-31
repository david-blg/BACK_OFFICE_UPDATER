// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{Manager, Window};

// Close the splashscreen and show the main window
#[tauri::command]
async fn close_splashscreen(window: Window) {
  // Close splashscreen
  window.get_window("splashscreen").expect("no window labeled 'splashscreen' found").close().unwrap();
  // Show main window
  window.get_window("main").expect("no window labeled 'main' found").show().unwrap();
}

fn main() {
    tauri::Builder::default()
    .setup(|app| {
        #[cfg(debug_assertions)] // only include this code on debug builds
        {
        let window = app.get_window("main").unwrap();
        window.open_devtools();
        window.close_devtools();
        }
        Ok(())
    })
        .invoke_handler(tauri::generate_handler![close_splashscreen])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
