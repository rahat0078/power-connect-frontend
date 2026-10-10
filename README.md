# ⚡ PowerConnect — Load Shedding & Power Management Platform

**PowerConnect** is a full-stack, enterprise-grade utility and power management ecosystem built with **Next.js 15 (App Router)** and **TypeScript**. It seamlessly bridges the gap between **Residents**, **Utility Service Providers**, and **System Administrators** by delivering real-time power outage schedules, service requests, outage report tracking, and secure payment processing.

---

## 🚀 Live Links & Resources

* **Live Frontend Web App:** [https://powerconnect.vercel.app](https://powerconnect.vercel.app) *(Replace with actual URL)*
* **Backend API Base URL:** `https://your-backend-api.com/api/v1`
* **API Documentation:** `https://your-backend-api.com/docs`
* **Demo Video Walkthrough:** [Watch Video Demonstration](https://drive.google.com/file/d/xyz/view)

---

## 🔐 One-Click Demo Credentials

To streamline evaluation, the login page features **One-Click Demo Login** buttons for all three distinct user roles:

| Role | Demo Email | Password | Primary Capabilities |
| :--- | :--- | :--- | :--- |
| **👨‍💼 Admin** | `admin@power.com` | `Admin@12` | Approve Providers, Manage Schedules, Review Audit Logs & Outages |
| **🛠️ Provider** | `provider@powerconnect.com` | `Provider@123456` | Manage Power Services, Process Requests, Update Execution Status |
| **👤 Resident (User)** | `resident@powerconnect.com` | `Resident@123456` | Book Power Services, Report Outages, Pay via Stripe/bKash, Apply for Provider |

---

## 🛠️ Tech Stack & Key Libraries

* **Framework:** Next.js 15 (App Router) with TypeScript
* **Styling & UI Components:** Tailwind CSS, shadcn/ui, Radix UI, Lucide React Icons
* **Form Validation:** React Hook Form + Zod Schema Validation
* **State & Data Fetching:** Native Server Actions, Next.js Caching, Dynamic Revalidation, `fetcher` Utility
* **Authentication & Security:** JWT Auth Middleware with Role-Based Access Control (RBAC)
* **Payment Gateway:** Stripe Checkout Integration (Test Mode) & bKash Payment Handler
* **Notifications:** Sonner Toast Notifications

---

## ✨ Key Features & Multi-Role Workflows

### 👤 1. Resident (User) Role
* **Service Booking & Workflow:** Browse utility services (IPS/Solar maintenance, generator setup), request custom services, and process secure payments via Stripe.
* **Outage Reporting:** Submit neighborhood power outage reports with severe levels and localized geo-details.
* **Become a Provider Application:** Apply to become an onboarded power service vendor directly from the dashboard.

### 🛠️ 2. Service Provider Role
* **Service Management:** Full CRUD operations for offered technical power services with custom pricing and capacity.
* **Request Lifecycle Processing:** Accept or reject assigned service requests, transition orders to `IN_PROGRESS`, and mark as `COMPLETED`.
* **Business Profile:** Manage verified business details and contact parameters.

### 👨‍💼 3. Admin Role
* **Dashboard Analytics:** High-level overview of active users, active power services, service requests, and total platform revenue.
* **Provider Approval Pipeline:** Review pending vendor applications and approve/reject candidates.
* **Load Shedding Schedule Management:** Create, edit, and publish localized power maintenance schedules (`ISO Datetime` precision).
* **System Audit Logs:** Comprehensive real-time tracking of administrative entity changes and system actions.

---

## 📁 Project Architecture & Directory Structure

```text
app/
├── (public)/                 # Public marketing & auth pages
│   ├── how-it-works/
│   ├── login/                # Features One-Click Demo Login
│   ├── register/
│   ├── schedules/
│   └── services/
├── (dashboard)/              # Authenticated Role Dashboards
│   ├── admin/                # Admin Module
│   │   ├── audit-logs/
│   │   ├── outage-reports/
│   │   ├── providers/
│   │   └── schedules/
│   ├── provider/             # Provider Module
│   │   ├── create-service/
│   │   ├── my-services/
│   │   ├── profile/
│   │   └── service-requests/
│   └── resident/             # Resident Module
│       ├── payments/
│       ├── reports/
│       └── requests/
├── error.tsx                 # Global Error Boundary
├── loading.tsx               # Skeleton Loading States
└── layout.tsx                # Root Application Layout

```