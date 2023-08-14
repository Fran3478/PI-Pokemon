
export function validators(element, name) {
    const regexUrl = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g
    
    if(name === "image" && !regexUrl.test(element)){
        return 'Invalid Url!!'
    }

    if(Number(element) && element > 999 && element < 0) {
        return "The value must be between 0 and 999"
    }

    if(Array.isArray(element) && !element.length) {
        return 'At least one must be selected!'
    } else if(Number(element) && element < 0){
        return "The value must be 0 at least or more!"
    } else if(!element) {
        return "The field can't be empty!"
    }
}

export function validateAll(element) {
    let err = {}
    let msg = ""
    for (const prop in element) {
        msg = validators(element[prop], prop)
        if(msg) {
            err[prop] = msg
        }
    }
    return err
}