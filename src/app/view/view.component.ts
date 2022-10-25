import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { FormBuilder,FormGroup } from '@angular/forms';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  employeeData !: any;
  formValue !: FormGroup;
  constructor(private api:ApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email:[''],
      number:['']
    })
    this.getAllEmployee();
  }
  getAllEmployee() {
    this.api.getEmployee().subscribe(res =>{
      this.employeeData = res;
    })
  }

}
