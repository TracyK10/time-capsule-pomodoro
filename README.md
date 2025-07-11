# 🕰️ Retro Pomodoro Timer

*A cozy, vintage-themed productivity companion built with Electron.*

![App Screenshot](./screenshot.png) <!-- You can update this with your actual screenshot path -->

## 🎯 About

**Retro Pomodoro Timer** is a desktop productivity app inspired by the Pomodoro Technique. Designed with a warm, nostalgic retro aesthetic, this timer helps you stay focused while evoking the charm of a simpler time. Whether you're working, taking a short break, or enjoying a long break, this app keeps your sessions structured and stress-free.

---

## ✨ Features

* 🕰️ Classic Pomodoro timer with default 25/5/15 session lengths
* 🧱 Retro interface with a brown/cream color palette and vintage fonts
* ✅ Task management – add, check off, and review tasks
* 📊 Session history tracking
* 🔧 Adjustable work and break durations
* 📦 Desktop app powered by [Electron](https://www.electronjs.org/)

---

## 📦 Installation

### Prerequisites

* [Node.js](https://nodejs.org/) (v16 or above recommended)
* [Git](https://git-scm.com/)

### Clone the Repository

```bash
git clone https://github.com/yourusername/retro-pomodoro-timer.git
cd retro-pomodoro-timer
```

### Install Dependencies

```bash
npm install
```

### Run the App (Development Mode)

```bash
npm start
```

### Build for Production

```bash
npm run build
```

Output files will be available in the `dist` or `build` folder depending on your setup.

---

## 🛠️ Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **Framework:** [Electron](https://www.electronjs.org/)
* **Design Style:** Retro 70s aesthetic, warm brown tones, vintage fonts

---

## 📁 Folder Structure (Simplified)

```
retro-pomodoro-timer/
│
├── src/
│   ├── index.html        # Main HTML layout
│   ├── style.css         # Retro theme styling
│   ├── timer.js          # Timer logic
│   └── renderer.js       # UI interactions
│
├── main.js               # Electron main process
├── package.json
└── README.md
```

---

## 📸 Screenshots

| Work Session                            | Task Management                         |
| --------------------------------------- | --------------------------------------- |
| ![Timer](./assets/screenshot-timer.png) | ![Tasks](./assets/screenshot-tasks.png) |

---

## 💡 Inspiration

This project is inspired by the idea of mixing mindfulness with productivity. Instead of overwhelming modern dashboards, Retro Pomodoro Timer brings back the charm of analog tools in a digital form.
