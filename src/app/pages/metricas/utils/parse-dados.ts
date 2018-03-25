export const parseCnpjCpf = (value: string) => {
  if (value) {
    value = value.toString();
      // CPF pipe
    if (value.length === 11) {
        return value.substring(0, 3).concat('.')
        .concat(value.substring(3, 6))
        .concat('.')
        .concat(value.substring(6, 9))
        .concat('-')
        .concat(value.substring(9, 11));
    } else if (value.length === 14) {
      // CNPJ pipe
      return value.substring(0, 2).concat('.')
        .concat(value.substring(2, 5))
        .concat('.')
        .concat(value.substring(5, 8))
        .concat('/')
        .concat(value.substring(8, 12))
        .concat('-')
        .concat(value.substring(12, 14));
    } else if (value.length === 9) {
        // RG pipe
      return value.substring(0, 2).concat('.')
        .concat(value.substring(2, 5))
        .concat('.')
        .concat(value.substring(5, 8))
        .concat('-')
        .concat(value.substring(8, 9));
    }  
  }
  return value;
};

export const dataToString = data => {
  const date = new Date(data);
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
};

export const horaToString = hora => {
  const hour = new Date(hora);
  return `${hour.getHours()}h${hour.getMinutes()}`;
};

