/**
 * Created by Benni on 10.10.2014.
 */
window.onload = function () {
    topList = [];
    midList = [];
    jungleList = [];
    adcList = [];
    supList = [];
    playerList = [];
    $.getJSON('data/defaultChampData.json', function(data) {
        defaultChampData = data;
        loadChampsIntoDB();
        loadPlayers();
        fillChampDropdowns();
    });
}

var defaultChampData;
var topList;
var midList;
var jungleList;
var adcList;
var supList;
var playerList;

function roll(role) {
    var champ;
    if(role==="top"){
        champ = topList[Math.floor((Math.random() * topList.length))];
        $("#topResult").text(champ);
    }else if(role === "mid"){
        champ = midList[Math.floor((Math.random() * midList.length))];
        $("#midResult").text(champ);
    }else if(role === "jungle"){
        champ = jungleList[Math.floor((Math.random() * jungleList.length))];
        $("#jungResult").text(champ);
    }else if(role === "adc"){
        champ = adcList[Math.floor((Math.random() * adcList.length))];
        $("#adcResult").text(champ);
    }else if(role === "support"){
        champ = supList[Math.floor((Math.random() * supList.length))];
        $("#supResult").text(champ);
    }
}

function getOpenRoles(){
    var openRoles = [];
    if($("#topopen").prop('checked')){
        openRoles.push("Top");
    }
    if($("#midopen").prop('checked')){
        openRoles.push("Mid");
    }
    if($("#jungopen").prop('checked')){
        openRoles.push("Jungle");
    }
    if($("#adcopen").prop('checked')){
        openRoles.push("ADC");
    }
    if($("#supopen").prop('checked')){
        openRoles.push("Support");
    }
    return shuffleArray(openRoles);
}

function rollTeam(){
    var resultEle = $("#Results");
    resultEle.find("div.panel-footer").text("");
    resultEle.find("div.panel").removeClass("panel-danger").addClass("panel-default");

    var openRoles = getOpenRoles();
    var rollingPlayers = playerList.slice();

    for(x in openRoles){
        if(rollingPlayers.length !== 0){
            var player = rollingPlayers[Math.floor((Math.random() * rollingPlayers.length))];
            $("#"+openRoles[x]+" div.panel-footer").text(player);
            $("#"+openRoles[x]).removeClass("panel-default").addClass("panel-danger");
            rollingPlayers.splice(rollingPlayers.indexOf(player),1);
        }
    }
}

function rollTeamAndChamps(){
    resetResults();

    var openRoles = getOpenRoles();
    var rollingPlayers = playerList.slice();

    for(x in openRoles){
        if(rollingPlayers.length !== 0){
            var player = rollingPlayers[Math.floor((Math.random() * rollingPlayers.length))];
            $("#"+openRoles[x]+" div.panel-footer").text(player);
            $("#"+openRoles[x]).removeClass("panel-default").addClass("panel-danger");
            rollingPlayers.splice(rollingPlayers.indexOf(player),1);
            roll(openRoles[x].toLowerCase());
        }
    }
}

function resetResults(){
    var resultEle = $("#Results");
    resultEle.find("div.panel-footer").text("");
    resultEle.find("div.panel-body").text("");
    resultEle.find("div.panel").removeClass("panel-danger").addClass("panel-default");
}

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffleArray(o){ //v1.0
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};


function renderRoleLists() {
    $("#currentRoleList ul").html("");
    for(x in topList){
        $("#topCurrent ul").append("<li>"+topList[x]+"</li>");
    }

    for(x in midList){
        $("#midCurrent ul").append("<li>"+midList[x]+"</li>");
    }

    for(x in jungleList){
        $("#jungCurrent ul").append("<li>"+jungleList[x]+"</li>");
    }

    for(x in adcList){
        $("#adcCurrent ul").append("<li>"+adcList[x]+"</li>");
    }

    for(x in supList){
        $("#supCurrent ul").append("<li>"+supList[x]+"</li>");
    }
}

