
# Dev guild

## Table of Contents
- 🏃‍♂️ [Run the App](#run-the-app)
- 🌐 [APIs](#apis)
- 🖥️ [URLs](#urls)

## Run the app  
- Simply run 🖥️ `npm run dev`.  

## APIs  

### 🚀 Emoji thrower  
The [emoji thrower](components/generate-text/EmojiThrower.tsx) component is connected to a **deployed websocket**. The API is located in an [external repository](https://github.com/sytest25-devguild/devgamers-websocket) to satisfy separation of concerns. 

The system is a simple implementation to verify that the functionality works reliably. The future usage and purpose will most likely change over time.  

## URLs  
All `URLs` should be defined in **one place** for app maintenance purposes. 
- 📄 [URL constants](utils/constants/urls.js)