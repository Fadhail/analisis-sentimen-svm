(async () => {
    let targetReviews = 526;
    let allReviewsData = [];
    let seenReviewIDs = new Set();
    let pageNum = 1;

    console.log("🚀 Memulai Otomatisasi Universal (Anti-Bot & Akurat)...");

    // Fungsi utama pencatatan data ulasan per halaman
    function ambilDataHalaman() {
        let semuaDiv = document.querySelectorAll('div');
        let added = 0;

        semuaDiv.forEach((div) => {
            let textRaw = div.innerText || "";
            let matchTanggal = textRaw.match(/\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}/);

            if (matchTanggal && textRaw.length > 20 && textRaw.length < 1500) {
                let baris = textRaw.split('\n').map(b => b.trim()).filter(b => b.length > 0);
                let idxTanggal = baris.findIndex(b => b.match(/\d{4}-\d{2}-\d{2}\s+\d{2}:\d{2}/));
                
                if (idxTanggal !== -1) {
                    let waktu = baris[idxTanggal];
                    let username = (idxTanggal - 1 >= 0) ? baris[idxTanggal - 1] : "Anonymous";
                    
                    let isiKomentar = "";
                    let sisaBaris = baris.slice(idxTanggal + 1);
                    let teksGabung = sisaBaris.join(" ");
                    
                    if (teksGabung.includes("Membantu?")) {
                        isiKomentar = teksGabung.split("Membantu?")[0].trim();
                    } else {
                        isiKomentar = teksGabung.trim();
                    }

                    let variasi = "-";
                    if (isiKomentar.includes("Variasi:")) {
                        let parts = isiKomentar.split("Variasi:");
                        if (parts[1]) variasi = parts[1].split(" ")[0].trim();
                    }

                    let reviewID = `${username}_${waktu}_${isiKomentar.substring(0, 15)}`;

                    if (isiKomentar.length > 3 && !isiKomentar.startsWith("Variasi:") && !seenReviewIDs.has(reviewID)) {
                        seenReviewIDs.add(reviewID);
                        allReviewsData.push([
                            allReviewsData.length + 1,
                            username,
                            5, // Default Rating
                            waktu,
                            isiKomentar,
                            variasi
                        ]);
                        added++;
                    }
                }
            }
        });
        return added;
    }

    // Fungsi Otomatis untuk Mengunduh langsung ke CSV
    function unduhFileCSV() {
        let csvContent = "\uFEFFNo,Username,Rating,Waktu,Ulasan Text,Variasi\n";
        allReviewsData.forEach((row, index) => {
            row[0] = index + 1; // Rapikan ulang nomor urut
            let cleanRow = row.map(val => `"${String(val).replace(/"/g, '""')}"`);
            csvContent += cleanRow.join(",") + "\n";
        });

        let blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        let link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", `ulasan_shopee_otomatis_${targetReviews}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        console.log("💾 File CSV berhasil diunduh secara otomatis!");
    }

    // Alur Perulangan Otomatis Berbasis Observer & Deteksi Halaman
    while (allReviewsData.length < targetReviews) {
        console.log(`📦 Memproses halaman ulasan ke-${pageNum}...`);
        
        // Ambil data halaman aktif saat ini
        let hasilAmbil = ambilDataHalaman();
        console.log(`📈 Halaman ${pageNum}: +${hasilAmbil} ulasan terverifikasi.`);
        console.log(`📊 Total Akumulasi: ${allReviewsData.length}/${targetReviews}`);

        if (allReviewsData.length >= targetReviews) break;

        // Cari tombol Next
        let nextButton = document.querySelector('button.shopee-icon-button--right');
        if (!nextButton || nextButton.disabled || nextButton.getAttribute('aria-disabled') === 'true') {
            console.log("🏁 Tombol 'Next' habis atau dinonaktifkan. Selesai!");
            break;
        }

        // Pindahkan fokus layar ke tombol Next dan Klik
        nextButton.scrollIntoView({ block: "center" });
        
        // Buat observer untuk menunggu render halaman baru selesai (Anti-0-Data)
        const tungguHalamanBaru = new Promise((resolve) => {
            const listUlasan = document.querySelector('.shopee-product-comment-list') || document.body;
            const observer = new MutationObserver(() => {
                observer.disconnect();
                resolve();
            });
            observer.observe(listUlasan, { childList: true, subtree: true });
            
            // Trigger klik halaman berikutnya
            nextButton.click();
        });

        pageNum++;
        
        // Tunggu proses render selesai + berikan jeda waktu acak (human-like delay) agar aman
        await tungguHalamanBaru;
        let jedaAcak = 3500 + Math.random() * 2000; // Jeda dinamis antara 3.5 - 5.5 detik
        await new Promise(resolve => setTimeout(resolve, jedaAcak));
    }

    console.log("\n🎉 PROSES SELESAI PENUH DAN AKURAT!");
    unduhFileCSV();
})();