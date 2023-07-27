class Carro {
  constructor(id, marca, modelo, ano, km, cor, taxaAluguel, reservaStatus) {
    this.id = id;
    this.marca = marca;
    this.modelo = modelo;
    this.ano = ano;
    this.km = km;
    this.cor = cor;
    this.taxaAluguel = taxaAluguel;
    this.reservaStatus = reservaStatus;
  }

  getId() {
    return this.id;
  }

  getMarca() {
    return this.marca;
  }

  getModelo() {
    return this.modelo;
  }

  getAno() {
    return this.ano;
  }

  getKm() {
    return this.km;
  }

  getCor() {
    return this.cor;
  }

  getTaxaAluguel() {
    return this.taxaAluguel;
  }

  getReservaStatus() {
    return this.reservaStatus;
  }

  setReservaStatus(status) {
    this.reservaStatus = status;
  }
}

class Cliente {
  constructor(id, nome, email, numeroFone, cpf) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.numeroFone = numeroFone;
    this.cpf = cpf;
    this.reservas = [];
  }

  getId() {
    return this.id;
  }

  getNome() {
    return this.nome;
  }

  getEmail() {
    return this.email;
  }

  getNumeroFone() {
    return this.numeroFone;
  }

  getCpf() {
    return this.cpf;
  }

  getReservas() {
    return this.reservas;
  }

  addReserva(reserva) {
    this.reservas.push(reserva);
  }

  removeReserva(reserva) {
    const index = this.reservas.indexOf(reserva);
    if (index !== -1) {
      this.reservas.splice(index, 1);
    }
  }
}

class Reserva {
  constructor(id, carro, cliente, reservaInicio, reservaFinal) {
    this.id = id;
    this.carro = carro;
    this.cliente = cliente;
    this.reservaInicio = reservaInicio;
    this.reservaFinal = reservaFinal;
  }

  getId() {
    return this.id;
  }

  getCarro() {
    return this.carro;
  }

  getCliente() {
    return this.cliente;
  }

  getReservaInicio() {
    return this.reservaInicio;
  }

  getReservaFinal() {
    return this.reservaFinal;
  }
}

module.exports = {
  Carro,
  Cliente,
  Reserva
};
