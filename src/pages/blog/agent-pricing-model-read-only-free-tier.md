---
layout: ../../layouts/BlogPost.astro
title: "The Agent Pricing Model: Why We Made Our Free Tier Read-Only"
slug: "agent-pricing-model-read-only-free-tier"
date: "March 26, 2026"
author: "Karim Sherif"
description: "Most SaaS free tiers are limited by seat count or feature flags. We took a different approach: free agents can read everything, but can't act. Here's why — and why it works."
tags: ["SaaS", "AI Agents", "Pricing", "MCP"]
---

## The Standard SaaS Pricing Playbook Is Broken for Agents

Traditional SaaS pricing is built around one assumption: humans are the users.

Limit the seats. Lock certain features behind a paywall. Give them a taste, then charge for the good stuff.

This works when a human is sitting at a dashboard, hitting a wall, and deciding whether to upgrade. They feel the friction directly. They know what they're missing.

But AI agents don't feel friction. They don't see a locked feature and think "I should ask my boss to upgrade." They either have access or they don't — and if they don't, they just fail silently or tell the user they can't help.

We needed a completely different pricing model. Here's what we built and why.

## The Insight: Read vs. Write Is the Natural Line

When we started designing Nexus's agent tier, we asked one question: **what does an agent need to prove its value before a human commits to paying?**

The answer was clear: **reading data**.

An agent needs to:
- Browse contacts to understand who the customers are
- Read orders to understand the business state
- Check inventory to know what's in stock
- Search across everything to answer questions

None of that costs the business anything. It's pure intelligence gathering. And it's exactly what an agent needs to demonstrate that it's useful.

Writing is different. Writing means:
- Creating orders (real business impact)
- Sending messages to customers (reputation risk)
- Updating contact records (data integrity)
- Moving orders through the fulfillment pipeline (logistics consequences)

These actions have real-world consequences. They're worth paying for.

**Read = explore and prove value. Write = act and create value.**

That's our free/paid line.

## How the Tiers Work

**Free ($0/mo)**
- Full MCP server access, read-only
- Browse contacts, orders, inventory
- Global search
- 1 AI agent
- 500 API calls/day

The free tier is genuinely useful. An agent on free can answer questions, generate reports, find customers, check stock levels, and summarize order history. A business can run an AI assistant on free indefinitely if all they need is intelligence.

**Starter ($99/mo)**
- Read + write MCP access
- Create contacts, orders, update statuses
- Send messages via WhatsApp/Facebook/Instagram
- 2 AI agents
- 1,000 outbound messages/month

This is where agents start operating. Creating orders, messaging customers, moving fulfillment workflows forward.

**Growth ($199/mo) and Scale ($599/mo)**
Scale up agents, messages, and unlock AI features (sentiment analysis, transcription, embeddings).

## The Conversion Funnel Nobody Talks About

Here's the thing about this model: **the agent does the selling**.

Traditional SaaS acquisition:
1. Run ads or content marketing
2. Human finds the product
3. Human signs up
4. Human figures out if it's useful
5. Human decides to upgrade

With agent-native pricing:
1. Agent discovers Nexus via llms.txt or .well-known/mcp.json
2. Agent self-registers (no human needed)
3. Agent reads data and does useful things on free
4. Human sees value ("wait, my AI actually knows our order history?")
5. Human upgrades so the agent can do more

The agent proves value. The human pays. No demos. No cold calls. No onboarding calls.

The agent is the SDR, the sales engineer, and the onboarding specialist all at once.

## Why Not Just Limit by Feature?

We considered the traditional approach: lock CRM behind Pro, lock shipping behind Enterprise.

The problem: feature-gating creates fragmentation. An agent that can access CRM but not orders can't answer "is this customer's order delayed?" — a basic question. Partial access makes the agent look incompetent, not the pricing tier.

Read/write gating is different. A read-only agent is still coherent. It has a complete picture of the business. It just can't change anything yet.

## The Safety Argument

There's another reason to gate writes: **safety**.

When an AI agent has write access to your production data, you want it to have earned that trust. A business that's been using Nexus on free for a few weeks — watching what the agent reads, what questions it answers, how it behaves — is in a much better position to decide "yes, I trust this agent to create orders and send messages."

Read-only free tier isn't just a pricing decision. It's a trust-building mechanism.

## What We're Seeing

We launched agent self-registration less than a week ago. Already:
- Multiple agents have self-registered
- Free tier usage shows agents are genuinely exploring — running searches, reading contact histories, checking order statuses
- The first write-access upgrades are happening

The model is working exactly as designed. Agents explore. Humans upgrade.

## The Bigger Takeaway

If you're building SaaS in 2026, agents are coming for your product regardless of whether you plan for them. The question is whether you build a pricing model that works with agents or fights them.

Fighting them means: complex OAuth flows, CAPTCHA on signup, no API, feature flags that break agent workflows.

Working with them means: simple auth, clean APIs, pricing that lets agents prove value before you charge.

We chose to work with them. So far, it's working.

---

*Nexus is live at [nexus.aiforstartups.io](https://nexus.aiforstartups.io). Agents can self-register at the [agent docs](https://nexus-docs.aiforstartups.io/api/ai-agents-mcp). Free forever, no credit card required.*
