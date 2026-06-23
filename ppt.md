# 📊 PRESENTASI DATA MINING 2026
**Kelompok 3** | Mata Kuliah: Data Mining

---

## Slide 1: Judul Project
> ⏱ Waktu: ±1,5 menit

### Judul Project
**"Analisis Sentimen Ulasan Produk Shopee Menggunakan Klasifikasi Machine Learning: Komparasi SVM, Naïve Bayes, dan KNN"**
*(Studi Kasus: Toko Bummi Tani — Tepung Ketan Hitam)*

---

### Nama Kelompok & Anggota

**Kelompok 3**

| No | Nama Anggota |
|----|-------------|
| 1  | *(isi nama)* |
| 2  | *(isi nama)* |
| 3  | *(isi nama)* |

---

### Masalah Utama yang Dianalisis

- Toko **Bummi Tani** di Shopee memiliki ratusan ulasan pelanggan yang terus bertambah
- Menganalisis ratusan ulasan secara manual **tidak efisien** dan rawan bias subjektif
- **Rating bintang tidak representatif** sebagai indikator sentimen — 99,8% pembeli memberi bintang 5, sehingga tidak dapat dijadikan label
- Dibutuhkan sistem **otomatis berbasis Machine Learning** untuk mengklasifikasikan opini pelanggan secara cepat dan akurat

---

### Tujuan Analitik
**→ Text Mining + Klasifikasi (Classification)**

| Tujuan | Detail |
|--------|--------|
| 1 | Mengidentifikasi distribusi sentimen **Positif / Negatif** pada ulasan Shopee Bummi Tani |
| 2 | Membangun model klasifikasi sentimen menggunakan **SVM, Naïve Bayes, dan KNN** |
| 3 | Membandingkan performa ketiga algoritma untuk menemukan model **terbaik** |
| 4 | Menyediakan sistem prediksi sentimen **ulasan baru** secara real-time |

---

### Pertanyaan yang Dijawab

| Pertanyaan | Jawaban |
|------------|---------|
| Apa masalah nyata yang ingin diselesaikan? | Sulitnya menganalisis ratusan ulasan teks secara manual untuk menilai kepuasan pelanggan UMKM di Shopee |
| Mengapa data mining sesuai? | Data ulasan bervolume besar, tidak terstruktur, dan membutuhkan klasifikasi berbasis pola teks secara otomatis — tidak mungkin dilakukan manual |
| Apa output analitik yang diharapkan? | Model klasifikasi terbaik yang mampu memprediksi sentimen ulasan baru dengan **akurasi ≥ 80%** |
| Apakah tujuan sudah spesifik dan terukur? | ✅ Ya — target akurasi ≥ 80%, membandingkan 3 algoritma, output berupa sistem prediksi real-time |

---

---

## Slide 2: Dataset dan Preprocessing
> ⏱ Waktu: ±2 menit

### Dataset dan Kondisi Awal

**Sumber Dataset & Cara Memperoleh:**
- **Sumber:** Ulasan produk Toko Bummi Tani di platform Shopee
- **Cara perolehan:** Web scraping menggunakan JavaScript (`1-data-scraping.js`)
- **Produk:** Tepung Ketan Hitam

**Informasi Dataset:**

| Aspek | Detail |
|-------|--------|
| Jumlah baris | **499 ulasan** |
| Jumlah kolom | **6 kolom** |
| Periode data | **2022 – 2026** (mayoritas 2025: 380 ulasan) |

**Kolom Dataset:**

| Kolom | Keterangan | Peran |
|-------|-----------|-------|
| `No` | Nomor urut | — |
| `Username` | Nama reviewer | — |
| `Rating` | Bintang 1–5 | Tidak digunakan sebagai label |
| `Waktu` | Tanggal & waktu ulasan | — |
| `Ulasan Text` | Teks ulasan | **Variabel utama** |
| `Variasi` | Variasi produk yang dibeli | — |
| `label` | Hasil labeling lexicon | **Target/Label** |

---

**Masalah Awal Data:**

