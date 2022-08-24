import { Component, ViewChild } from '@angular/core';
import { FarmerDetailsModel } from './farmerDetailsModel';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  response: any
  api_key = 'PASTE YOUR GOOGLE TRANSLATE API KEY'
  constructor(private http: HttpClient) { };
  @ViewChild('csvReader') csvReader: any;
  public records: FarmerDetailsModel[] = [];
  public translatedRecords: FarmerDetailsModel[] = [];
  public headers: string[] = [];

  fileEvent: any;
  show: boolean = false;
  languages: any[] = [
    {
      'lang': 'Telugu',
      'code': 'te'
    },
    {
      'lang': 'Hindi',
      'code': 'hi'
    },
    {
      'lang': 'Marathi',
      'code': 'mr'
    },
    {
      'lang': 'Punjabi',
      'code': 'pa'
    }
  ];
  form = new FormGroup({
    file: new FormControl('', Validators.required),
    lang: new FormControl('', Validators.required)
  });
  submit() {
    this.getTranslatedData().then((res) => {
      this.response = res
    })
    setTimeout(() => {
      let translatedHeaders: string[] = this.response.data.translations[4].translatedText.split('+');
      for(let i=0; i<this.headers.length;i++){
        this.headers[i] = translatedHeaders[i];
      }
      let translatedState: string[] = this.response.data.translations[0].translatedText.split('+');
      let translatedName: string[] = this.response.data.translations[1].translatedText.split('+');
      let translatedDistrict: string[] = this.response.data.translations[2].translatedText.split('+');
      let translatedVillage: string[] = this.response.data.translations[3].translatedText.split('+');
      this.records.forEach((val, index) => {
        val.name = translatedName[index];
        val.state = translatedState[index];
        val.district = translatedDistrict[index];
        val.village = translatedVillage[index];
      });
    }, 2000)

    setTimeout(() => {
      this.show = true;
    }, 500);
    //this.show = true;
  }
  private async getTranslatedData() {
    let params = new URLSearchParams();
    params.append('q', this.records.map(u => u.name).join('+'));
    params.append('q', this.records.map(u => u.district).join('+'));
    params.append('q', this.records.map(u => u.village).join('+'));
    params.append('q', this.headers.join('+'));
    params.append('key', this.api_key   );
    try {
      var response: any
      await this.http.post('https://translation.googleapis.com/language/translate/v2?' + params, {
        'q': this.records.map(u => u.state).join('+'),
        "souce": "en",
        "target": this.form.value.lang,
        "format": "text"
      }).toPromise().then((res) => {
        response = res
        return res;
        console.log(res)
      });

    } catch (err) {
      console.log(err)
    } finally {
      return response;
    }
  }

  uploadListener($event: any): void {
    this.fileEvent = $event;
    let files = $event.srcElement.files;
    if (this.isValidCSVFile(files[0])) {
      let input = $event.target;
      let reader = new FileReader();
      reader.readAsText(input.files[0]);
      reader.onload = () => {
        let csvData = reader.result;
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
        let headersRow = this.getHeaderArray(csvRecordsArray);
        this.headers = headersRow
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
      };

      reader.onerror = function () {
        console.log('error is occured while reading file!');
      };

    } else {
      alert("Please import valid .csv file.");
      this.fileReset();
    }
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    let csvArr = [];
    for (let i = 1; i < csvRecordsArray.length; i++) {
      let curruntRecord = (<string>csvRecordsArray[i]).split(',');
      if (curruntRecord.length == headerLength) {
        let csvRecord: FarmerDetailsModel = new FarmerDetailsModel();
        csvRecord.phone = curruntRecord[0].trim();
        csvRecord.name = curruntRecord[1].trim();
        csvRecord.state = curruntRecord[2].trim();
        csvRecord.district = curruntRecord[3].trim();
        csvRecord.village = curruntRecord[4].trim();
        csvArr.push(csvRecord);
      }
    }
    return csvArr;
  }

  isValidCSVFile(file: any) {
    return file.name.endsWith(".csv");
  }

  getHeaderArray(csvRecordsArr: any) {
    let headers = (<string>csvRecordsArr[0]).split(',');
    let headerArray = [];
    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  fileReset() {
    this.csvReader.nativeElement.value = "";
    this.records = [];
  }
}
