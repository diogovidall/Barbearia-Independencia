create database BarbeariaIndependencia;
use BarbeariaIndependencia;

-- Tabela onde mostra todas as unidades da barbearia e seus lucros
create table unidades (
idUnidades INT primary key auto_increment,
localizacao varchar(45),
quantidade_servicos char(30),
lucro_mes varchar(45),
gasto_comissao varchar(45)
);

-- Tabela onde vai mostrar toda equipe, suas especialidades e a unidade em que pertence
create table equipe(
idEquipe Int primary key auto_increment,
nome_barbeiro varchar(45),
dataNasc DATE,
especialidade varchar(45),
constraint chkEspecialidade check( especialidade in ('Corte', 'Barba', 'Química Capilar')),
fkUnidade INT,
foreign key (fkUnidade) references unidades(idunidades) 
);

-- Tabela onde vão estar todos os cadastros dos clientes/barbeiros feitos no 
create table cadastro (
idCadastro int primary key auto_increment,
nome varchar(45),
cpf Char(11),
email varchar(50),
senha varchar(45)
);

-- Tabela Agendamento é uma relação de N:N de cadastro e Equipe. Nela colocamos as informações dos agendamentos feitos pelo Booksy
create table agendamento (
idAgendamento Int,
fkEquipe int,
fkCadastro int,
servico_feito varchar(45),
dtServico DATE,
foreign key (fkEquipe) references equipe(idEquipe),
foreign key(fkCadastro) references cadastro(idCadastro),
constraint pkAgendamento primary key (idAgendamento, fkEquipe, fkCadastro)
);


-- Tabela onde onde guardamos os tipos de serviços e preços
create table servicos (
idServicos int primary key auto_increment,
nome_servico varchar(45),
preco varchar(30)
);

-- Tabela relacionamento N:N com servicos unidades. Nem toda unidade vai ter os mesmos serviços então essa tabela divide isso
-- Por enquanto possuimos uma unidade então aparecera apenas a unidade Sacomã
create table unidadeServicos(
idUnidadeServicos int,
fkUnidades int,
fkServicos int,
foreign key (fkUnidades) references unidades(idUnidades),
foreign key (fkServicos) references servicos(idServicos),
constraint pkUnidadeServicos primary key (idUnidadeServicos, fkUnidades, fkServicos)
);




