const config = {
    remoteUrl: '/',
    remoteUploadUrl:  'http://127.0.0.1:8080/common/upload',
    getAuthorization(){
        return localStorage.getItem('jwt')
    }
}

export default config
