import { User } from "../schema/model.js";
const formatDate = (date) => {
  date = date.split("-");

  let newDate = `${date[2]}-${date[1]}-${date[0]}`;

  return newDate;
};

export async function ClearUsers() {
  try {
    let users = await User.find({ email: "example@gmail.com" });

    if (!users) throw new Error("No hay usuarios");
  } catch (err) {
    return {
      err,
    };
  }
}

/*




let fechaUsuario = new Date().toLocaleDateString();

const formatDate = (date) => {
    
    date = date.split("-")

    console.log(date);
    let newDate = `${date[2]}-${date[1]}-${date[0]}`

    
    return newDate

}

let fechaForm = formatDate(fechaUsuario)

console.log(fechaUsuario);
let fecha = new Date(fechaForm)
let fecha3 = new Date()
console.log(fecha);
console.log(fecha3);

let r = fecha3.setDate(fecha.getDate() - 5)

console.log(fecha3 <= fecha);


*/
