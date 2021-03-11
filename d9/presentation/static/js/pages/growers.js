function _switchCycle_class(cls) {
        $("#d9-BigGrow-Spec").attr('src','/static/img/d9-BigGrowSpec/d9-BigGrow-'+cls+'.png');
}
function switchCycle_sunlight() {
    _switchCycle_class('sunlight');
};

function switchCycle_veg() {
    _switchCycle_class('veg');
};

function switchCycle_flower() {
    _switchCycle_class('flower');
};
