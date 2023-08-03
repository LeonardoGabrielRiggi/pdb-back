import { HttpService } from '@nestjs/axios';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable, map, of } from 'rxjs';
import { createReadStream,readdirSync } from 'fs';

@Controller('places')
export class PlacesController {
    constructor(private readonly httpService: HttpService){}
    googlePlacesUrl:string = "https://maps.googleapis.com/maps/api/place/details/json?key=AIzaSyAUCGLvG5F2BDe-jWfJ0iWCm_nrcjVAlHw"
    googlePlacesPhotoUrl:string = "https://maps.googleapis.com/maps/api/place/photo/json?key=AIzaSyAUCGLvG5F2BDe-jWfJ0iWCm_nrcjVAlHw"
    @Get()
    getAllPlaces(){//: Observable<AxiosResponse<any>>{
        return placesMap
    }
    @Get('/:key')//passo anche user id cosi capisco se ha gia la foto caricata sulla cartella e li metto l'icona verde
    getPlaceById(@Param('key') place_key){//: Observable<AxiosResponse<any>>{
        return this.httpService.get(this.googlePlacesUrl+'&place_id='+place_key).pipe(map((res)=>{
            let result = res.data?.['result']
            result["icon"]= "http://maps.gstatic.com/mapfiles/markers2/marker.png"
            result['photos'] = this.getAllPostUrlsInAFolder(placesMap.find((place:any)=>place['google_id']==place_key).folderName)
            // result["icon"]= "http://maps.gstatic.com/mapfiles/markers2/marker_greenJ.png"
            return result}))
    }


    // @Post('places/:id/')
    getAllPostUrlsInAFolder(folderName:string){
        return readdirSync('public/img/'+folderName).map(filename=>'public/img/'+folderName+'/'+filename)
    }

}

export const placesMap:{folderName:string,name:string,google_id:string}[]=[
    {folderName:'pontemaleo',name:'Caffè Pontemaleo',google_id:'ChIJb3xSsiOVgEcRzRh8Gyap4v8'},
    {folderName:'lago',name:'Lago Comunale Valnure',google_id:'ChIJr56X-2GVgEcRTVJbpW3TrKY'},
    {folderName:'centro',name:'Centro Sportivo Cementirossi',google_id:'ChIJYx7ur2OVgEcRsh9e8YmlPFU'},
    {folderName:'giglio',name:'Trattoria Giglio',google_id:'ChIJN9Zqf2SVgEcRbBW_6jNbvX4'},
    {folderName:'katia',name:'Bar Katia',google_id:'ChIJCbV-ezyVgEcR-4UqDKMjEVI'},
    {folderName:'capriccio',name:'Bar Capriccio',google_id:'ChIJKZpC2mCVgEcRyOWVHnsPJ3M'},
    {folderName:'bdb',name:'Bar Del Borgo BdB',google_id:'ChIJLxBpO2eVgEcRF7-kltdvlvY'},
    {folderName:'sole',name:'Bar del Sole',google_id:'ChIJRYnKgdOVgEcRligT8pERPog'},
    {folderName:'posta',name:'Trattoria Della Posta',google_id:'ChIJe3TX-HaVgEcRTtWW7aT8ldc'},
    // {key:'Pozzo',google_id:'ChIJiXbCG0iVgEcRQUNmD8qu6yM'},
    {folderName:'palo',name:'Bar Palo',google_id:'ChIJZ_-t3GaVgEcRTgSezZgST-4'},
    {folderName:'gambero',name:'Osteria Bar Gambero',google_id:'ChIJrRuTwGaVgEcRrtXvxZSeAec'},
    {folderName:'bottiglieria',name:'La Bottiglieria del Conte',google_id:'ChIJtc9MfxiVgEcRUo9bgk2NF0M'},
    {folderName:'birreria',name:'Birreria "La taverna del borgo"',google_id:'ChIJc4rJpGaVgEcRfrexheZXhTs'},
    {folderName:'giada',name:'Caffetteria Giada',google_id:'ChIJ32-x-K6VgEcR2gB1YNRobeY'},
    {folderName:'giardini',name:'Bar Ai Giardini',google_id:'ChIJ93kZbmSVgEcRVpQT6OpyGgM'},
    {folderName:'parigina',name:'Parigina Cafè',google_id:'ChIJu1Dve2SVgEcRgLq9dR_zeuQ'},
    {folderName:'stazione',name:'Bar della Stazione',google_id:'ChIJiXbCG0iVgEcRQUNmD8qu6yM'},
    {folderName:'piscina',name:"Piscina di Ponte dell'Olio",google_id:'ChIJ4RyBY5O_gEcR5M-YAcftg8M'},
]


// Pontemaleo 
// Laghetto
// Centro
// Giglio
// Bar katia
// Capriccio
// Bdb 
// Sole
// Giordano
// Pozzo
// Palo
// Gambero 
// Bottiglieria
// Birreria
// Fornaci
// Coop
// Parigina
// Stazione 
// Piscina