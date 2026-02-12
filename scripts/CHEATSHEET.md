# Hud Auto-Fix Trigger Cheatsheet

## Using the trigger script

```bash
./scripts/trigger-hud-fix.sh \
  "<issue_id>" \
  "<title>" \
  "<description>" \
  <error_count> \
  "<time_range>" \
  "<endpoint>" \
  "<issue_link>" \
  "<endpoint_link>"
```

---

## Alert 1: MAGSTORE-712 (TypeError toUpperCase)

```bash
./scripts/trigger-hud-fix.sh \
  "MAGSTORE-712" \
  "POST /orders endpoints failed 3.54k times in 7d due to a faulty fraud handling mechanism" \
  "The endpoint POST /orders failed 3.54k times in the last 7d with error Typerror- Cannot read properties of undefined (reading toUpperCase) thrown from OrdersService.processCheckout(sessionId, totalAmount, items). Only investigate this error and not other errors. Make it return 400 with indicative message." \
  3540 \
  "7d" \
  "POST /orders" \
  "https://www.app.hud.io/heads-up/issues/5220?environment=production" \
  "https://www.app.hud.io/explore/endpoints/21284776-21721485/?environment=production"
```

## Alert 2: MAGSTORE-720 (null total_amount constraint)

```bash
./scripts/trigger-hud-fix.sh \
  "MAGSTORE-720" \
  "POST /orders endpoints failed 1.35k times in 7d due to a faulty fraud handling mechanism" \
  "The endpoint POST /orders failed 1.35k times in the last 7d with error DatabaseError- null value in column total_amount of relation orders violates not-null constraint thrown from PgService.query(text, params). Only investigate this error and not other errors." \
  1350 \
  "7d" \
  "POST /orders" \
  "https://www.app.hud.io/heads-up/issues/5227?environment=production" \
  "https://www.app.hud.io/explore/endpoints/21284776-21721485/?environment=production"
```
