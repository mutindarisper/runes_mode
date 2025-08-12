// function createCounter() {
//     let counter = $state(0)

//     return {
//         get value() {
//             return counter
//         },
//         increment() {
//             counter ++;
//         }
//     }
// }

// export const counter = createCounter()

//global state with classes
class Counter2 {
    value = $state(0)
    increment() {this.value ++}

}
export const counter = new Counter2()