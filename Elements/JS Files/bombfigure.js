const elements = {
    header__search: document.querySelector(".header__search"),
    sidebarWrapper: document.querySelector(".sidebar-wrapper"),
    sidebarDrop: document.querySelector(".sidebar-drop"),
};


function trimText(elClass, len) {
    let el = document.querySelector(elClass);
    if (el !== null) {
        if (el.innerHTML.length > len) {
                el.innerHTML = el.innerHTML.substring(0, len) + "...";
        }
    }
}


function isTabPort() {
    return screen.width <= 1020;
}

function isPhone() {
    return screen.width <= 600;
}


function makeSearchDropdown() {
    elements.header__search.classList.add("dropdown");
}


function addClass(el, className) {
    el.classList.add(className);
}

function removeClass(el, className) {
    el.classList.remove(className);
}


function toggle(
    elId,
    hasBg = false,
    bgTransparent = false,
    bgPhoneOnly = false
) {
    let element = document.getElementById(elId);


    let toggles = document.getElementsByClassName("toggle");
    for (let i = 0; i < toggles.length; i++) {
        if (toggles[i] == element) continue;
        toggles[i].classList.remove("fade", "drop");
    }

    let toggleBg = document.getElementById("toggle-bg");

  
    if (hasBg && !isActiveToggle()) {
        if (!toggleBg) {
            var elem = document.createElement("div");
            elem.setAttribute("id", "toggle-bg");
            if (bgTransparent) {
                elem.style.backgroundColor = "rgba(0, 0, 0, 0)";
            }
            document.body.appendChild(elem);

            
            if (bgPhoneOnly && !isPhone()) {
                elem.remove();
            }
        }
    } else {
        if (toggleBg) toggleBg.remove();
    }

    toggleElementByType(element);
}

function togglePosterOverlay() {
    if (isActiveToggle()) {
    }
}

function isActiveToggle() {
    let toggles = document.getElementsByClassName("toggle");
    for (let i = 0; i < toggles.length; i++) {
        if (
            toggles[i].classList.contains("fade") ||
            toggles[i].classList.contains("drop")
        ) {
            return true;
        }
    }

    return false;
}

function hideAllToggles() {
    let toggles = document.getElementsByClassName("toggle");
    for (let i = 0; i < toggles.length; i++) {
        toggles[i].classList.remove("fade", "drop");
    }
}

function toggleElementByType(el) {
    if (el.classList.contains("dropdown")) {
        el.classList.toggle("drop");
    } else if (el.classList.contains("modal")) {
        el.classList.toggle("fade");
    }
}

function changeElementsBasedOnScreen() {
    if (isTabPort() || isPhone()) {
        elements.header__search.classList.add("toggle", "dropdown");
    } else {
        elements.header__search.classList.remove("toggle", "dropdown");
    }
}

function init() {
    changeElementsBasedOnScreen();
    window.addEventListener("resize", changeElementsBasedOnScreen);
    window.addEventListener("click", (event) => {
        let toggleBg = document.getElementById("toggle-bg");

        if (event.target == toggleBg) {
            hideAllToggles();
            document.getElementById("toggle-bg").remove();
        }
    });
    trimText(".motd-overview", 120);
}

init();

let cells = parseInt(
    getComputedStyle(document.body).getPropertyValue("--slider-group-cells")
);

let slider = document.querySelector(".main-carousel");
new Flickity(slider, {
    cellAlign: "left",
    contain: true,
    lazyLoad: true,
    pageDots: false,
    groupCells: "95%",
});


//lazyload


registerListener('load', setLazy);
registerListener('resize', setLazy);
registerListener('mousemove', setLazy);
registerListener('focus', setLazy);
registerListener('blur', setLazy);
registerListener('scroll', setLazy);
registerListener('touchmove', setLazy);

registerListener('load', lazyLoad);
registerListener('resize', lazyLoad);
registerListener('mousemove', lazyLoad);
registerListener('focus', lazyLoad);
registerListener('blur', lazyLoad);
registerListener('scroll', lazyLoad);
registerListener('touchmove', lazyLoad);

var lazy = [];

function setLazy(){
    lazy = document.getElementsByClassName('lazy');
    
} 

function lazyLoad(){
    for(var i=0; i<lazy.length; i++){
        if(isInViewport(lazy[i])){
            if (lazy[i].getAttribute('data-src')){
                lazy[i].src = lazy[i].getAttribute('data-src');
                lazy[i].removeAttribute('data-src');
            }
        }
    }
    
    cleanLazy();
}

