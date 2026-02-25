// 1. Cek Apakah User Sudah Login?
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // Kalau sudah login, jangan kasih diam di halaman login
        // Lempar langsung ke Home
        console.log("User terdeteksi: " + user.email);
        window.location.href = "/home";
    }
});

// 2. Fungsi Login
function prosesLogin() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    const btn = document.getElementById('btnLogin');

    if(!email || !pass) {
        alert("Email dan Password wajib diisi!");
        return;
    }

    // Ubah tombol biar user tau lagi loading
    btn.innerText = "Loading...";
    btn.disabled = true;
    btn.classList.add('opacity-50');

    firebase.auth().signInWithEmailAndPassword(email, pass)
        .then((userCredential) => {
            // Sukses! onAuthStateChanged di atas bakal jalan otomatis
            // Jadi gak perlu redirect manual disini
            console.log("Login Berhasil!");
        })
        .catch((error) => {
            // Gagal
            console.error(error);
            alert("Gagal Masuk: " + error.message);
            
            // Balikin tombol
            btn.innerText = "Masuk Sekarang";
            btn.disabled = false;
            btn.classList.remove('opacity-50');
        });
}

// 3. Fungsi Daftar (Register)
function prosesDaftar() {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;

    if(!email || !pass) {
        alert("Isi Email dan Password dulu untuk mendaftar!");
        return;
    }

    if(confirm("Yakin mau buat akun baru dengan email: " + email + "?")) {
        firebase.auth().createUserWithEmailAndPassword(email, pass)
            .then((userCredential) => {
                alert("Akun berhasil dibuat! Anda akan masuk otomatis.");
            })
            .catch((error) => {
                alert("Gagal Daftar: " + error.message);
            });
    }
};