/**
 * Created by Benni on 10.10.2014.
 */

// window.onload is placed last. 
// It's safer to declare every function before the onload activates.

// I changed all for(x in List) to for(var x in List)
// I did that because x is otherwise used in the global context of the site and 
// could be changed at runtime of your for-loops.
// "var x" though, is defining x as local variable.

// "var" in front of every variable is nice, but not neccessary at all.
var defaultChampData,
    topList,
    midList,
    jungleList,
    adcList,
    supList,
    playerList,
    champsSelected = false;

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffleArray(o){ //v1.0
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

// This function rolls for the specified role
// Multiple IFs are good, switch is better though.
// Reoccuring parts could be changed into a new function
function roll(role) {
    var champ;
    if(!checkRoleSelection(role)) {
        alert("You didn't select any champ for this role.");
        return false;
    }
    // It does one thing: 
    // Reduces the amount of things to change, if you ever have to.
    function champForRole(list) {
        return list[Math.floor((Math.random() * list.length))];
    }
    switch(role) {
        case "top":
            champ = champForRole(topList);
            $("#topResult").text(champ);
            break;
        case "mid":
            champ = champForRole(midList);
            $("#midResult").text(champ);
            break;
        case "jungle":
            champ = champForRole(jungleList);
            $("#jungResult").text(champ);
            break;
        case "adc":
            champ = champForRole(adcList);
            $("#adcResult").text(champ);
            break;
        case "support":
            champ = champForRole(supList);
            $("#supResult").text(champ);
            break;
    }
}

// Pretty much fine
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
    resetResults(false); // Only delete player names

    var openRoles = getOpenRoles();
    var rollingPlayers = playerList.slice();

    for(var x in openRoles){
        if(rollingPlayers.length !== 0){
            var openRole = openRoles[x];
            var player = rollingPlayers[Math.floor((Math.random() * rollingPlayers.length))];
            $("#"+openRole+" div.panel-footer").text(player);
            $("#"+openRole).removeClass("panel-default").addClass("panel-danger");
            rollingPlayers.splice(rollingPlayers.indexOf(player),1);
        }
    }
}

function rollTeamAndChamps(){
    resetResults(true); // Delete champ names

    var openRoles = getOpenRoles();
    var rollingPlayers = playerList.slice();

    for(var x in openRoles){
        if(rollingPlayers.length !== 0){
            var openRole = openRoles[x];
            if(!checkRoleSelection(openRole.toLowerCase())) {
                continue;
            }
            var player = rollingPlayers[Math.floor((Math.random() * rollingPlayers.length))];
            $("#"+openRole+" div.panel-footer").text(player);
            $("#"+openRole).removeClass("panel-default").addClass("panel-danger");
            rollingPlayers.splice(rollingPlayers.indexOf(player),1);
            roll(openRole.toLowerCase());
        }
    }
}

// You do the same thing in the function rollTeam.
// FLAG is TRUE => Delete the champ names as well.
function resetResults(flag){
    var resultEle = $("#Results");
    resultEle.find("div.panel-footer").text("");
    if(flag)
        resultEle.find("div.panel-body").text("");
    resultEle.find("div.panel").removeClass("panel-danger").addClass("panel-default");
}