| Masalah | Detail |
|---------|--------|
| **Duplikasi** | 6 ulasan terduplikat pada kolom `Ulasan Text` |
| **Teks terlalu pendek** | Beberapa ulasan hanya berisi username atau simbol (< 3 kata bermakna) |
| **Data tidak seimbang** | 98% rating bintang 5 → tidak bisa dijadikan label sentimen |
| **Noise teks** | Emoji, URL, angka, tanda baca, dan username menempel dalam teks ulasan |
| **Kata tidak baku** | Banyak slang/singkatan: "cepett", "gercep", "mantul", "bgt", "oke" |
| **Missing value** | Tidak ada (0 missing), namun panjang teks sangat bervariasi (4–527 karakter) |

---

### Preprocessing yang Sudah Dilakukan

**Pipeline Preprocessing (6 Tahap Berurutan):**

```
[Teks Mentah]
      ↓
1. Case Folding     → Ubah semua huruf ke huruf kecil
      ↓
2. Cleaning         → Hapus URL, emoji, angka, tanda baca, spasi berlebih
      ↓
3. Normalisasi      → Perbaiki 94 kata slang menggunakan kamus kustom
                      (cepett→cepat, mantul→bagus, gercep→cepat)
      ↓
4. Tokenizing       → Pisah teks menjadi token kata (NLTK word_tokenize)
      ↓
5. Stopword Removal → Hapus kata tidak bermakna
                      (NLTK Indonesian stopwords + 50+ custom stopwords)
      ↓
6. Stemming         → Ubah kata ke bentuk dasar (PySastrawi)
      ↓
[Teks Bersih — siap modeling]
```

**Pelabelan — InSet Lexicon (pengganti rating bintang):**
- Kamus 9.074 kata: 3.609 positif + 6.607 negatif (sumber: github.com/fajri91/InSet)
- Aturan: Total skor kata > 0 → **Positif (1)** | Total skor ≤ 0 → **Negatif (0)**

**Feature Extraction — TF-IDF:**
- TfidfVectorizer: `max_features=3.000`, `ngram_range=(1,2)`, `min_df=2`, `sublinear_tf=True`
- Menghasilkan: **801 fitur efektif** (unigram + bigram)

**Penanganan Imbalance — SMOTE (hanya pada data latih):**
- Sebelum SMOTE: 339 Positif vs 49 Negatif (rasio 7:1)
- Sesudah SMOTE: **339 Positif : 339 Negatif** (seimbang sempurna)

---

**Dataset Akhir Siap Modeling:**

| Tahap | Jumlah |
|-------|--------|
| Data awal | 499 baris |
| Setelah hapus duplikat & teks pendek | 491 baris |
| Setelah preprocessing (hapus teks kosong) | **485 baris** |
| — Positif | **424 ulasan (87.4%)** |
| — Negatif | **61 ulasan (12.6%)** |
| Data Latih (X_train) | 388 sampel, 801 fitur |
| Data Uji (X_test) | 97 sampel, 801 fitur |
| Data Latih setelah SMOTE | **678 sampel (seimbang)** |

---

**Visualisasi:** Bar chart distribusi label sentimen (Positif: 424 vs Negatif: 61) + Flowchart pipeline preprocessing 6 tahap

---

---

## Slide 3: Model Awal dan Skenario Eksperimen
> ⏱ Waktu: ±2 menit

### Model Awal

**Algoritma yang Digunakan:**

| Model | Library | Parameter Utama |
|-------|---------|----------------|
| **SVM** (Support Vector Machine, Kernel Linear) | `scikit-learn` LinearSVC | C = 1.0, max_iter = 2000 |
| **Naïve Bayes** (Multinomial) | `scikit-learn` MultinomialNB | alpha = 1.0 (Laplace smoothing) |
| **KNN** (K-Nearest Neighbor) | `scikit-learn` KNeighborsClassifier | k = 5, metric = cosine, algorithm = brute |

