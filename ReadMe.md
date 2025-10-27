# Reflection Questions for Lab 6.2
## Why is it important to handle errors for each individual API call rather than just at the end of the promise chain?

Promises are often chained to handle multiple asynchronous tasks in sequence. It is important to note that you must always return results from your promise chains, otherwise the callbacks won’t know the result of a previous promise. When a promise is started but not returned, it is said to be “floating,” and there is no way to track its settlement.

## How does using custom error classes improve debugging and error identification?

 Custom errors are like specialized tools in a toolbox.  You don’t always need them, but they are essential for unique tasks. Custom errors allow you to differentiate between various error conditions and handle them accordingly. Use specific error messages to make debugging easier. Avoid vague error messages like "Something went wrong." Instead, provide meaningful information. 

## When might a retry mechanism be more effective than an immediate failure response?

### Use retries when failures are likely temporary:

* Network hiccups/timeouts, DNS blips, dropped TCP connections.
* HTTP 5xx from upstream services, 503/429 (throttling) — respect Retry-After.
* Cloud/API rate limits or burst throttling (temporary capacity).
* Database deadlocks/lock timeouts, optimistic concurrency conflicts (409).
* Eventual consistency delays (resource not visible yet).
* Cold starts / startup races (service not ready, health checks not green).

### Avoid retries when failure is permanent

* Validation/semantic errors (4xx like 400/404/422).
* Auth/permission issues (401/403).
* Non-idempotent ops without an idempotency key (to prevent duplicates).
* Data errors (malformed payloads) — fix input, don’t retry.