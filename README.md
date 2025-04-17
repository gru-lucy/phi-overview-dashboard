# Patient Overview Dashboard

A secure, server-rendered dashboard for viewing and exploring patient vitals. Built with Next.js and a simple JSON data source, it exposes patient records via an API endpoint, displays them in a sortable/filterable table, and shows an vitals chart in a modal without ever caching sensitive data in the browser.

Features
 1. Next.js Dashboard
 	- Server-side rendered table of patients
 	- Client-side sorting and filtering by name, age, gender and diagnosis.
 2. Vitals Modal
 	- Click any row to open a drawer displaying small charts of that patient's recent vitals (heart rate, blood pressure) using Recharts.
 3. Zero PHI in Browser Storage
 	- All patient data lives in memory on the server.
 	- No patient data is written to localStorage, sessionStorage, cookies, or indexedDB.

## 🚀 Getting started

  ```bash
    # 1. Clone & install
    git clone https://github.com/supermarioknight/phi-overview-dashboard.git
    cd phi-overview-dashboard
    npm install

    # 2. Run locally
    npm run dev                      # http://localhost:3000/dashboard

    # 3. Build for production
    npm run build && npm run start
  ```

### Architecture & Key Decisions

 1. Charting with Recharts for its lightweight, declarative API and good React intergration, ideal for small charts.

 2. Server-Side Data Fetching

 3. Client-Side Table Logic with filters and sorting.

### Next improvements

 - Improve the filtering functionality so it apply different types of filters depending data type like string for name, date for DOB or last visit, etc.
 - Server Side Pagination & Infinite Scroll - Avoid fetching all 25+ records at once, implement cursor-based pagination on the API.
 - Role-Based Access Control - Add authentication (e.g. JWT + middleware) so only authorized users can view patient data.
 - Automated Testing - Layer in Cypress end-to-end tests for core flows (load table, filter, modal, chart renders) and Jest unit testings.
 - Monitoring & Alerting - integrate Sentry (errors) and Datadog or LogRocket (perfomance) so you're alerted the moment something degrades in production.