**Alasan Algoritma Dipilih:**
- **SVM:** Terbukti efektif untuk klasifikasi teks berdimensi tinggi (sparse TF-IDF matrix); bekerja optimal pada data high-dimensional dan linear-separable
- **Naïve Bayes:** Baseline klasik NLP yang cepat dan cocok untuk fitur berbasis frekuensi kata/TF-IDF; sering kompetitif untuk teks pendek
- **KNN:** Algoritma berbasis jarak (cosine similarity) yang tidak membuat asumsi distribusi data; digunakan sebagai pembanding pendekatan lazy-learning

**Pembagian Data Training/Testing:**
- Split: **80% Training : 20% Testing** (Stratified Split — menjaga proporsi kelas)
- Training: 388 sampel → setelah SMOTE: **678 sampel**
- Testing: **97 sampel** (tidak disentuh SMOTE, mencerminkan kondisi nyata)

**Tools yang Digunakan:**

| Kategori | Tools |
|----------|-------|
| Bahasa & Lingkungan | Python 3 + Jupyter Notebook |
| Data Manipulation | pandas, numpy |
| NLP & Preprocessing | NLTK, PySastrawi (Stemmer Bahasa Indonesia) |
| Feature Extraction | scikit-learn (TF-IDF) |
| Imbalance Handling | imbalanced-learn (SMOTE) |
| Modeling | scikit-learn (LinearSVC, MultinomialNB, KNeighborsClassifier) |
| Visualisasi | matplotlib, seaborn |

---

### Skenario Eksperimen

- **Skenario:** Perbandingan **3 algoritma** pada kondisi identik (fitur, data, dan validasi yang sama)
- **Validasi:** **10-Fold Stratified Cross Validation** (k=10) pada data latih (setelah SMOTE)
  - Stratified = proporsi kelas dipertahankan di setiap fold
  - Random State = 42 (reproducible)
- **Fitur yang digunakan:** TF-IDF **801 fitur** (unigram + bigram) — identik untuk semua model
- **Parameter yang diubah per model:**
  - SVM: C (regularization strength)
  - Naïve Bayes: alpha (smoothing)
  - KNN: k (jumlah tetangga) dan metric jarak

| Skenario | Model | Fitur | Validasi |
|----------|-------|-------|----------|
| Model 1 | SVM (Kernel Linear) | TF-IDF 801 | 10-Fold CV |
| Model 2 | Multinomial Naïve Bayes | TF-IDF 801 | 10-Fold CV |
| Model 3 | KNN (k=5, cosine) | TF-IDF 801 | 10-Fold CV |

---

---

## Slide 4: Hasil Evaluasi dan Interpretasi Awal
> ⏱ Waktu: ±3 menit

### Hasil Evaluasi — Classification

**Hasil Cross Validation (10-Fold, Data Latih + SMOTE):**

| Model | CV Accuracy | Std Deviasi | Waktu CV |
|-------|------------|-------------|----------|
| 🥇 **SVM (Kernel Linear)** | **95.87%** | ± 2.53% | 7.72 detik |
| 🥈 Multinomial Naïve Bayes | 90.70% | ± 2.66% | 0.07 detik |
| 🥉 KNN (k=5, cosine) | 88.50% | ± 4.00% | 0.27 detik |

**Hasil Evaluasi pada Data Uji (97 sampel, kondisi nyata):**

| Model | Accuracy | Precision (weighted) | Recall (weighted) | F1-Score (weighted) |
|-------|----------|---------------------|-------------------|---------------------|
| 🥇 **SVM** | **80.41%** | 87.20% | 80.41% | **82.81%** |
| 🥈 Naïve Bayes | 77.32% | 87.80% | 77.32% | 80.68% |
| 🥉 KNN | 74.23% | 85.89% | 74.23% | 78.14% |

> ✅ **Target akurasi ≥ 80% tercapai oleh SVM (80.41%)**

**Confusion Matrix — SVM (Model Terbaik):**

|  | Prediksi: Negatif | Prediksi: Positif |
|--|:-----------------:|:-----------------:|
| **Aktual: Negatif** | **8** (TP) | 4 (FP) |
| **Aktual: Positif** | 15 (FN) | **70** (TP) |

*(dari 97 data uji: 12 Negatif + 85 Positif)*

---

