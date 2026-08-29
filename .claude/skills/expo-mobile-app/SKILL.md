---
name: expo-mobile-app
description: How to build the React Native (Expo) mobile app for the TravelAgencyInDubai platform so it shares the Next.js API, Zod schemas and Supabase auth with the web app — project structure, navigation, offline handling, push notifications, deep links, secure token storage, and App Store/Play Store submission requirements. Use this whenever the user mentions the mobile app, React Native, Expo, iOS, Android, push notifications, app store submission, or shipping the site as an app.
---

# Mobile app (Expo)

The app is a second client over the same backend, not a second product. Every rule about
validation, moderation and points still applies — the API is the enforcement point, and an
app binary is fully inspectable by anyone who wants to.

## Decide the approach first

Three options, in increasing cost:

1. **Progressive Web App.** Installable, offline-capable, one codebase, ships instantly.
   Cannot be listed in the App Store, and iOS push support is limited.
2. **Expo app reusing the web API** — the recommended default here. Real store presence,
   real push notifications, native navigation, roughly 60–70% of the work already done
   because the schemas, endpoints and auth are shared.
3. **Fully native.** Not justified for this product.

Ship the PWA first if speed matters; it costs almost nothing on top of the existing site and
covers Android well. Add the Expo app when store presence or push notifications become the
constraint.

Do **not** ship a bare WebView wrapper of the website. Apple rejects those under guideline
4.2 with some consistency, and the ones that get through review poorly.

## Structure

```
mobile/
  app/                        # expo-router, file-based like Next.js
    (tabs)/index.tsx          # home
    (tabs)/explore.tsx        # packages + services
    (tabs)/rewards.tsx        # points, tasks, games
    (tabs)/profile.tsx
    package/[slug].tsx
    blog/[slug].tsx
  components/                 # RN components, mirrors web sections/
  lib/
    api.ts                    # fetch wrapper hitting the same route handlers
    auth.ts                   # Supabase auth + SecureStore
    query.ts                  # TanStack Query client
  shared/ -> symlink or workspace package containing lib/validation/
```

Put the Zod schemas in a shared workspace package (`packages/validation`) consumed by both
`web` and `mobile`. One definition of what a valid lead looks like, used by three consumers.
Duplicating them guarantees they diverge, usually discovered by a user hitting a 400.

`expo-router` uses the same file-based conventions as the App Router, so navigation
structure maps across with little translation.

## Auth

Supabase Auth works in React Native, but tokens must go in `expo-secure-store`
(Keychain/Keystore), never `AsyncStorage` — the latter is plain text readable on a rooted
or jailbroken device.

```ts
// mobile/lib/auth.ts
import * as SecureStore from "expo-secure-store";
import { createClient } from "@supabase/supabase-js";

const storage = {
  getItem: (k: string) => SecureStore.getItemAsync(k),
  setItem: (k: string, v: string) => SecureStore.setItemAsync(k, v),
  removeItem: (k: string) => SecureStore.deleteItemAsync(k),
};

export const supabase = createClient(URL, ANON_KEY, {
  auth: { storage, autoRefreshToken: true, persistSession: true, detectSessionInUrl: false },
});
```

`detectSessionInUrl: false` is required on native — the web default tries to parse a URL
fragment that does not exist there.

Only the anon key ships in the app. Treat everything in the binary as public: anyone can
extract strings from an APK in about a minute. Authorisation lives in RLS, and the service
role key never leaves the server.

Add biometric unlock with `expo-local-authentication` for the rewards/profile area. It is a
few lines and it is what users expect from anything holding a balance.

## Data layer

Same TanStack Query patterns as the web app, plus:

- `onlineManager` wired to `@react-native-community/netinfo`, so queries pause on a dropped
  connection instead of failing.
- `focusManager` wired to `AppState`, refetching when the app returns to the foreground.
- Persist the query cache with `AsyncStorage` so the app opens showing last-known content
  rather than an empty screen. On patchy mobile data this is the difference between "fast"
  and "broken".
- Mutations queued while offline, replayed on reconnect — important for the daily check-in,
  which people will tap in a lift or on the metro.

## Push notifications

`expo-notifications` with EAS. Store the Expo push token on a `device_tokens` table keyed to
the user, and delete it on logout.

Worth sending: streak about to break, points expiring, a reply to their enquiry, a new deal
matching a saved destination, moderation decision on their submission.

Not worth sending: generic marketing blasts. Notification permission is granted once and
revoked permanently, and both stores penalise apps that trigger high opt-out rates. Ask for
permission *after* the user has done something that makes it obviously useful — completing
a check-in, or submitting an enquiry — not on first launch.

## Deep links and sharing

Configure universal links (iOS) and app links (Android) so `travelagencyindubai.com/blog/x`
opens in the app when installed, and the site otherwise. This makes the SEO work in
`seo-and-adsense` feed the app instead of competing with it.

Share sheets on packages and posts should share the web URL, not an app-only scheme.

## Store requirements

Both stores need, before review:

- Privacy policy URL, and a completed data-collection disclosure (iOS Privacy Nutrition
  Labels, Android Data Safety). Declare what is actually collected: email, phone, name, and
  any analytics identifier.
- **Account deletion inside the app.** Apple requires this for any app with signup, and it
  is the most common rejection for a first submission. Implement a real delete that cascades
  the user's rows.
- Sign in with Apple, if Google sign-in is offered on iOS.
- A test account for reviewers with points already on it, so the rewards flow is reviewable.
- Age rating that accounts for user-generated content, plus a way to report objectionable
  content and block a user — Apple requires both for any app showing UGC. The moderation
  pipeline in `content-moderation` covers the backend; the app needs the report button.

The games and points system must not involve any real-money wagering or paid loot boxes.
Points earned through free daily activity and redeemed for travel discounts is fine; paying
cash for a spin is a gambling classification problem in several jurisdictions including the
UAE.

## Performance

- `FlashList` rather than `FlatList` for long package and blog lists.
- `expo-image` with `contentFit` and cached remote images.
- Hermes on, `react-native-reanimated` for animation so it runs off the JS thread.
- Test on a low-end Android device, not just the simulator. The target audience's median
  phone is not an iPhone.

## Release

- EAS Build for binaries, EAS Update for over-the-air JavaScript updates. OTA covers copy,
  layout and logic fixes without a review cycle — but native module changes still need a
  store submission, so keep those batched.
- Version the API before the first release ships. Once an old build is installed on real
  phones, the endpoints it calls cannot be changed. Either version the routes (`/api/v1/`)
  or keep responses strictly additive — remove a field and old installs break, silently,
  for the users least likely to update.
