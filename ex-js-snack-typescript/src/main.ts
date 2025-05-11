// Snack 1
// Hai ricevuto un dato generico da un'API, ma non sai di che tipo sia… 
// Il tuo compito è controllare il tipo del dato e stampare il valore in modo corretto.
// Se è una stringa: stampala in maiuscolo
// Se è un numero: moltiplicalo per due e stampalo
// Se è un booleano: stampa “Sì” o “No” in base al suo valore
// In tutti gli altri casi: stampa “Tipo non supportato”

//tipizziamo valore variabile come unknown se non sappiamo che tipo di dato e'
//unknown non mi fa fare niente rispetto ad any
let data : unknown = "hello"

if(typeof data === "string"){
  console.log(data.toUpperCase())
}else if(typeof data === "number"){
  console.log(data*2)
}else if(typeof data === "boolean"){
  console.log(data? "yes": "no")//possiamo solo se dato e boolean
}else{
  console.log("tipo non supportato")
}

// BONUS1
// Se è null: stampa “Il dato è vuoto”
// Se è un array: stampa la sua lunghezza
// Se è una Promise: attendi che si risolva e stampa il valore del resolve.

if(data === null){//non possiamo typeof data === "null"
  console.log("data is empty")
}else if(Array.isArray(data)){//array tipo di oggettto-anche possiamo scrivere if(data instanceof Array)
  console.log(data.length)
}else if(data instanceof Promise){
  data.then((msg) => console.log(msg)) //passiamo la callback che rappresenta il resolve - msg e il valore che ci ritorna resolve e che andiamo a stampare...
}

// Snack 2
// Crea un type alias Dipendente che rappresenta un lavoratore con i seguenti dati:
// nome → stringa
// cognome → stringa
// annoNascita → numero
// sesso → Può essere solo "m" o "f".
// anniDiServizio(array di numeri, es. [2014, 2015, 2017, 2018])


// Bonus2
// Il type alias Dipendente, ha anche i seguenti dati:
// emailAziendale → Email assegnata al dipendente(non si può modificare)
// contratto → Specifica il tipo di contratto del dipendente, 
// con valori limitati a “indeterminato”, “determinato” o “freelance”.

type Dipendente = {
  nome: string,
  cognome: string,
  annoNascita: number,
  sesso: "m" | "f", //union type di 2 type litteral(unica possibilita di stringa)
  anniDiservizio: number[], //puo avere anceh 0 elems ma tutti di tipo numero
  readonly emailAziendale: string,
  contratto: "indeterminato" | "determinato" |"freelance",
  
} 

// Snack 3
// Estendiamo Dipendente per definire due ruoli specifici all'interno dell'azienda:
// Developer
// livelloEsperienza → Il livello di esperienza del developer(le scelte possibili sono solo “Junior”, “Mid” o “Senior”).
// linguaggi → Un array contenente i linguaggi di programmazione utilizzati dal developer in azienda(opzionale, perché i neo assunti non hanno ancora dei linguaggi assegnati).
// certificazioni → Un array di stringhe contenente certificazioni tecniche ottenute dal developer(può essere vuoto).
// ProjectManager
// teamSize → Il numero di persone nel team gestito dal Project Manager(può essere null se non ha ancora un team assegnato).
// budgetGestito → Il totale del budget annuale gestito dal PM(opzionale).
// stakeholderPrincipali → Un array di stringhe con i nomi dei principali stakeholder con cui il PM collabora(può essere vuoto).

 type Developer = Dipendente & { //estendere type alias usando intersection
  livelloEsperienza: "junior" | "Mid" | "Senior", //union type
  linguaggi?: string[], //array di stringhe opzionale
  certificazioni: string[]
}

type ProjectManager = Dipendente & {
  teamSize: null | number, // null e'un type in ts
  budgetGestito?: number,
  stakeholderPrincipali: string[]
}

// BONUS
// Definiamo un nuovo type alias Team, che rappresenta un gruppo di lavoro all'interno dell'azienda:
// nome → Nome del team(stringa).
// progettoAttuale → Nome del progetto su cui lavora il team(può essere null se il team è in attesa di assegnazione).
// budget → Importo numerico del budget assegnato al team(sempre presente).
// membri → Una tuple in cui il primo elemento è sempre un Project Manager, seguito da uno o più Developers(almeno un developer obbligatorio).

type Team = {
  nome: string,
  progettoAttuale: null | string,
  readonly budget: number,
  //questo array avra sempre almeno 2 elementi di cui il primo sempre PM, secondo sempre Developer, resto sono facoltativi ma se ce devono essere developers
  membri: [ProjectManager, Developer, ...Developer[]]  //primo developer obbligatorio, questi con rest operator facoltativi

}