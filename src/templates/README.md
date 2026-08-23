# Templates

Each subdirectory here is one **industry demonstration** for the SaLira
portfolio. A template is not a single app — it is whatever set of product
experiences that business actually needs.

```text
templates/
├── restaurant/        # AURA — customer app + restaurant console (live)
│   ├── customer/
│   └── console/
├── healthcare/        # example future layout:
│   ├── patient/       #   Patient App
│   ├── doctor-portal/ #   Doctor Portal
│   └── clinic-admin/  #   Clinic Admin
├── retail/
└── logistics/
```

Do **not** force every business into a fixed `customer/` + `admin/` split.
A clinic might need three portals; a store might need a staff POS. Define
the experiences the problem demands.

## Adding a new template

1. Create `src/templates/<industry>/` with a folder per product experience
   and a `README.md` describing the business story.

2. Add route constants in `src/templates/<industry>/routes.ts`:

   ```ts
   export const HEALTHCARE_BASE = '/work/healthcare'
   export const PATIENT_BASE = `${HEALTHCARE_BASE}/patient`
   ```

3. Register routes in `src/App.tsx`, nested under your base path:

   ```tsx
   <Route path="/work/healthcare/patient" element={<PatientLayout />}>
     ...
   </Route>
   ```

4. Add a case page under `src/portfolio/pages/` (or extend
   `RestaurantShowcase`'s pattern) and link it from `Work.tsx` /
   `Home.tsx`. Mark it "Live demonstration" once it works.

5. Keep all business code inside your folder. Import only from `shared/`
   and your own template. Never import from another template.

6. If you need cross-app demo sync, copy the lightweight pattern from
   `restaurant/store/useAppStore.ts` (BroadcastChannel + localStorage).
   Do not introduce a backend for portfolio demos.
