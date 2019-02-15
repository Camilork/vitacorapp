import { Component, OnInit , ViewChild} from '@angular/core'
import { NgForm } from '@angular/forms'

import { VitacorService } from '../../services/vitacor.service'
import { TaskService } from '../../services/task.service'

import { Vita } from '../../models/vitacor'
import { Task } from '../../models/task'

import { NotificatorComponent } from '../notificator/notificator.component'

@Component({
  selector: 'app-vitacor',
  templateUrl: './vitacor.component.html',
  styleUrls: ['./vitacor.component.sass'],
  providers: [VitacorService,TaskService]
})
 
export class VitacorComponent implements OnInit {
  constructor(public vitacorService : VitacorService,public taskService : TaskService) { }
  
  @ViewChild(NotificatorComponent) notificatorComponent: NotificatorComponent;

  viewList = false
  idVita = null
  idTasks = null

  ngOnInit() { 
    this.getVita()
  }
  //------------------------------View functions-----------------------------//
  listViewer(){
    if(this.viewList){
      this.viewList = false;
    }else{
      this.viewList = true;
    }
  }
  findData(data){
    console.log(data.value)
  }
  //------------------------------database functions-----------------------------//
  //----------------------------->Vita
  getVita(){
    this.vitacorService.getVita()
    .subscribe(res=>{
      this.vitacorService.vita = res as Vita[]
      this.setVitaEstadistic(this.vitacorService.vita.length)
    })
  }
  createVita(form?: NgForm){
      form = this.autoInput(form)
      if(this.vitacorService.checkData(form.value)){
        return this.notificatorComponent.notifi(this.vitacorService.checkData(form.value))
      }
      if(form.value._id){
        this.vitacorService.putVita(form.value)
        .subscribe(res=>{
          if(res['status'] == 400 ){return this.notificatorComponent.notifi(res['msg'])}
          this.updateVitaObjet(form.value)
          this.resetForm(form)
          this.notificatorComponent.notifi("Successful update") 
        })
      }else{
        this.vitacorService.postVita(form.value)
        .subscribe(res=>{
          if(res['success']){
            this.notificatorComponent.notifi(res['msg']) 
            this.resetForm(form)
            this.addVitaObjet(res['data'][0])
          }else{
            this.notificatorComponent.notifi('Error '+ res['msg']) 
          }
        })
      }
    }
  deleteVita(_id: string,idVita : string){
      if(confirm('Are you sure you want to delete it?')){
        this.vitacorService.deleteVita(_id).subscribe(res=>{
          this.notificatorComponent.notifi("Successful delete")   
          this.resetForm()
          this.removeVitaObjet(idVita)
        })
      }
    }
  //----------------------------->Tasks
  createTask(form?: NgForm){
    if(this.taskService.checkData(form.value)){
      return this.notificatorComponent.notifi(this.taskService.checkData(form.value))
    }
    if(form.value._id){
      this.taskService.putTask(form.value)
      .subscribe(res=>{
        this.resetFormTask(form)
        this.getTaskCount(this.idTasks,this.idVita)
      })
    }else{
      if(this.idVita){
        form.value.status = "pending";form.value.idTasks = this.idTasks
        this.taskService.postTask(form.value)
        .subscribe(res=>{
          if(res['success']){
            this.notificatorComponent.notifi(res['msg'])   
            this.resetFormTask(form)
            this.getTaskCount(this.idTasks,this.idVita)
          }else{
            this.notificatorComponent.notifi('Error Please input the task')   
          }
        })
      }else{
        this.notificatorComponent.notifi("Please select one day")   
      }
    }
  }
  deleteTask(_id: string){
    if(confirm('Are you sure you want to delete it?')){
      this.taskService.deleteTask(_id)
      .subscribe(res=>{
        this.resetForm()
        this.getTaskCount(this.idTasks,this.idVita)
      })
    }
  }
  //------------------------------Actions functions-----------------------------//
  //----------------------------->Vita
  editVita(vita: Vita, idVita : string){
    this.idVita = idVita
    this.vitacorService.selectvitacor =  Object.assign({}, vita);
  }  
  resetForm(form?: NgForm){
    if(form){
      form.reset()
      this.vitacorService.selectvitacor = new Vita
    }
  }
  autoInput(vita : NgForm){
    if (!vita.value.lid) vita.value.lid = 'n/a'
    if (!vita.value.finishDate) vita.value.finishDate = vita.value.initDate
    if (!vita.value.note) vita.value.note = 'n/a'
    return vita;
  } 
  //----------------------------->Tasks
  editTask(task: Task){
    this.taskService.selecttask = task;
  }
  resetFormTask(form?: NgForm){
    if(form){
      form.reset()
      this.taskService.selecttask = new Task
    }else{
      this.taskService.task = null
    }
  }
  changeTaskStatus(task: Task, status){
    if(task.status == "pending"){
      task.status = "finish"
      this.taskService.putTask(task)
      .subscribe(res=>{
        let result = this.vitacorService.vita[this.idVita]['taskFinished'] - 1
        this.vitacorService.vita[this.idVita]['taskFinished'] = result
      })
    }else{
      task.status = "pending"
      this.taskService.putTask(task)
      .subscribe(res=>{
        let result = this.vitacorService.vita[this.idVita]['taskFinished'] + 1
        this.vitacorService.vita[this.idVita]['taskFinished'] = result
      })
    }
  }
  //------------------------------Objets functions-----------------------------//
  //----------------------------->Vita
  addVitaObjet(vita : Vita){
    let vitacor : any = this.setVitaObjet(vita)
    vitacor.taskCant = 0;vitacor.taskFinished = 0
    this.vitacorService.vita.push(vitacor) 
  }
  removeVitaObjet(idVita){
    this.vitacorService.vita.splice(idVita)
  }
  updateVitaObjet(vita : Vita){
    let vitacor : any = this.setVitaObjet(vita)
    this.vitacorService.vita[this.idVita] = vitacor 
    this.getTaskCount(vitacor.idTasks,this.idVita,true)
  }
  setVitaObjet(vita : Vita){
    let vitacor : Vita = new Vita;
    vitacor._id          = vita._id 
    vitacor.finishDate   = vita.finishDate
    vitacor.idTasks      = vita.idTasks
    vitacor.initDate     = vita.initDate
    vitacor.lid          = vita.lid
    vitacor.note         = vita.note
    return vitacor
  }
  //------------------------------Stadistic functions-----------------------------//
  //----------------------------->Vita
  setVitaEstadistic(count){
    for(let x = 0;x < count ; x++ ){
      this.getTaskCount(this.vitacorService.vita[x]['idTasks'],x,true)
    }
  }
  getTaskCount(id,vitaId,disableView?){
    this.taskService.getTaskCount(id)
    .subscribe(res=>{
      if(!disableView){
        this.idVita = vitaId;this.idTasks = id
        this.taskService.task = res['data'] as Task[]
        this.setTaskdata(vitaId,res['countTotal'],res['countFinish'])
        return 0
      }
      this.setTaskdata(vitaId,res['countTotal'],res['countFinish'])
    })
  }
  setTaskdata(id,cantTotal,cantFinished){
    this.vitacorService.vita[id]['taskCant'] = cantTotal
    this.vitacorService.vita[id]['taskFinished'] = cantTotal - cantFinished
  }

}
