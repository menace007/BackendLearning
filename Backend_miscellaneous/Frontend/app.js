let arr = [1,2,3];
//Custom prototype made by me
arr.sayHello = ()=>{
    console.log("Hello, I am array");
}


// Factory function 
// function personMaker(name, age){
//     const person = {
//         name: name,
//         age: age,
//         talk(){
//             console.log(`Hi, my name is ${this.name}`);
//         },
//     };
//     return person;
// }

// // Constructors = doesn't return anything and start with capital letter (better than factory function)

// function Person(name, age){
//     this.name = name;
//     this.age = age;
// }

// Person.prototype.talk = function(){
//     console.log(`Hi, my name is ${this.name}`);
// }

// let p1 = new Person("adam", 22);
// let p2 = new Person("eve", 21);


//Classes - More better than constructors 
// class Person{
//     constructor(name, age){
//         this.name = name;
//         this.age = age;
//     }
//     talk(){
//         console.log(`Hi, my name is ${this.name}`);
//     }
// }

// let p = new Person("adam", 22);



//Inheritance concept
class Person{
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
    talk(){
        console.log(`Hi, my name is ${this.name}`);
    }
}

class Student extends Person{
    constructor(name, age, marks){
        super(name, age);
        this.marks = marks;
    }
    greet(){
        console.log(`Good morning/afternoon/evening teacher`);
    }
}

class Teacher extends Person{
    constructor(name, age, subject){
        super(name,age);
        this.subject = subject;
    }
    respondGreet(){
        console.log(`Greetings students`)
    }
}


let stu1 = new Student("adam", 24, 89);
let teac1 = new Teacher("Chunnu", 40, "Data Structures");