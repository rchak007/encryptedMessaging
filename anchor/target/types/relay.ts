/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/relay.json`.
 */
export type Relay = {
  "address": "74sJMY922tbcPNrATAaNuLUPLkkF5HgMMCY3kp85pcSL",
  "metadata": {
    "name": "relay",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "createRelayEntry",
      "discriminator": [
        162,
        113,
        73,
        252,
        153,
        1,
        198,
        12
      ],
      "accounts": [
        {
          "name": "relayEntry",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "title"
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "message",
          "type": "string"
        },
        {
          "name": "recipient",
          "type": "string"
        },
        {
          "name": "enc",
          "type": "bool"
        }
      ]
    },
    {
      "name": "deleteRelayEntry",
      "discriminator": [
        223,
        89,
        195,
        207,
        239,
        176,
        54,
        73
      ],
      "accounts": [
        {
          "name": "relayEntry",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "title"
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        }
      ]
    },
    {
      "name": "updateRelayEntry",
      "discriminator": [
        164,
        101,
        25,
        229,
        164,
        157,
        204,
        170
      ],
      "accounts": [
        {
          "name": "relayEntry",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "arg",
                "path": "title"
              },
              {
                "kind": "account",
                "path": "owner"
              }
            ]
          }
        },
        {
          "name": "owner",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "message",
          "type": "string"
        },
        {
          "name": "recipient",
          "type": "string"
        },
        {
          "name": "enc",
          "type": "bool"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "relayEntryState",
      "discriminator": [
        81,
        155,
        164,
        13,
        203,
        229,
        37,
        128
      ]
    }
  ],
  "types": [
    {
      "name": "relayEntryState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "owner",
            "type": "pubkey"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "message",
            "type": "string"
          },
          {
            "name": "recipient",
            "type": "string"
          },
          {
            "name": "enc",
            "type": "bool"
          }
        ]
      }
    }
  ]
};
