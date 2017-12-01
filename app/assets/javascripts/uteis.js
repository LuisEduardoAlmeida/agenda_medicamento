function formatDate(input) {
    var datePart = input.match(/\d+/g),
        year = datePart[0].substring(0), // get only two digits
        month = datePart[1],
        day = datePart[2];

    return day + '/' + month + '/' + year;
  }

function formatReal(num) {
    var p = num.toFixed(2).split(".");
    return "R$ " + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
        return  num + (i && !(i % 3) ? "." : "") + acc;
    }, "") + "," + p[1];
}

function add_nested_fields() {
    $(".add_nested_fields").click(function(){
        $(document).ready(function(){
            setTimeout(function(){$("select").select2()}, 1)
        });
    })
}

var javascriptsUteis = function() {


    
  
}

var do_on_load = function(){
  javascriptsUteis();
}

$(document).ready(do_on_load)
$(window).bind('page:change', do_on_load)