### Interpretasi Awal

**Apa arti angka evaluasi tersebut?**
- SVM mencapai **80.41% akurasi** pada data uji → melampaui target yang ditetapkan (≥ 80%) ✅
- **Precision 87.20%**: dari semua ulasan yang diprediksi Positif, sebanyak 87% memang benar-benar Positif
- **F1-Score 82.81%**: keseimbangan antara precision dan recall — SVM konsisten dalam kedua arah prediksi
- Gap CV vs Test (95.87% → 80.41%): ada selisih ~15%, menunjukkan kemungkinan **slight overfitting** terhadap data sintetis SMOTE

**Pola yang ditemukan:**
- Dataset sangat dominan sentimen **Positif (87.4%)** → pelanggan Bummi Tani secara umum **sangat puas** dengan produk tepung ketan hitam
- Aspek yang paling sering dipuji: **rasa/tekstur** produk, **kecepatan pengiriman**, dan **keamanan kemasan**
- Kata berpengaruh **Positif:** `enak`, `bagus`, `lembut`, `cepat`, `amanah`, `lezat`, `laris manis`, `rekomendasi`
- Kata berpengaruh **Negatif:** `rusak`, `bocor`, `kasar`, `susah`, `kecewa`, `tidak ada`

**Fitur/variabel yang berpengaruh:**
- Fitur TF-IDF dengan bobot tertinggi berasal dari kata sifat dan kata keterangan yang menggambarkan kualitas produk dan layanan
- Bigram yang relevan: "enak banget", "ketan hitam", "lembut banget", "pengiriman cepat"

**Apakah hasil sudah menjawab rumusan masalah?**

| Pertanyaan Penelitian | Jawaban |
|----------------------|---------|
| Algoritma mana yang paling akurat? | ✅ **SVM** — akurasi 80.41% (test), 95.87% (CV) |
| Bagaimana distribusi sentimen? | ✅ **Positif: 424 (87.4%) vs Negatif: 61 (12.6%)** — mayoritas positif |
| Kata apa yang paling berpengaruh? | ✅ Teridentifikasi melalui TF-IDF: `enak`, `bagus`, `lembut`, `cepat` |

**Kelemahan hasil sementara:**
- Kelas **Negatif sulit dideteksi** — recall Negatif SVM hanya 0.67 (dari 12 data negatif, hanya 8 yang benar terprediksi)
- Penyebab: data Negatif sangat sedikit (61 dari 485 = 12.6%), dan banyak ulasan "netral/singkat" yang masuk label Negatif karena skor lexicon = 0 (bukan ulasan yang benar-benar mengkritik)
- Gap antara CV accuracy (95.87%) dan test accuracy (80.41%) sebesar ~15% mengindikasikan **model sedikit overfitting** terhadap data SMOTE yang sintetis

---

---

## Slide 5: Progress Laporan, Kendala, dan Rencana Final
> ⏱ Waktu: ±1,5 menit

### Progress Laporan

| Bab | Status | Isi |
|-----|--------|-----|
| **Bab I** | ✅ Selesai | Latar belakang e-commerce & UMKM, rumusan masalah, tujuan klasifikasi sentimen, manfaat bagi toko Bummi Tani |
| **Bab II** | 🔄 80% | Teori SVM, Naïve Bayes, KNN; penjelasan TF-IDF, SMOTE, InSet Lexicon, CRISP-DM — **perlu tambah 3–5 referensi jurnal** |
| **Bab III** | ✅ Selesai | Metodologi CRISP-DM 6 fase, sumber data (scraping Shopee), pipeline preprocessing 6 tahap, skenario 3 model + 10-Fold CV |
| **Bab IV** | ✅ Selesai | Hasil CV & evaluasi data uji, confusion matrix, tabel komparasi metrik, visualisasi distribusi skor sentimen |
| **Bab V** | 🔄 60% | Kesimpulan awal (SVM terbaik), analisis ketidakseimbangan data — **perlu rekomendasi perbaikan lebih detail** |

---

### Kendala dan Rencana Perbaikan

