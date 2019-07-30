import httpService from './HttpService'

const URL_ENDING = 'upload/cloudinary'

export default {
    uploadMedia
}

async function uploadMedia(files) {
    let imgUrls = await Promise.all(files.map(async (file) => {
        let form = new FormData()
        form.append('imgUpload', file[0])
        let res = await httpService.post(URL_ENDING, form)
        return res.secure_url
    }))
    return imgUrls
}