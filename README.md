# Cadastro de carro

**RF** => Requisitos funcionais
Deve ser possível casatrar um novo carro

**RN** => Regra de negócio
Não deve ser possível cadastrar um carro com uma placa já existente.
O carro deve ser cadastrado, por padrão, com disponibilidade.
O usúario responsável pelo cadastro deve ser um usúario administrador.

# Listagem de carros

**RF** => Requisitos funcionais
Deve ser possível listar todos os carros disponíveis.
Deve ser possível listar todos os carros disponíveis pelo nome da categoria.
Deve ser possível listar todos os carros disponíveis pelo nome da marca.
Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**RN** => Regra de negócio
O usúario não precisa estar logado no sistema.

# Cadastro de especificação no carro

**RF** => Requisitos funcionais
Deve ser possível cadastrar uma especificação para um carro.

**RN** => Regra de negócio
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
O usúario responsável pelo cadastro deve ser um usúario administrador.

# Cadastro de imagens do carro

**RF** => Requisitos funcionais
Deve ser possível cadastrar a imagem do carro.

**RNF** => Requisitos não funcionais
Utilizar o multer para upload dos arquivos.

**RN** => Regra de negócio
O usúario deve poder cadastrar mais de uma imagem para o mesmo carro.
O usúario responsável pelo cadastro deve ser um usúario administrador.

# Aluguel de carro

**RF** => Requisitos funcionais
Deve ser possível cadastrar um aluguel

**RN** => Regra de negócio
O aluguel deve ter duração mínima de 24 horas.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usúario.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
O usúario precisa estar logado no sistema.
Ao realizar um aluguel, o status do carro deverá ser alterado para indisponível

# Devolução de carro

**RF** => Requisitos funcionais
Deve ser possível realizar a devolução de um carro

**RN** => Regra de negócio
Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária completa.
Ao realizar a devolução, o carro deverá ser liberado para outro aluguel.
Ao realizar a devolução, o usuário deverá ser liberado para outro aluguel.
Ao realizar a devolução, deverá ser calculado o total do aluguel.
Caso o horário de devolução seja superior ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
Caso haja multa, deverá ser somado ao total do aluguel.
O usúario precisa estar logado no sistema.

# Listagem de aluguéis para usuário

**RF** => Requisitos funcionais
Deve ser possível realizar a busca de todos os aluguéis para o usuário

**RN** => Regra de negócio
O usúario precisa estar logado no sistema.

# Recuperar senha

**RF** => Requisitos funcionais
Deve ser possível o usuário recuperar a senha informando o e-mail
O usuário deve receber um e-mail com o passo a passo para a  recuperação da senha
O usuário deve conseguir inserir uma nova senha

**RN** => Regra de negócio
O usúario precisa informar uma nova senha
o link enviado para a recuperação deve expirar em 3 horas