| Kendala | Dampak | Rencana Perbaikan |
|---------|--------|-------------------|
| **Imbalance kelas ekstrem** — Negatif hanya 12.6% (61 data) | Recall Negatif rendah (0.67); model cenderung bias ke Positif | Coba `class_weight='balanced'` pada SVM; atau tuning threshold prediksi |
| **Pelabelan lexicon kurang presisi** — ulasan "netral/singkat" masuk Negatif karena skor = 0 | Label Negatif banyak yang tidak merepresentasikan keluhan nyata | Revisi aturan: skor = 0 diberi toleransi atau threshold digeser ke ≥ -1 |
| **Gap CV vs Test accuracy ~15%** | Kemungkinan overfitting terhadap data sintetis SMOTE | Terapkan SMOTE di dalam pipeline CV (bukan pre-split) |
| **Notebook Evaluation & Deployment belum dijalankan** | Confusion matrix detail dan simulasi prediksi belum tersedia | Jalankan `5-Evaluation/evaluation.ipynb` dan `6-Deployment/deployment.ipynb` |
| **Referensi jurnal Bab II belum lengkap** | Validitas ilmiah laporan kurang kuat | Cari 3–5 jurnal tentang SVM analisis sentimen Bahasa Indonesia (Google Scholar) |
| **Visualisasi WordCloud belum dibuat** | Kata dominan belum tergambarkan secara visual | Buat WordCloud untuk kata-kata berpengaruh Positif dan Negatif |

---

### Target Output Akhir

| Output | Status |
|--------|--------|
| 📄 Laporan lengkap (Bab I–V) | 🔄 Bab II & V perlu dilengkapi |
| 📓 Notebook CRISP-DM (6 fase) | 🔄 4 dari 6 fase selesai (Evaluation & Deployment menyusul) |
| 📊 Dataset bersih `ulasan_bersih.csv` | ✅ Tersimpan (485 baris, siap pakai) |
| 🤖 Model terlatih `.pkl` | ✅ `svm_model.pkl`, `nb_model.pkl`, `knn_model.pkl` |
| 📑 Slide Presentasi | 🔄 Sedang dikerjakan |
| 🔬 Jurnal Mini | ❌ Belum dimulai |

---

### Penutup Presentasi

> **Capaian saat ini:**
> Pipeline analisis sentimen dari scraping hingga modeling telah selesai dibangun — SVM berhasil mencapai akurasi **80.41%** pada data uji dengan 10-Fold CV **95.87%**, melampaui target yang ditetapkan.

> **Rencana menuju final:**
> Kami akan menyempurnakan pelabelan lexicon, menyelesaikan notebook Evaluation & Deployment, menambahkan visualisasi WordCloud, serta melengkapi referensi jurnal untuk memperkuat validitas laporan akhir.

---

---

## 📌 Ringkasan Eksekutif (Backup Slide)

```
┌──────────────────────────────────────────────────────┐
│       ANALISIS SENTIMEN SHOPEE — BUMMI TANI          │
│              Kelompok 3 | Data Mining 2026           │
├──────────────────────────────────────────────────────┤
│  DATASET  : 499 ulasan Shopee → 485 data bersih      │
│  LABEL    : Positif 424 (87%) | Negatif 61 (13%)    │
│  FITUR    : TF-IDF 801 fitur (unigram + bigram)      │
│  VALIDASI : 10-Fold Stratified CV + SMOTE            │
├────────────────┬───────────┬────────────┬────────────┤
│ MODEL          │ CV Acc    │ Test Acc   │ F1-Score   │
├────────────────┼───────────┼────────────┼────────────┤
│ SVM       🥇   │  95.87%   │  80.41% ✅ │  82.81%   │
│ Naïve Bayes    │  90.70%   │  77.32%    │  80.68%   │
│ KNN            │  88.50%   │  74.23%    │  78.14%   │
├────────────────┴───────────┴────────────┴────────────┤
│  PEMENANG : SVM (Kernel Linear, C=1.0)               │
│  KENDALA  : Imbalance kelas → Recall Negatif = 0.67  │
└──────────────────────────────────────────────────────┘
```
