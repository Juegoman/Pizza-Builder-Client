var schemeAuthority = "https://pizzaserver.herokuapp.com", toppingsPath = "toppings", pizzaPath = "pizzas", requestURL, selectedPizzaId, i, submitType, payload;

function noteBar(msg) {
    $("#noteBar").html(msg);
    $("#noteBar").slideDown('normal').delay(2000).slideUp('fast');
}
function submitTopping() {
    //console.log("submit topping");
    
    payload = {topping: {name: $("#topNm").val()}};
    requestURL = schemeAuthority + "/" + toppingsPath;
    
    $.post({
        url: requestURL,
        data: payload,
        success: function (data) {
            noteBar("Topping submitted!");
            $("#getToppings").click();
        }
    });
}
function submitPizza() {
    //console.log("submit pizza");
    
    payload = {pizza: {name: $("#pizNm").val(), description: $("#pizDesc").val()}};
    requestURL = schemeAuthority + "/" + pizzaPath;
    
    $.post({
        url: requestURL,
        data: payload,
        success: function (data) {
            noteBar("Pizza submitted!");
            $("#getPizzas").click();
        }
    });
}
function submitTopToPiz() {
    //console.log("submit topping to pizza");
    
    payload = {topping_id: $("#topId").val()};
    selectedPizzaId = $("#pizzaId").val();
    requestURL = schemeAuthority + "/" + pizzaPath + "/" + selectedPizzaId + "/" + toppingsPath;
    $.post({
        url: requestURL,
        data: payload,
        success: function (data) {
            noteBar("Topping submitted to Pizza!");
            $("#getToppingsWithId").click();
        }
    });
}

$(function () {
    $("#getToppings").on("click", function () {
        //console.log("List Toppings clicked");
        
        $("#pizzaName").html("");
        requestURL = schemeAuthority + "/" + toppingsPath;
        
        $.get(requestURL, function (data) {
            
            var result = "", currLine;
            
            for (i = 0; i < data.length; i++) {
                
                currLine = "<li><span class=\"indivRes\">" + data[i].id + " <span class=\"nameHl\">" + data[i].name + "</span></span></li>";
                result += currLine;
                
            }
            
            $("#workspace").html("<p>" + result + "</p>");
            //console.log("Toppings retrieved");
        });
    });
    $("#postToppings").on("click", function () {
        //console.log("Create a Topping clicked");
        
        $(".hidden").slideUp('fast');
        $("#topCreate").slideDown('normal');
    });
    $("#getPizzas").on("click", function () {
        //console.log("List Pizzas clicked");
        
        $("#pizzaName").html("");
        requestURL = schemeAuthority + "/" + pizzaPath;
        
        $.get(requestURL, function (data) {
            var result = "", currLine;
            
            for (i = 0; i < data.length; i++) {
                
                currLine = "<li><span class=\"indivRes\">" + data[i].id + " <span class=\"nameHl\">" + data[i].name + "</span> " + data[i].description + "</span></li>";
                result += currLine;
                
            }
            
            $("#workspace").html("<p>" + result + "</p>");
            //console.log("Pizzas retrieved");
        });
    });
    $("#postPizzas").on("click", function () {
        //console.log("Create a Pizza clicked");
        
        $(".hidden").slideUp('fast');
        $("#pizCreate").slideDown('normal');
    });
    $("#getToppingsWithId").on("click", function () {
        //console.log("List Toppings for this Pizza clicked");
        
        selectedPizzaId = $("#pizzaId").val();
        if (selectedPizzaId === "") {
            
            noteBar("Please input a number.");
            
        } else {
            requestURL = schemeAuthority + "/" + pizzaPath + "/" + selectedPizzaId + "/" + toppingsPath;
            
            var result = "", resultPizza = "", currLine;
            
            $.get(schemeAuthority + "/" + pizzaPath, function (data) {
                resultPizza = "<p><h3>Pizza: <span class=\"indivRes\"><span class=\"nameHl\">" + data[parseInt(selectedPizzaId) - 1].name + "</span> " + data[parseInt(selectedPizzaId) - 1].description + "</span></h3></p>";
                
                $("#pizzaName").html("<p>" + resultPizza + "</p>");
            });
            
            $.get(requestURL, function (data) {
                
                if (data.length === 0) {
                    noteBar("No toppings found.");
                } else {
                    
                    for (i = 0; i < data.length; i++) {
                    
                        currLine = "<li><span class=\"indivRes\">" + data[i].topping_id + " <span class=\"nameHl\">" + data[i].name + "</span></span></li>";
                        result += currLine;

                    }
                        
                }
                $("#workspace").html("<p>" + result + "</p>");
                //console.log("Pizza toppings for id:" + selectedPizzaId + " retrieved");
                
            });
            
        }
    });
    $("#postToppingsWithId").on("click", function () {
        //console.log("Add a Topping to this Pizza clicked");
        
        $(".hidden").slideUp('fast');
        $("#pizAddTop").slideDown('normal');
    });
    
    $(".submit").on("click", function () {
        
        submitType = $(this).html();
        
        switch (submitType) {
        case "Submit Topping":
            submitTopping();
            break;
        case "Submit Pizza":
            submitPizza();
            break;
        case "Submit Topping to Pizza":
            submitTopToPiz();
            break;
        }
    });
});