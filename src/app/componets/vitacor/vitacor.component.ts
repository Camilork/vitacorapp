import { Component, OnInit } from '@angular/core'
import { NgForm } from '@angular/forms'

import { VitacorService } from '../../services/vitacor.service'
import { TaskService } from '../../services/task.service'

import { Vita } from '../../models/vitacor'
import { Task } from '../../models/task'

@Component({
  selector: 'app-vitacor',
  templateUrl: './vitacor.component.html',
  styleUrls: ['./vitacor.component.sass'],
  providers: [VitacorService,TaskService]
})

export class VitacorComponent implements OnInit {
  constructor(public vitacorService : VitacorService,public taskService : TaskService) { }

  viewList = false
  idtask = null
  iddata = 0

  ngOnInit() { 
    this.getVita()
  }

  listViewer(){
    if(this.viewList){
      this.viewList = false;
    }else{
      this.viewList = true;
    }
  }

  getVita(){
    this.vitacorService.getVita()
    .subscribe(res=>{
      this.vitacorService.vita = res as Vita[]
      this.setTaskEstadistic(this.vitacorService.vita.length)
    })
  }
  editVita(vita: Vita){
    this.vitacorService.selectvitacor = vita;
  }
  deleteVita(_id: string){
    if(confirm('Are you sure you want to delete it?')){
      this.vitacorService.deleteVita(_id)
      .subscribe(res=>{
        this.resetForm()
        this.getVita()
      })
    }
  }
  createVita(form?: NgForm){
    if(form.value._id){
      this.vitacorService.putVita(form.value)
      .subscribe(res=>{
        this.resetForm(form)
        this.getVita()
      })
    }else{
      this.vitacorService.postVita(form.value)
      .subscribe(res=>{
        if(res['success']){
          alert(res['msg'])
          this.resetForm(form)
          this.getVita()
        }else{
          alert('Error'+ res['msg'])
        }
      })
    }
  }
  resetForm(form?: NgForm){
    if(form){
      form.reset()
      this.vitacorService.selectvitacor = new Vita
      this.getVita()
    }
  }
  
  getTaskCount(id,vitaId,disableView?){
    this.idtask = id
    this.iddata = vitaId
    this.taskService.getTaskCount(id)
    .subscribe(res=>{
        if(!disableView){
          this.taskService.task = res['data'] as Task[]
        }
        this.setTaskdata(vitaId,res['countTotal'],res['countFinish'])
    })
  }
  editTask(task: Task){
    this.taskService.selecttask = task;
  }
  deleteTask(_id: string){
    if(confirm('Are you sure you want to delete it?')){
      this.taskService.deleteTask(_id)
      .subscribe(res=>{
        this.resetForm()
        this.getTaskCount(this.idtask,this.iddata)
      })
    }
  }
  createTask(form?: NgForm){
    if(form.value._id){
      this.taskService.putTask(form.value)
      .subscribe(res=>{
        this.resetFormTask(form)
        this.getTaskCount(this.idtask,this.iddata)
      })
    }else{
      if(this.idtask){
        form.value.status = "pending"
        form.value.idTasks = this.idtask
        this.taskService.postTask(form.value)
        .subscribe(res=>{
          if(res['success']){
            alert(res['msg'])
            this.resetFormTask(form)
            this.getTaskCount(this.idtask,this.iddata)
          }else{
            alert('Error'+ res['msg'])
          }
        })
      }else{
        alert("Please select one day")
      }
    }
  }
  resetFormTask(form?: NgForm){
    if(form){
      form.reset()
      this.taskService.selecttask = new Task
    }else{
      console.log('datas')
      this.taskService.task = null
    }
  }
  changeTaskStatus(task: Task, status){
    if(task.status == "pending"){
      task.status = "finish"
      this.taskService.putTask(task)
      .subscribe(res=>{
        let result = this.vitacorService.vita[this.iddata]['taskFinished'] - 1
        this.vitacorService.vita[this.iddata]['taskFinished'] = result
      })
    }else{
      task.status = "pending"
      this.taskService.putTask(task)
      .subscribe(res=>{
        let result = this.vitacorService.vita[this.iddata]['taskFinished'] + 1
        this.vitacorService.vita[this.iddata]['taskFinished'] = result
      })
    }
  }
  setTaskEstadistic(count){
    for(let x = 0;x < count ; x++ ){
      this.getTaskCount(this.vitacorService.vita[x]['idTasks'],x,true)
    }
  }
  setTaskdata(id,cantTotal,cantFinished){
    this.vitacorService.vita[id]['taskCant'] = cantTotal
    this.vitacorService.vita[id]['taskFinished'] = cantTotal - cantFinished
  }
}
