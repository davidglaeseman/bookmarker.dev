export default ({ app }, inject) => {
    inject('getStorage', (name) => {
        let data = window.localStorage.getItem(name);
        if(data){
            let type = typeof data;
            if(type == 'string'){
                return JSON.parse(data);
            } else if(type == 'object') {
                return data;
            }
        }
    });
    inject('setStorage', (name, data) => {
        let type = typeof data;
        if(type == 'string'){
            data = data;
        } else if(type == 'object') {
            data = JSON.stringify(data);
        }
        window.localStorage.setItem(name, data);
    });
}
