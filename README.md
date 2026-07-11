# Grow Bot Intercom Test Page

Standalone anonymous test page for Grow Bot using the isolated Intercom test workspace.

## Isolation

- Test Intercom App ID: `kxriovvt`
- Production App ID is intentionally absent.
- No authenticated customer identity is sent.
- No API tokens, Airtable credentials, or Grow account data are present.
- Search-engine indexing is disabled with `noindex` metadata.

## Local verification

```bash
node --test
python3 -m http.server 4173 --bind 127.0.0.1
```

Then open `http://127.0.0.1:4173`.

## Deployment

Do not deploy until Kenny approves the exact test hostname. After deployment, verify the live URL loads app ID `kxriovvt` and that test conversations appear only in `Stuff You Can Use [TEST]`.
