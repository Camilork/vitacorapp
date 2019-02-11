import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vita } from '../models/vitacor'
import { Config } from '../config/config'

@Injectable()
export class VitacorService {
  selectvitacor : Vita
  vita : Vita[]
  server : Config

  constructor(public http : HttpClient){ 
    this.selectvitacor = new Vita
    this.server = new Config
  }

  getVita(){
    return this.http.get(this.server.server+"/vita/data")
  }
  postVita(vita: Vita){
    return this.http.post(this.server.server+"/vita",vita)
  }
  putVita(vita: Vita){
    return this.http.put(this.server.server+"/vita"+`/${vita._id}`,vita)
  }
  deleteVita(_id: string){
    return this.http.delete(this.server.server+"/vita"+`/${_id}`)
  }
}
