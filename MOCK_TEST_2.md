# SE2020 – MOCK Lab Test 2: Item Manager v2 (2 hours)

Harder than Mock 1. Set a 2-hour timer. No notes, no AI, no solution zip until time is up.

What's different this time:
- Backend uses a **controllers** folder (routes → controllers → model)
- Frontend is split into **components** (`ItemForm.jsx`, `ItemList.jsx`)
- The starter contains **2 hidden bugs** — the app will not work even after you fill the TODOs until you find them
- New field types: **date** and **checkbox** (both need special handling)
- The API URL is **hardcoded** — you must move it to an environment variable

---

## Part A – Fix and complete the backend (25 marks) — target: 25 min
| # | Task | File |
|---|------|------|
| 1 | `getItemById` – return one item, 404 if not found | `controllers/itemController.js` |
| 2 | `updateItem` – update, return updated doc, 404 if not found | `controllers/itemController.js` |
| 3 | `deleteItem` – delete, 404 if not found | `controllers/itemController.js` |
| 4 | Register `GET /:id`, `PUT /:id`, `DELETE /:id` | `routes/itemRoutes.js` |
| — | **Find and fix the 2 hidden bugs** (hint: one breaks every POST/PUT, one breaks every request from the frontend) | somewhere in `backend/` |

Test with the browser: `http://localhost:5050/api/items` must return `[]` or JSON.

## Part B – Add new fields (25 marks) — target: 30 min
| Field | Type | Rules | Form input |
|-------|------|-------|-----------|
| `supplier` | String | **required** | text input |
| `stockStatus` | String | one of In Stock / Low Stock / Out of Stock, default In Stock | dropdown |
| `expiryDate` | Date | optional | `<input type="date">` |
| `isFeatured` | Boolean | default false | checkbox |

Must work in: model → create → update → form → edit pre-fill → list display.
- Show a **"Featured"** badge next to featured items (CSS class `badge` already exists)
- Show the expiry date in a readable format, or `N/A` if empty

## Part C – Frontend (15 marks) — target: 15 min
- TODO 6a / 6b in `App.jsx`: update and delete
- TODO 7: move the API URL in `api.js` to `VITE_API_URL`
- If the backend rejects a save (e.g. no supplier), show the error message on the page in red instead of failing silently

## Part D – GitHub (10 marks) — target: 10 min
- New **public** repo `item-manager-v2`, no `.env`, no `node_modules`
- **At least 4 commits** with meaningful messages (commit after each part)

## Part E – Deploy (25 marks) — target: 30 min
- Backend → Render (Free) | Frontend → Netlify
- Live site must: add, edit (all 6 fields pre-filled), update, delete

## Bonus (if time left)
- A search box that filters the list by name **or** supplier (client-side)
- Show "Total: N item(s)"

---

## Self-check before you stop the timer
- [ ] Edit an item with a date → the date input is pre-filled (not blank)
- [ ] Untick "Featured" and save → badge disappears
- [ ] Try saving with empty supplier → error shown on page
- [ ] Live Netlify site works against live Render backend
- [ ] GitHub repo has 4+ commits, no `.env`

## Hints (only read if stuck > 10 min)
<details><summary>Hidden bugs</summary>

Look at `server.js` line by line. What middleware turns a JSON request body into `req.body`? Is the mount path the same as what `api.js` calls?
</details>
<details><summary>Date input is blank when editing</summary>

`<input type="date">` only accepts `YYYY-MM-DD`. MongoDB sends `2026-12-01T00:00:00.000Z`. Take the first 10 characters.
</details>
<details><summary>Checkbox always saves the same value</summary>

For checkboxes the value is in `e.target.checked`, not `e.target.value`, and the input uses `checked={...}` not `value={...}`.
</details>
