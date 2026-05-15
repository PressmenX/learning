import { spawn } from "node:child_process";
// Menjalankan perintah: echo "Halo dari Node.js"
// Di Windows/Mac/Linux perintah 'echo' berfungsi mencetak teks
const prosesEcho = spawn('ls', ['publc']);

// 1. Ambil data hasil perintah (stdout)
prosesEcho.stdout.on('data', (data) => {
    console.log(`Hasil Perintah: ${data}`);
});

// 2. Tangkap jika ada error dari sistem (stderr)
prosesEcho.stderr.on('data', (data) => {
    console.error(`Terjadi Error: ${data.toString()}`);
});

// 3. Deteksi saat perintah selesai berjalan
prosesEcho.on('close', (code) => {
    console.log(`Proses selesai dengan kode keluar: ${code}`);
});
