//import Request e Response para manipular as requisições e respostas HTTP
import {Request, Response} from "express";

//IAtendimento para tipar os objetos de tipo Atendimento
import IAtendimento from "../data/models/IAtendimento";

//IAtendimentoRepository para inverter o controle de dependência
import AtendimentoRepository from "../data/repositories/AtendimentoRepository";

//importação dos services
import CreateAtendimento from "../services/create/CreateAtendimento";
import UpdateAtendimento from "../services/update/UpdateAtendimento";
import DeleteAtendimento from "../services/delete/DeleteAtendimento";
import readUniqueAtendimento from "../services/read/readUniqueAtendimento";
import readAllAtendimentos from "../services/read/readAllAtendimentos";
import CreateAgenda from "../../agenda/services/create/CreateAgenda";
import AgendaRepository from "../../agenda/data/repositories/AgendaRepository";
import IAgenda from "../../agenda/data/models/IAgenda";
import ReadAgendasAvailable from "../../agenda/services/read/ReadAgenda";
import ReadAgenda from "../../agenda/services/read/ReadAgenda";
import AtendimentoHasServicoCtrl from "../../atendimentoHasServico/controller/AtendimentoHasServicoCtrl";
import AtendimentoHasServicoRepository from "../../atendimentoHasServico/data/repositories/AtendimentoHasServicoRepository";
import AddServiceToAtendimento from "../../atendimentoHasServico/services/add/AddServiceToAtendimento";
import UpdateValorTotal from "../services/update/UpdateValorTotal";
import UpdateAgenda from "../../agenda/services/update/UpdateAgenda";
import RemoveServiceFromAtendimento from "../../atendimentoHasServico/services/remove/RemoveServiceFromAtendimento";
import IServico from "../../servico/data/models/IServico";
import GetServicosFromAtendimento from "../../atendimentoHasServico/services/get/GetServicosFromAtendimento";
import GetMoreFrequentClients from "../services/read/GetMoreFrequentClients";
import prisma from "../../../shared/prisma/prismaClient";
import IAtendimentoHasServico from "../../atendimentoHasServico/data/models/IAtendimentoHasServico";
import { Prisma } from "@prisma/client";

//cria e exporta a classe controller de Atendimento
export default class AtendimentoController
{
    //controller para a criação do atendimento
    async create(request: Request, response: Response): Promise<Response>
    {
        //try para testar a execução do código
        try
        {
            //guarda na constante as infos de atendimento vindas do body
            let atendimento: IAtendimento = request.body;
            let servicoId: number = Number.parseInt(request.body.servicoId);
            //criando o agenda pelos dados inseridos do body
            const agenda: IAgenda = 
            {
                dataHoraInicial: request.body.dataHoraInicial, dataHoraFinal: request.body.dataHoraFinal,
                agendaId: 0
            };
  
            //inclui a nova agenda
            const agendaInserida = await new CreateAgenda(new AgendaRepository()).execute(agenda);
            
            //adicionando o id da agenda inserida ao agendaId do atendimento
            atendimento.agendaId = agendaInserida.agendaId;
            
            //passa ao serviço o atendimento a ser inserido no sistema
            const atendimentoInserido: IAtendimento = await new CreateAtendimento(new AtendimentoRepository()).execute(atendimento);
            console.log(atendimentoInserido)

            setTimeout(function()
            {
                new AddServiceToAtendimento(new AtendimentoHasServicoRepository()).execute(servicoId, atendimentoInserido.atendimentoId);
            }, 1000);
            
            setTimeout(function()
            {
                new UpdateValorTotal().updateValorTotal(atendimentoInserido.atendimentoId)
            }, 2000);

            

            //resposta afirmativa da API
            return response.status(201).json({mensagem: "Atendimento cadastrado com sucesso.", atendimento});
        }
        //catch para tratar erros
        catch(error: any)
        {
            //resposta negativa da API
            return response.status(500).json({mensagem: "Não foi possível cadastrar o atendimento.", erro: error.message});
        }
    }

