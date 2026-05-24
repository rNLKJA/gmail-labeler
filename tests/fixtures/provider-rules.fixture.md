# Provider rules fixture for CI

Minimal table for generator and validator tests.

## Test brands

| Domain | Match | Label | Default | Notes |
|---|---|---|---|---|
| github.com | | Subscriptions/GitHub | keep | SaaS billing |
| tldrnewsletter.com | | News & Ads/TLDR | archive | newsletter |
| apple.com | | Shopping/Apple | keep | Store orders |
| apple.com | email.apple.com | Subscriptions/Apple | keep | iCloud billing |
| paypal.com | | Banking/PayPal | keep | payments processor |

## Multi-type brands

| Domain | Match | Label | Default | Notes |
|---|---|---|---|---|
| google.com | | Subscriptions/Google One | keep | billing |
| google.com | googlestore-noreply@google.com | Shopping/Google | keep | purchases |

## Always skip (no label)

- OTP / verification codes.
