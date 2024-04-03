let participantes = [
    {
      nome: 'Leonardo Silva',
      email: 'leos.santos@live.com',
      dataInscricao: new Date(2024, 2, 22, 19, 20),
      dataCheckIn: new Date(2024, 2, 25, 22, 00)
    },
    {
      nome: 'Daniel',
      email: 'Daniel@live.com',
      dataInscricao: new Date(2024, 2, 22, 19, 20),
      dataCheckIn: new Date(2024, 2, 25, 22, 00)
    },
    {
      nome: 'Ana Souza',
      email: 'ana.souza@example.com',
      dataInscricao: new Date(2024, 2, 23, 10, 30),
      dataCheckIn: new Date(2024, 2, 26, 15, 45)
    },
    {
      nome: 'Carlos Oliveira',
      email: 'carlos.oliveira@example.com',
      dataInscricao: new Date(2024, 2, 23, 11, 15),
      dataCheckIn: new Date(2024, 2, 27, 9, 30)
    },
    {
      nome: 'Juliana Santos',
      email: 'juliana.santos@example.com',
      dataInscricao: new Date(2024, 2, 24, 14, 20),
      dataCheckIn: new Date(2024, 2, 28, 17, 10)
    },
    {
      nome: 'Fernando Lima',
      email: 'fernando.lima@example.com',
      dataInscricao: new Date(2024, 2, 24, 15, 45),
      dataCheckIn: new Date(2024, 2, 29, 10, 20)
    },
    {
      nome: 'Mariana Costa',
      email: 'mariana.costa@example.com',
      dataInscricao: new Date(2024, 2, 25, 9, 0),
      dataCheckIn: new Date(2024, 2, 30, 13, 15)
    },
    {
      nome: 'Rafael Fernandes',
      email: 'rafael.fernandes@example.com',
      dataInscricao: new Date(2024, 2, 25, 12, 30),
      dataCheckIn: new Date(2024, 2, 31, 8, 45)
    },
    {
      nome: 'Patricia Oliveira',
      email: 'patricia.oliveira@example.com',
      dataInscricao: new Date(2024, 2, 26, 8, 45),
      dataCheckIn: new Date(2024, 3, 1, 11, 30)
    },
    {
      nome: 'Bruno Santos',
      email: 'bruno.santos@example.com',
      dataInscricao: new Date(2024, 2, 26, 17, 10),
      dataCheckIn: new Date(2024, 3, 2, 14, 20)
    }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  if(participante.dataCheckIn == null) {
    dataCheckIn = `
    <button
      data-email="${participante.email}"
      onclick="fazerCheckIn(event)" 
    >
      Confirmar check-in
      </button>
    `
  }

  return `
  <tr>
      <td>
        <strong>
        ${participante.nome}
          </strong>
          <br>
          <small>
            ${participante.email}
          </small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>
    `
}

const atualizarLista = (participantes) => {
  let output = ""
  // estrutura de repeticao = loop
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }
  // substituir informação do HTML
  document
  .querySelector('tbody')
  .innerHTML = output 
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const DadosFormulario = new formData(event.target)

  const participante = {
    nome: DadosFormulario.get('nome'),
    email: DadosFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  //verificar se o participante existe
  const participanteExiste = participantes.find((p) =>
   p.email == participante.email
  )

  if(participanteExiste) {
    alert('Email ja cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  //limpar formulario
  event.target.querySelector('[name="nome"]')
  event.target.querySelector('[name="email"]')

}

const fazerCheckIn = (event) => {
  //confirmar se realmente quer fazer checkin
  const mensagemConfirmacao = 'Tem certeza que deseja realizar o check in?'

  if(confirm(mensagemConfirmacao) == false) {
    return
  }
    alert(mensagemConfirmacao)

  //encontrar na lista
  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email
  })

  //atualizar check
  participante.dataCheckIn = new Date()

  //atualizar lista
  atualizarLista(participantes)
}