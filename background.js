
function checkWins(){
    getInfo={ populate: true };

    browser.windows.getAll(getInfo).then((list)=>{
	enable=false;
	for( win of list ){
	    if( win.type=="messageCompose"  ){
		for (tab of win.tabs ){
		    console.log(win.id+" "+tab.id+" "+enable);
		    if( enable ){
			browser.composeAction.enable(tab.id);
		    }
		    else{
			browser.composeAction.disable(tab.id);
		    }
		}
		enable=true;
		
	    }
	
	}	
    });
    
}

function winCreated(win){
    if( win.type=="messageCompose" ){
	checkWins();
    }
}
function winRemoved(id){
    checkWins();
}

function handleMessage(msg){
    console.log(msg);
    browser.windows.get(msg.winId,{populate:true}).then((win)=>{
	for(tab of win.tabs){
	    browser.composeAction.disable(tab.id);
	}
    });
}
browser.runtime.onMessage.addListener(handleMessage);

//browser.windows.onCreated.addListener(winCreated);
//browser.windows.onRemoved.addListener(winRemoved);
//checkWins();
