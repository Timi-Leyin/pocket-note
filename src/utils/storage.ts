const LOCALSTORAGE_NOTE_KEY = "::ID--"

const storage = localStorage
export default {
    save(data:any, key:string){
        storage.setItem(LOCALSTORAGE_NOTE_KEY, data)
    }
}