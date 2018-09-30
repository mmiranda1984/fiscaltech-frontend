import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class VeiculoLista extends Component {

//   Construtor padrão inicializando as variáveis utilizadas no código
//   e mapeando os métodos.  
  constructor(props) {
    super(props);
    this.state = {veiculos: [], isLoading: true};
    this.remove = this.remove.bind(this);
    this.dateToBR = this.dateToBR.bind(this);
  }

//   Método executado ao iniciar a classe.
//   - isLoading é setado para true (quando está com esse valor exibe uma mensagem de "Carregando").
//   - Carrega a lista de veículos chamando o WS Rest do backend e seta o retorno na variável veículos.
  componentDidMount() {
    this.setState({isLoading: true});

    fetch('api/veiculos/listar')
      .then(response => response.json())
      .then(data => this.setState({veiculos: data, isLoading: false}));
  }

//   Método utilizado para remover/inativar um veículo.
//   - Chama o WS Rest do backend para excluir o item, que nesse caso apenas inativa.
//   - Quando o processo terminar, dá um reload na página para exibir a informação que o veículo está inativo
//     chamando novamente o componentDidMount automaticamente no reload
  async remove(placa) {
    await fetch(`/api/veiculos/excluir/${placa}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
        window.location.reload();
    });
  }

//   Método utilizado para formatar a data no padrão BR.
  dateToBR(date){	
      return date.split('-').reverse().join('/');
  }  

  render() {
    const {veiculos, isLoading} = this.state;

    if (isLoading) {
      return <p>Carregando...</p>;
    }

    const veiculosList = veiculos.map(veiculo => {
      return <tr key={veiculo.placa}>
        <td style={{whiteSpace: 'nowrap'}}>{veiculo.placa}</td>
        <td style={{whiteSpace: 'nowrap'}}>{veiculo.anoFabricacao}</td>
        <td style={{whiteSpace: 'nowrap'}}>{veiculo.anoModelo}</td>
        { veiculo.cor !== null ?
            <td style={{whiteSpace: 'nowrap'}}>{veiculo.cor.descricao}</td>
            :
            <td style={{whiteSpace: 'nowrap'}}></td>
		}
        <td style={{ whiteSpace: 'nowrap' }}>{this.dateToBR(veiculo.atualizadoEm)}</td>
        <td style={{whiteSpace: 'nowrap'}}>{true === veiculo.ativo ? 'Sim' : 'Não' }</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/veiculos/" + veiculo.placa}>Editar</Button>
            <Button size="sm" color="danger" disabled={!veiculo.ativo} onClick={() => this.remove(veiculo.placa)}>Excluir</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/veiculos/new">Novo Veículo</Button>
          </div>
          <h3>Cadastro de Veículos</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="15%">Placa</th>
              <th width="10%">Fabricação</th>
              <th width="10%">Modelo</th>
              <th width="15%">Cor</th>
              <th width="30%">Última Atualização</th>
              <th width="10%">Ativo</th>
              <th width="10%">Ações</th>
            </tr>
            </thead>
            <tbody>
            {veiculosList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default VeiculoLista;