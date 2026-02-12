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
  "<endpoint_link>" \
  "<slowdown>"           # optional, e.g. "21ms → 3.5s"
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

## Alert 3: Duplicate cart item constraint

```bash
./scripts/trigger-hud-fix.sh \
  "POST /cart/add endpoints failed 4.39k times in 16d due to duplicate key constraint violation" \
  "The endpoint POST /cart/add failed 4.39k times in the last 16d (3.88% of calls) with error QueryFailedError- duplicate key value violates unique constraint cart_items_session_id_product_id_key thrown from CartRepository.addItem(sessionId, productId, quantity). Only investigate this error and not other errors. When querying Hud data, only look at the date range 20260117_2200-20260120_1159." \
  4390 \
  "16d" \
  "POST /cart/add" \
  "https://www.app.hud.io/heads-up/issues/3820/?timeFrame=20260117_2200-20260120_1159&environment=production" \
  "https://www.app.hud.io/explore/endpoints/21284771-21721485/?timeFrame=20260117_2200-20260120_1159&environment=production"
```

## Alert 4: Cart suggestions slowdown after deployment

```bash
./scripts/trigger-hud-fix.sh \
  "GET /cart/suggestions slowed down by 16,469% after deployment (21.37ms to 3.54s)" \
  "The endpoint GET /cart/suggestions slowed down from 21.37ms to 3.54s (+16,469%) after a code deployment. The main source of the slowdown is CartService.getSuggestions(sessionId) which went from 17.2ms to 2.53s (+14,633%), accounting for 46.7% of the total slowdown. Only investigate this slowdown and not other issues. When querying Hud data, only look at the date range 20260117_2200-20260120_1159." \
  0 \
  "7d" \
  "GET /cart/suggestions" \
  "https://www.app.hud.io/heads-up/issues/3966/?timeFrame=20260117_2200-20260120_1159&environment=production" \
  "https://www.app.hud.io/explore/endpoints/21284775-21721485/?timeFrame=20260117_2200-20260120_1159&environment=production" \
  "21.37ms → 3.54s"
```
