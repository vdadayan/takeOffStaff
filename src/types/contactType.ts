export interface IContactSlice {
    contacts: IContacts[]
    isLoading: boolean
    error: string
}

export interface IContacts  {
    id: number,
    name: string
    surname: string,
    age: number
}
