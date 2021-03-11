function setBkgClass(cls) {
    $("#mainBg").removeClass('visible');
    $("#mainBg")[0].style.animation = 'none';
    $("#mainBg")[0].style.webkitanimation = 'none';
    $("#mainBg").attr('class','mainBg');
    $("#mainBg").addClass(cls).delay('fast');
    setTimeout(function(){
        $("#mainBg")[0].style.animation = '';
        $("#mainBg")[0].style.webkitanimation = '';
        $("#mainBg").addClass('visible');
    },50);
};

function getBkgToggleStates() {
    var check = $("#DeepBlueTGL")[0].checked;
    var cls = "";
    if (check == true) {
        cls = cls+"B";
    };
    check = $("#GreenTGL")[0].checked;
    if (check == true) {
        cls = cls+"G";
    };
    check = $("#DeepRedTGL")[0].checked;
    if (check == true) {
        cls = cls+"R";
    };
    check = $("#FarRedTGL")[0].checked;
    if (check == true) {
        cls = cls+"F";
    };
    console.log(cls);
    setBkgClass('d9BG-'+cls);
    return cls;
};

$(document).ready(function(){
   $(".dynbkgtgld9")[0].checked = true;
   $(".dynbkgtgld9")[1].checked = true;
   $(".dynbkgtgld9")[2].checked = true;
   $(".dynbkgtgld9")[3].checked = true;
   $(".dynbkgtgld9").on('change',getBkgToggleStates);
 });
