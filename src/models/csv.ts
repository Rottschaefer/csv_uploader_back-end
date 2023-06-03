export interface CSVDB {
    name: string,
    city: string,
    country: string,
    favorite_sport: string,
}

export class CSV{
    constructor(
        private name: string,
        private city: string,
        private country: string,
        private favorite_sport: string,
    ){}

    public getName = ():string => {
        return this.name
    }

    public setName = (value: string) => {
        return this.name = value
    }

    public getCity = ():string => {
        return this.city
    }

    public setCity = (value: string) => {
        return this.city = value
    }

    public getCountry = ():string => {
        return this.country
    }

    public setCountry = (value: string) => {
        return this.country = value
    }
    
    public getFavoriteSport = ():string => {
        return this.favorite_sport
    }

    public setFavoriteSport = (value: string) => {
        return this.favorite_sport = value
    }
    
  
}