    //controller para a atualização do atendimento
    async update(request: Request, response: Response): Promise<Response>
    {
        //try para testar a execução do código
        try
        {
           
             let servicoId: number = Number.parseInt(request.body.servicoId);
             let atendimentoId: number = Number.parseInt(request.params.atendimentoId);
             let agendaId: number = Number.parseInt(request.body.agendaId);
             //criando o agenda pelos dados inseridos do body
             const agenda: IAgenda = 
             {
                 dataHoraInicial: request.body.dataHoraInicial, 
                 dataHoraFinal: request.body.dataHoraFinal,
                 agendaId: Number.parseInt(request.body.agendaId)
             };

             const atendimento: IAtendimento = request.body;
   
             //inclui a nova agenda
             await new UpdateAgenda(new AgendaRepository()).execute(agenda, agendaId);
             
             
             //passa ao serviço o atendimento a ser inserido no sistema
             await new UpdateAtendimento(new AtendimentoRepository()).execute(atendimento, atendimentoId);
             
             const servicoOld: any = await new GetServicosFromAtendimento(new AtendimentoHasServicoRepository()).execute(atendimentoId);

             setTimeout(function()
             {
                 new RemoveServiceFromAtendimento(new AtendimentoHasServicoRepository()).execute(servicoOld.servicoId, atendimentoId);
                 new AddServiceToAtendimento(new AtendimentoHasServicoRepository()).execute(servicoId, atendimentoId);
             }, 1000);
             
             setTimeout(function()
             {
                 new UpdateValorTotal().updateValorTotal(atendimentoId)
             }, 2000);
 

            //resposta afirmativa da API
            return response.status(200).json({mensagem: "Atendimento atualizado com sucesso.", atendimento});
        }
        //catch para tratar erros
        catch(error: any)
        {
            //resposta negativa da API
            return response.status(500).json({mensagem: "Não foi possível atualizar o atendimento.", erro: error.message});
        }
    }

    //controller para a deleção do atendimento
    async delete(request: Request, response: Response): Promise<Response>
    {
        //try para testar a execução do código
        try
        {
            //salva na constante o atendimento
            const atendimentoId: number = Number.parseInt(request.params.atendimentoId);

            //passa ao serviço o id do atendimento a ser removido no sistema
            await new DeleteAtendimento(new AtendimentoRepository()).execute(atendimentoId);

            //resposta afirmativa da API
            return response.status(200).json({mensagem: "Atendimento deletado com sucesso."});
        }
        //catch para tratar erros
        catch(error: any)
        {
            //resposta negativa da API
            return response.status(500).json({mensagem: "Não foi possível deletar o atendimento.", erro: error.message});
        }
    }

    //controller para a consulta do atendimento
    async getUnique(request: Request, response: Response): Promise<Response>
    {
        //try para testar a execução do código
        try
        {
            //salva na constante o atendimento
            const atendimentoId: number = Number.parseInt(request.params.atendimentoId);

            //passa ao serviço o atendimento a ser inserido no sistema
            const atendimento: IAtendimento = await new readUniqueAtendimento(new AtendimentoRepository()).execute(atendimentoId);

            //resposta afirmativa da API
            return response.status(200).json(atendimento);
        }
        //catch para tratar erros
        catch(error: any)
        {
            //resposta negativa da API
            return response.status(500).json({mensagem: "Não foi possível consultar o atendimento.", erro: error.message});
        }
    }

