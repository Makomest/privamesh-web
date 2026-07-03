---
title: "How Double Ratchet encryption works (plain English)"
description: "A plain-English explanation of the Double Ratchet algorithm - the forward-secrecy engine behind PrivaMesh and Signal - with no cryptography degree required."
date: "2026-06-18"
readingTime: "7 min read"
tags: ["Encryption", "Forward secrecy", "Double Ratchet"]
---

If you have ever wondered how apps like PrivaMesh and Signal can promise that a stolen key won't unlock your old messages, the answer is an algorithm called the **Double Ratchet**. It sounds intimidating. It isn't. Here is how it actually works, without a single equation.

## The problem it solves

Imagine two people, Ana and Ben, encrypting messages with a single shared key. It works - until that key leaks. The moment an attacker gets it, every message ever sent with it is readable, past and future. One key protecting a whole conversation is one very juicy target.

We want two stronger guarantees instead:

- **Forward secrecy** - if today's key leaks, yesterday's messages stay locked.
- **Post-compromise security** - if an attacker gets in briefly, the system heals and locks them back out.

The Double Ratchet delivers both by never reusing a key. Every message gets its own.

## What a "ratchet" means

A ratchet is a mechanical part that only turns one way - it can't go backward. In cryptography, a ratchet is a function that takes a key, produces the next key, and makes it impossible to run in reverse. Once you've advanced, the old key is gone and can't be recomputed. That one-way property is the whole trick: delete the used key, and even you can't get it back, so neither can an attacker.

## The two ratchets

The "double" is because two ratchets turn together.

### 1. The symmetric-key ratchet

Each time you send a message, a fast one-way function (built on `HKDF` and `HMAC-SHA256`) turns the ratchet once and spits out a fresh **message key**. You encrypt with it, then throw it away. The next message turns the ratchet again for a new key. Message one and message two are encrypted with completely unrelated keys.

### 2. The Diffie-Hellman ratchet

The symmetric ratchet alone can't heal from a compromise - if someone learns its state, they can follow along. So the second ratchet mixes in fresh randomness. Every time the conversation changes direction (Ana replies, then Ben replies), the two devices perform a new Diffie-Hellman key exchange over `Curve25519` and fold the result back into the chain. That injection of new secret material is what kicks an attacker out: they'd need the new private key, which never left the device.

## Putting it together

So a conversation looks like this: within one person's turn, the symmetric ratchet clicks forward per message. When the turn flips, the Diffie-Hellman ratchet clicks forward and reseeds everything. Keys are born, used once, and destroyed continuously. There is never a master key sitting around to steal.

## Why PrivaMesh keeps it

Some decentralized messengers dropped the ratchet to simplify their routing. PrivaMesh deliberately kept it. Because PrivaMesh has [no servers](/features/no-servers) and messages live as encrypted blobs on Solana, strong per-message keys matter even more - the ciphertext is public, so the encryption around it has to be flawless. The Double Ratchet is paired with `AES-256-GCM` to seal each payload and message padding to hide length. You can read how the whole stack fits together in the [end-to-end encryption explainer](/features/e2e-encryption).

## The one honest catch

Forward secrecy has a price, and it's worth stating plainly: because used keys are destroyed, **old messages cannot be recovered** - not by an attacker, and not by you. Restore your seed phrase on a new phone and you get your funds and identity back, but not your chat history. That is not a bug. It is the guarantee working exactly as designed. In a world of servers that keep everything forever, a messenger that truly forgets is the rare and valuable thing.
