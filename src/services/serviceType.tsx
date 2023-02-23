const apiAuth="xl9FXRAWCfxyLuDXx08avlBlQj4uJCRUrqFNBFPA";
const baseUrl = "https://api.nasa.gov/";
//const serviceType = "mars-photos/api/v1/rovers/";
//const manifest = "mars-photos/api/v1/manifests/";

const services={
    marsPhoto:"mars-photos/api/v1/rovers/",
    manifest:"mars-photos/api/v1/manifests/",
}

const webServiceTypes={

    getCuriosityPhotos:{
        name:"curiosity",
        urlDefault:`${baseUrl}${services.marsPhoto}curiosity/latest_photos?api_key=${apiAuth}`,
        urlBase:`${baseUrl}${services.marsPhoto}curiosity`,
        type:"GET",
    },
    getOpportunityPhotos:{
        name:"opportunity",
        urlDefault:`${baseUrl}${services.marsPhoto}opportunity/latest_photos?api_key=${apiAuth}`,
        urlBase:`${baseUrl}${services.marsPhoto}opportunity`,
        type:"GET",
    },
    getSpiritPhotos:{
        name:"spirit",
        urlDefault:`${baseUrl}${services.marsPhoto}spirit/latest_photos?api_key=${apiAuth}`,
        urlBase:`${baseUrl}${services.marsPhoto}spirit`,
        type:"GET",
    },
    getPerseverancePhotos:{
        name:"perseverance",
        urlDefault:`${baseUrl}${services.marsPhoto}perseverance/latest_photos?api_key=${apiAuth}`,
        urlBase:`${baseUrl}${services.marsPhoto}perseverance`,
        type:"GET",
    },
    getPictureOfDay:{
        name:"curiosity",
        urlDefault:`${baseUrl}planetary/apod?api_key=${apiAuth}`,
        urlBase:`https://api.nasa.gov/planetary/`,
        type:"GET",
    },
    getTelemetry:{
        name:"manifest",
        urlDefault:`${baseUrl}${services.manifest}curiosity?api_key=${apiAuth}`,
        urlBase:`${baseUrl}${services.manifest}`,
        type:"GET",
    },

};

export {webServiceTypes,apiAuth};