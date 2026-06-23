# 📦 Analisis Sentimen Ulasan Produk Shopee — Bummi Tani

## 1. Latar Belakang

Di era e-commerce yang semakin kompetitif, ulasan pelanggan merupakan aset informasi yang sangat berharga. Toko **Bummi Tani** di platform Shopee menjual produk tepung ketan hitam dan memiliki ratusan ulasan dari pelanggan. Ulasan-ulasan ini mengandung opini yang mencerminkan tingkat kepuasan pelanggan terhadap produk, harga, pengemasan, dan pengiriman.

Namun, membaca dan menganalisis ratusan hingga ribuan ulasan secara manual adalah proses yang tidak efisien. Oleh karena itu, diperlukan pendekatan otomatis berbasis **Machine Learning** untuk mengklasifikasikan sentimen ulasan secara cepat dan akurat.

---

## 2. Tujuan Proyek (Business Goals)

| No | Tujuan |
|----|--------|
| 1 | Mengidentifikasi proporsi ulasan **Positif** dan **Negatif** dari data ulasan Shopee Bummi Tani |
| 2 | Membangun model klasifikasi sentimen menggunakan 3 algoritma: **SVM, Naïve Bayes, dan KNN** |
| 3 | Membandingkan performa ketiga algoritma untuk menemukan model **terbaik** dan paling akurat |
| 4 | Menyediakan sistem simulasi yang dapat memprediksi sentimen **ulasan baru** secara real-time |

---

## 3. Pertanyaan Penelitian (Research Questions)

1. Algoritma mana yang menghasilkan akurasi tertinggi dalam klasifikasi sentimen ulasan Shopee?
2. Bagaimana distribusi sentimen (positif/negatif) pada ulasan produk Bummi Tani?
3. Kata-kata apa yang paling sering muncul pada ulasan positif dan negatif?

---

## 4. Pendekatan Metodologi (CRISP-DM)

Proyek ini menggunakan kerangka kerja **CRISP-DM (Cross-Industry Standard Process for Data Mining)** yang terdiri dari 6 fase:

```
1. Business Understanding  → Definisi tujuan & rumusan masalah
2. Data Understanding      → Eksplorasi & pemahaman dataset mentah
3. Data Preparation        → Preprocessing, pelabelan Lexicon, TF-IDF, SMOTE
4. Modeling                → Pelatihan SVM, Naïve Bayes, KNN + K-Fold CV
5. Evaluation              → Confusion Matrix, Accuracy, Precision, Recall, F1
6. Deployment              → Visualisasi & simulasi prediksi ulasan baru
```

---

## 5. Dataset

- **Sumber**: Scraping ulasan produk dari Shopee (Toko Bummi Tani)
- **Jumlah Data**: ±500 ulasan
- **Kolom Utama**: `No`, `Username`, `Rating`, `Waktu`, `Ulasan Text`, `Variasi`
- **Metode Pelabelan**: InSet Lexicon (tanpa menggunakan rating bintang)
  - Skor > 0 → **Positif**
  - Skor ≤ 0 → **Negatif**

---

## 6. Tools & Library

| Kategori | Library |
|----------|---------|
| Data Manipulation | `pandas`, `numpy` |
| NLP & Preprocessing | `re`, `nltk`, `PySastrawi` |
| Feature Extraction | `scikit-learn` (TF-IDF) |
| Imbalance Handling | `imbalanced-learn` (SMOTE) |
| Modeling | `scikit-learn` (SVM, MultinomialNB, KNN) |
| Model Persistence | `joblib`, `pickle` |
| Visualisasi | `matplotlib`, `seaborn`, `wordcloud` |

---

## 7. Struktur Folder Proyek

```
Analisis_Sentimen/
├── 1-Business-Understanding/
│   └── README.md                    ← File ini
├── 2-Data-Understanding/
│   ├── ulasan_bummitani.csv         ← Dataset mentah
│   └── 01_data_understanding.ipynb
├── 3-Data-Preparation/
│   └── 02_data_preparation.ipynb
├── 4-Modeling/
│   └── 03_modeling.ipynb
├── 5-Evaluation/
│   └── 04_evaluation.ipynb
└── 6-Deployment/
    └── 05_deployment.ipynb
```

---

## 8. Ekspektasi Hasil

- Model terbaik diharapkan mencapai **akurasi ≥ 80%** pada data uji
- Sistem mampu memprediksi sentimen ulasan baru dalam waktu **< 1 detik**
- Dashboard visualisasi komparasi performa ketiga model tersedia secara jelas

---

*Proyek ini dikerjakan sebagai bagian dari tugas mata kuliah Data Mining.*
