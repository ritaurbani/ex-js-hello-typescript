// Snack 1
// Hai ricevuto un dato generico da un'API, ma non sai di che tipo sia… 
// Il tuo compito è controllare il tipo del dato e stampare il valore in modo corretto.
// Se è una stringa: stampala in maiuscolo
// Se è un numero: moltiplicalo per due e stampalo
// Se è un booleano: stampa “Sì” o “No” in base al suo valore
// In tutti gli altri casi: stampa “Tipo non supportato”


let data : unknown = "hello"

if(typeof data === "string"){
  console.log(data.toUpperCase())
}else if(typeof data === "number"){
  console.log(data*2)
}else if(typeof data === "boolean"){
  console.log("yes")
}else{
  console.log("tipo non supportato")
}