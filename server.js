"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express();
router.listen(8080);
router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use("/res", express.static(__dirname + "/res"));
router.get("/", function (req, res) {
    res.status(200);
    res.sendFile(__dirname + "/index.html");
});
//---------------------------------------------------------------------------------------
router.get("/bio", function (req, res) {
    res.sendFile(__dirname + "/bio.html");
});
router.get("/entscheidung", function (req, res) {
    res.sendFile(__dirname + "/decision.html");
});
router.get("/reisen", function (req, res) {
    res.sendFile(__dirname + "/travel.html");
});
router.get("/interessen", function (req, res) {
    res.sendFile(__dirname + "/interests.html");
});
router.get("/features", function (req, res) {
    res.sendFile(__dirname + "/features.html");
});
router.get("/impressum", function (req, res) {
    res.sendFile(__dirname + "/impressum.html");
});
var Person = /** @class */ (function () {
    function Person(fn, ln, ma, ro, pw) {
        this.firstname = fn;
        this.lastname = ln;
        this.mail = ma;
        this.role = ro;
        this.password = pw;
        this.userID = ++Person.maxID;
    }
    Person.prototype.displayName = function () {
        return this.firstname + " " + this.lastname;
    };
    Person.prototype.displayUserID = function () {
        return this.userID;
    };
    Person.prototype.displayMail = function () {
        return this.mail;
    };
    Person.prototype.displayPassword = function () {
        return this.password;
    };
    Person.prototype.displayRole = function () {
        return this.role;
    };
    Person.maxID = 0;
    return Person;
}());
var group = [];
var selectgroup;
var whicharr = "group";
//Benutzer erstellen
router.post("/create", function (req, res) {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var role = req.body.role;
    var password = req.body.password;
    var person1 = new Person(firstname, lastname, email, role, password);
    group.push(person1);
    whicharr = "group";
    res.status(200);
    res.json({
        firstname: firstname,
    });
});
//Benutzer auswählen
router.get("/select", function (req, res) {
    var selection = req.query.selection;
    res.status(200);
    res.json({
        userid: group[selection - 1].displayUserID().toString(),
        mail: group[selection - 1].displayMail(),
        role: group[selection - 1].displayRole(),
        password: group[selection - 1].displayPassword(),
        lastname: group[selection - 1].lastname,
        firstname: group[selection - 1].firstname,
    });
});
//Benutzer editieren
router.post("/edit", function (req, res) {
    var selection = req.body.selection;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var role = req.body.role;
    group[selection - 1].firstname = firstname;
    group[selection - 1].lastname = lastname;
    group[selection - 1].mail = email;
    group[selection - 1].role = role;
    whicharr = "group";
    res.status(200);
    res.json({
        firstname: firstname,
    });
});
//Benutzer löschen
router.get("/delete", function (req, res) {
    var selection = req.query.selection;
    group.splice(selection - 1, 1);
    whicharr = "group";
    res.status(200);
    res.json({
        selection: selection,
    });
});
//Tabelle erstellen
router.get("/tablevalue", function (req, res) {
    var temp = req.query.temp;
    var userID;
    var name;
    var mail;
    var password;
    var role;
    if (whicharr == "select") {
        if (temp <= selectgroup.length) {
            userID = selectgroup[temp - 1].displayUserID();
            name = selectgroup[temp - 1].displayName();
            mail = selectgroup[temp - 1].displayMail();
            password = selectgroup[temp - 1].displayPassword();
            role = selectgroup[temp - 1].displayRole();
        }
        else {
            userID = selectgroup.length;
            name = "--";
            mail = "--";
            password = "--";
            role = "--";
        }
    }
    else {
        userID = group[temp - 1].displayUserID();
        name = group[temp - 1].displayName();
        mail = group[temp - 1].displayMail();
        password = group[temp - 1].displayPassword();
        role = group[temp - 1].displayRole();
    }
    /*
    if(temp = group.length){
        whicharr = "group";
    } */
    res.status(200);
    res.json({
        userID: userID,
        name: name,
        mail: mail,
        password: password,
        role: role,
    });
});
//Soriterte Auswahl
router.post("/sortedSelect", function (req, res) {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var role = req.body.role;
    var table1 = req.body.table1;
    var temp1 = 0;
    selectgroup = [];
    for (var i = 0; i < group.length; i++) { //Zeile
        if (group[i].firstname.includes(firstname) && firstname != "") {
            selectgroup.push(group[i]);
        }
        else if (group[i].lastname.includes(lastname) && lastname != "") {
            selectgroup.push(group[i]);
        }
        else if (group[i].role.includes(role) && role != "") {
            selectgroup.push(group[i]);
        }
    }
    whicharr = "select";
    res.status(200);
    res.json({
        firstname: firstname,
    });
});
//Sortierung
router.get("/sort", function (req, res) {
    var selection = req.query.selection;
    //let sortgroup = group.slice();
    if (selection == 2) {
        group.sort(function (a, b) {
            if (a.firstname < b.firstname)
                return -1;
            if (a.firstname > b.firstname)
                return 1;
            return 0;
        });
    }
    else if (selection == 3) {
        group.sort(function (a, b) { return (a.lastname > b.lastname) ? 1 : -1; });
        /*
        sortgroup.sort(function (a, b) {
            if (a.lastname < b.lastname) return -1;
            if (a.lastname > b.lastname) return 1;
            return 0;
        });*/
    }
    else if (selection == 4) {
        group.sort(function (a, b) {
            if (a.role < b.role)
                return -1;
            if (a.role > b.role)
                return 1;
            return 0;
        });
    }
    else {
        group.sort(function (a, b) {
            if (a.displayUserID() < b.displayUserID())
                return -1;
            if (a.displayUserID() > b.displayUserID())
                return 1;
            return 0;
        });
    }
    //whicharr = "sort";
    res.status(200);
    res.json({
        selection: selection,
    });
});
//keine Regel passt
router.use(function (req, res) {
    res.status(404);
    res.send('<br> <p> Die aufzurufende Seite steht nicht zur Verfügung</p>');
});
