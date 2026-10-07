python
import os
import time
import logging
from telegram import Update
from telegram.ext import ApplicationBuilder, ContextTypes, CommandHandler, MessageHandler, filters
from pyrogram import Client
from pyrogram.types import Message as PyroMsg
import asyncio

# --- CONFIGURATION ---
TELEGRAM_BOT_TOKEN = os.environ.get('TELEGRAM_TOKEN')
ADMIN_ID = int(os.environ.get('ADMIN_ID', '0')) # Optional: Your TG ID for logs

# Logging setup
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(name)

# Global state to track pending pairings
# Structure: { telegram_user_id: { 'phone': '+234...', 'client': <PyroClient> } }
pending_pairs = {}

def get_client_name(phone_number):
    """Generates a unique session name based on phone number to avoid conflicts."""
    clean_phone = phone_number.replace('+', '').replace('-', '').replace(' ', '')
    return f"wa_{clean_phone}"

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "🤖 Lagos Life Bug Bot\n\n"
        "/pair - Get WhatsApp Pairing Code & Auto-Confirm\n"
        "/bug <number> - Send Bug Payload (Coming Soon)\n\n"
        "Send /pair to begin."
    )

async def pair_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Step 1: Ask for phone number"""
    await update.message.reply_text("📲 Send me your WhatsApp number (with country code, e.g., +2348012345678)")

    # Store that this user is waiting for a number
    pending_pairs[update.effective_user.id] = {
        'state': 'waiting_for_number',
        'user_id': update.effective_user.id
    }

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handle the incoming phone number and trigger pairing"""
    user_id = update.effective_user.id

    if user_id not in pending_pairs:
        return

    state_data = pending_pairs[user_id]
    state = state_data['state']

    if state == 'waiting_for_number':
        phone_raw = update.message.text.strip()

        # Clean the phone number
        phone_clean = ''.join(filter(str.isdigit, phone_raw))

        if not phone_clean.startswith('234'):
            # Assume Nigerian if starting with 80, 81, 90, 91 etc.
            if phone_clean.startswith(('80', '81', '90', '91')):
                phone_clean = '234' + phone_clean
            else:
                phone_clean = '+' + phone_clean
        else:
            phone_clean = '+' + phone_clean
            
        try:
            logger.info(f"Generating pairing code for {phone_clean}")
            
            # Create a temporary Pyrogram client
            session_name = get_client_name(phone_clean)
            
            # We don't save the session to disk immediately to keep it ephemeral during testing
            # But we need a client instance
            temp_client = Client(
                name=session_name,
                phone_number=phone_clean,
                timeout=60
            )
            
            await temp_client.connect()
            
            # Generate the pairing code
            qr_code_link, code = await temp_client.pair_phone(phone_clean)
            
            # Format code: XXXXX -> XX X X XX
            formatted_code = f"{code[:2]} {code[2:3]} {code[3:4]} {code[4:5]} {code[5:6]}"
            
            reply_msg = (
                f"✅ Pairing Code Generated!\n\n"
                f"👉 Open WhatsApp > Settings > Linked Devices > Link with Phone Number\n\n"
                f"🔢 Enter this code: {formatted_code}\n\n"
                f"⏳ Paste it into WhatsApp now..."
            )
app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, lambda u, c: handle_confirmation(u, c)))

    print("🤖 Bot is running... Waiting for /pair command.")
    app.run_polling()

async def handle_confirmation(update: Update, context: ContextTypes.DEFAULT_TYPE):
    """Handles the confirmation step"""
    user_id = update.effective_user.id
    
    if user_id in pending_pairs and pending_pairs[user_id]['state'] == 'waiting_for_confirmation':
        await confirm_pairing(update, context)

if name == 'main':
    main()
