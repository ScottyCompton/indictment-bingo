// console.clear();

// function Person(first, last, age, gender, interests) {
//     this.name = {
//       first,
//       last
//     };
//     this.age = age;
//     this.gender = gender;
//     this.interests = interests;
//   };


//   Person.prototype.greeting = function() {
//     return 'Hi! I\'m ' + this.name.first + '.';
//   };



// // using call to invoke the person function (explicit)
// //  function Teacher(first, last, age, gender, interests, subject) {
// //      Person.call(this, first, last, age, gender, interests)
// //      this.subject = subject;     
// //  }


// // using apply to invoke the Person function
//  function Teacher() {
//      console.log(arguments);
//      Person.apply(this, arguments)
//      this.subject = arguments[arguments.length-1];     
//  }

// console.log(this)

//  var a=Object.seal(Object.preventExtensions({"name": "John", "Age":21}))
//  console.log(a);


// Teacher.prototype = Object.create(Person.prototype);

// Object.defineProperty(Teacher.prototype, 'constructor', {
//     value: Teacher,
//     enumerable: false,
//     writable: true
// })

// Teacher.prototype.greeting = function() {
//     let prefix;
  
//     if (this.gender === 'male' || this.gender === 'Male' || this.gender === 'm' || this.gender === 'M') {
//       prefix = 'Mr.';
//     } else if (this.gender === 'female' || this.gender === 'Female' || this.gender === 'f' || this.gender === 'F') {
//       prefix = 'Ms.';
//     } else {
//       prefix = 'Mx.';
//     }
  
//     return 'Hello. My name is ' + prefix + ' ' + this.name.last + ', and I teach ' + this.subject + '.';
//   };

// Teacher.prototype.farewell = function() {
//     return 'Goodbye, see you next time ' + this.name.first;
// }

//  const student = new Person('Suzie','Rottencrotch', 16, 'female', ['blowjobs']);
//  const teach = new Teacher('Fred','jones', 33, 'male', ['football', 'cosplay'], 'Math');

// console.log(teach.interests[0]);
// console.log(teach.farewell());
// console.log(teach.greeting());


const info = {city: 'Dallas', state: 'TX'};

info.city = undefined;

console.log(info.city);

console.log(info);



