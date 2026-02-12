# Hud Auto-Fix Trigger Cheatsheet

## Using the trigger script

```bash
./scripts/trigger-hud-fix.sh \
  "<title>" \
  "<description>" \
  <error_count> \
  "<time_range>" \
  "<endpoint>" \
  "<issue_link>" \
  "<endpoint_link>"
```

---

## Alert 1: Rate limit 429

```bash
./scripts/trigger-hud-fix.sh \
  "POST /orders endpoints failed 1.82k times in 3d due to rate limiting on external API calls" \
  "The endpoint POST /orders failed 1.82k times in the last 3d (13.7% of calls) with error AxiosError- Request failed with status code 429 thrown from OrdersService.processCheckout(sessionId, totalAmount, items). The upstream API enforces a rate limit of 1 request per 30 seconds per session. Only investigate this error and not other errors. When querying Hud data, only look at the date range 20260117_2200-20260120_1159." \
  1820 \
  "3d" \
  "POST /orders" \
  "https://www.app.hud.io/heads-up/issues/3819/?timeFrame=20260117_2200-20260120_1159&environment=production" \
  "https://www.app.hud.io/explore/endpoints/21284776-21721485/?timeFrame=20260117_2200-20260120_1159&environment=production"
```

## Alert 2: Null total_amount constraint

```bash
./scripts/trigger-hud-fix.sh \
  "POST /orders endpoints failed 1.61k times in 16d due to null total_amount constraint violation" \
  "The endpoint POST /orders failed 1.61k times in the last 16d (7.36% of calls) with error QueryFailedError- null value in column total_amount of relation orders violates not-null constraint thrown from OrderRepository.createOrder(sessionId, customerName, customerEmail, customerPhone, totalAmount). Only investigate this error and not other errors. When querying Hud data, only look at the date range 20260117_2200-20260120_1159." \
  1610 \
  "16d" \
  "POST /orders" \
  "https://www.app.hud.io/heads-up/issues/3821/?timeFrame=20260117_2200-20260120_1159&environment=production" \
  "https://www.app.hud.io/explore/endpoints/21284776-21721485/?timeFrame=20260117_2200-20260120_1159&environment=production"
```
