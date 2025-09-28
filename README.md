# test-iframe

A playground for testing **parent ↔ iframe** communication between the **Parent App** (this repo) and child apps like **PIS** or **PC**.

---

## Features

- Vue 3 + TypeScript + Vite
- Configurable constants for iframe URL, app URL, and routes
- Ready-to-use Modal & Toast components
- Event handling with `postMessage` and origin validation

---

## Architecture
Parent (http://localhost:5174)                 Child / Iframe (http://localhost:5173)
┌───────────────────────────────┐              ┌──────────────────────────────────────┐
│ Vue app (test-iframe)         │  postMessage │ Vue app (PIS/PC)                     │
│ - Renders                     │◀─────────────┤ - Receives messages                  │
│ - Listens to message events   │  postMessage │ - Replies with postMessage           │
│ - Sends messages to iframe    │─────────────▶│                                      │
└───────────────────────────────┘              └──────────────────────────────────────┘

---

## Prerequisites

- Node.js 18+ (or 20+)
- pnpm (recommended) or npm/yarn

---

## Getting Started

1. Clone repos
	•	Parent app → this repo (test-iframe)
	•	Child app → e.g. pis-frontend or pc-frontend

2. Install dependencies
  ```
  npm install
  ```

3. Run child app
  ```
  # in pis-frontend (or pc-frontend)
  npm install
  npm dev
  ```
  Default: http://localhost:5173 
  If your child app uses a different port, update BASE_IFRAME_URL in src/utils/constant.ts.

4. Run parent app
  ```
  npm run dev
  ```
  Default: http://localhost:5174


---

## Configuration

Env vars

Add .env in project root:
```
VITE_REF_ID=ref id value
```

---

## Project Structure

iframe-implement/
├─ src/
│  ├─ components/
│  │  ├─ IframeApp.vue
│  │  ├─ ModalAndToast.vue
│  │  ├─ NavBar.vue
│  │  ├─ Modal.vue
│  │  └─ Toast.vue
│  ├─ composables/
│  │  ├─ useModal.ts
│  │  ├─ useToast.ts
│  │  └─ usePlatform.ts
│  ├─ routes/
│  │  └─ index.ts
│  ├─ type/
│  │  └─ event.ts
│  ├─ utils/
│  │  ├─ constant.ts
│  │  ├─ event.ts
│  │  ├─ eventPC.ts
│  │  ├─ eventPIS.ts
│  │  ├─ helper.ts
│  │  └─ topic.ts
│  ├─ views/
│  │  └─ PageIframe.vue
│  ├─ App.vue
│  ├─ index.css
│  └─ main.ts
├─ index.html
├─ package.json
└─ README.md

---
## Troubleshooting

	•	No action when response event to children?
	•	Check both apps are running (5174 parent, 5173 child)
	•	Ensure event.origin matches BASE_IFRAME_URL
  •	Ensure add parent origin url on children


