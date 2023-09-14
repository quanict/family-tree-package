// remove shortcut if it is a touch device
var isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
//  'ontouchstart' in window works on most browsers
// navigator.msMaxTouchPoints > 0 works for microsoft IE backwards compatibility
import familyTree from "./familyTree"
var FamilyTree = familyTree(isTouchDevice);

if (isTouchDevice){
    $('.cmd-text:not(.caret-right),#selection-area-item').addClass('hide');
    $('#details-node,#details-group').removeClass('hide');
}

var viewport = document.getElementById('viewport');

// resize event
function onResize(){
    var w = document.body.clientWidth,
        h = document.body.clientHeight,
        top = viewport.offsetTop,
        left = viewport.offsetLeft;
    h -= top;
    w -= left;

    $('.fixed-menu').css('max-height', h + 'px');

    FamilyTree.resize(w, h);
}

document.body.onresize = onResize;

FamilyTree.init(viewport, document.body.clientWidth, document.body.clientHeight);
onResize();























