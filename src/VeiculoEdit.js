import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label, Alert } from 'reactstrap';
import AppNavbar from './AppNavbar';
import Select from 'react-select';

class VeiculoEdit extends Component {

  veiculoVazio = {
    placa: '',
    anoModelo: '',
    anoFabricacao: '',
    atualizadoEm: null,
    ativo: true
  };

//   Construtor padrão inicializando as variáveis utilizadas no código
//   e mapeando os métodos.  
  constructor(props) {
    super(props);
    this.state = {
      item: this.veiculoVazio,
      cores: [],
      corSelecionada: {
          value: null,
          label: null
      },
      alertaVisivel: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
  }

//   Método executado ao iniciar a classe.  Ele é um async pois existem chamadas await dentro do método
//   que obrigatoriamente devem terminar para que continue o processamento
//   - Caso não seja um novo registo, obtém o veículo por placa através do WS e seta o item com os dados.
//   - Caso exista cor no registro, seta a variável corSelecionada com a estrutura de "value" e "label"
//     para ser idenfiticado corretamente pelo objeto Select do react-select.
//   - Carrega a lista de cores que serão exibidas no componente Select do react-select.
  async componentDidMount() {
    if (this.props.match.params.id !== 'new') {
        const veiculo = await (await fetch(`/api/veiculos/${this.props.match.params.id}`)).json();
        this.setState({item: veiculo});
        if (this.state.item.cor) {
            let corComponenteSelect = {value: null, label: null}
            corComponenteSelect.value = this.state.item.cor.id;
            corComponenteSelect.label = this.state.item.cor.descricao;
            this.setState({corSelecionada: corComponenteSelect})
        }
      }
    fetch('/api/cores')
        .then(response => response.json())
        .then(data => {
            let coresComponenteSelect = data.map(function (cor) {
                return { value: cor.id, label: cor.descricao };
            })
            this.setState({cores: coresComponenteSelect, isLoading: false})
        })
  }

//   Método executado para atualizar os dados do objeto "item"
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let item = {...this.state.item};
    item[name] = value;
    this.setState({item});
  }

//   Método executado para setar a corSelecionada no state da classe
  selecionarCor = (corSelecionada) => {
    this.setState({ corSelecionada });
  }

//   Método executado para gravar os dados
//   - Caso haja uma cor selecionada, cria uma estrutura idêntica a de cor no backend para envio.
//   - Caso a informação de "atualizadoEm" esteja preenchida, sabe-se que é uma edição, senão é um novo cadastro.
//   - Ao término, dá um push para a tela principal.  
  async handleSubmit(event) {
    event.preventDefault();
    const {item} = this.state;
    if (this.state.corSelecionada.value !== null) {
        let cor = {id: null, descricao: null}
        cor.id = this.state.corSelecionada.value;
        cor.descricao = this.state.corSelecionada.label;
        item.cor = cor;
    }

    await fetch((item.atualizadoEm) ? `/api/veiculos` : '/api/veiculos', {
        method: (item.atualizadoEm) ? 'PUT' : 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item),
        });
        this.props.history.push('/');
  }

//   Método utilizado para formatar a data no padrão BR.
  dateToBR(date){	
    return date.split('-').reverse().join('/');
  }  
  
//   Método utilizado para fechar a mensagem de Placa duplicada.
//   Essa validação não foi realizada para demonstrar a mensagem aqui no front.
//   Faltou um pouco mais de tempo e pesquisa para que eu pudesse implementar.
  onDismiss() {
    this.setState({ alertaVisivel: false });
  }

  render() {
    const {item} = this.state;
    const title = <h2>{item.atualizadoEm ? 'Editar Veículo' : 'Incluir Veículo'}</h2>;

    return <div>
        <div>
        <AppNavbar/>
        <Container>
            <Alert color="danger" isOpen={this.state.alertaVisivel} toggle={this.onDismiss} fade={false}>
                Placa já cadastrada!
            </Alert>
            {title}
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                        <Label for="placa">Placa</Label>
                        <Input type="text" name="placa" id="placa" value={item.placa || ''}
                            onChange={this.handleChange} autoComplete="placa" maxLength={7} required
                            disabled={item.atualizadoEm}/>
                </FormGroup>
                <div className="row">
                    <FormGroup className="col-md-5 mb-3">
                        <Label for="anoFabricacao">Ano de Fabricação</Label>
                        <Input type="text" name="anoFabricacao" id="anoFabricacao" value={item.anoFabricacao || ''}
                            onChange={this.handleChange} autoComplete="anoFabricacao" maxLength={4}/>
                    </FormGroup>
                    <FormGroup className="col-md-5 mb-3">
                        <Label for="anoModelo">Ano do Modelo</Label>
                        <Input type="text" name="anoModelo" id="anoModelo" value={item.anoModelo || ''}
                            onChange={this.handleChange} autoComplete="anoModelo" maxLength={4}/>
                    </FormGroup>
                </div>
                <FormGroup>
                    <Label for="cor">Cor</Label>
                    <Select
                        name="cor"
                        value={this.state.corSelecionada}
                        onChange={this.selecionarCor}
                        options={this.state.cores}                  
                        placeholder="Selecione uma cor">
                    </Select>
                </FormGroup>
                <FormGroup>
                    <Label for="atualizadoEm">Última Atualização</Label>
                    <Input type="text" name="atualizadoEm" id="atualizadoEm" value={item.atualizadoEm ? this.dateToBR(item.atualizadoEm) : ''}
                        onChange={this.handleChange} autoComplete="name" disabled/>
                </FormGroup>
            <FormGroup>
                <Button color="primary" type="submit">Salvar</Button>{' '}
                <Button color="secondary" tag={Link} to="/">Cancelar</Button>
            </FormGroup>
            </Form>
        </Container>
        </div>
    </div>
  }
}

export default withRouter(VeiculoEdit);