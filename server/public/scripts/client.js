$(document).ready( onReady );

function onReady(){
    getTasks();



}

function getTasks(){
    $.ajax({
        type: 'GET',
        url: '/tasks',
    }).then(function(response) {
        console.log(response);
        renderTasks(response);
    }).catch(function(error){
        console.log('error in GET client', error);
    })
};

function renderTasks(toDo){
// empty the table from the loop of the last page load
    $('#taskList').empty();

    for(let i = 0; i < toDo.length; i += 1) {
        let task = toDo[i];

        if( task.completed === false){
        task.completed = 'Not completed'
        }  else if( task.completed === true){
            task.completed = 'Completed'
        }
// For each task, append a new row to our table
        $('#taskList').append(`
            <tr>
                <td>${task.tasks}</td>
                <td>${task.completed}</td>
                <td>
                <button
                    data-id=${task.id}
                    data-status=${task.completed}
                    class="btn-read"
                    > MARK AS COMPLETED</button>
                <button
                    data-id=${task.id}
                    data-status=${task.completed}
                    class="btn-unread"
                    > MARK AS UNCOMPLETED</button>
                <button 
                    data-id=${task.id}
                    class="btn-delete">DELETE TASK</button>
                </td>
            </tr>
        `);
        }
      }


}