    //controller para a consulta dos atendimentos
    async getAll(request: Request, response: Response): Promise<Response>
    {
        //try para testar a execução do código
        try
        {
            //passa ao serviço o atendimento a ser inserido no sistema
            let atendimentos: IAtendimento[] = await new readAllAtendimentos(new AtendimentoRepository()).execute();

            for(let i = 0; i < atendimentos.length; i ++)
            {

                const agenda = await new ReadAgenda(new AgendaRepository()).execute(atendimentos[i].agendaId);

                const obj = 
                { 
                    data: ((agenda.dataHoraInicial.getDate() < 9 ? '0' : '') + agenda.dataHoraInicial.getDate()) + "/" + 
                    ((agenda.dataHoraInicial.getMonth() < 9 ? '0' : '') + (agenda.dataHoraInicial.getMonth() + 1)) + "/" + 
                    agenda.dataHoraFinal.getFullYear(),
                    horaInicial: (agenda.dataHoraInicial.getHours() + 3) + ":" + ((agenda.dataHoraInicial.getMinutes() < 9 ? '0' : '') + agenda.dataHoraInicial.getMinutes()),
                    horaFinal: (agenda.dataHoraFinal.getHours() + 3)  + ":" + ((agenda.dataHoraFinal.getMinutes() < 9 ? '0' : '') + agenda.dataHoraFinal.getMinutes())
                }
                atendimentos[i].dataFormatada = obj;
            }
      
            //resposta afirmativa da API
            return response.status(200).json(atendimentos);
        }
        //catch para tratar erros
        catch(error: any)
        {
            //resposta negativa da API
            return response.status(500).json({mensagem: "Não foi possível consultar os atendimentos.", erro: error.message});
        }
    }

    async getMoreFrequentClients(request: Request, response: Response): Promise<Response>
    {
        //try para testar a execução do código
        try
        {
            //passa ao serviço o atendimento a ser inserido no sistema
            let atendimentos: IAtendimento[] = await new GetMoreFrequentClients(new AtendimentoRepository()).execute();
      
            //resposta afirmativa da API
            return response.status(200).json(atendimentos);
        }
        //catch para tratar erros
        catch(error: any)
        {
            //resposta negativa da API
            return response.status(500).json({mensagem: "Não foi possível consultar os atendimentos.", erro: error.message});
        }
    }

    async getAtendimentosFromLastYear(request: Request, response: Response): Promise<Response>
    {
        try
        {
            const oneYear = new Date();
            const atendimentos = await prisma.atendimentoHasServico.findMany({include: {servico: true, atendimento: {include: {agenda: true}}}, 
            where: {atendimento: {agenda: {dataHoraFinal: {gt: oneYear}}}}, orderBy: {atendimento: {agenda: {dataHoraFinal: "desc"}}}});
            return response.status(200).json({message: "", atendimentos});
        }
        catch(error)
        {
            console.error(error);
            return response.status(500).json(error);
        }
    }

    async getTotalMoney(request: Request, response: Response): Promise<Response>
    {


            try {
                const atendimentosComTotal = await prisma.atendimento.findMany({
                  select: {
                    atendimentoHasServico: {
                      select: {
                        servico: {
                          select: {
                            valorServico: true,
                          },
                        },
                      },
                    },
                  },
                });
          
                const totalFaturamento = atendimentosComTotal.reduce((somaTotal, atendimento) => {
                  const totalServicosAtendimento = atendimento.atendimentoHasServico.reduce(
                    (somaAtendimento, item) => somaAtendimento + item.servico.valorServico.toNumber(),
                    0
                  );
                  return somaTotal + totalServicosAtendimento;
                }, 0);
          
                return response.status(200).json({ totalFaturamento });
              } catch (error) {
                console.error('Erro ao obter total de faturamento:', error);
                return response.status(500).json(error);
              }
    
        
    }

    async getTotalPorMes(request: Request, response: Response): Promise<Response>
    {
        try
        {
            const resultados = await prisma.$queryRaw<
        Array<{ ano: number; mes: number; totalValor: Prisma.Decimal | null }>
        >`
        SELECT
            YEAR(a.dataHoraInicial) AS ano,
            MONTH(a.dataHoraInicial) AS mes,
            SUM(at.valorTotal) AS totalValor
        FROM Agenda a
        JOIN Atendimento at ON a.agendaId = at.agendaId
        GROUP BY YEAR(a.dataHoraInicial), MONTH(a.dataHoraInicial)
        ORDER BY YEAR(a.dataHoraInicial) DESC, MONTH(a.dataHoraInicial) DESC;
    `;

    const resultadoFormatado = resultados.map(item => ({
      ano: item.ano,
      mes: item.mes,
      totalValor: item.totalValor?.toNumber() || 0,
    }));

    return response.status(200).send(JSON.stringify(resultadoFormatado, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
      ));
        } catch (error) {
            console.error("Erro ao obter total de atendimentos por mês:", error);
            return response.status(500).json({ error: "Erro interno do servidor" });
        } finally {
            await prisma.$disconnect();
        }
      
    }

