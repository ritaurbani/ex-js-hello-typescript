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

//TUPLE WITH REST OPERATOR (rest operator means that the strings are optional)
const tags: [string, ...string[]] = ["java"]//quest array non puo essere vuoto, almeno una stringa, la prima, il resto puo essere stringhe opzionali
tags.push("typescript")//posso aggiungere quante stringhe voglio as long as there is at least one

/////////////////////OGGETTI E ALIAS/////////////

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

//////////////////////////////////FUNZIONI//////////////////////////////////

//tipizzare callback function quando usate come parametro di HOF

function modificaNumero(num: number, callback: (value: number) => number): number{
    return callback(num)
}

//doppio e la callback cui passo un number
function doppio(x: number){
    return x*2
}

//result ritorna il valore che ritorna doppio quando la eseguo passandogli 5
const result = modificaNumero(5, doppio)

////////////////////////////////Fetch with generics - Type guards/////////////////
//Type guards personalizzati 

// La funzione isUtente è una type guard (guardia di tipo) che verifica 
// se un oggetto sconosciuto(unknown) rispetta la struttura del tipo Actress.
// In pratica, controlla due cose:
// Forma dell'oggetto: Presenza di tutte le proprietà obbligatorie
// Tipi dei valori: Corrispondenza dei tipi dichiarati(es.id deve essere number)

//Creo Funzione di supporto isUtente, type guard personalizzato che a partire da dati o utente ipotetico, 
//in questa funzione personalizzata ho specificato io quali sono le caratteristiche che mi fanno capire se qualcosa e un utente o no..
//mi ritorna un booleano, che mi fa capire se abbiamo a che fare con utente o meno
//is e usata per creare type guards generici - dati is utente e dicitura per creare funzione che ci ritorna un booleano
//che fa capire a ts se questa cosa unknown che ho passato(dati) e un utente oppure no
function isUtente(dati: unknown): dati is Utente{//controllo se isUtente rispecchia Utente
    if (//se tutte sono vere allora quello che ho in mano rispetta type alias utente
        dati && //punto di partenza e truthy e conferma se oggetto
        typeof dati === 'object' &&
        dati !== null &&
        "id" in dati && //la stringa id e la chiave di una delle proprieta di dati?? se si allora controlla dati.id
        typeof dati.id === 'number' && //non voglio solo vedere se dati.id esiste ma anche se e un numero?
        "nome" in dati && // c'e` proprieta nome? se c e e una stringa?
        typeof dati.nome === "string" &&
        "email" in dati &&
        typeof dati.email === "string"
    ) {//se tutte sono vere allora quello che ho in mano rispetta type alias utente, e posso fare return dati
        return true //dico a ts se queste cose sono vere abbiamo a che fare con Utente, quindi torniamo Utnete o null
    }
     return false
}

//gestire fetch usando generic, quando creo funzione di appoggio asincrona per raccogliere dei dati uando fetch
//avro a che fare con type alias...se recupero risorsa utente, avro a che fare con type alias utente
//quindi devo essere in grado di gestire che il tipo ricevuto sia effettivamente un utente

type Utente = {
    id: number,
    nome: string,
    emmail: string
}

//ho funzione asincrona che recupera utente a partire dal suo id e ritorna una Promise
//TUTTE LE FUNZIONI AASINCRONE RITORNANO UNA PROMISE CHE RISOLVONO IL VALORE CHE TU FAI IN RETURN
//in generics specifico cosa la Promise risolve, cioe in getUtente vogliamo ottenere un Utente
//non tutte le fetch vanno a buon fine, id richiesto non corrisponde a utente..quindi errori da gestire con union types
async function getUtente(id: number):Promise<Utente | null> { //ritorno null se qualcosa non va a buon fine, non trovato utente con quell id
//funzione asincrona quindi raccolgo tutto in try e catch (se voglio propagare errore non lo faccio)
//in try facciamo fetch per recuperare utente rispetto al nostro id
try{
//response automaticamete salvata come type response, perche fetch ritorna questo oggetto particolare
//di tipo response, quindi non devo specificarlo in modo esplicito cosi response: Response, perche tye inference lo fa per me
const response = await fetch(`http:miosito.com/utenti/${id}`)
//per raccogliere dati mi devo accertare che chiamata sia andata a buon fine: status 400
if(!response.ok){ 
    throw new Error(`errore http${response.status}: ${response.statusText}`)//rompe esecuzione portandoci a catch..
}
//se response e andata a buon fine faccio await..
//ts fa si che json ci ritorna come promessa qualcosa che risolve un any (dati:any) a noi non piece
const dati = await response.json(); //dati qui e di tipo any, se uso dati:unknown non funzione quindi type narrowing e necessario
// if(!dati.id || !dati.nome || !dati.email){
//     throw new Error('formato dati non valido')
// }
//COME CAPISCO SE DATI SONO BUONI?????
//1.dati deve essere un valore che non sia null, undefined...dati && > tutto cio che e truthy prosegue questo controllo...
//2.visto che utente e oggetto dobbiamo vedere se dati e'object altrimenti non possiamo fare dati.id...
//ma anche id potrebbe non esistere in questo obj, quindi per capire i tipi usiamo type guards:
//typeof, instanceof, in (capisco se posso accedere a id)
//se tutte sono vere allora quello che ho in mano rispetta type alias utente
//metto tutti questi if nella funzione di supporto isUtente
// if(
//     dati &&
//     typeof dati === 'object' &&
//     "id" in dati && //la stringa id e la chiave di una delle proprieta di dati?? se si allora controlla dati.id
//     typeof dati.id === 'number' && //non voglio solo vedere se dati.id esiste ma anche se e un numero?
//     "nome" in dati && // c'e` proprieta nome? se c e e una stringa?
//     typeof dati.nome === "string" &&
//     "email" in dati &&
//     typeof dati.email === "string"
// ) {//se tutte sono vere allora quello che ho in mano rispetta type alias utente, e posso fare return dati
//     return dati as Utente //dico a ts se queste cose sono vere abbiamo a che fare con Utente, quindi torniamo Utnete o null
// }
if(!isUtente(dati)){
     throw new Error('formato dati non valido')
}
    return dati
}catch(errore){//errore lanciato in casistiche in cui non ritorna utente
    if(errore instanceof Error){
            console.error("errore durante recuperp dati:", errore.message)

    } else {
        console.error('errore sconosciuto', errore)
    }
 return null
}

}

//abbiamo gestito dati:unknown
//type guard personalizzato,
//gestendo errore