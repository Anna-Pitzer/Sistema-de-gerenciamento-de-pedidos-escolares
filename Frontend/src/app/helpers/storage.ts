type StorageKey = 'user' | 'main';
export class StorageData {
    public static get(name: StorageKey) {
      return   JSON.parse(String(sessionStorage.getItem(name,)))
    }

    public static set(name: StorageKey, data: any) {
        sessionStorage.setItem(name, JSON.stringify(data))
    }

     public static remove(name: StorageKey) {
        sessionStorage.removeItem(name)
    }
}