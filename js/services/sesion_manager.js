import {
  ClearSpecific,
  GetItem,
  SetItem,
} from "../helpers/local_storage_manager.js";
import CONSTANTS from "../constants/keys.js";
import MESSAGES from "../constants/messages.js";
import { Validate } from "../helpers/error_manager.js";

function Login({ email, password }) {
  try {
    let users = GetItem(CONSTANTS.USERS);

    Validate(!users, MESSAGES.NO_EXISTE_EL_USUARIO);

    let user = FilterUser({ array: users, email });

    Validate(user.length === 0, MESSAGES.NO_EXISTE_EL_USUARIO);

    user = user[0];

    Validate(
      user.password !== password,
      MESSAGES.USUARIO_O_CONTRASEÑA_INCORRECTOS
    );

    SetItem({
      key: CONSTANTS.USER_LOGGED,
      data: user,
    });

    return true;
  } catch (error) {
    return false;
  }
}

function Logout() {
  ClearSpecific(CONSTANTS.USER_LOGGED);
}

function CrearUsuario({ nombre, email, password, tipo }) {
  let users = GetItem(CONSTANTS.USERS);

  Validate(VerifyIfExists({ email }), MESSAGES.YA_EXISTE_EL_USUARIO);

  const user = {
    nombre,
    email,
    password,
    tipo,
  };

  if (!users) {
    users = [];
  }

  users.push(user);

  SetItem({ key: CONSTANTS.USERS, data: users });
}

function VerifyIfExists({ email }) {
  const users = GetItem(CONSTANTS.USERS);
 
  if (!users) {
    return false;
  }

  return FilterUser({ array: users, email }).length > 0;
}

function FilterUser({ array, email }) {
  return array.filter((user) => user.email === email);
}

export { CrearUsuario, Login, Logout, VerifyIfExists };
