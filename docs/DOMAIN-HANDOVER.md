# Connecting www.tpleisure.lk to the new website

**For:** Travel Port Leisure (Private) Limited, or whoever manages the
tpleisure.lk DNS.
**Time needed:** about 10 minutes of DNS editing, then up to 24 hours for the
change to reach everyone (usually under an hour).

---

## 1. What we need from you

| # | Item | Why |
|---|------|-----|
| 1 | **Login to ClouDNS** (cloudns.net) for `tpleisure.lk`, *or* a person who can edit records there while we're on a call | tpleisure.lk's DNS is hosted on ClouDNS (`pns101–104.cloudns.net`). This is where the website records are changed. |
| 2 | Confirmation of which address is the main one: **www.tpleisure.lk** (recommended, matches the corporate deck) or **tpleisure.lk** | The other one will redirect to it. |
| 3 | Confirmation that **nothing else runs on the current web server** (`199.116.77.27`, cloudaccess.net) that you still need, e.g. an old site, cPanel webmail or a booking tool | The website records will point away from it. Email is **not** affected (see section 3). |
| 4 | Links to your **Facebook, Instagram and LinkedIn** pages, if any | To add to the site footer. |
| 5 | Optional: a **Google account** that the company owns | To verify the site in Google Search Console so it appears in Google search. |

---

## 2. The records to change

Only the **website** records change. Edit just these two rows in ClouDNS.

### If the site is hosted on Vercel

| Type | Host / Name | Value | TTL |
|------|-------------|-------|-----|
| A | `@` (tpleisure.lk) | the IP shown in Vercel → Project → Settings → Domains (currently `76.76.21.21`) | 300 |
| CNAME | `www` | the target shown in Vercel (e.g. `cname.vercel-dns.com`) | 300 |

Vercel shows the exact values for this project once the domain is added. Use those if they differ from the values above.

### If the site is hosted on GitHub Pages

| Type | Host / Name | Value | TTL |
|------|-------------|-------|-----|
| A | `@` | `185.199.108.153` | 300 |
| A | `@` | `185.199.109.153` | 300 |
| A | `@` | `185.199.110.153` | 300 |
| A | `@` | `185.199.111.153` | 300 |
| CNAME | `www` | `<github-account>.github.io` | 300 |

**Delete** the existing `A @ → 199.116.77.27` and `www → 199.116.77.27`
records. Keeping them alongside the new ones makes visitors land on either
server at random.

HTTPS (the padlock) is issued automatically by the host within about an hour
of the records taking effect. Nothing needs to be bought.

---

## 3. Do NOT change: email

Your email (`info@tpleisure.lk`) is handled by **emailpnl.com**. Leave these
records exactly as they are:

| Type | Value |
|------|-------|
| MX 10 | `mx01.emailpnl.com` |
| MX 20 | `mx02.emailpnl.com` |
| TXT (SPF) | `v=spf1 include:spf.emailpnl.com mx a -all` |

Please **do not change the nameservers** (for example by moving the domain to
Vercel or GitHub DNS). That would drop the email records, and mail to
@tpleisure.lk would stop arriving.

One detail for your email provider: the SPF record above contains `a`, which
allows "whatever server the website points at" to send mail as tpleisure.lk.
After the change that will be the website host, which doesn't send email. This
is harmless, but your email provider may want to remove `a` from the record.

---

## 4. After the switch

- `tpleisure.lk` and `www.tpleisure.lk` both open the new site, with HTTPS.
- The temporary `*.vercel.app` / `*.github.io` address redirects to
  www.tpleisure.lk, so old links still work and search engines only index
  your domain.
- Website enquiries open the visitor's email app, addressed to
  **info@tpleisure.lk**. Please make sure that inbox is monitored.
