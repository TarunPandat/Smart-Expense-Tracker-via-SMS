# 📱 Smart Expense Tracker via SMS (React Native)

A **React Native** mobile application that automatically reads **bank SMS messages**, parses transactions, and provides **expense analytics** without manual entry.

---

## 🚀 Features

- 📩 **Automatic SMS Parsing**
  - Reads bank SMS messages
  - Detects **debit / credit** transactions
  - Extracts amount, bank, merchant, balance, date

- 🏦 **Multi-Bank Support**
  - Supports major Indian banks (HDFC, AXIS, SBI, ICICI, SCBANK, etc.)
  - Groups transactions by bank/source

- 📊 **Expense Analytics**
  - Monthly spending & income
  - Category-wise breakdown
  - Pie charts using `react-native-chart-kit`

- 🔄 **Duplicate Detection**
  - Prevents duplicate transactions using message ID / `_id`

- 🗂 **Smart Categorization**
  - Auto-assigns categories (Shopping, Salary, Bills, etc.)
  - Manual override supported

- 💾 **Offline Storage**
  - Async Storage / Redux Persist
  - Data persists across app restarts

- 🧹 **Filters**
  - Filter by:
    - Bank
    - Category
    - Date range
    - Credit / Debit

---

## 🛠 Tech Stack

- **React Native (CLI)**
- **TypeScript**
- **Redux Toolkit**
- **Redux Persist**
- **react-native-chart-kit**
- **Yup** (validation)

---

## 📂 Project Structure

```
src/
│── store/ # Redux store & slices
│── services/ # SMS parsing & helpers
│── utils/ # Helper functions
│── components/ # Reusable UI components
│── screens/ # App screens
│── constants/ # Bank list, categories


```
---

## 📲 Permissions Used

- `READ_SMS`
- `RECEIVE_SMS`

> ⚠️ SMS data is processed **locally only**.  
> No SMS data is uploaded or shared.

---

## ▶️ Run Project

### Install dependencies
```bash
npm install
# or
yarn install

Android
npx react-native run-android

iOS
cd ios
pod install
cd ..
npx react-native run-ios

📦 Build APK / AAB (Android)
cd android
./gradlew assembleRelease      # APK
./gradlew bundleRelease        # AAB


Generated files:

android/app/build/outputs/

🧠 How It Works

Reads SMS inbox

Filters bank messages

Parses transactions using regex

Deduplicates entries

Stores locally

Shows analytics & charts

🔒 Privacy

No internet required

No data collection

Works fully offline

SMS access strictly for transaction parsing

👨‍💻 Author

Tarun Bhardwaj
Software Engineer | React Native | Full Stack

GitHub: https://github.com/TarunPandat

Email: tarun.bhardwaj.developer@gmail.com


📜 License

This project is for educational and personal use.


```