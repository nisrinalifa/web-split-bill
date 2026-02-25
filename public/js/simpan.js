function simpanTagihan() {
    console.log("Proses simpan dimulai...");

    // 1. Ambil Data Utama dari Input HTML
    const judul = document.getElementById('judul').value; // Pastikan ID di HTML: <input id="judul">
    const total = document.getElementById('total').value; // Pastikan ID di HTML: <input id="total">
    const metode = document.getElementById('metode').value; // Pastikan ID di HTML: <select id="metode">

    // 2. Ambil Data Array (Menu & Anggota)
    // Asumsinya kamu punya variable global atau fungsi untuk mengambil list ini dari tabel HTML
    // Kalau di PHP dulu kamu kirim JSON, disini kita ambil langsung object-nya.
    
    // Contoh struktur data yang diharapkan (Sesuai PHP kamu tadi):
    /*
    const listMenu = [
        { namaItem: "Nasi Goreng", qty: 1, harga: 15000 },
        { namaItem: "Es Teh", qty: 2, harga: 5000 }
    ];
    */
   
    // TAPI, karena saya belum lihat HTML tabelmu, kita pakai data kosong dulu atau panggil fungsi pengumpul data
    // Nanti kita perbaiki bagian ini kalau kamu kasih lihat HTML tabel menunya.
    const listMenu = ambilDataMenuDariTabel(); 
    const listAnggota = ambilDataAnggotaDariTabel(); 

    // 3. Cek Login & Validasi
    const user = firebase.auth().currentUser;

    if (!user) {
        alert("Eits, login dulu dong!");
        window.location.href = "/"; // Tendang ke login
        return;
    }

    if (!judul || !total) {
        alert("Judul dan Total tidak boleh kosong!");
        return;
    }

    // 4. KIRIM KE FIREBASE (Ini pengganti cURL PHP)
    const db = firebase.firestore();

    db.collection("bills").add({
        // Data User (PENTING)
        uid: user.uid,              
        
        // Data Tagihan (Sesuai struktur PHP kamu)
        judulTagihan: judul,
        totalSemua: parseInt(total), // Ubah jadi angka
        metodeBayar: metode,
        
        // Data Array (Langsung simpan array, gak perlu looping mapValue!)
        daftarMenu: listMenu,       
        daftarAnggota: listAnggota, 
        
        // Timestamp server
        dibuatPada: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then((docRef) => {
        // SUKSES
        console.log("Document written with ID: ", docRef.id);
        alert("Berhasil disimpan!");
        window.location.href = "/home"; // Balik ke Dashboard
    })
    .catch((error) => {
        // ERROR
        console.error("Error adding document: ", error);
        alert("Gagal menyimpan: " + error.message);
    });
}

// --- FUNGSI BANTUAN (Dummy) ---
// Kamu perlu sesuaikan ini dengan cara kamu menaruh data menu di HTML

function ambilDataMenuDariTabel() {
    // Logika untuk mengambil data dari tabel input menu kamu
    // Sementara kita return array kosong dulu biar gak error
    return []; 
}

function ambilDataAnggotaDariTabel() {
    // Logika untuk mengambil data dari tabel input anggota kamu
    return [];
}