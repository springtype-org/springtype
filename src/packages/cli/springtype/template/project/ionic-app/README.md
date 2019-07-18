## SpringType PWA: Ionic 4 and Capacitor integration example

This example shows how to integrate and use Ionic 4 within SpringType
and use Capacitor to create native Hybrid Apps for iOS, Android, Windows, macOS and Linux.

### Prerequisites

Install the project dependencies:

    npm i
    
### Run and develop

To develop the PWA with hot module reloading, run:

    npm start

### Building for native targets

#### Prerequisites

Install Capacitor:

    npm i @capacitor/core @capacitor/cli

#### Electron (Windows, macOS, Linux)

Install electron support by running:

    npx cap add electron
    
Build a revision:

    npm run build
    npx cap sync electron
    
Run the app:

    cd electron
    npm run electron:start
    
#### Android / iOS

Install Android support by running:

    npx cap add android
    
Build a revision:

    npm run build
    npx cap sync android

Run the app:

    npx cap open android
    
Click on "Build & Run" (configure emulated or hardware devices before)
