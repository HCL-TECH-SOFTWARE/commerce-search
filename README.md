# Search Assets (Image, Barcode, Voice) for React Stores 

## WARRANTY & SUPPORT 
HCL Software provides HCL Commerce open source assets “as-is” without obligation to support them nor warranties or any kind, either express or implied, including the warranty of title, non-infringement or non-interference, and the implied warranties and conditions of merchantability and fitness for a particular purpose. HCL Commerce open source assets are not covered under the HCL Commerce master license nor Support contracts.

If you have questions or encounter problems with an HCL Commerce open source asset, please open an issue in the asset's GitHub repository. For more information about [GitHub issues](https://docs.github.com/en/issues), including creating an issue, please refer to [GitHub Docs](https://docs.github.com/en). The HCL Commerce Innovation Factory Team, who develops HCL Commerce open source assets, monitors GitHub issues and will do their best to address them. 

## Search Assets
This asset provides the capability to search HCL Commerce Catalog in React Stores via the following:<br/>
Voice search <br/>
Image Search <br/>
Barcode Search <br/>

Please install the below libraries in the react store application <br/>
npm install @iconify/icons-mdi <br/>
npm install @iconify/react <br/>
npm install react-audio-analyser <br/>
npm install react-device-detect <br/>
npm install react-qr-barcode-scanner <br/>
npm install react-responsive-modal <br/>

### Voice-Search-POC

**Prerequisites:** HCL Commerce V9.1.x / HCL Commerce React Storefront SDK

We have used following components to achieve the voice search
**React Audio Analyser** - Used to record audio. 
**Google Speech API** - Used to convert audio to text.

**Note**
The library **react-audio-analyser** used for recording audio, doesn't support in IOS chrome and safari as this library uses HTML5 Media Recorder APIs “getUserMedia and MediaRecorder” which are not supported by chrome and safari in IOS. So we have hide voice search button for IOS.

Supported Browser are Windows (Chrome, Firefox), Mac (Chrome,  Firefox), Android (Chrome) 
If supports need to provide for iOS/Mac(safari), the Paid library(react-mic-gold) can be used for audio recording.

**Steps to include the Voice search in your project:**<br/>
1. You need to install the react audio anayser in your project as a dependency.<br/>
   `npm install react-audio-analyser –save`
   
    Once installation is done. Verify the entry  in your package.json file.
    For icons used,install iconify icons<br/>
    `npm install @iconify/react @iconify/icons-mdi`

2. In your Search Bar Widget,import the search-type.tsx and used it as component

    ` import { SearchTypes } from "../Search-types/search-types";`
    `  <SearchTypes showSpeechToText={true} setSearchBoxVal={setInput} />`

3. We have created the firebase API to call the google speech API.The call to the firebase API is placed in the **voiceImageTranscribeService**
   Host the Node Code on the firebase and use the Firebase hosted URL for the API in voiceImageTranscribeService.ts
   `const VOICE_URL = "Your Firebase API URL"`
   
4. Once All steps are done, Voice search will start working.

### Image-Search-POC

**Prerequisites:** HCL Commerce V9.1.10 / HCL Commerce React Storefront SDK

There are two ways image search can be done.

1.	By uploading an image-  used javascript input tag to accept only image file file.
2.	By opening the web cam and capturing the image- used the react-webcam for capturing the live image 


**React-Webcam** - for capturing the live image.
**Google Vision API** - Used to get label from an image.

**Note**
The library **react-webcam** used for taking pictures doesn't support in IOS chrome as this library uses HTML5 Media API “getUserMedia”  which is not supported by chrome in IOS.

**Steps to include the Image search in your project:**<br/>
1. You need to install the react web cam in your project as a dependency.<br/>
   `npm install react-webcam –save`
   
    Once installation is done. Verify the entry  in your package.json file.
    For icons used,install iconify icons<br/>
    `npm install @iconify/react @iconify/icons-mdi`

2. In your Search Bar Widget,import the search-type.tsx and used it as component
    ` import { SearchTypes } from "../Search-types/search-types";`
    `  <SearchTypes showImageToText={true} setSearchBoxVal={setInput} />`

3. We have created the firebase API to call the google speech API.The call to the firebase API is placed in the **voiceImageTranscribeService**
   Host the Node Code on the firebase and use the Firebase hosted URL for the API in voiceImageTranscribeService.ts
   `const VOICE_URL = "Your Firebase API URL"`
   
4. Once All steps are done, Image search will start working.

### Barcode-Scanner-POC

**Prerequisites:** HCL Commerce V9.1.x / HCL Commerce React Storefront SDK

**It Provide the capability to search HCL Commerce Catalog using barcode recognition on React Stores.**

We have used following components to achieve the voice search

**React Webcam Barcode Scanner** - Capture the barcode from live Image

**Note**
•	The Barcode Scanner currently supports only Code128, EAN and UPC-A. <br/>
•	The library “react-webcam-barcode-scanner “used for scanning barcode does not support the IOS chrome as this library uses HTML5 Media API “getUserMedia” which is not supported by chrome in IOS. Hence, the barcode scan icon would not be displayed for the iOS chrome.<br/>
•	Supported Browser are Windows (Chrome, Firefox), Mac (Chrome, Safari, Firefox), Android (Chrome) and iOS(Safari)<br/>

**Steps to include the Barcode search in your project:**<br/>
1. You need to install the react-webcam-barcode-scanner in your project as a dependency.<br/>
   `npm install react-qr-barcode-scanner –save`
   
    Once installation is done. Verify the entry  in your package.json file.
    
2. For icons used,install iconify icons<br/>
     `npm install @iconify/react @iconify/icons-mdi`

3. In your Search Bar Widget,import the search-type.tsx and used it as component<br/>
    ` import { SearchTypes } from "../Search-types/search-types";`
    `  <SearchTypes showBarcodeIcon={true} setSearchBoxVal={setInput} />`

4. Once All steps are done, Voice search will start working.
