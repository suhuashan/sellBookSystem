function formateTime() {
    let time = new Date();
    let month = time.getMonth() + 1;
    let day = time.getDate();
    return  `${month}月${day}日`
}
function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = window.atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}
exports.formateTime = formateTime;
exports.dataURLtoFile = dataURLtoFile;