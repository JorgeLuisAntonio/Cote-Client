const {afficherTableDinamica} = require("../js/Paises");

test('nb table pays',()=>{
    const result= afficherTableDinamica(0);
    expect(result).toBeUndefined();
})

test('nb table pays',()=>{
    const result= afficherTableDinamica(-1);
    expect(result).toBeUndefined();
})