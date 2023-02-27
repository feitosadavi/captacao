#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::process::Command;
use std::env;
use std::thread;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![start, stop])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command]
fn start(handle: tauri::AppHandle) {
  if cfg!(target_os="windows") {
  thread::spawn(move || {
    let resource_path = handle.path_resolver()
      .resolve_resource("_root_")
      .expect("failed to resolve resource");

    let path = &resource_path.display().to_string().replace(r"\\?\", "");

    let server_path_with_front = path.replace(r"C:", "");

    let index = server_path_with_front.find(r"\frontend").unwrap();

    let server_path = [&server_path_with_front[0..index], r"\backend"].join("");

    println!("{}", server_path);

    let command = ["node ", &path, &server_path, r"\dist\server.js"].join("");

    println!("{}", &command);
    Command::new("cmd")
      .args(["/C", &command])
      .output()
      .expect("failed to execute process");
  });

  } else {

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

// #[tauri::command]
// fn save_message(value: String) {
//   fs::write("/usr/share/captacao", value).unwrap();
// }
