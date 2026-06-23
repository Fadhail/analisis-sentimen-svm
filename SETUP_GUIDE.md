# 📦 Panduan Instalasi — Analisis Sentimen Shopee

## Instalasi Dependensi

Jalankan perintah berikut di terminal sebelum membuka notebook:

```bash
pip install pandas numpy matplotlib seaborn scikit-learn imbalanced-learn joblib nltk PySastrawi wordcloud
```

Atau install sekaligus dari file requirements:

```bash
pip install -r requirements.txt
```

## File `requirements.txt`

```
pandas>=1.5.0
numpy>=1.23.0
matplotlib>=3.6.0
seaborn>=0.12.0
scikit-learn>=1.1.0
imbalanced-learn>=0.10.0
joblib>=1.2.0
nltk>=3.8.0
PySastrawi>=1.2.0
wordcloud>=1.9.0
scipy>=1.9.0
```

## Download InSet Lexicon

1. Kunjungi: https://github.com/masdevid/ID-Lexicon
2. Download `positive_words.tsv` dan `negative_words.tsv`
3. Simpan di folder `3-Data-Preparation/` dengan nama:
   - `inset_lexicon_positive.tsv`
   - `inset_lexicon_negative.tsv`

> ⚠️ Jika file lexicon tidak tersedia, notebook sudah menyediakan **kamus mini fallback** yang bisa langsung digunakan.

## Urutan Eksekusi Notebook

Jalankan notebook secara berurutan:

1. `2-Data-Understanding/01_data_understanding.ipynb`
2. `3-Data-Preparation/02_data_preparation.ipynb`  ← Menghasilkan `.pkl`
3. `4-Modeling/03_modeling.ipynb`                   ← Load `.pkl`, simpan model
4. `5-Evaluation/04_evaluation.ipynb`               ← Load model, evaluasi
5. `6-Deployment/05_deployment.ipynb`               ← Visualisasi & simulasi

## Alur Artefak

```
02_data_preparation.ipynb
  EXPORT →
    3-Data-Preparation/
      ├── ulasan_bersih.csv
      ├── X_train_smote.pkl
      ├── y_train_smote.pkl
      ├── X_test.pkl
      ├── y_test.pkl
      └── tfidf_vectorizer.pkl

03_modeling.ipynb
  IMPORT  ← X_train_smote.pkl, y_train_smote.pkl
  EXPORT →
    4-Modeling/
      ├── svm_model.pkl
      ├── nb_model.pkl
      ├── knn_model.pkl
      └── cv_results.csv

04_evaluation.ipynb
  IMPORT  ← svm_model.pkl, nb_model.pkl, knn_model.pkl
            X_test.pkl, y_test.pkl
  EXPORT →
    5-Evaluation/
      ├── evaluation_results.csv
      └── predictions.csv

05_deployment.ipynb
  IMPORT  ← Semua .pkl + evaluation_results.csv + ulasan_bersih.csv
  EXPORT →
    6-Deployment/
      ├── komparasi_akurasi.png
      ├── wordcloud_sentimen.png
      ├── top_words.png
      └── dashboard_sentimen.png
```