// For security you should give every index a unique variable name.
function renderRoleLists() {
    $("#currentRoleList ul").html("");
    for(var t in topList){
        $("#topCurrent ul").append("<li>"+topList[t]+"</li>");
    }

    for(var m in midList){
        $("#midCurrent ul").append("<li>"+midList[m]+"</li>");
    }

    for(var j in jungleList){
        $("#jungCurrent ul").append("<li>"+jungleList[j]+"</li>");
    }

    for(var a in adcList){
        $("#adcCurrent ul").append("<li>"+adcList[a]+"</li>");
    }

    for(var s in supList){
        $("#supCurrent ul").append("<li>"+supList[s]+"</li>");
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
    renderRoleLists();
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
    renderRoleLists();
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
    renderRoleLists();
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
    renderRoleLists();
}

function addPlayer() {
    // As soon as you use the same selector again, 
    // try to reduce the jQuery calls to one and save the element for later.
    // Playerlimit's now for the check
    var playerInput = $("#playerName")
        playerName = playerInput.val(),
        playerLimit = 5;
    if (playerName === "") {
        alert("Please specify a playerName");
        return false;
    }else if (playerList.length >= playerLimit){
        alert("The maximum of " + playerLimit + " players is already reached");
        return false;
    }else{
        var entry = $("<a id='"+playerName+"' class='list-group-item'>"+playerName+"</a>");
        entry.click(function(){
            removePlayer($(this));
        });
        $("#playerList").append(entry);

        playerList.push(playerName);
        localStorage.setItem("_Players", JSON.stringify(playerList));

        playerInput.val("");
    }
}

function removePlayer(element){
    // Delete the element if the operations with the playerList are finished.
    var playerName = element.text();
    playerList.splice(playerList.indexOf("playerName"),1);
    localStorage.setItem("_Players", JSON.stringify(playerList));
    element.remove();
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
    for(var x = -1, len = defaultChampData.champs.length; ++x < len;){
        var name = defaultChampData.champs[x].name;
        if(localStorage.getItem(name) === null){
            localStorage.setItem(name, JSON.stringify("[]"));
        }
    }
}

function loadPlayers(){
    // The entry generation could also be changed into a function.
    // TODO: I'll let you do that, if you want. ;)
    var players = JSON.parse(localStorage.getItem("_Players"));
    for(var x = -1, len = players.length; ++x < len;){
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
    for(var x = -1, len = defaultChampData.champs.length; ++x < len;){
        var champ = defaultChampData.champs[x];
        if(version === "default"){
            localStorage.setItem(champ.name, JSON.stringify(champ.roles));
        }else if(version === "withtroll"){
            var roles;
            if(champ.trollpicks !== undefined){
                roles = champ.roles.concat(champ.trollpicks);
            }else{
                roles = champ.roles;
            }
            localStorage.setItem(defaultChampData.champs[x].name, JSON.stringify(roles));
        }else{
            // Dead end?
            console.log("something fizzy here");
        }
    }
    loadRoleChecks();
    renderRoleLists();
}

// Why did you call loadUltimateChallenge('withtroll') at your buttons onclick-Handler?
// That seems like you changed your mind suddenly.
// I'll leave that up to you.
function loadUltimateChallenge(){
    resetChampList();
    for(var x = -1, len = defaultChampData.champs.length; ++x < len;){
        var champ = defaultChampData.champs[x];
        var roles = ["Top","Mid","Jungle","ADC","Support"];
        localStorage.setItem(champ.name, JSON.stringify(roles));
    }
    loadRoleChecks();
    renderRoleLists();
}

function resetChampList() {
    // I wanted to recommend you the forEach function of the Array object but apparently it's not performing well enough:
    // http://jsperf.com/loops/183
    // Ok, more research actually says, descending while loops are best. I'll stop thinking about the loops now.
    for(var x = -1, len = defaultChampData.champs.length; ++x < len;){
        var champName = defaultChampData.champs[x].name;
        localStorage.setItem(champName, "[]");
        uncheck(champName, "Top");
        uncheck(champName, "Mid");
        uncheck(champName, "Jungle");
        uncheck(champName, "ADC");
        uncheck(champName, "Support");
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
    for(var key in champList){
        loadSingleChampDropdown(champList[key].name);
    }
    loadRoleChecks();
    renderRoleLists();
}

function loadRoleChecks(){
    for(var x = -1, len = defaultChampData.champs.length; ++x < len;){

        var champName = defaultChampData.champs[x].name;
        var roles = localStorage.getItem(champName);

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

function checkRoleSelection(role) {
    var r = false;
    if(topList.length >= 1 && jungleList >= 1 && midList >= 1 && adcList >= 1 && supList >= 1) {
        r = true;
    }
    if(role !== undefined) {
        switch(role) {
            case "top":
                r = (topList.length >= 1) ? true : false; 
                break;
            case "mid":
                r = (midList.length >= 1) ? true : false; 
                break;
            case "jungle":
                r = (jungleList.length >= 1) ? true : false; 
                break;
            case "adc":
                r = (adcList.length >= 1) ? true : false; 
                break;
            case "support":
                r = (supList.length >= 1) ? true : false; 
                break;
        }
    }
    return r;
}

window.onload = function () {
    topList = [];
    midList = [];
    jungleList = [];
    adcList = [];
    supList = [];
    playerList = [];

    // Message for the lovely browsers who aren't supporting LocalStorage
    if(!window.localStorage) {
        alert("Your player names will not persist over reloading, since your Browser doesn't support it.");
    }

    $.getJSON('data/defaultChampData.json', function(data) {
        defaultChampData = data;
        loadChampsIntoDB();
        loadPlayers();
        fillChampDropdowns();
    });
    $('#playerName').keypress(function(e) {
        if (e.which === 13) {
            addPlayer();
        }
    });
    // "Why not $('#playerName').on('keyup', fn)?", you ask?
    // Because you can unfocus the input while holding enter pressed.
    // If you release it then, the input won't find out if you even released the enter key.
};