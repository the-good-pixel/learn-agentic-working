# PR #482 — Diff

Mock diff against a fictional Node.js + Express service. Pseudo-code style for readability; the issues are real-shape regardless of language.

```diff
diff --git a/src/routes/customers.js b/src/routes/customers.js
index 4f12c8a..a902331 100644
--- a/src/routes/customers.js
+++ b/src/routes/customers.js
@@ -1,8 +1,10 @@
 import express from "express";
 import { findOrdersForCustomer } from "../services/orders.js";
+import { escapeCsvField } from "../utils/csv.js";
+import { db } from "../db.js";

 const router = express.Router();

 router.get("/:id/orders", async (req, res) => {
   const orders = await findOrdersForCustomer(req.params.id);
   res.json(orders);
 });

+router.get("/:id/orders.csv", async (req, res) => {
+  const { id } = req.params;
+  const { from, to, page = 1, per_page = 50 } = req.query;
+
+  // Look up orders directly so we can apply the date filters in SQL.
+  // (findOrdersForCustomer doesn't accept date filters yet.)
+  const sql = `
+    SELECT id, created_at, total_cents, currency, status, notes
+    FROM orders
+    WHERE customer_id = '${id}'
+      AND created_at >= '${from}'
+      AND created_at <= '${to}'
+    ORDER BY created_at DESC
+    LIMIT ${per_page} OFFSET ${(page - 1) * per_page}
+  `;
+  const orders = await db.query(sql);
+
+  const header = "id,created_at,total,currency,status,notes\n";
+  const rows = orders.map(o =>
+    [o.id, o.created_at, (o.total_cents / 100).toFixed(2), o.currency, o.status, escapeCsvField(o.notes)].join(",")
+  ).join("\n");
+
+  res.setHeader("Content-Type", "text/csv");
+  res.setHeader("Content-Disposition", `attachment; filename="orders-${id}.csv"`);
+  res.send(header + rows);
+});
+
 export default router;
```

```diff
diff --git a/src/utils/csv.js b/src/utils/csv.js
new file mode 100644
index 0000000..73a118b
--- /dev/null
+++ b/src/utils/csv.js
@@ -0,0 +1,10 @@
+// Escape a field for CSV: wrap in quotes if it contains a comma, quote, or newline.
+// Doubles internal quotes per RFC 4180.
+export function escapeCsvField(value) {
+  if (value == null) return "";
+  const s = String(value);
+  if (/[",\n]/.test(s)) {
+    return `"${s.replace(/"/g, '""')}"`;
+  }
+  return s;
+}
```

```diff
diff --git a/src/services/orders.js b/src/services/orders.js
index 220ab4f..ee70013 100644
--- a/src/services/orders.js
+++ b/src/services/orders.js
@@ -10,6 +10,10 @@ export async function findOrdersForCustomer(customerId) {
   return rows;
 }

+// New: same lookup, fewer columns, for use in CSV export.
+// (Keeping the original findOrdersForCustomer untouched for the JSON endpoint.)
+// TODO: unify these once we trust the CSV shape in prod.
+
 export async function findOrderById(id) {
   const [row] = await db.query("SELECT * FROM orders WHERE id = ?", [id]);
   return row;
```

```diff
diff --git a/test/utils/csv.test.js b/test/utils/csv.test.js
new file mode 100644
index 0000000..bb8a91d
--- /dev/null
+++ b/test/utils/csv.test.js
@@ -0,0 +1,18 @@
+import { describe, it, expect } from "vitest";
+import { escapeCsvField } from "../../src/utils/csv.js";
+
+describe("escapeCsvField", () => {
+  it("returns empty string for null and undefined", () => {
+    expect(escapeCsvField(null)).toBe("");
+    expect(escapeCsvField(undefined)).toBe("");
+  });
+  it("returns the value unchanged when no special chars", () => {
+    expect(escapeCsvField("hello")).toBe("hello");
+  });
+  it("wraps in quotes and doubles internal quotes", () => {
+    expect(escapeCsvField(`she said "hi"`)).toBe(`"she said ""hi"""`);
+  });
+});
```

```diff
diff --git a/.env.example b/.env.example
index a112233..c554477 100644
--- a/.env.example
+++ b/.env.example
@@ -3,3 +3,4 @@ DB_URL=postgres://app:app@localhost:5432/app
 PORT=3000
 STRIPE_PUBLISHABLE_KEY=pk_test_REPLACE_ME
 STRIPE_SECRET_KEY=sk_live_PRETEND-THIS-IS-A-REAL-KEY-FOR-THE-EXERCISE
+SUPPORT_EXPORT_TOKEN=changeme
```
