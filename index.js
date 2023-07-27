// API REST Basic

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

const { Carro, Cliente, Reserva } = require('./models');

const carros = [
  new Carro(1, 'Toyota', 'Camry', 2020, 1000, 'Vermelho', 50.0, true),
  new Carro(2, 'Honda', 'Accord', 2019, 2000, 'Azul', 60.0, true),
  new Carro(3, 'Ford', 'Mustang', 2021, 500, 'Preto', 100.0, false)
];

const clientes = [
  new Cliente(1, 'João Silva', 'joao@exemplo.com', '1234567890', '123456789'),
  new Cliente(2, 'Joana Melo', 'joana@exemplo.com', '0987654321', '987654321')
];

const reservas = [
  new Reserva(1, carros[0], clientes[0], new Date('2021-01-01'), new Date('2022-01-01')),
  new Reserva(2, carros[1], clientes[1], new Date('2021-02-01'), new Date('2022-02-01'))
];

app.get('/', (req, res) => {
  res.send('Bem-vindo à API Aluga-Fácil. A API permite que os usuários executem operações básicas CRUD (Criar (Create), Ler (Read), Atualizar (Update), Deletar (Delete)) em carros, clientes e reservas.');
});

app.get('/api/carros', (req, res) => {
  res.json(carros);
});

app.get('/api/carros/:id', (req, res) => {
  const carroId = parseInt(req.params.id);
  const carro = carros.find(carro => carro.getId() === carroId);
  if (carro) {
    res.json(carro);
  } else {
    res.status(404).send('Carro não encontrado');
  }
});

app.post('/api/carros', (req, res) => {
  const newCarro = req.body;
  const carro = new Carro(
    newCarro.id,
    newCarro.brand,
    newCarro.model,
    newCarro.year,
    newCarro.km,
    newCarro.color,
    newCarro.reservaFee,
    newCarro.reservaStatus
  );
  carros.push(carro);
  res.send('Carro adicionado');
});

app.put('/api/carros/:id', (req, res) => {
  const carroId = parseInt(req.params.id);
  const updatedCarro = req.body;
  const carroIndex = carros.findIndex(carro => carro.getId() === carroId);
  if (carroIndex !== -1) {
    const carro = carros[carroIndex];
    carro.setReservaStatus(updatedCarro.reservaStatus);
    res.send('Carro atualizado');
  } else {
    res.status(404).send('Carro não encontrado');
  }
});

app.delete('/api/carros/:id', (req, res) => {
  const carroId = parseInt(req.params.id);
  const carroIndex = carros.findIndex(carro => carro.getId() === carroId);
  if (carroIndex !== -1) {
    carros.splice(carroIndex, 1);
    res.send('Carro deletado');
  } else {
    res.status(404).send('Carro não encontrado');
  }
});

app.get('/api/clientes', (req, res) => {
  res.json(clientes);
});

app.get('/api/clientes/:id', (req, res) => {
  const clienteId = parseInt(req.params.id);
  const cliente = clientes.find(cliente => cliente.getId() === clienteId);
  if (cliente) {
    res.json(cliente);
  } else {
    res.status(404).send('Cliente não encontrado');
  }
});

app.post('/api/clientes', (req, res) => {
  const newCliente = req.body;
  const cliente = new Cliente(
    newCliente.id,
    newCliente.name,
    newCliente.email,
    newCliente.phoneNumber,
    newCliente.cpf
  );
  clientes.push(cliente);
  res.send('Cliente adicionado');
});

app.put('/api/clientes/:id', (req, res) => {
  const clienteId = parseInt(req.params.id);
  const updatedCliente = req.body;
  const clienteIndex = clientes.findIndex(cliente => cliente.getId() === clienteId);
  if (clienteIndex !== -1) {
    const cliente = clientes[clienteIndex];
    res.send('Cliente atualizado');
  } else {
    res.status(404).send('Cliente não encontrado');
  }
});

app.delete('/api/clientes/:id', (req, res) => {
  const clienteId = parseInt(req.params.id);
  const clienteIndex = clientes.findIndex(cliente => cliente.getId() === clienteId);
  if (clienteIndex !== -1) {
    clientes.splice(clienteIndex, 1);
    res.send('Cliente deletado');
  } else {
    res.status(404).send('Cliente não encontrado');
  }
});

app.get('/api/reservas', (req, res) => {
  res.json(reservas);
});

app.get('/api/reservas/:id', (req, res) => {
  const reservaId = parseInt(req.params.id);
  const reserva = reservas.find(reserva => reserva.getId() === reservaId);
  if (reserva) {
    res.json(reserva);
  } else {
    res.status(404).send('Reserva não encontrada');
  }
});

app.post('/api/reservas', (req, res) => {
  const newReserva = req.body;
  const carro = carros.find(carro => carro.getId() === newReserva.carroId);
  const cliente = clientes.find(cliente => cliente.getId() === newReserva.clienteId);
  if (carro && cliente) {
    const reserva = new Reserva(
      newReserva.id,
      carro,
      cliente,
      newReserva.reservaInicio,
      newReserva.reservaFinal
    );
    reservas.push(reserva);
    res.send('Reserva atualizada');
  } else {
    res.status(404).send('Carro or cliente não encontrado');
  }
});

app.delete('/api/reservas/:id', (req, res) => {
  const reservaId = parseInt(req.params.id);
  const reservaIndex = reservas.findIndex(reserva => reserva.getId() === reservaId);
  if (reservaIndex !== -1) {
    reservas.splice(reservaIndex, 1);
    res.send('Reserva deletada');
  } else {
    res.status(404).send('Reserva não encontrada');
  }
});

app.listen(3000, () => console.log('Server started'));