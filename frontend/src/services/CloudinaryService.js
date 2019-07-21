import httpService from './HttpService'


const URL_ENDING = 'upload/cloudinary'


export default {
    uploadMedia
}


function uploadMedia(files) {
    let imgUrls =  files.map(file => {
        let form = new FormData()
        form.append('imgUpload', file[0])
        return httpService.post(URL_ENDING, form)
    })
    return imgUrls
}