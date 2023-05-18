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
constraint pkAssociativa primary key (idAgendamento, fkEquipe, fkCadastro)
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
constraint pkAssociativa primary key (idUnidadeServicos, fkUnidades, fkServicos)
);

-- inserindo dados na tabela unidades
insert into unidades values
(null, 'Rua bom pastor', '1000' ,'R$9000', 'R$3600');
select * from unidades;

-- inserindo dados na tabela equipe
insert into equipe values
(null, 'César', '1990-07-07', 'Barba', 1),
(null, 'Diogo', '2003-02-07', 'Química Capilar', 1),
(null, 'Marcelo', '2000-12-05', 'Corte', 1);
select * from equipe;

-- inserindo dados na tabela cadastro
insert into cadastro values
(null, 'João', '84247484095', 'joao@gmail.com', 'joaogui123');
select * from cadastro;

-- Inserindo dados na tabela agendamento
-- Falta inserir mais dados por causa da API (Falta dados)
insert into agendamento values 
(1, 1, 1, 'Corte', '2023-06-20');
select * from cadastro;

-- inserindo dados na tabela servicos
insert into servicos values
(null, 'Corte', 'R$45'),
(null, 'Barba', 'R$45'),
(null, 'Combo', 'R$80'),
(null, 'Selagem', 'R$100');
select * from servicos;

-- inserindo dados na tabela unidadeServicos
insert into unidadeServicos values
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4);
select * from  unidadeServicos;


-- Selects das tabelas
-- Equipe e unidade
SELECT equipe.idEquipe, equipe.nome_barbeiro, equipe.dataNasc, equipe.especialidade,
 unidade.localizacao, unidade.quantidade_servicos, unidade.lucro_mes, unidade.gasto_comissao
FROM
 equipe as equipe
JOIN
 unidades as unidade ON equipe.fkUnidade = unidade.idUnidades;

-- Agendamento que junta Equipe e cadastro
SELECT
 agen.idAgendamento, equipe.nome_barbeiro, cad.nome, agen.servico_feito, agen.dtServico
FROM
 agendamento as agen
JOIN
 equipe as equipe
 ON agen.fkEquipe = equipe.idEquipe
JOIN cadastro as cad
 ON agen.fkCadastro = cad.idCadastro;

-- Unidade e os serviços que elas fornecem (possuimos apenas uma por enquanto)
SELECT 
uniser.idUnidadeServicos, uni.localizacao, ser.nome_servico, ser.preco
FROM
 unidadeServicos as uniser
JOIN unidades as uni 
ON uniser.fkUnidades = uni.idUnidades
JOIN servicos as ser
 ON uniser.fkServicos = ser.idServicos;


