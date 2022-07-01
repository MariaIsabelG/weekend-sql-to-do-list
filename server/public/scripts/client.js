$(document).ready( onReady );

function onReady(){
    getTasks();
    $( '#submitBtn' ).on( 'click', addTask );
    $( '#taskList' ).on( 'click', '.btnComplete', markComplete );
    $( '#taskList' ).on( 'click', '.btnIncomplete', markIncomplete );
    $( '#taskList' ).on( 'click', '.btnDelete', deleteTask );

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

    for(let i = 0; i < toDo.length; i ++) {
        let task = toDo[i];
    
// For each task, append a new row to our table
        $('#taskList').append(`
            <tr>
                <td class="completeStatus"> ${task.completed}</td>
                <td class="newTask">${task.tasks}</td>
                <td><button 
                    data-id=${task.id}
                    data-status=${task.completed}
                    class="btnComplete"> ✓ </button>
                    <button 
                    data-id=${task.id}
                    data-status=${task.completed}
                    class="btnIncomplete"> ! </button></td>
                <td><button 
                    data-id=${task.id}
                    class="btnDelete">DELETE TASK</button></td>
            </tr>
        `);
        if( task.completed === true ){
            $( '.newTask').closest( 'td' ).addClass( 'completed' );
        } else if( task.completed !==true ){
            $( '.newTask' ).closest( 'td' ).addClass( 'incomplete' );
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
    console.log( 'This completed clicker is working');
    let taskId = $(this).data('id');
    let taskStatus = $(this).data('status');

    $.ajax({
        method: 'PUT',
        url: `/tasks/${taskId}`,
        data: {completed: taskStatus}
    }).then(function (){
    //    alert('Congrats on finishing your task!');
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
