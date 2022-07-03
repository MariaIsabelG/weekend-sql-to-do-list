$(document).ready( onReady );

function onReady(){
    getTasks();
    $( '#submitBtn' ).on( 'click', addTask );
    $( '#taskList' ).on( 'click', '.btnComplete', markComplete );// Triggers PUT request that marks the completion true
    $( '#taskList' ).on( 'click', '.btnIncomplete', markIncomplete );// Triggers PUT request that marks the completion false
    $( '#taskList' ).on( 'click', '.btnDelete', deleteTask );// Triggers DELETE request
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
// loop through array of objects received from the db
for(let i = 0; i < toDo.length; i +=1) {
    let task = toDo[i];
// creates to path of styling to keep track of task completion by targeting the completed boolean in the bd
    if( task.completed === true ){
        $('#taskList').append(`
            <tr id=newRow>
                <td ><button 
                    data-id=${task.id}
                    data-status=${task.completed}
                    class="btnComplete"> ✓ </button>
                    <button 
                    data-id=${task.id}
                    data-status=${task.completed}
                    class="btnIncomplete"> ! </button></td>
                <td class="completed">${task.tasks}</td>
                <td class="status">🎉</td>
                <td><button 
                    data-id=${task.id}
                    class="btnDelete">🗑</button></td>
            </tr>
        `); 
    } else if( task.completed === false ){
        $('#taskList').append(`
        <tr id=newRow>
            <td><button 
                data-id=${task.id}
                data-status=${task.completed}
                class="btnComplete"> ✓ </button>
                <button 
                data-id=${task.id}
                data-status=${task.completed}
                class="btnIncomplete"> ! </button></td>
            <td class="incomplete">${task.tasks}</td>
            <td class="status">🚫</td>
            <td><button 
                data-id=${task.id}
                class="btnDelete">🗑</button></td>
        </tr>
    `); 
    }
    }
};


function addTask() {
// Get info to send to the server
    const taskToSend = {
        tasks: $('#taskIn').val(), 
    };

    console.log('Adding task', taskToSend);

// Send the new task to the server as data
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: taskToSend
    }).then(function(response) {
        console.log(response);
        getTasks();
        $( '#taskIn').val('');
    }).catch(function(error) {
        console.log('error in task Post', error); 
        alert('Error adding artist. Please try again later.')       
    });
};

function markComplete(){
// target the data to send to the server
    let taskId = $(this).data('id');
    let taskStatus = $(this).data('status');
// task id will be the selector and task status will be data sent
    $.ajax({
        method: 'PUT',
        url: `/tasks/${taskId}`,
        data: {status: taskStatus}
    }).then(function (){ 
        getTasks();
    })
    .catch(function (error){
        alert('Error on updating task status', error)
    })
};

function markIncomplete(){
    console.log( 'This incomplete clicker is working');
    let taskId = $(this).data('id');
    let taskStatus = $(this).data('status');

    $.ajax({
        method: 'PUT',
        url: `/tasks/status/${taskId}`,
        data: {completed: taskStatus}
    }).then(function (){
        getTasks();
    })
    .catch(function (error){
        alert('Error on updating task status', error)
    })
};

function deleteTask(){
// target data to send to the server 
    let taskId = $(this).data('id');
    $.ajax({
        method: 'DELETE',
        url: `/tasks/${taskId}`,
        })
    .then( function(response){
        console.log('Task has been deleted!');
        getTasks();
        })
        .catch(function (error){
        alert('Task could not be deleted', error);
        })
    };

