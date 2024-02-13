
const arrow = (a,b) => {
    return a*b;
}

console.log(arrow(4,5));

const person = {
    name:"Adi",
    age:"27",
    eng: function() {
        console.log("Hi i am "+this.name);
    }
};

person.eng();