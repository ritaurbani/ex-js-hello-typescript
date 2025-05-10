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

//type unknown
let value5 : unknown = "ciao"
let valueUpperCase = value5.toUpperCase() //ERROR- perche ts non sa che puo essere un tipo stringa
//QUINDI VERIFICO TIPO DI DATO > TYPE NARROWING

