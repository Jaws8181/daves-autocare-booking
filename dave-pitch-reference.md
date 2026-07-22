# Barrie AutoCare — Pitch Reference
**Client:** Dave (friend)
**Status:** Booking form built and live at demo URL, email drafted but not sent

---

## One-Line Pitch
"I built a booking form for Barrie AutoCare — customers pick their service, vehicle, and a time slot. You get an instant email and confirm with one click."

---

## Live URLs
| What | URL |
|------|-----|
| Booking Form | autocarebooking.bwabarrie.ca |

---

## How It Works (The Flow)

**Customer side:**
1. Goes to the booking form
2. Picks service from dropdown
3. Picks a date (weekends auto-blocked, only Mon–Thu/Fri show slots)
4. Time slots auto-populate based on the day (Mon–Thu: 8am–6pm, Fri: 8am–5pm, in 30-min increments)
5. Enters year/make/model + current KMs
6. Describes symptoms/issues in a text box
7. Enters name, phone, email
8. Optional: subscribe checkbox for promotions
9. Hits "Request Appointment" — sees success screen immediately

**Dave's side:**
1. Gets an instant email notification with all the customer's details
2. Has a pre-filled "Confirm Appointment" button in the notification email — click it, email opens ready to send to customer
3. Customer gets an auto-reply within 1 business day confirming

---

## Services on the Form
- Oil Change & Lube
- Seasonal Tire Swap
- Tire Sales & Installation
- Brake Inspection / Repair
- Safety Inspection
- Pre-Purchase Inspection
- General Diagnostic
- Fleet Maintenance
- Other (describe in notes)

---

## Tech Stack
- **Frontend:** HTML/CSS (Tailwind) — single-page form
- **Backend:** PocketBase on Railway (pending final deploy — currently demo mode)
- **Hosting:** Cloudflare Pages (bwabarrie.ca subdomain)
- **Deploy:** GitHub Desktop → Cloudflare auto-deploys
- **Subscriber list:** Opt-in checkbox wired to PocketBase subscribers collection (CASL compliant)

---

## What's Placeholder / Not Done Yet
- PocketBase Railway deploy needs to be finalized for live email notifications
- Dave's real email address needs to be wired into PocketBase
- Phone number on form (705-719-0773) — confirm this is correct with Dave
- "Confirm Appointment" email template needs final testing end-to-end

---

## Likely Questions Dave Will Ask

**"How does it connect to my schedule?"**
Right now it's a request system — customers pick a preferred time, you confirm it. It's not a live calendar sync. That's an add-on if he wants it (booking integration connects to Google Calendar).

**"What if I need to change the hours or services?"**
Easy — just message me. Takes 5 minutes to update.

**"Do I need a website to use this?"**
No — the form can live as a standalone link he puts anywhere: Facebook, Google Business Profile, text message to customers. Or we can build it into a full Barrie AutoCare website later.

**"What does it cost?"**
Nothing right now — demo build done free. If he wants to keep it live, maintained, and improve it: $75/mo. He owns the code regardless.

**"What happens to customer data?"**
Stays in his own PocketBase instance on Railway. Not shared with anyone. Subscriber emails are CASL-compliant opt-in only.

**"Can it send reminder emails before the appointment?"**
Not yet — that's an automation add-on (+$25/mo). Sends a reminder the day before automatically.

---

## What's Currently Free vs Future Costs

| Item | Cost |
|------|------|
| Booking form (current build) | Free (BWA promo) |
| Hosting (bwabarrie.ca subdomain) | Free |
| Monthly maintenance + updates | $75/mo |
| Automated appointment reminders | +$25/mo |
| Google Calendar integration | +$30/mo (booking add-on) |
| Full Barrie AutoCare website | ~$250–500 depending on scope |
| GMB management | +$50/mo |

---

## What You Need From Dave to Finish
- Confirm phone number (705-719-0773 — is that right?)
- His real email for booking notifications
- Any services to add or remove from the list
- Hours confirmation (Mon–Thu 8–6, Fri 8–5 — correct?)
- Whether he wants this standalone or as part of a full site
