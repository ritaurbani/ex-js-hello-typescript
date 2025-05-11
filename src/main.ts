// console.log("Hello typeScript")

//2.
// let number = 'ciao'
// number = 24
// console.log(typeof number)
// let total = 10 + number
// console.log(total)

////////////////////3.Type Narrowing //////////////////////

// su let uso inference
let value:"ciao" //inference capisce che e stringa
value = "ciao"
value = "hello"
//non ha senso scrivere come sotto, piutosto usa const
let value3:"ciao" = "ciao"
const value1 = "ciao" //usa const per creare variabile immutabile - value1 e di tipo ciao

//4.Union Types
//posso contenere in variabile modality just attivo o disactived:
let modality: "active" | "disactive"
modality = "ciao" //ERROR - perche variabile puo essere solo active or disactive

//posso creare una collezione di valori generici o non e definire 
// quali possono essere assunti da quella variabile
//union types can be done also with tipi generici e non 
// con numero o stringa specifici:
let id : "not defined" | number = 1
id = 4
id = "not defined"
id = "ciao" //ERROR

//Use of undefined 
//se non definisco il valore ma solo il tipo sarebbe meglio scrivere cosi
let modality1: "active" | "disactive" | undefined 
 //undefined
modality1 = 'active'
modality1 = undefined //non mi da errore perche sopra ho messo | undefined

//type unknown - usato quando non sai che dato stai ricevendo dall esterno - any blocca i controlli con typeof
let value5 : unknown = "ciao"
let valueUpperCase = value5.toUpperCase() //ERROR- perche ts non sa che puo essere un tipo stringa
//QUINDI VERIFICO TIPO DI DATO > TYPE NARROWING
if(typeof value5 === 'string'){
    let valueUpperCase = value5.toLocaleUpperCase()
}else if(typeof value5 === "number"){
    let valueFixed = value5.toFixed(2)
}


                                               ///////////////TUPLE//////////////
//creo array dati che puo contenere all interno un qualsiasi numero di elem, literal type e generic...
const dati: ("test" | number) [] = ["test", 1,54,"test",5] //as many elem I want, and also push...is ok
//qui invece dico che l array e una tuple, ha sempre come primo elem la stringa test, e secondo un numero, e non piu di cosi...
const dati2 : ["test", number] = ["test", 23]  //["test", 23, 45] ERROR - [23,"test"] ERROR(primo elem deve essere test)
dati2[0] = 12 //ERROR
//posso inserire nuovi dati che rispecchiano ["test", number] - non segnala errori ma non si potrebbe fare > readonly
dati2.push(33) //ok tuttavia questo elemento non te lo fara usare con dati[2] perche tuple ha lunghezza due
dati2.push("test") //ok
dati2.push("hello") //ERROR
//readonly
const dati2: readonly["test", number] = ["test", 23]
dati2.push(45) //ora non fa fare piu modifiche
//Per poter modificare i dati, devo usare il let per dichiarare dati2, e ora posso cambiare il 23, ma lunghezza sempre uguale
let dati2: readonly ["test", number] = ["test", 60]//readonly si riferisce agli elems non alla variabile

//TUPLE WITH REST OPERATOR
const tags: [string, ...string[]] = ["java"]//quest array non puo essere vuoto, almeno una stringa
tags.push("typescript")//posso aggiungere quante stringhe voglio as long as there is at least one

/////////////////////OGGETTI E ALIAS

const user: {
    nome: string,
    eta: number,
    job?: string,
} = {
    nome: "hyur",
    eta: 29,
}
const nomeMaiuscolo = user.nome.toUpperCase() //va bene perche l abbiamo definita come stringa
const jobMaiuscolo = user.job.toUpperCase() // e opzionale quindi ci da errore
const jobMaiuscolo = user.job === 'string' && user.job.toUpperCase() //controllo se esiste o no, puo essere stringa o undefined
//se esiste eseguo metodo oppure sotto uso Optional Chain, cioe prima di toUpperCase metto punto di domanda
const jobMaiuscolo = user.job && user.job.toUpperCase() //se esiste eseguo il metodo
const jobMaiuscolo = user.job?.toUpperCase() //se esiste eseguo il metodo

const user: {
    readonly nome: string,
    eta: number,
    job?: string,
} = {
    nome: "hyur",
    eta: 29,
}

user.nome = "rita"  //non posso modificarla perche proprieta readonly

//se voglio che nulla sia modificabile allora dichiaro l oggetto come as const
const user = {
    nome: "hyur",
    eta: 29,
} as const

user.eta = 30 //non posso piu perche tutto oggetto e readonly

//COME RIUTILIZZO STESSO TIPO PER CREARE PIU DI UN UTENTE USANDO TYPE ALIAS
//uso parola chiave type, dare nome al tipo con maiuscola(Utente), usiamo = e gli assegniamo i tipi
// type Utente = {
//     nome: string,
//     eta: number,
//     job?: string,
// }
 
import {Utente} from "./types"
const utente : Utente = {
    nome: "Hyur",
    eta: 29
}

//utente2 e di tipo Utente
const utente2 : Utente = {
    nome: "tizio",
    eta: 34
}