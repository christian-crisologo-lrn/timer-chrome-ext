# Simple timer for chrome extension
## Overview

This project is a simple timer extension for Google Chrome. It allows users to set a timer directly within their browser, providing a convenient way to manage time without needing a separate application.

Powered by React + Vite + Typescript.

Visit this GH page to see the running [demo](https://christian-crisologo-lrn.github.io/timer-chrome-ext/launcher.html).


## Features

- Optimized and simplified countdown timer that can set the time in hours and minutes
- Add warning time that flickers the timer when the time is about to expire
- Show a timer only display
- Simple and intuitive user interface

## Installation

1. Clone the repository:
  ```bash
  git clone https://github.com/yourusername/chrome-timer-ext.git
  ```

2. Run the yarn to install and build the app and create the `/dist` folder
  ```bash
    yarn install && yarn build
  ```

3. To use it as a chrome extension. Open your Chrome and navigate to `chrome://extensions/`
4. Enable `"Developer mode"` by clicking the toggle switch in the top right corner
5. Click the `"Load unpacked"` button and select the `/dist` from your repo
6. Find the chrome extension in your extensions app named `"Mewtwo Tiemr"`
7. Launch the App and it will show in a seperate popup

### Running in dev
1. After cloning the repo, run the yarn to launch the `dev` environment
  ```
  yarn install && yarn dev
  ```
2. Hit your [localhost](http://localhost:5173/timer-chrome-ext/)

