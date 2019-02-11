import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Config } from '../config/config'
import { Task } from '../models/task'

@Injectable()
export class TaskService {
  selecttask : Task
  task : Task[]
  server : Config
  constructor(public http : HttpClient) {
    this.selecttask = new Task
    this.server = new Config
  }
  getTask(){
    return this.http.get(this.server.server+"/task/data")
  }
  getTaskCount(_id : string){
    return this.http.get(this.server.server+"/task/data/count"+`/${_id}`)
  }
  postTask(task: Task){
    return this.http.post(this.server.server+"/task",task)
  }
  putTask(task: Task){
    return this.http.put(this.server.server+"/task"+`/${task._id}`,task)
  }
  deleteTask(_id: string){
    return this.http.delete(this.server.server+"/task"+`/${_id}`)
  }
}


