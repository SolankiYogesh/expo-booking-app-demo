# Hotel Booking App using Expo

## How to Run the App in Android Emulator

1. Set up Android Studio and the React Native environment (if you want to debug).

2. Install dependencies:

   ```
   npm install
   ```

   or

   ```
   yarn install
   ```

3. Run the app:

   ```
   npm run android
   ```

   or

   ```
   yarn android
   ```

## Assumptions

* For the release build, I’m using Vercel to deploy a `db.json` server. I followed this documentation to set it up:
  [https://www.geeksforgeeks.org/json-server-setup-and-introduction/](https://www.geeksforgeeks.org/json-server-setup-and-introduction/)
* The server is running at: [https://demo-json-liart.vercel.app](https://demo-json-liart.vercel.app)
* Using google maps iframe and ```react-native-webview``` for maps rendering instead of ```react-native-maps``` (don't have api key)
## Notes for Reviewer

* This is my first time using TanStack and Expo Router, so most of the code is based on the official docs.
* Please use Node.js version 22 or later.

## Release Build

