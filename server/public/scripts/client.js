$(document).ready( onReady );

function onReady(){
    getTasks();
    $( '#submitBtn' ).on( 'click', addTask );
    $( '#taskList' ).on( 'click', '.checkbox', markComplete );



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


// For each task, append a new row to our table
        $('#taskList').append(`
            <tr>
                <td>
                    <label class="container">
                    <input class="checkbox" data-id=${task.id} data-status=${task.completed} type="checkbox" unchecked="unchecked">
                    </label>
                </td>
                <td>${task.tasks}</td>
                <td>
                <button 
                    data-id=${task.id}
                    class="btn-delete">DELETE TASK</button>
                </td>
            </tr>
        `);
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
    $( this ).toggleClass( 'completed', true );

    $.ajax({
        method: 'PUT',
        url: `/tasks/${taskId}`,
        data: {completed: taskStatus}
    }).then(function (){
        alert('Congrats on finishing your task!');
        getTasks();
    })
    .catch(function (error){
        alert('Error on updating task status', error)
    })
};

// <button
    // data-id=${task.id}
    // data-status=${task.completed}
    // class="btn-complete"
    // > MARK AS COMPLETED</button>

//<button
                    // data-id=${task.id}
                    // data-status=${task.completed}
                    // class="btn-incomplete"
                    // > MARK AS INCOMPLETE</button>


                    // if( task.completed === false){
                    //     task.completed = 'Incompleted'
                    //     }  else if( task.completed === true){
                    //         task.completed = 'Completed'
                    //     }