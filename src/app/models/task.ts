export class Task{
    constructor(_id = null){
        this._id = _id;
        this.idTasks ='';
        this.task ='';
        this.status ='';
        this.taskCant = '';
        this.taskFinished = '';
    }
    _id	: string;
    idTasks : string;
    task : string;
    status : string;
    taskCant : string;
    taskFinished : string;
}