function addTop(champName){
    var roles = JSON.parse(localStorage.getItem(champName));
    var index = roles.indexOf("Top");

    if(index===-1){
        roles.push("Top");
        topList.push(champName);
        topList.sort();
        check(champName, "Top");
    }else{
        roles.splice(index, 1);
        topList.splice(topList.indexOf(champName),1);
        uncheck(champName, "Top");
    }
    setRolesOfChampInDB(roles, champName);
    renderRoleLists();
}

function addMid(champName){
    var roles = JSON.parse(localStorage.getItem(champName));
    var index = roles.indexOf("Mid");

    if(index===-1){
        roles.push("Mid");
        midList.push(champName);
        midList.sort();
        check(champName, "Mid");
    }else{
        roles.splice(index, 1);
        midList.splice(midList.indexOf(champName),1);
        uncheck(champName, "Mid");
    }
    setRolesOfChampInDB(roles, champName);
    renderRoleLists()
}

function addJungle(champName){
    var roles = JSON.parse(localStorage.getItem(champName));
    var index = roles.indexOf("Jungle");

    if(index===-1){
        roles.push("Jungle");
        jungleList.push(champName);
        jungleList.sort();
        check(champName, "Jungle");
    }else{
        roles.splice(index, 1);
        jungleList.splice(jungleList.indexOf(champName),1);
        uncheck(champName, "Jungle");
    }
    setRolesOfChampInDB(roles, champName);
    renderRoleLists()
}

function addADC(champName) {
    var roles = JSON.parse(localStorage.getItem(champName));
    var index = roles.indexOf("ADC");

    if(index===-1){
        roles.push("ADC");
        adcList.push(champName);
        adcList.sort();
        check(champName, "ADC");
    }else{
        roles.splice(index, 1);
        adcList.splice(adcList.indexOf(champName),1);
        uncheck(champName, "ADC");
    }
    setRolesOfChampInDB(roles, champName);
    renderRoleLists()
}

function addSupport(champName) {
    var roles = JSON.parse(localStorage.getItem(champName));
    var index = roles.indexOf("Support");

    if(index===-1){
        roles.push("Support");
        supList.push(champName);
        supList.sort();
        check(champName, "Support");
    }else{
        roles.splice(index, 1);
        supList.splice(supList.indexOf(champName),1);
        uncheck(champName, "Support");
    }
    setRolesOfChampInDB(roles, champName);
    renderRoleLists()
}

function addPlayer(){
    var playerName = $("#playerName").val();
    var entry = $("<a id='"+playerName+"' class='list-group-item'>"+playerName+"</a>");
    entry.click(function(){
        removePlayer($(this));
    });
    $("#playerList").append(entry);

    playerList.push(playerName);
    localStorage.setItem("_Players", JSON.stringify(playerList));
    $("#playerName").val("");
}

function removePlayer(element){
    var playerName = element.text();
    element.remove();
    playerList.splice(playerList.indexOf("playerName"),1);
    localStorage.setItem("_Players", JSON.stringify(playerList));
}

function check(champName, role){
    var span = document.createElement("span");
    span.className = "glyphicon glyphicon-ok checkMod";

    var id = champName.replace(/[^a-zA-Z]/g, "");
    var element = $("#champlist #" +id+" ."+role.toLowerCase());
    element.prepend(span);
}

function uncheck(champName, role){
    var id = champName.replace(/[^a-zA-Z]/g, "");
    var element = $("#champlist #" +id+" ."+role.toLowerCase());
    element.html(role);
}

function setRolesOfChampInDB(roles, champName) {
    localStorage.setItem(champName, JSON.stringify(roles));
}

function loadChampsIntoDB(){
    for(x in defaultChampData.champs){
        if(localStorage.getItem(defaultChampData.champs[x].name) === undefined){

            localStorage.setItem(defaultChampData.champs[x].name, JSON.stringify("[]"));
        }
    }
}

