module.exports = {
  normalizeErrors: function(errors) {
    let someErrors = [];

    for (let property in errors) {
      if (errors.hasOwnProperty(property)) {
        someErrors.push({
          title: property,
          detail: errors[property].message
        });
        
      }
    }
    return someErrors;
    
  }
};
