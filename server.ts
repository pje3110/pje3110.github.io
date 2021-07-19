import * as express from "express";

const router: express.Express = express();

router.listen(8080);
router.use(express.urlencoded({extended: false}));
router.use(express.json());

router.use("/res", express.static(__dirname + "/res"));
router.get("/", (req: express.Request, res: express.Response) => {
    res.status(200);
    res.sendFile(__dirname + "/index.html");
});

//---------------------------------------------------------------------------------------
router.get("/bio", (req: express.Request, res: express.Response) => {
    res.sendFile(__dirname + "/bio.html");
});
router.get("/entscheidung", (req: express.Request, res: express.Response) => {
    res.sendFile(__dirname + "/entscheidung.html");
});
router.get("/reisen", (req: express.Request, res: express.Response) => {
    res.sendFile(__dirname + "/reisen.html");
});
router.get("/interessen", (req: express.Request, res: express.Response) => {
    res.sendFile(__dirname + "/interessen.html");
});
router.get("/features", (req: express.Request, res: express.Response) => {
    res.sendFile(__dirname + "/features.html");
});
router.get("/impressum", (req: express.Request, res: express.Response) => {
    res.sendFile(__dirname + "/impressum.html");
});
router.get("/form.php", (req: express.Request, res: express.Response) => {
    res.sendFile(__dirname + "/form.php");
});
router.get("/satanismus", (req: express.Request, res: express.Response) => {
    res.sendFile(__dirname + "/satanismus.html");
});

class Person {
    public firstname: string;
    public lastname: string;
    public mail: string;
    public role: string;
    private password: string;
    private readonly userID: number;
    private static maxID: number = 0;

    constructor(fn: string, ln: string, ma: string, ro: string, pw: string){
        this.firstname = fn;
        this.lastname = ln;
        this.mail = ma;
        this.role = ro;
        this.password = pw;
        this.userID = ++Person.maxID;
    }

    displayName(): string {
        return this.firstname + " " + this.lastname;
    }

    displayUserID(): number {
        return this.userID;
    }
    displayMail(): string {
        return this.mail;
    }

    displayPassword(): string {
         return this.password;
    }
    displayRole(): string {
        return this.role;
    }
}

let group: Person[] = [];
let selectgroup: Person[];
let whicharr: string = "group";

//Benutzer erstellen
router.post("/create", (req: express.Request, res: express.Response) => {
    const firstname: string = req.body.firstname;
    const lastname: string = req.body.lastname;
    const email: string = req.body.email;
    const role: string = req.body.role;
    const password: string = req.body.password;
    let person1 = new Person(firstname, lastname, email, role, password);
    group.push(person1);
    whicharr = "group";

    res.status(200);
    res.json({
        firstname,
    });
});
//Benutzer auswählen
router.get("/select", (req: express.Request, res: express.Response) => {
    const selection: number = req.query.selection;

    res.status(200);
    res.json({
        userid: group[selection-1].displayUserID().toString(),
        mail: group[selection-1].displayMail(),
        role: group[selection-1].displayRole(),
        password: group[selection-1].displayPassword(),
        lastname: group[selection-1].lastname,
        firstname: group[selection-1].firstname,
    })
});
//Benutzer editieren
router.post("/edit", (req: express.Request, res: express.Response) => {
    const selection: number = req.body.selection;
    const firstname: string = req.body.firstname;
    const lastname: string = req.body.lastname;
    const email: string = req.body.email;
    const role: string = req.body.role;
    group[selection-1].firstname = firstname;
    group[selection-1].lastname = lastname;
    group[selection-1].mail = email;
    group[selection-1].role = role;
    whicharr = "group";
    res.status(200);
    res.json({
        firstname,
    });
});
//Benutzer löschen
router.get("/delete", (req: express.Request, res: express.Response) => {
    const selection: number = req.query.selection;
    group.splice(selection-1, 1);
    whicharr = "group";

    res.status(200);
    res.json({
       selection,
    });
});
//Tabelle erstellen
router.get("/tablevalue", (req: express.Request, res: express.Response) => {
    let temp: number = req.query.temp;
    let userID: number;
    let name: string;
    let mail: string;
    let password: string;
    let role: string;

    if(whicharr == "select"){
        if(temp <= selectgroup.length) {
            userID  = selectgroup[temp - 1].displayUserID();
            name    = selectgroup[temp - 1].displayName();
            mail    = selectgroup[temp - 1].displayMail();
            password = selectgroup[temp - 1].displayPassword();
            role    = selectgroup[temp - 1].displayRole();
        }else{
            userID = selectgroup.length;
            name = "--";
            mail = "--";
            password = "--";
            role = "--";
        }
    }else {
        userID = group[temp - 1].displayUserID();
        name    = group[temp - 1].displayName();
        mail    = group[temp - 1].displayMail();
        password = group[temp - 1].displayPassword();
        role    = group[temp - 1].displayRole();
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
router.post("/sortedSelect", (req: express.Request, res: express.Response) => {
    const firstname: string = req.body.firstname;
    const lastname: string = req.body.lastname;
    const role: string = req.body.role;
    const table1 = req.body.table1;
    let temp1: number = 0;
    selectgroup = [];

    for(let i: number = 0; i < group.length; i++){                //Zeile
        if(group[i].firstname.includes(firstname) && firstname != "") {
            selectgroup.push(group[i]);
        } else if(group[i].lastname.includes(lastname) && lastname != ""){
            selectgroup.push(group[i]);

        } else if(group[i].role.includes(role) && role != ""){
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
router.get("/sort", (req: express.Request, res: express.Response) => {

    const selection: number = req.query.selection;
    //let sortgroup = group.slice();

    if(selection == 2) {
        group.sort(function (a, b) {
            if (a.firstname < b.firstname) return -1;
            if (a.firstname > b.firstname) return 1;
            return 0;
        });
    }else if(selection == 3) {

        group.sort((a, b) => (a.lastname > b.lastname) ? 1 : -1);
        /*
        sortgroup.sort(function (a, b) {
            if (a.lastname < b.lastname) return -1;
            if (a.lastname > b.lastname) return 1;
            return 0;
        });*/
    }else if(selection == 4) {
        group.sort(function (a, b) {
            if (a.role < b.role) return -1;
            if (a.role > b.role) return 1;
            return 0;
        });
    }else {
        group.sort(function (a, b) {
            if (a.displayUserID() < b.displayUserID()) return -1;
            if (a.displayUserID() > b.displayUserID()) return 1;
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
router.use((req:express.Request, res:express.Response) => {
    res.status(404);
    res.send('<br> <p> Die aufzurufende Seite steht nicht zur Verfügung</p>');
});

