const apiAuth="xl9FXRAWCfxyLuDXx08avlBlQj4uJCRUrqFNBFPA";
const baseUrl = "https://api.nasa.gov/";
const serviceType = "mars-photos/api/v1/rovers/";

const webServiceTypes={

    getCuriosityPhotos:{
        name:"curiosity",
        urlDefault:`${baseUrl}${serviceType}curiosity/latest_photos?page=1&api_key=${apiAuth}`,
        urlBase:`${baseUrl}${serviceType}curiosity/`,
        type:"GET",
    },
    getOpportunityPhotos:{
        name:"curiosity",
        urlDefault:`${baseUrl}${serviceType}opportunity/latest_photos?page=1&api_key=${apiAuth}`,
        urlBase:`${baseUrl}${serviceType}opportunity/`,
        type:"GET",
    },
    getSpiritPhotos:{
        name:"curiosity",
        urlDefault:`${baseUrl}${serviceType}spirit/latest_photos?page=1&api_key=${apiAuth}`,
        urlBase:`${baseUrl}${serviceType}spirit/`,
        type:"GET",
    },
    getPerseverancePhotos:{
        name:"curiosity",
        urlDefault:`${baseUrl}${serviceType}perseverance/latest_photos?page=1&api_key=${apiAuth}`,
        urlBase:`${baseUrl}${serviceType}perseverance/`,
        type:"GET",
    },
    getPictureOfDay:{
        name:"curiosity",
        urlDefault:`https://api.nasa.gov/planetary/apod?api_key=${apiAuth}`,
        urlBase:`https://api.nasa.gov/planetary/`,
        type:"GET",
    },

};

export {webServiceTypes,apiAuth};