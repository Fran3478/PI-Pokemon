
export function validators(element, name) {
    const regexUrl = /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g
    
    if(name === "image" && !regexUrl.test(element)){
        return 'Invalid Url!!'
    }

    if(!isNaN(element) && (element > 999 || element < 0)) {
        return `The ${name} value must be between 0 and 999`
    }

    if(Array.isArray(element) && !element.length) {
        return 'At least one type must be selected!'
    } else if(isNaN(element) && !element) {
        return `The field ${name} can't be empty!`
    } if(isNaN(element) && element.length > 30) {
        return `The name shuld be less than 30 characters`
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