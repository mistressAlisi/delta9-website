function setIntImgSrc(cls) {
    $("#BigGrowInt-img").addClass('visible');
    $("#BigGrowInt-img")[0].style.animation = 'none';
    $("#BigGrowInt-img")[0].style.webkitanimation = 'none';
    $("#BigGrowInt-img").attr('src','/static/img/d9-BigGrow/d9-BigGrow-'+cls+'.png');
    setTimeout(function(){
        $("#BigGrowInt-img")[0].style.animation = '';
        $("#BigGrowInt-img")[0].style.webkitanimation = '';
    },50);
};

function getBkgToggleStates() {
    var check = $("#spectrum_deepBlue")[0].checked;
    var cls = "";
    var umol = 0;
    if (check == true) {
        cls = cls+"B";
        umol = umol + 1208;
        $("#progres_deepBlue").attr('aria-valuenow','40.72%');
        $("#progres_deepBlue").css('width','40.72%');
    } else {
        $("#progres_deepBlue").attr('aria-valuenow','0');
        $("#progres_deepBlue").css('width','0');
        cls = cls+"-";
    }
    check = $("#spectrum_Green")[0].checked;
    if (check == true) {
        cls = cls+"G";
        umol = umol + 400;
        $("#progres_Green").attr('aria-valuenow','13.48%');
        $("#progres_Green").css('width','13.48%');
    } else {
        $("#progres_Green").attr('aria-valuenow','0');
        $("#progres_Green").css('width','0');
        cls = cls+"-";
    }
    check = $("#spectrum_deepRed")[0].checked;
    if (check == true) {
        cls = cls+"R";
        umol = umol + 1359;
        $("#progres_deepRed").attr('aria-valuenow','45.8%');
        $("#progres_deepRed").css('width','45.8%');
    } else {
        $("#progres_deepRed").attr('aria-valuenow','0');
        $("#progres_deepRed").css('width','0');
        cls = cls+"-";
    }
    check = $("#spectrum_FarRed")[0].checked;
    if (check == true) {
        cls = cls+"F";
        umol = umol + 300;
        $("#progres_FarRed").attr('aria-valuenow','9.1%');
        $("#progres_FarRed").css('width','9.1%');
    } else {
        $("#progres_FarRed").attr('aria-valuenow','0');
        $("#progres_FarRed").css('width','0');
        cls = cls+"-";
    }
    console.log(cls,umol);
    if (umol == 0) {
        setIntImgSrc('OFF');
    } else {
        setIntImgSrc(cls);
    }
    $("#uMol_splash")[0].innerHTML = umol;
    return cls;
};

$(document).ready(function(){
   $(".custom-control-input")[0].checked = true;
   $(".custom-control-input")[1].checked = true;
   $(".custom-control-input")[2].checked = true;
   $(".custom-control-input")[3].checked = true;
   $(".custom-control-input").on('change',getBkgToggleStates);
 });
