import {ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {saveAs} from 'file-saver';
import {ClipboardService} from 'ngx-clipboard';
import {ToastrService} from 'ngx-toastr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'IP Join';
  form: FormGroup;
  ips: FormArray;
  ipsToShow = [];
  @ViewChild('result') result: ElementRef;
  @ViewChildren('formRow') rows: QueryList<any>;
  second;
  last;
  constructor(private formBuilder: FormBuilder,
              private toastrService: ToastrService,
              private clipboardService: ClipboardService,
              private cdref: ChangeDetectorRef){

  }

  ngOnInit() {
    this.initForm();
  }


  initForm() {
    this.form = this.formBuilder.group({
      ips: new FormControl(''),
      second: new FormControl(''),
      last: new FormControl(''),
    });
  }



  joinWords() {
    if (this.form.get('ips') && this.form.get('ips').value){
      this.ipsToShow = this.form.get('ips').value.split(/\r|\n/);
      this.ipsToShow = this.ipsToShow.map(val => {
        return val.trim();
      });
      this.ipsToShow = this.ipsToShow.filter(val => val && val.trim());
      this.second  = this.form.get('second').value;
      this.last = this.form.get('last').value;
    }

  }

  reset(){
    this.form.reset();
    this.second  = null;
    this.last = null;
    this.ipsToShow = [];
    this.form = this.formBuilder.group({
      ips: new FormControl(''),
      second: new FormControl(''),
      last: new FormControl(''),
    });
    this.joinWords();
  }

  downloadFile() {
    if (this.result && this.result.nativeElement && this.result.nativeElement.innerText){
      const blob = new Blob([this.result.nativeElement.innerText]);
      saveAs(blob, 'IP-address-' + Date.now() + '.txt' );
      this.toastrService.info('', 'Téléchargement en cours', {
        timeOut: 3000,
      });
    }

  }


  copy(){
    if (this.result && this.result.nativeElement && this.result.nativeElement.innerText){
      this.clipboardService.copyFromContent(this.result.nativeElement.innerText);
      this.toastrService.success('', 'Copié dans le presse-papier', {
        timeOut: 3000,
      });
    }
  }

}
