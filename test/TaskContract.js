const Tasks = artifacts.require("Tasks");

contract("TasksContract", () => {

    before(async ()=>{
        this.taskContract = await Tasks.deployed()
    })

    it('migrate deployed  successfully', async () => {
        const address = this.taskContract.address
        
        assert.notEqual(address, null);
        assert.notEqual(address, undefined);
        assert.notEqual(address, 0x0);
        assert.notEqual(address, "");
    })

    it('get Task list', async () =>{
        const counter = await this.taskContract.counterTask()
        const task = await this.taskContract.tasks(counter)

        assert.equal(task.id.toNumber(), counter)
        assert.equal(task.title, "first Task")
        assert.equal(task.description, "Task contract testing")
        assert.equal(task.done, false)
    })

    it('task created', async () => {

        const result = await this.taskContract.createTask("test","test task in develop")
        const taskEvent = result.logs[0].args
        const counter = await this.taskContract.counterTask()
        
        assert.equal(counter, 2)
        assert.equal(taskEvent.id.toNumber(), counter)
        assert.equal(taskEvent.title, "test")
        assert.equal(taskEvent.description, "test task in develop")
        assert.equal(taskEvent.done, false)
    })

    it('task toogle', async () => {

        const result= await this.taskContract.toogleTask(1)
        const tasktoogle = result.logs[0].args
        const task = await this.taskContract.tasks(1)
    
        assert.equal(tasktoogle.id.toNumber(), 1)
        assert.equal(tasktoogle.done, task.done)
    })

})
