---
title: Environment File
sidebar_position: 8
---

You have two environment files in the root of the project:

One in `backend/.env` and the other in `frontend/.env`.

### Backend Environment File

The backend environment file is used to configure the backend server. It contains the following variables:

- `SUPABASE_URL`: The connection string to the project's Supabase application, which is a suite of open source tools that provide functionality similar to Firebase.

- `SUPABASE_SERVICE_KEY`: Used for server-side requests to authenticate with Supabase, providing administrative access to the database and other services.

- `OPENAI_API_KEY`: The key required to authenticate requests to OpenAI's API for accessing their services, such as language models like GPT-3 or GPT-4.

- `JWT_SECRET_KEY`: A secret key for signing and verifying JSON Web Tokens, used in the authentication process to secure the tokens exchanged between client and server.

- `CELERY_BROKER_URL`: The URL of the message broker for Celery (using Redis), which is an asynchronous task queue/job queue based on distributed message passing.

- `RESEND_API_KEY`: The API key for a service referred to as "RESEND," which likely deals with email sending or processing.

- `RESEND_EMAIL_ADDRESS`: The email address used by the "RESEND" service, possibly as the sender's address for onboarding communications.

- `RESEND_CONTACT_SALES_FROM`: The sender's email address for sales-related inquiries sent through the "RESEND" service.

- `RESEND_CONTACT_SALES_TO`: The recipient's email address for sales inquiries using the "RESEND" service.

- `PREMIUM_MAX_BRAIN_NUMBER`: A limit on the number of 'brains' a premium user can have

- `PREMIUM_MAX_BRAIN_SIZE`: The maximum allowed size for a 'brain'

- `PREMIUM_DAILY_CHAT_CREDIT`: The number of daily credits allocated to a premium user, possibly limiting the number of API calls or operations a user can perform each day.

### Frontend Environment File

The frontend environment file is used to configure the frontend application. It contains the following variables:

- `NEXT_PUBLIC_ENV`: Specifies the environment in which the Next.js application is running (e.g., local, development, production).

- `NEXT_PUBLIC_BACKEND_URL`: The URL where the backend of the application is running, used to make server-side requests.

- `NEXT_PUBLIC_FRONTEND_URL`: The URL where the frontend of the application is accessible. The asterisk (*) may indicate that any port can be used when running locally.

- `NEXT_PUBLIC_SUPABASE_URL`: The connection string to the project's Supabase application for the frontend to interact with Supabase services.

- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: The public 'anonymous' key for Supabase that is used in the frontend for services that don't require full user authentication.

- `NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY`: The client key for GrowthBook, which is a feature flagging and experimentation platform. The variable might be set to a default or placeholder value.

- `NEXT_PUBLIC_GROWTHBOOK_URL`: The URL for the GrowthBook service. This is also set to a default or placeholder value.

- `NEXT_PUBLIC_JUNE_API_KEY`: The API key for accessing June services, which is likely analytics or marketing related, again set to a default or placeholder value.

- `NEXT_PUBLIC_GA_ID`: The tracking ID for Google Analytics, which is used to monitor and track user interactions on the website.

- `NEXT_PUBLIC_E2E_URL`: The URL for end-to-end (E2E) testing, usually pointing to a testing environment.

- `NEXT_PUBLIC_E2E_EMAIL`: An email address used for end-to-end testing purposes.

- `NEXT_PUBLIC_E2E_PASSWORD`: A password used in conjunction with the E2E_EMAIL for testing authentication flows.

- `NEXT_PUBLIC_CMS_URL`: The URL to access the Content Management System (CMS) for the application.

- `NEXT_PUBLIC_STRIPE_PRICING_TABLE_ID`: An identifier for a pricing table in Stripe, which is a payment processing platform.

- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: The publishable key for Stripe, used to initiate transactions on the frontend.

- `NEXT_PUBLIC_STRIPE_MANAGE_PLAN_URL`: The URL for managing Stripe subscription plans.

- `NEXT_PUBLIC_AUTH_MODES`: The authentication modes supported by the application, such as magic link, password-based authentication, and Google Single Sign-On (SSO).
