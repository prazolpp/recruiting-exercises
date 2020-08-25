const convertObjectToArray = (obj) => { 
    let output = [];
    Object.keys(obj).forEach((key) => {
        let currObj = {};
        currObj[key] = obj[key];
        output.push(currObj);
    })
    return output;
}

module.exports = convertObjectToArray;