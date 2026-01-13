use rfd::FileDialog;

#[tauri::command]
pub fn pick_file() {
    let path = FileDialog::new().pick_file();
    match path {
        Some(x) => println!("Selected file {:?}",x),
        None => println!("No file selected")
    }
}