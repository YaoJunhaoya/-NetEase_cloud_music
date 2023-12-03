
const baocunCookie = function (cookie) {
    let arrar = []
    let arra = cookie.split(';')
    let str = ""
    arra.forEach(element => {
        if (element.charAt(0) != " ") {
            arrar.push(str)
            str = ""
            str += element;
        } else {
            str += ";" + element
        }
    });

    arrar.forEach((e) => {
        document.cookie = e
    })
}
export default baocunCookie;
