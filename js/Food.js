class Food{
    constructor(){}

    display(){
        fill("red");
        var button = createButton("Feed the dog")
            button.position(400,125)
            if(button.mousePressed(function (){
                foodS = foodS-1;
                gameState=1;
                database.ref('/').update({
                    'gameState':gameState
                })
            }));
       
            var addFood = createButton("Add food")
            addFood.position(500,125)
            if(addFood.mousePressed(function (){
                foodS = foodS+1;
                gameState=2;
                database.ref('/').update({
                    'gameState':gameState
                })
            }));
    
    
    }
}
