## Translator-App
A Web-App which is translating CSV file from English to Hindi, Punjabi, Marathi, Telugu Using Google translate API

## Versions of Technology
  1. `node v16.17.0`
  2. `npm v16.17.0`
  3. `angular-cli v14.1.3`

## Steps to Run
  1. Install above versions
  2. Clone this project
  3. Go to project Directory
  4. Run Command `npm instll`
  5. Place your google translate API key at line number 13 of `app.component.ts` file `api_key = 'PASTE YOUR GOOGLE TRANSLATE API KEY'`
  5. now un command `ng serve`
  6. vistit `http://localhost:4200/` on your browser
 
## Google Translate API Specification
  We can send maximum 128 string to get translated
  API URL:- `https://translation.googleapis.com/language/translate/v2`
  Request Method:- `POST`
  
  Payload:
  1. `key` - API Key to be send in query params
  2. `q` - String that need to be translated (We can send it either in query parameter or in request boby, we can add multiple `q` but not exceed 128
  3. `source` - language code in which you are sending your string.
  4. `target` - language code in which you need response
  5. `format` - format type
  Please refer `https://cloud.google.com/translate/docs/languages` for language code
  
  Example payload
  
  `{
  "q": "Hello World",
  "source": "en",
  "target": "hi",
  "format": "text"
  }`
 
## Screenshots
![image](https://user-images.githubusercontent.com/42044984/186390252-ccc9275b-b92f-43bd-9d9e-8785e6d81d13.png)

![image](https://user-images.githubusercontent.com/42044984/186390407-74cba910-f4d3-4a52-9bc5-5f26b40cc4b5.png)

![image](https://user-images.githubusercontent.com/42044984/186390524-81303ef4-aa03-4022-aad6-e815d24f4140.png)

![image](https://user-images.githubusercontent.com/42044984/186390667-2440fa43-5fd0-471d-94b9-ab13f36d6cae.png)

## References
1. `https://cloud.google.com/translate/docs/languages`
2. `https://cloud.google.com/translate/docs/reference/rest/v2/languages`

Thank You

  

  
