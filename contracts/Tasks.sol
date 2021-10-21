// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract  Tasks {

  uint public counterTask = 0;

  struct task {
    uint256 id;
    string title;
    string description;
    bool done;
    uint256 createdAt;
  }

  mapping (uint256 => task) public tasks;

  event taskCreated(
    uint256 id,
    string title,
    string description,
    bool done,
    uint256 createdAt
  );

  event taskToogle(
    uint256 id,
    bool done
  );

  constructor () {
    createTask('first Task', "Task contract testing");
  }

  function createTask(string memory _title, string memory _description) public {
    counterTask++;
    tasks[counterTask] = task(counterTask, _title, _description, false, block.timestamp);
    emit taskCreated(counterTask, _title, _description, false, block.timestamp);
       
  }

  function toogleTask(uint256 _id) public {
    task memory _task = tasks[_id];
    _task.done = !_task.done;
    tasks[_id] = _task;
    emit taskToogle(_id, _task.done);
  }
  
}
