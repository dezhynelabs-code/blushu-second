# BLUSHU — Premium Sunscreen E-commerce Website

A production-quality, responsive e-commerce web application built for the skincare brand **BLUSHU**, featuring the flagship product **Aqua Crystal Sunshield Clear Gel (SPF 60 PA+++)**.

---

## 🌟 Live Local Access

- **Local Storefront:** [http://localhost:5173/](http://localhost:5173/)
- **Network (Mobile/LAN):** `http://<your-lan-ip>:5173/`
- **Product Details Route:** [http://localhost:5173/products/blushu-aqua-crystal-sunsheild](http://localhost:5173/products/blushu-aqua-crystal-sunsheild)
- **Shop Catalog:** [http://localhost:5173/shop](http://localhost:5173/shop)
- **Shopping Bag:** [http://localhost:5173/cart](http://localhost:5173/cart)
- **Checkout Funnel:** [http://localhost:5173/checkout](http://localhost:5173/checkout)

---

## 🧴 1. Verified Brand & Packaging Identity

| Field | Packaging Specification | Source / Verification |
|---|---|---|
| **Brand** | **BLUSHU®** | Packaging logo mark |
| **Product Name** | Aqua Crystal Sunshield Clear Gel | Tube front label: `AQUA CRYSTAL SUNSHIELD` |
| **Category** | Skincare / Everyday Sun Care | Stated formulation |
| **Protection Rating** | **SPF 60 PA+++** | Packaging label bottom-left |
| **UV Spectrum** | **UVA/UVB Broad Spectrum** | Packaging label bottom-left |
| **Net Quantity** | **50 g / 1.76 oz** | Packaging label bottom-right |
| **Product Format** | **Clear Gel** | Packaging label bottom-right |
| **Batch / Lot Code** | `BAS001` | Imprinted upper seal |
| **Maximum Retail Price** | **₹1,299/- (incl. taxes)** | Imprinted upper seal: `BAS001 MRP 1299/-` |

> **Label Spelling Advisory:**  
> The physical reference packaging displays **`AQUA CRYSTAL SUNSHIELD`** (with "I-E-L-D"). The website natively routes both `/products/blushu-aqua-crystal-sunsheild` and `/products/blushu-aqua-crystal-sunshield` so customers and search engines encounter zero broken links.

---

## 🎨 2. Design System & Aesthetics

- **Primary Emerald Green:** `#087F68`
- **Deep Botanical Green:** `#075E50`
- **Forest Accent:** `#043D34`
- **Soft Ivory Canvas:** `#F8F8F3`
- **Light Mint Pill & Badges:** `#EAF5F0`
- **Main Heading & Body Text:** `#202A26`
- **Secondary Muted Text:** `#69736E`
- **Typography:** *Plus Jakarta Sans* & *Playfair Display* via Google Fonts

---

## 🛠️ 3. Technology Stack & Architecture

- **Framework:** React 19 + Vite 8
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`) with custom design tokens
- **Routing:** React Router DOM (v7)
- **Icons:** Lucide React
- **State Management:**
  - `CartContext`: Dynamic quantities, inventory limits, subtotal, shipping calculation, LocalStorage sync.
  - `WishlistContext`: Product bookmarking with LocalStorage persistence.
- **Service Layer:**
  - `productService.js`: Decoupled catalog querying and search.
  - `orderService.js`: Client-side order payload construction and local storage ledger.
  - `paymentService.js`: Razorpay / Cashfree client-side bridge + test sandbox mode.

---

## 💳 4. Production Payment Integration (Razorpay / Cashfree)

### Security Rules Implemented
1. **Zero Secret Exposure:** Client code **never** stores `RAZORPAY_KEY_SECRET`.
2. **Server-Side Order Generation:** `order_id` is created on your secure server.
3. **HMAC Signature Verification:** Server validates signature using HMAC-SHA256.

### Production Setup Instructions
1. Set frontend public key in `.env`:
   ```bash
   VITE_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxx
   ```
2. Implement backend endpoints (Node.js / Express example):
   ```javascript
   // POST /api/orders/create
   app.post('/api/orders/create', async (req, res) => {
     const order = await razorpay.orders.create({
       amount: req.body.amount, // in paise (e.g. 129900)
       currency: 'INR',
       receipt: 'rcpt_' + Date.now()
     });
     res.json({ orderId: order.id });
   });

   // POST /api/payments/verify
   app.post('/api/payments/verify', (req, res) => {
     const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
     const generated_signature = crypto
       .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
       .update(razorpay_order_id + '|' + razorpay_payment_id)
       .digest('hex');

     if (generated_signature === razorpay_signature) {
       res.json({ status: 'success' });
     } else {
       res.status(400).json({ status: 'invalid_signature' });
     }
   });
   ```

---

## 🚀 5. Development & Production Commands

```bash
# Install dependencies
npm install

# Start Vite local development server
npx vite

# Build production bundle
npm run build

# Preview production build
npx vite preview
```
