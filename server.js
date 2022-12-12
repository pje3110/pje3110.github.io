"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const router = express();
router.listen(8080);
router.use(express.urlencoded({ extended: false }));
router.use(express.json());
router.use("/res", express.static(__dirname + "/res"));
router.get("/", (req, res) => {
    res.status(200);
    res.sendFile(__dirname + "/index.html");
});
//---------------------------------------------------------------------------------------
router.get("/bio", (req, res) => {
    res.sendFile(__dirname + "/bio.html");
});
router.get("/entscheidung", (req, res) => {
    res.sendFile(__dirname + "/entscheidung.html");
});
router.get("/reisen", (req, res) => {
    res.sendFile(__dirname + "/reisen.html");
});
router.get("/interessen", (req, res) => {
    res.sendFile(__dirname + "/interessen.html");
});
router.get("/features", (req, res) => {
    res.sendFile(__dirname + "/features.html");
});
router.get("/impressum", (req, res) => {
    res.sendFile(__dirname + "/impressum.html");
});
router.get("/satanismus", (req, res) => {
    res.sendFile(__dirname + "/satanismus.html");
});
class Person {
    constructor(fn, ln, ma, ro, pw) {
        this.firstname = fn;
        this.lastname = ln;
        this.mail = ma;
        this.role = ro;
        this.password = pw;
        this.userID = ++Person.maxID;
    }
    displayName() {
        return this.firstname + " " + this.lastname;
    }
    displayUserID() {
        return this.userID;
    }
    displayMail() {
        return this.mail;
    }
    displayPassword() {
        return this.password;
    }
    displayRole() {
        return this.role;
    }
}
Person.maxID = 0;
let group = [];
let selectgroup;
let whicharr = "group";
//Benutzer erstellen
router.post("/create", (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const role = req.body.role;
    const password = req.body.password;
    let person1 = new Person(firstname, lastname, email, role, password);
    group.push(person1);
    whicharr = "group";
    res.status(200);
    res.json({
        firstname,
    });
});
//Benutzer auswählen
router.get("/select", (req, res) => {
    const selection = req.query.selection;
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
router.post("/edit", (req, res) => {
    const selection = req.body.selection;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const role = req.body.role;
    group[selection - 1].firstname = firstname;
    group[selection - 1].lastname = lastname;
    group[selection - 1].mail = email;
    group[selection - 1].role = role;
    whicharr = "group";
    res.status(200);
    res.json({
        firstname,
    });
});
//Benutzer löschen
router.get("/delete", (req, res) => {
    const selection = req.query.selection;
    group.splice(selection - 1, 1);
    whicharr = "group";
    res.status(200);
    res.json({
        selection,
    });
});
//Tabelle erstellen
router.get("/tablevalue", (req, res) => {
    let temp = req.query.temp;
    let userID;
    let name;
    let mail;
    let password;
    let role;
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
        userID,
        name,
        mail,
        password,
        role,
    });
});
//Soriterte Auswahl
router.post("/sortedSelect", (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const role = req.body.role;
    const table1 = req.body.table1;
    let temp1 = 0;
    selectgroup = [];
    for (let i = 0; i < group.length; i++) { //Zeile
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
        firstname,
    });
});
//Sortierung
router.get("/sort", (req, res) => {
    const selection = req.query.selection;
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
        group.sort((a, b) => (a.lastname > b.lastname) ? 1 : -1);
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
        selection,
    });
});
//keine Regel passt
router.use((req, res) => {
    res.status(404);
    res.send('<br> <p> Die aufzurufende Seite steht nicht zur Verfügung</p>');
});
