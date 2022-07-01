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
        renderBooks(response);
    }).catch(function(error){
        console.log('error in GET client', error);
    })
    };