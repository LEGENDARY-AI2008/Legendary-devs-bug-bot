# BAHIRAVA30 runtime fix

## Fixed

- Removed every invalid `participant` value from `relayMessage()` options.
  Baileys v7 only accepts `participant` as an object containing a valid `jid`;
  the bot was passing both `true` and a raw JID string, which made it call
  `jidDecode(undefined)` and crash with:
  `Cannot destructure property 'user' of 'jidDecode(...)' as it is undefined.`
  These calls are normal sends, not retry resends, so omitting `participant`
  is the correct fix. The valid `{ jid: target }` options used by the retry
  helpers were left unchanged.
- Replaced the undeclared `@sakataoffc/baileys` import with the declared
  `@whiskeysockets/baileys` package.
- Pinned Baileys to `7.0.0-rc14`, which uses the published `libsignal`
  package instead of the GitHub dependency blocked by some Pterodactyl
  panels.
- Removed the Telegram bot token from `config.js`. Configure it through
  `TELEGRAM_BOT_TOKEN` instead.
- Added the admin-only `/broadcast message` command. It sends text to the
  registered users in `Love/user.json`, throttles delivery, retries Telegram
  rate-limit responses once, and reports sent/failed totals.
- Fixed premium mode access: premium/reseller IDs are normalized to strings,
  premium users can pass the membership gate while `state` is `1`, and their
  `/start`, menu buttons, and registered commands remain available.
- Removed the old hard-coded Telegram token fallback. The bot now stops with a
  clear message when `TELEGRAM_BOT_TOKEN` is not configured.
- Replaced the JPG branding asset with `SY/Bahirava.mp4`. All Telegram
  branding/status responses now use `sendVideo()` and the old JPG files were
  removed from the project.

## Start

```bash
export TELEGRAM_BOT_TOKEN='your-new-token'
rm -rf node_modules package-lock.json
npm install
npm start
```

Baileys `7.0.0-rc14` requires Node.js 20 or newer.

The token that was present in the original archive should be revoked and
replaced through BotFather because it was stored in plaintext in `config.js`.