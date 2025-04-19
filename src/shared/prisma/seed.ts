import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Lista de nomes de serviços relacionados a salão de manicure
const nomesDeServicos = [
  'Manicure Simples',
  'Pedicure Simples',
  'Manicure e Pedicure',
  'Alongamento de Unhas em Gel',
  'Alongamento de Unhas em Acrílico',
  'Esmaltação em Gel',
  'Decoração de Unhas',
  'Spa dos Pés',
  'Remoção de Unhas em Gel/Acrílico',
  'Tratamento de Unhas Fracas',
];

async function main() {
  // Dados de Endereco
  const enderecos = Array.from({ length: 10 }, (_, i) => ({
    logradouro: `Rua ${String.fromCharCode(65 + i)}`,
    numero: `${i * 10 + 1}`,
    complemento: i % 2 === 0 ? `Apto ${i + 1}` : '',
    bairro: `Bairro ${i + 1}`,
    cidade: 'São Paulo',
    estado: 'SP',
    cep: `0${i + 1}000-000`,
  }));
  await prisma.endereco.createMany({ data: enderecos });
  console.log('Dados de Endereco criados.');

  // Dados de Filial
  const filiais = Array.from({ length: 10 }, (_, i) => ({
    nome: `Filial ${String.fromCharCode(65 + i)}`,
    enderecoId: i + 1, // Assumindo que Endereco foi criado com IDs sequenciais
  }));
  await prisma.filial.createMany({ data: filiais });
  console.log('Dados de Filial criados.');

  // Dados de Cliente
  const clientes = Array.from({ length: 10 }, (_, i) => ({
    nomeCliente: `Cliente ${i + 1}`,
    numeroTelefone: `119${String(Math.floor(10000000 + Math.random() * 90000000)).padStart(8, '0')}`,
  }));
  await prisma.cliente.createMany({ data: clientes });
  console.log('Dados de Cliente criados.');

  // Dados de Login
  const logins = Array.from({ length: 10 }, (_, i) => ({
    usuario: `user${i + 1}`,
    senha: `pass${i + 1}`,
    email: `user${i + 1}@email.com`,
  }));
  await prisma.login.createMany({ data: logins });
  console.log('Dados de Login criados.');

  // Dados de Servico
  const servicos = Array.from({ length: 10 }, (_, i) => ({
    nomeServico: nomesDeServicos[i % nomesDeServicos.length], // Seleciona nomes da lista
    valorServico: parseFloat((Math.random() * 100 + 20).toFixed(2)),
  }));
  await prisma.servico.createMany({ data: servicos });
  console.log('Dados de Servico criados.');

  // Dados de Agenda
  const agendamentos = Array.from({ length: 10 }, (_, i) => {
    const start = new Date();
    start.setDate(start.getDate() + i);
    start.setHours(9 + i % 8, 0, 0, 0);
    const end = new Date(start);
    end.setHours(start.getHours() + 1, 0, 0, 0);
    return {
      dataHoraInicial: start,
      dataHoraFinal: end,
    };
  });
  await prisma.agenda.createMany({ data: agendamentos });
  console.log('Dados de Agenda criados.');

  // Dados de Atendimento
  const atendimentos = Array.from({ length: 10 }, (_, i) => ({
    clienteId: i + 1, // Assumindo que Cliente foi criado com IDs sequenciais
    agendaId: i + 1, // Assumindo que Agenda foi criado com IDs sequenciais
    valorTotal: parseFloat((Math.random() * 200 + 50).toFixed(2)),
    filialId: i + 1, // Assumindo que Filial foi criado com IDs sequenciais
  }));
  await prisma.atendimento.createMany({ data: atendimentos });
  console.log('Dados de Atendimento criados.');

  // Dados de AtendimentoHasServico (conectando atendimentos e serviços)
  const atendimentoServicos = Array.from({ length: 15 }, (_, i) => ({
    atendimentoId: (i % 10) + 1, // Conecta aos 10 atendimentos criados
    servicoId: (i % 10) + 1, // Conecta aos 10 serviços criados
  }));
  await prisma.atendimentoHasServico.createMany({ data: atendimentoServicos });
  console.log('Dados de AtendimentoHasServico criados.');

  // Dados de Funcionario
  const funcionarios = Array.from({ length: 10 }, (_, i) => {
    const admissao = new Date();
    admissao.setFullYear(admissao.getFullYear() - Math.floor(Math.random() * 5));
    admissao.setMonth(Math.floor(Math.random() * 12));
    admissao.setDate(Math.floor(Math.random() * 28) + 1);
    const desligamento = Math.random() < 0.3 ? new Date(Date.now() + Math.random() * 365 * 24 * 3600000) : null;
    return {
      nome: `Funcionario ${i + 1}`,
      cpf: String(Math.floor(10000000000 + Math.random() * 90000000000)),
      admissao: admissao,
      desligamento: desligamento,
      cargo: ['Gerente', 'Vendedor', 'Técnico', 'Auxiliar'][i % 4],
      salario: Math.floor(Math.random() * 3000 + 1500),
      enderecoId: i + 1, // Assumindo que Endereco foi criado com IDs sequenciais
      filialId: (i % 10) + 1, // Assumindo que Filial foi criado com IDs sequenciais
    };
  });
  await prisma.funcionario.createMany({ data: funcionarios });
  console.log('Dados de Funcionario criados.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });