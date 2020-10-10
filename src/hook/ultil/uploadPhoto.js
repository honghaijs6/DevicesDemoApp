
const uploadPhoto=(file)=>{

    return new Promise((resolve,reject)=>{
        const xhr = new XMLHttpRequest(); // eslint-disable-line no-undef
        xhr.open("POST", "https://api.imgur.com/3/image");
        xhr.setRequestHeader("Authorization", "Client-ID c3714c01c1bddb4");
        const data = new FormData(); // eslint-disable-line no-undef
        data.append("image", file);
        xhr.send(data);
        xhr.addEventListener("load", () => {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
        });
        xhr.addEventListener("error", () => {
            const error = JSON.parse(xhr.responseText);
            reject(error);
        });
    })
}

export default uploadPhoto; 
