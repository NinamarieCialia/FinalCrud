import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';
import { EmployeeModel } from './employee-dashborad.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd!:boolean;
  showUpdate!:boolean;
  constructor(private formBuilder: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: ['',[Validators.required,Validators.minLength(5)]],
      email:['',[Validators.required,Validators.email]],
      number:['',[Validators.required,Validators.minLength(11),Validators.maxLength(13)]]
    })
    this.getAllEmployee();
  }
  get name(){
    return this.formValue.get('name')
  }
  get email(){
    return this.formValue.get('email')
  }
  get number(){
    return this.formValue.get('number')
  }
  clickToAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postEmployeeDetails(){
    this.employeeModelObj.name = this.formValue.value.name;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.number  = this.formValue.value.number;

    this.api.postEmployee(this.employeeModelObj).subscribe((res:any) =>{
      console.log(res);
      alert("Employee Added Succesfully!")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    ()=>{
      alert("Something went wrong")
    })
  }

getAllEmployee(){
  this.api.getEmployee().subscribe(res =>{
    this.employeeData = res;
  })
}

deleteEmployee(list:any){
  this.api.deleteEmployee(list.id).subscribe(res =>{
    alert("Deleted")
    this.getAllEmployee();
  })
}

onEdit(list:any){
  this.showAdd = false;
  this.showUpdate = true;

this.employeeModelObj.id = list.id;
this.formValue.controls['name'].setValue(list.name);
this.formValue.controls['email'].setValue(list.email);
this.formValue.controls['number'].setValue(list.number);


}
updateEmployeeDetails(){
    this.employeeModelObj.name = this.formValue.value.name;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.number  = this.formValue.value.number;

    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
    .subscribe(res =>{
      alert("Changes Saved!");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    })
}




}
