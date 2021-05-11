import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { switchMap } from "rxjs";
import { HttpClient } from "@angular/common/http";

declare const require;
const xml2js = require("xml2js");

@Component({
  selector: 'app-editor-window',
  templateUrl: './editor-window.component.html',
  styleUrls: ['./editor-window.component.scss']
})
export class EditorWindowComponent implements OnInit {

  dataDocument$: Observable<Array<any>>;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.dataDocument$ = this.getDataDocument();
  }
  getDataDocument() {
    return this.http
      .get("/assets/data/101.xml", { responseType: "text" })
      .pipe(
        switchMap(async xml => await this.parseXmlToJson(xml))
      );
  }

  async parseXmlToJson(xml) {
    // With parser
    /* const parser = new xml2js.Parser({ explicitArray: false });
    parser
      .parseStringPromise(xml)
      .then(function(result) {
        console.log(result);
        console.log("Done");
      })
      .catch(function(err) {
        // Failed
      }); */

    // Without parser
    return await xml2js
      .parseStringPromise(xml, { explicitArray: false })
      .then(response => response.dataDocument.text);
  }
}
