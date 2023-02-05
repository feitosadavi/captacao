#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::process::Command;

use std::thread;

#[tauri::command]
fn start() {
  println!("Iniciando bot");
  // if cfg!(target_os = "windows") {
  //   println!("windows");
  //   Command::new("cmd").args(["npm run bot:start"]).output().expect("failed to execute process");
  // } else {
  //   println!("linux");
  // }
  thread::spawn(move || {
    Command::new("sh")
    .arg("-c")
    .arg("npm run bot:start")
    .output()
    .expect("failed to execute process");
  });
}

#[tauri::command]
fn stop() {
  // if cfg!(target_os = "windows") {
  //   println!("windows");
  //   Command::new("cmd").args(["npm run bot:start"]).output().expect("failed to execute process");
  // } else {
  //   println!("linux");
  // }
  println!("Parando bot");
  thread::spawn(move || {
    Command::new("sh")
    .arg("-c")
    .arg("kill -9 `lsof -t -i:1200`")
    .output()
    .expect("failed to execute process");
  });
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![start, stop])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