    async getMoreFrequentServices(request: Request, response: Response): Promise<Response>
    {
        try {
            const frequenciaServicos = await prisma.atendimentoHasServico.groupBy({
                by: ['servicoId'],
                _count: {
                  servicoId: true,
                },
                orderBy: {
                  _count: {
                    servicoId: 'desc',
                  },
                },
                take: 10, // Opcional: limite para os 10 serviços mais frequentes
              });
          
              // Buscar os nomes dos serviços correspondentes aos IDs mais frequentes
              const servicoIdsMaisFrequentes = frequenciaServicos.map(item => item.servicoId);
          
              const nomesServicos = await prisma.servico.findMany({
                where: {
                  servicoId: {
                    in: servicoIdsMaisFrequentes,
                  },
                },
                select: {
                  servicoId: true,
                  nomeServico: true,
                },
              });
          
              // Combinar a frequência com o nome do serviço
              const resultado = frequenciaServicos.map(item => {
                const nomeServico = nomesServicos.find(s => s.servicoId === item.servicoId)?.nomeServico || 'Nome não encontrado';
                return {
                  nomeServico: nomeServico,
                  frequencia: item._count.servicoId,
                };
              });
          
              return response.status(200).json(resultado);
            } catch (error) {
              console.error("Erro ao obter serviços mais frequentes:", error);
              return response.status(500).json({ error: "Erro interno do servidor" });
            } finally {
              await prisma.$disconnect();
            }
          };

          async getMoreFrequentServicesByClients(request: Request, response: Response): Promise<Response>
          {
            try {
                const frequenciaServicosPorCliente = await prisma.atendimento.findMany({
                  select: {
                    clienteId: true,
                    cliente: {
                      select: {
                        nomeCliente: true,
                      },
                    },
                    atendimentoHasServico: {
                      select: {
                        servicoId: true,
                        servico: {
                          select: {
                            nomeServico: true,
                          },
                        },
                      },
                    },
                  },
                });
            
                const resultado = frequenciaServicosPorCliente.map(clienteAtendimentos => {
                  const servicoFrequencia: { [nomeServico: string]: number } = {};
            
                  clienteAtendimentos.atendimentoHasServico.forEach(ahs => {
                    const nomeServico = ahs.servico.nomeServico;
                    servicoFrequencia[nomeServico] = (servicoFrequencia[nomeServico] || 0) + 1;
                  });
            
                  const servicosOrdenados = Object.entries(servicoFrequencia)
                    .sort(([, freqA], [, freqB]) => freqB - freqA)
                    .map(([nomeServico, frequencia]) => ({ nomeServico, frequencia }));
            
                  return {
                    clienteId: clienteAtendimentos.clienteId,
                    nomeCliente: clienteAtendimentos.cliente.nomeCliente,
                    servicosMaisFrequentes: servicosOrdenados,
                  };
                });
            
                return response.status(200).json(resultado);
              } catch (error) {
                console.error("Erro ao obter serviços mais frequentes por cliente:", error);
                return response.status(500).json({ error: "Erro interno do servidor" });
              } finally {
                await prisma.$disconnect();
              }
          }

          async getAtendimentosFromLastYearByFilial(request: Request, response: Response): Promise<Response> {
            try {
              const oneYearAgo = new Date();
              oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
        
              const atendimentosPorFilial = await prisma.filial.findMany({
                select: {
                  filialId: true,
                  nome: true,
                  atendimento: {
                    where: {
                      agenda: {
                        dataHoraFinal: { gt: oneYearAgo },
                      },
                    },
                    include: {
                      agenda: true,
                      atendimentoHasServico: {
                        include: {
                          servico: true,
                        },
                      },
                    },
                    orderBy: {
                      agenda: {
                        dataHoraFinal: 'desc',
                      },
                    },
                  },
                },
              });
        
              const resultado = atendimentosPorFilial.map(filial => ({
                filialId: filial.filialId,
                nomeFilial: filial.nome,
                atendimentos: filial.atendimento,
              }));
        
              return response.status(200).json({ message: '', resultado });
            } catch (error) {
              console.error('Erro ao obter atendimentos do último ano por filial:', error);
              return response.status(500).json(error);
            }
          }
        
