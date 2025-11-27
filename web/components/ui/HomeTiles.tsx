// src/components/HomeTiles.tsx
'use client';

import React from 'react';

const tileClasses =
  'rounded-2xl shadow-md p-4 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700';

export default function HomeTiles() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-10">
      {/* Tile 1: About Relay Dapp */}
      <div className={tileClasses}>
        <h2 className="text-xl font-semibold mb-2 text-purple-600">🕵️ Secret Messaging</h2>
        <p>
          Relay is an open-source Solana-powered dApp for encrypted messaging.
          Your message is encrypted *before* it's written to the blockchain — no
          one, not even the server, can read it.
        </p>
      </div>

      {/* Tile 2: Use Cases (With Humor) */}
      <div className={tileClasses}>
        <h2 className="text-xl font-semibold mb-2 text-emerald-600">🔐 Why Use It?</h2>
        <ul className="list-disc list-inside text-sm">
          <li>Escape oppressive regimes 🌐</li>
          <li>Whistleblowing without leaving a trace 📢</li>
          <li>Cheating husband protection 🕶️ (just kidding... kinda 😅)</li>
          <li>Military or government intel ✈️</li>
          <li>Anonymous crypto collabs 🤝</li>
        </ul>
      </div>

      {/* Tile 3: Trust & Open Source */}
      <div className={tileClasses}>
        <h2 className="text-xl font-semibold mb-2 text-blue-600">🌍 Why Trust It?</h2>
        <p>
          Fully open-source. You can inspect the code, run it yourself, or fork
          it. Messages are encrypted with NaCl and stored on Solana. No email,
          no servers, no middlemen.
        </p>
      </div>

      {/* Tile 4: Solana Resources */}
      <div className={tileClasses}>
        <h2 className="text-xl font-semibold mb-2 text-yellow-600">📚 Learn & Build</h2>
        <ul className="list-disc list-inside text-sm">
          <li>
            <a
              className="text-blue-500 hover:underline"
              href="https://solana.com"
              target="_blank"
              rel="noreferrer"
            >
              Solana Docs
            </a>
          </li>
          <li>
            <a
              className="text-blue-500 hover:underline"
              href="https://faucet.solana.com"
              target="_blank"
              rel="noreferrer"
            >
              Solana Faucet
            </a>
          </li>
          <li>
            <a
              className="text-blue-500 hover:underline"
              href="https://cookbook.solana.com"
              target="_blank"
              rel="noreferrer"
            >
              Solana Cookbook
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
