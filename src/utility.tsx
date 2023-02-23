
import {webServiceTypes, apiAuth} from "./services/serviceType";


export const roverManifest=(
    roverName:string,
)=>{
let url=`${webServiceTypes.getTelemetry.urlBase}${roverName}?api_key=${apiAuth}`;

return(url);
}

export const roverPhotoURl=(
    isLatest:boolean,
    roverName:string,
    dateType?:string,
    date?:string,
)=>{

let url ="";

    switch(roverName){

        case "curiosity":
            if(isLatest){
                url = `${webServiceTypes.getCuriosityPhotos.urlBase}/latest_photos?api_key=${apiAuth}`;
            }
            else if(dateType==="earth"){
                url = `${webServiceTypes.getCuriosityPhotos.urlBase}/photos?earth_date=${date}&api_key=${apiAuth}`;
            }
            else if(dateType==="mars"){
                url = `${webServiceTypes.getCuriosityPhotos.urlBase}/photos?sol=${date}&api_key=${apiAuth}`;
            }
            break;

        case "opportunity":
            if(isLatest){
                url = `${webServiceTypes.getOpportunityPhotos.urlBase}/latest_photos?api_key=${apiAuth}`;
            }
            else if(dateType==="earth"){
                url = `${webServiceTypes.getOpportunityPhotos.urlBase}/photos?earth_date=${date}&api_key=${apiAuth}`;
            }
            else if(dateType==="mars"){
                url = `${webServiceTypes.getOpportunityPhotos.urlBase}/photos?sol=${date}&api_key=${apiAuth}`;
            }
            break;

        case "spirit":
            if(isLatest){
                url = `${webServiceTypes.getSpiritPhotos.urlBase}/latest_photos?api_key=${apiAuth}`;
            }
            else if(dateType==="earth"){
                url = `${webServiceTypes.getSpiritPhotos.urlBase}/photos?earth_date=${date}&api_key=${apiAuth}`;
            }
            else if(dateType==="mars"){
                url = `${webServiceTypes.getSpiritPhotos.urlBase}/photos?sol=${date}&api_key=${apiAuth}`;
            }
            break;

        case "perseverance":
            if(isLatest){
                url = `${webServiceTypes.getPerseverancePhotos.urlBase}/latest_photos?api_key=${apiAuth}`;
            }
            else if(dateType==="earth"){
                url = `${webServiceTypes.getPerseverancePhotos.urlBase}/photos?earth_date=${date}&api_key=${apiAuth}`;
            }
            else if(dateType==="mars"){
                url = `${webServiceTypes.getPerseverancePhotos.urlBase}/photos?sol=${date}&api_key=${apiAuth}`;
            }
            break;
    }

return(url);

}