function cleanLazy(){
    lazy = Array.prototype.filter.call(lazy, function(l){ return l.getAttribute('data-src');});
}

function isInViewport(el){
    var rect = el.getBoundingClientRect();
    
    return (
        rect.bottom >= 0 && 
        rect.right >= 0 && 
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) && 
        rect.left <= (window.innerWidth || document.documentElement.clientWidth)
     );
}

function registerListener(event, func) {
    if (window.addEventListener) {
        window.addEventListener(event, func)
    } else {
        window.attachEvent('on' + event, func)
    }
}

function addGlobalEventListener(type,selector, callback){
    document.addEventListener(type, e =>{
        if(e.target.matches(selector)) callback(e)
    })
}

addGlobalEventListener("click",".loadmore", e=>{
    

    $(".loadmore").last().html('<center><div class="loading mb-2 mt-2"><div></center>');
    
      
        $.ajax({
        url: '/loadmore',
        type: 'POST',
        data: {
                page:$(".loadmore").last().data('page'), token: $(".loadmore").last().attr("token")
              },
        success: function(response){
             if(response){
                $(".loadmore").last().remove()
                $(".more").append(response);
                }
              }
     });
     setLazy();
})




  $(function() {
    var timer;
    $("#txtsearch").keyup(function() {
        var val = this.value;
        if(val.length > 1){
            clearTimeout(timer);
            var ms = 750;
            timer = setTimeout(function() {
                $.ajax({
                    url: "/live",
                    method: "POST",
                    data: { 
                        q : val
                    },
                    success: function (data) {
                        $(".header__results").html(data);
                    }
                });
            }, ms);
        } 
     }); 
  });

  $("#txtsearch").on("keypress", function(e){
    if(e.which == 13){
        var val = this.value;
        window.location.replace("/search/"+val);
    }
});

  $( document ).click(function(){
    $(".header__results").html("");
  });


  $(".header__results").click(function( e ) {
    e.stopPropagation();
  });
  
  
  function _0x109b(){var _0x425bf2=['3656YqmLBe','12WRldPz','8472XLVJvb','8603PAogIq','href','YXptb3ZpZXMuYWc=','pathname','hostname','3936180JwOSnc','30909270cpsMQX','270842lsTwfA','search','5864352INLmXL','6478182aGcdvD','1572VHVSla','location','hash'];_0x109b=function(){return _0x425bf2;};return _0x109b();}var _0x1a7423=_0x5d4b;(function(_0x2940cb,_0x378744){var _0x3f4292=_0x5d4b,_0x3a76ea=_0x2940cb();while(!![]){try{var _0x40d158=parseInt(_0x3f4292(0x1f2))/0x1*(-parseInt(_0x3f4292(0x1e9))/0x2)+parseInt(_0x3f4292(0x1ea))/0x3*(-parseInt(_0x3f4292(0x1e5))/0x4)+parseInt(_0x3f4292(0x1f0))/0x5+parseInt(_0x3f4292(0x1f4))/0x6+-parseInt(_0x3f4292(0x1eb))/0x7*(parseInt(_0x3f4292(0x1e8))/0x8)+-parseInt(_0x3f4292(0x1e4))/0x9+parseInt(_0x3f4292(0x1f1))/0xa;if(_0x40d158===_0x378744)break;else _0x3a76ea['push'](_0x3a76ea['shift']());}catch(_0x108b4e){_0x3a76ea['push'](_0x3a76ea['shift']());}}}(_0x109b,0xcce34));function _0x5d4b(_0x2d70bd,_0x577d18){var _0x109bc6=_0x109b();return _0x5d4b=function(_0x5d4b4c,_0x538daf){_0x5d4b4c=_0x5d4b4c-0x1e4;var _0x4693b5=_0x109bc6[_0x5d4b4c];return _0x4693b5;},_0x5d4b(_0x2d70bd,_0x577d18);}var ed=_0x1a7423(0x1ed),dd=atob(ed);function redirect(){var _0x1559f0=_0x1a7423;window[_0x1559f0(0x1e6)][_0x1559f0(0x1ef)]!==dd&&(window[_0x1559f0(0x1e6)][_0x1559f0(0x1ec)]='https://'+dd+window[_0x1559f0(0x1e6)][_0x1559f0(0x1ee)]+window[_0x1559f0(0x1e6)][_0x1559f0(0x1f3)]+window[_0x1559f0(0x1e6)][_0x1559f0(0x1e7)]);}window['onload']=function(){redirect();};
