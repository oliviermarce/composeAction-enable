function listenForClicks(){
    document.addEventListener("click", (e) => {
	browser.windows.getCurrent().then((win)=>{
	    browser.runtime.sendMessage({"message" : e.target.id,
					 "winId": win.id});
	    if( e.target.classList.contains("button") ){
		window.close();
	    }
	});
    });
}


listenForClicks();
