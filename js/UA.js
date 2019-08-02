UA();

function UA() {
    var agent = window.navigator.userAgent.toLowerCase();
    var version = window.navigator.appVersion.toLowerCase();
    var meta = document.getElementsByTagName("meta");
    var viewport;
    for(var i = 0; i < meta.length; i++){
        if(meta[i].name == "viewport"){
            viewport = meta[i];
        }
    }
    if(agent.indexOf("iphone") != -1 || agent.indexOf("android") != -1){
        viewport.content = "width=500";
    } else if(agent.indexOf("ipad") != -1){
        viewport.content = "width=1440";
    } else {
        if(agent.indexOf("msie") != -1 || agent.indexOf("trident") != -1){
            if(version.indexOf("msie 9.") != -1 || version.indexOf("msie 8.") != -1 || version.indexOf("msie 7.") != -1 || version.indexOf("msie 6.") != -1){
                var div = document.createElement("div");
                div.style.width = "100%";
                div.style.height = "33px";
                div.style.background = "rgb(64,64,64)";
                div.style.position = "fixed";
                div.style.color = "white";
                div.style.fontSize = "14px";
                div.style.lineHeight = "33px";
                div.style.top = 0;
                div.style.left = 0;
                div.style.textAlign = "center";
                div.innerHTML = "ご利用のIEバージョンはサポートを終了しております｡別のブラウザをご利用ください｡";
                document.body.appendChild(div);
            }
        }
    }
}
