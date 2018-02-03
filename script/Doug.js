function BGChange() {
    setInterval(function(){ 
    
    if (document.title == "The Landing Hab")
    {
        document.body.style.backgroundImage = "url('img/spacecraft-controls.jpg')";
        
    }
    else if (document.title == "Martian Volcano" || 
    document.title == "A Small Bunker" || 
    document.title == "Large Bunker" || 
    document.title == "Small Bunker Complex" || 
    document.title == "Large Bunker Complex" || 
    document.title == "A Thriving Outpost" )
    {
        document.body.style.backgroundImage = "url('img/cave3.jpg')";       
    }
    else if (document.title == "Martian Outback")
    {
       document.body.style.backgroundImage = "url('img/desert-mars-edit2.png')";
        
    }
    
    
    }, 1000);

    //if (document.title == "The Landing Hab"){
    //    document.body.style.backgroundImage = "url('deadgameproject.png')";       
   // }, 3000);
    
    
}



function BGClick() {

    
        document.body.style.backgroundImage = "url('deadgameproject.png')";
        var x = document.title ;
        alert( 'Hello, world!' + x);
    

    //var x = document.body.style.backgroundImage;
    //alert( 'Hello, world!' + x);
   
  
    //if (this.panel.room.attr.id == "roomPanel"){
        //if(tab){
        //if(Engine.activeModule == Path){
        
   // }


    




    //document.body.style.backgroundImage = "url('imageofmarsaprox300by300.png')";
}