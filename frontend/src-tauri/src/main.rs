#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::process::Command;
use std::env;
use std::thread;

#[tauri::command]
fn start() {
  println!("Iniciando bot");
  thread::spawn(move || {
    Command::new("sh")
      .arg("-c")
      // .arg("node /usr/share/captacao/dist/server.js")
      .arg("node /home/eu/Documents/projects/captacao/backend/dist/server.js")
      .spawn()
      .expect("node command failed to start");
          
  });
}

#[tauri::command]
fn stop() {
  println!("Parando bot");
    Command::new("sh")
    .arg("-c")
    .arg("kill -7 `lsof -t -i:5000`")
    .output()
    .expect("failed to execute process");
}

#[derive(Clone, serde::Serialize)]
struct Payload {
  message: String,
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![start, stop])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
