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
  // if cfg!(target_os = "windows") {
  //   println!("windows");
  //   Command::new("cmd").args(["npm run bot:start"]).output().expect("failed to execute process");
  // } else {
  //   println!("linux");
  // }
  thread::spawn(move || {
    // let dir = env::current_exe().expect("Couldn't");
    // println!("{}", dir.display());

    // Command::new("sh")
    // .arg("-c")
    // .arg("pwd")
    // .spawn()
    // .expect("pwd command failed to start");
    // Command::new("ls")
    //         .arg("-l")
    //         .arg("-a")
    //         .spawn()
    //         .expect("ls command failed to start");
          // Command::new("sh")
          // .arg("-c")
          // .arg("cd")
          // .spawn()
          // .expect("cd command failed to start");
    Command::new("sh")
      .arg("-c")
      .arg("node /usr/share/captacao/dist/server.js")
      .spawn()
      .expect("node command failed to start");
          
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
    .arg("kill -2 `lsof -t -i:5000`")
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