function loadPlayers(){
    var players = JSON.parse(localStorage.getItem("_Players"));
    for(x in players){
        var entry = $("<a id='"+players[x]+"' class='list-group-item'>"+players[x]+"</a>");
        entry.click(function(){
            removePlayer($(this));
        });
        $("#playerList").append(entry);
        playerList.push(players[x]);
    }
}

function loadDefaultChampData(version) {
    resetChampList();
    for(x in defaultChampData.champs){
        var champ = defaultChampData.champs[x];
        if(version === "default"){
            localStorage.setItem(champ.name, JSON.stringify(champ.roles));
        }else if(version === "withtroll"){
            if(champ.trollpicks !== undefined){
                var roles = champ.roles.concat(champ.trollpicks);
            }else{
                roles = champ.roles;
            }
            localStorage.setItem(defaultChampData.champs[x].name, JSON.stringify(roles));
        }else{
            console.log("something fizzy here");
        }
    }
    loadRoleChecks();
    renderRoleLists();
}

function loadUltimateChallenge(){
    resetChampList();
    for(x in defaultChampData.champs){
        var champ = defaultChampData.champs[x];
        var roles = ["Top","Mid","Jungle","ADC","Support"];
        localStorage.setItem(champ.name, JSON.stringify(roles));
    }
    loadRoleChecks();
    renderRoleLists();
}

function resetChampList() {
    for(x in defaultChampData.champs){
        localStorage.setItem(defaultChampData.champs[x].name, "[]");
        uncheck(defaultChampData.champs[x].name, "Top");
        uncheck(defaultChampData.champs[x].name, "Mid");
        uncheck(defaultChampData.champs[x].name, "Jungle");
        uncheck(defaultChampData.champs[x].name, "ADC");
        uncheck(defaultChampData.champs[x].name, "Support");
    }
    resetChampArrays();
    renderRoleLists();
}

function resetChampArrays(){
    topList = [];
    midList = [];
    jungleList = [];
    adcList = [];
    supList = [];
}

function fillChampDropdowns () {
    var champList = defaultChampData.champs;
    for(key in champList){
        loadSingleChampDropdown(champList[key].name);
    }
    loadRoleChecks();
    renderRoleLists();
}

function loadRoleChecks(){
    for(x in defaultChampData.champs){

        var champName = defaultChampData.champs[x].name;
        var roles = localStorage.getItem(defaultChampData.champs[x].name);

        if(roles.indexOf("Top") !== -1) {
            check(champName, "Top");
            topList.push(champName);
        }
        if(roles.indexOf("Mid") !== -1){
            check(champName, "Mid");
            midList.push(champName);
        }
        if(roles.indexOf("Jungle") !== -1){
            check(champName, "Jungle");
            jungleList.push(champName);
        }
        if(roles.indexOf("ADC") !== -1){
            check(champName, "ADC");
            adcList.push(champName);
        }
        if(roles.indexOf("Support") !== -1){
            check(champName, "Support");
            supList.push(champName);
        }
    }
}

function loadSingleChampDropdown(champName) {
    var top, mid, jungle, adc, support;
    top = "";
    mid = "";
    jungle = "";
    adc = "";
    support = "";

    var id = champName.replace(/[^a-zA-Z]/g, "");
    var template = $('#template').html();
    Mustache.parse(template);   // optional, speeds up future uses
    var rendered = Mustache.render(template, {champName: champName, id: id, top: top, mid: mid, jungle: jungle, adc: adc, support: support});
    $('#champlist').append(rendered);

    $("#champlist #" +id+" .top").click(function() {
        addTop(champName);
    });

    $("#champlist #" +id+" .mid").click(function() {
        addMid(champName);
    });

    $("#champlist #" +id+" .jungle").click(function() {
        addJungle(champName);
    });

    $("#champlist #" +id+" .adc").click(function() {
        addADC(champName);
    });

    $("#champlist #" +id+" .support").click(function() {
        addSupport(champName);
    });
}