          async getTotalMoneyByFilial(request: Request, response: Response): Promise<Response> {
            try {
              const totalPorFilial = await prisma.filial.findMany({
                select: {
                  filialId: true,
                  nome: true,
                  atendimento: {
                    select: {
                      atendimentoHasServico: {
                        select: {
                          servico: {
                            select: {
                              valorServico: true,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              });
        
              const resultado = totalPorFilial.map(filial => {
                let totalValorFilial = 0;
                filial.atendimento.forEach(atendimento => {
                  const totalServicosAtendimento = atendimento.atendimentoHasServico.reduce(
                    (soma, item) => soma + item.servico.valorServico.toNumber(),
                    0
                  );
                  totalValorFilial += totalServicosAtendimento;
                });
                return {
                  filialId: filial.filialId,
                  nomeFilial: filial.nome,
                  totalValorServicos: totalValorFilial,
                };
              });
        
              console.log(resultado);
              return response.status(200).json(resultado);
            } catch (error) {
              console.error('Erro ao obter total de dinheiro por filial:', error);
              return response.status(500).json(error);
            }
          }
        
          async getTotalPorMesPorFilial(request: Request, response: Response): Promise<Response> {
            try {
              const resultados = await prisma.$queryRaw<
                Array<{ filialId: number; nomeFilial: string; ano: number; mes: number; totalValor: Prisma.Decimal | null }>
              >`
                SELECT
                  f.filialId,
                  f.nome AS nomeFilial,
                  YEAR(a.dataHoraInicial) AS ano,
                  MONTH(a.dataHoraInicial) AS mes,
                  SUM(at.valorTotal) AS totalValor
                FROM Filial f
                JOIN Atendimento at ON f.filialId = at.filialId
                JOIN Agenda a ON at.agendaId = a.agendaId
                GROUP BY f.filialId, YEAR(a.dataHoraInicial), MONTH(a.dataHoraInicial)
                ORDER BY f.filialId, YEAR(a.dataHoraInicial) DESC, MONTH(a.dataHoraInicial) DESC;
              `;
        
              const resultadoFormatado = resultados.map(item => ({
                filialId: item.filialId,
                nomeFilial: item.nomeFilial,
                ano: item.ano,
                mes: item.mes,
                totalValor: item.totalValor?.toNumber() || 0,
              }));
        
              return response.status(200).send(
                JSON.stringify(resultadoFormatado, (key, value) =>
                  typeof value === 'bigint' ? value.toString() : value
                )
              );
            } catch (error) {
              console.error('Erro ao obter total de atendimentos por mês por filial:', error);
              return response.status(500).json({ error: 'Erro interno do servidor' });
            } finally {
              await prisma.$disconnect();
            }
          }
        
          async getMoreFrequentServicesByFilial(request: Request, response: Response): Promise<Response> {
            try {
              const frequenciaServicosPorFilial = await prisma.filial.findMany({
                select: {
                  filialId: true,
                  nome: true,
                  atendimento: {
                    select: {
                      atendimentoHasServico: {
                        select: {
                          servicoId: true,
                          servico: {
                            select: {
                              nomeServico: true,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              });
        
              const resultado = frequenciaServicosPorFilial.map(filial => {
                const servicoFrequencia: { [nomeServico: string]: number } = {};
                filial.atendimento.forEach(atendimento => {
                  atendimento.atendimentoHasServico.forEach(ahs => {
                    const nomeServico = ahs.servico.nomeServico;
                    servicoFrequencia[nomeServico] = (servicoFrequencia[nomeServico] || 0) + 1;
                  });
                });
        
                const servicosOrdenados = Object.entries(servicoFrequencia)
                  .sort(([, freqA], [, freqB]) => freqB - freqA)
                  .map(([nomeServico, frequencia]) => ({ nomeServico, frequencia }));
        
                return {
                  filialId: filial.filialId,
                  nomeFilial: filial.nome,
                  servicosMaisFrequentes: servicosOrdenados,
                };
              });
        
              return response.status(200).json(resultado);
            } catch (error) {
              console.error('Erro ao obter serviços mais frequentes por filial:', error);
              return response.status(500).json({ error: 'Erro interno do servidor' });
            } finally {
              await prisma.$disconnect();
            }
          }
        
          async getMoreFrequentServicesByClientsByFilial(
            request: Request,
            response: Response
          ): Promise<Response> {
            try {
              const filiaisComClientesEServicos = await prisma.filial.findMany({
                select: {
                  filialId: true,
                  nome: true,
                  atendimento: {
                    select: {
                      clienteId: true,
                      cliente: {
                        select: {
                          nomeCliente: true,
                        },
                      },
                      atendimentoHasServico: {
                        select: {
                          servicoId: true,
                          servico: {
                            select: {
                              nomeServico: true,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              });
        
              const resultado = filiaisComClientesEServicos.map(filial => {
                const clientesComServicosFrequentes: {
                  [clienteId: number]: { nomeCliente: string; servicosMaisFrequentes: { nomeServico: string; frequencia: number }[] };
                } = {};
        
                filial.atendimento.forEach(atendimento => {
                  const clienteId = atendimento.clienteId;
                  const nomeCliente = atendimento.cliente.nomeCliente;
                  const servicoFrequencia: { [nomeServico: string]: number } = {};
        
                  atendimento.atendimentoHasServico.forEach(ahs => {
                    const nomeServico = ahs.servico.nomeServico;
                    servicoFrequencia[nomeServico] = (servicoFrequencia[nomeServico] || 0) + 1;
                  });
        
                  const servicosOrdenados = Object.entries(servicoFrequencia)
                    .sort(([, freqA], [, freqB]) => freqB - freqA)
                    .map(([nomeServico, frequencia]) => ({ nomeServico, frequencia }));
        
                  clientesComServicosFrequentes[clienteId] = { nomeCliente, servicosMaisFrequentes: servicosOrdenados };
                });
        
                return {
                  filialId: filial.filialId,
                  nomeFilial: filial.nome,
                  clientesComServicosFrequentes,
                };
              });
        
              return response.status(200).json(resultado);
            } catch (error) {
              console.error('Erro ao obter serviços mais frequentes por cliente por filial:', error);
              return response.status(500).json({ error: 'Erro interno do servidor' });
            } finally {
              await prisma.$disconnect();
            }
          }

          async getTotalSpentByClient(request: Request, response: Response): Promise<Response> {
            try {
              const clientesComTotalGasto = await prisma.cliente.findMany({
                select: {
                  clienteId: true,
                  nomeCliente: true,
                  atendimento: {
                    select: {
                      atendimentoHasServico: {
                        select: {
                          servico: {
                            select: {
                              valorServico: true,
                            },
                          },
                        },
                      },
                    },
                  },
                },
              });
        
              const resultado = clientesComTotalGasto.map(cliente => {
                let totalGastoCliente = 0;
                cliente.atendimento.forEach(atendimento => {
                  const totalServicosAtendimento = atendimento.atendimentoHasServico.reduce(
                    (soma, item) => soma + item.servico.valorServico.toNumber(),
                    0
                  );
                  totalGastoCliente += totalServicosAtendimento;
                });
                return {
                  clienteId: cliente.clienteId,
                  nomeCliente: cliente.nomeCliente,
                  totalGasto: totalGastoCliente,
                };
              });
        
              return response.status(200).json(resultado);
            } catch (error) {
              console.error('Erro ao obter total gasto por cliente:', error);
              return response.status(500).json(error);
            }
          }
        
          
    
}