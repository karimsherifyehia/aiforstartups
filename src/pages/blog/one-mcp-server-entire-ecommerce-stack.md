---
title: "Why We Ditched 6 APIs and Built One MCP Server for Our Entire Ecommerce Stack"
slug: "one-mcp-server-entire-ecommerce-stack"
date: "March 26, 2026"
author: "Karim Sherif"
description: "Managing 6 separate APIs was killing our AI agent workflows. Here's how consolidating everything into a single MCP server changed how agents interact with our business."
tags: ["MCP", "AI Agents", "Ecommerce", "SaaS", "API"]
layout: ../../layouts/BlogPost.astro
---

## The Problem with the "Best Tool for Each Job" Approach

Every ecommerce business ends up with the same stack eventually:

- **Shopify** for storefront and orders
- **HubSpot** (or similar) for CRM
- **ShipStation** or Bosta for shipping
- **Zendesk** for customer support
- **WhatsApp Business API** for messaging
- Some spreadsheet for inventory

Each tool is fine on its own. But when you want an AI agent to manage your business operations, you immediately hit a wall.

The agent needs to:
1. Get a list of today's orders (Shopify API)
2. Check if the customer is a VIP (HubSpot API)
3. Check stock availability (your warehouse system — maybe a spreadsheet?)
4. Create a shipping label (ShipStation API)
5. Message the customer with tracking (WhatsApp API)
6. Log the interaction (back to HubSpot API)

That's **5 different authentication setups**, 5 different API schemas, 5 different rate limits, and 5 different failure modes — for one simple workflow.

We built Nexus to solve this. Then we exposed it via a single MCP server.

## What Is MCP and Why Does It Matter?

MCP (Model Context Protocol) is an open standard from Anthropic that lets AI agents communicate with external systems in a structured, tool-based way.

Instead of an agent writing raw HTTP requests and parsing JSON responses, it calls **tools** — named functions with typed inputs and outputs. The agent knows what tools exist, what they do, and what to expect back.

The difference in practice:

**Before MCP:** Agent writes `fetch('https://api.shopify.com/v1/orders?...')`, parses the response, extracts the order, calls another API for CRM data, tries to correlate the two, probably fails on edge cases.

**With MCP:** Agent calls `nexus_get_order({ order_id: "ORD-2026-001" })` and gets back a complete object with customer details, order status, line items, shipping status, payment info — all in one call.

## Our 13 Tools, One Server

The Nexus MCP server exposes 13 tools across 5 functional areas:

**Contacts (CRM)**
- `nexus_list_contacts` — paginated contact list with search
- `nexus_get_contact` — full customer 360: history, orders, segments
- `nexus_create_contact` — create with dedup protection
- `nexus_update_contact` — update details and journey stage

**Orders**
- `nexus_list_orders` — filter by status, customer, date
- `nexus_get_order` — full order with line items and timeline
- `nexus_create_order` — create order with line items
- `nexus_update_order_status` — move through lifecycle

**Inventory**
- `nexus_list_inventory` — browse products and variants
- `nexus_check_stock` — check availability at specific warehouse

**Messaging**
- `nexus_list_conversations` — unified inbox across WhatsApp, FB, IG
- `nexus_send_message` — send on any channel from one call

**Search**
- `nexus_search` — global search across contacts, orders, inventory

## One Registration, One Auth, One Connection

The thing that surprised us most when building this was how much friction exists in existing MCP setups.

Every MCP server I've seen requires a human to:
1. Create an account manually
2. Navigate to developer settings
3. Generate API keys
4. Copy them into the agent's config

That's fine for a developer setup. But it's a dealbreaker for agents that are supposed to operate autonomously.

We built **agent self-registration** into Nexus from day one. An agent can:

```
POST /agent-register
{
  "agent_name": "My Assistant",
  "agent_platform": "claude",
  "owner_email": "owner@company.com",
  "organization_name": "My Company"
}
```

And get back an API key immediately. No email verification. No CAPTCHA. No human in the loop.

From there it's one auth call, one MCP connection, and the agent has access to the entire ops stack.

## The Business Model Innovation

Here's the part I find most interesting: **agents are now a growth channel**.

Our free tier is intentionally read-only. Agents can explore, read contacts, browse orders, check inventory — but they can't act.

The moment an agent needs to write — create an order, send a message, update a contact — you need Starter ($99/mo) or higher.

This creates a natural conversion funnel:
1. Agent self-registers on free tier
2. Agent demonstrates value (reads data, generates insights)
3. Human upgrades so the agent can act
4. Agent does more → more value → stickier subscription

No cold calls. No demos. The agent sells itself.

## The Stack

For those curious about how we built this:

- **Database:** Supabase (PostgreSQL) with 143 tables, multi-tenant RLS
- **Edge Functions:** Deno-based Supabase Edge Functions (~117 functions)
- **MCP Transport:** Streamable HTTP (MCP protocol 2025-03-26)
- **Auth:** Short-lived JWTs from API key exchange
- **Discovery:** `.well-known/mcp.json` + `llms.txt` at root domain

The MCP server itself is a single Supabase Edge Function. It receives all tool calls, routes them to internal handlers, and returns structured responses. No separate server to maintain.

## Try It

The full system is live and agent-accessible right now:

- **Register:** `POST https://lgwvoomgrwpsgpxwyaec.supabase.co/functions/v1/agent-register`
- **Docs:** [nexus-docs.aiforstartups.io](https://nexus-docs.aiforstartups.io)
- **MCP discovery:** [nexus.aiforstartups.io/.well-known/mcp.json](https://nexus.aiforstartups.io/.well-known/mcp.json)

Built by AiForStartups. Made in Cairo. 🇪🇬
