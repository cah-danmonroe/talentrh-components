# talentrh-components
Componentes padronizados para EmberJS.

1 - Instalação
======
* Executar o comando `npm install talentrh-components`.

2 - Como Usar
======

## Input Mask
##### Exemplo:
```
{{talent-input-mask
  placeholder='CPF'
  typeMask='cpf' // cep, cnpj, phone, date, datetime
  unmasked=cpfUnmaked
  value=cpfMasked}}
```

OU

```
{{talent-input-mask
  placeholder='CPF'
  mask='999.999.999-99'
  unmasked=cpfUnmaked
  value=cpfMasked}}
```

É possível passar um tipo predefinido ou informar a máscara manualmente.

## DATA TABLE
Cria um DATATABLE com o model escolhido, com filtro e paginação. O componente {{data-table}} pode ser utilizado de duas formas: autoprocessamento, ou customizado. Veja os exemplos abaixo.

#### Opções
* columns: (String) Colunas do model que serão exibidas e/ou serão incluidas no filtro por texto
* columnNames: (String) Cabeçalhos a serem exibidos nas colunas da tabela
* viewRoute: (String) rota para onde o botão 'Ver' deverá apontar, no mesmo formato que se usaria em um link-to
* editRoute: (String) rota para onde o botão 'Editar' deverá apontar, no mesmo formato que se usaria em um link-to
* showDeleteButton: (Boolean) indica se deverá mostrar o botão 'Remover'. Padrão: true
* showActions: (Boolean) indica se deverá mostrar a coluna de ações sobre os models. Padrão: true

Obs: o size de colmuns e columnNames deve ser o mesmo. E.g. this.get('columns.length') === this.get('columnNames.length)

### Autoprocessamento
Nesta forma de utilização, basta informar todos os parâmetros
##### Exemplo:
```
{{data-table modelName='accessProfile'
   columns="title,defaultProfile,description,users"
   columnNames="Título,Padrão,Descrição,Usuários neste perfil"
   viewRoute='configuration.userProfile.show'
   editRoute='configuration.userProfile.edit'
   deleteButton=true
   showActions=true}}
```
### Customizado
Nesta forma de utilização, deve-se obter o dataset ao final da declaração do componente (as |dataSet|) e então processar a tag <tr> de acordo com a customização desejada.
##### Exemplo:
```
{{#data-table modelName='user'
  columns='avatarUrl,firstName,lastName,professionalEmail,active,professionalPhone'
  columnNames='Foto,Nome,Email,Status,Telefone'
  showActions=true
  as |dataSet|}}
  {{#each dataSet as |data|}}
   <tr>
     <td><img src={{s3-url data.avatarUrl}} class="datatable-thumb" alt=""></td>
      <td>{{data.firstName}} {{data.lastName}}</td>
      <td>{{data.professionalEmail}}</td>
      <td>{{if data.active 'Ativo' 'Inativo'}}</td>
      <td>{{data.professionalPhone}}</td>
   </tr>
  {{/each}}
{{/data-table}}
```

## Input Floating Label
##### Exemplo:
```
<div class="form-group">
  {{input-floating-label
    class="form-control"
    value=model.name}}
  <label>Nome</label>
</div>
```

O componente é criado a partir de Ember.TextField portanto contém todas as propriedades do input normal, porém o input-floating-label deferencia-se fazendo o controle da label quando o input está vazio ou com conteúdo.

## Input CPF
##### Exemplo:
```
{{talent-input-cpf
  placeholder='CPF'
  value=model.cpf}}
```
##### Outras opções:
```
required=true
disabled=true
onUpdateStatus='nomeDaAction'
```
Passar nome de uma action pela propriedade onUpdateStatus, a mesma será acionada pelo componente durante a digitação
recebendo o tipo do campo e o status atual do componente (true ou false), sendo false caso o valor informado seja inválido e true caso seja válido.

##### Exemplo da action para onUpdateStatus em controller.js:
```
updateStatus(inputType, status) {
  this.set(inputType, status);
}
```

##### Exemplo da action para onUpdateStatus em route.js:
```
updateStatus(inputType, status) {
  this.get('controller').set(inputType, status);
}
```
Neste exemplo de action, a mesma vai atualizar a propriedade com o nome inputType para o status atual do componente, permitindo saber se o valor do input é valido antes de submeter o form.

## Input CEP
##### Exemplo:
```
{{talent-input-cep
  value=modelTest.cep
  placeholder='CEP'}}
```
##### Outras opções:
* `required=true`
* `disabled=true`
* `onUpdateStatus='nomeDaAction'` | Explicado no input CPF.
* `buttonComplete=true` | Habilita botão de completar campos automaticamente,
suportando atualmente: address, district e complement.

```
{{talent-input-cep
  value=model.cep
  address=model.address
  district=model.district
  complement=model.complement
  buttonComplete=true
  onUpdateStatus='updateStatus'
  placeholder='CEP'}}
```
* `loadCity='nomeDaAction'` | Para o preenchimento automatico do campo CIDADE é necessário informar uma action
para o componente, a mesma será acionada após clicar no botão de preencher automatico recebendo as informações da cidade ficando a critério do desenvolvedor a manipulação desses dados.

## Input CNPJ
##### Exemplo:
```
{{talent-input-cnpj
  value=valuecnpj
  placeholder='CNPJ'}}
```
##### Outras opções:
* `required=true`
* `disabled=true`
* `onUpdateStatus='nomeDaAction'` | Explicado no input CNPJ.
* `buttonComplete=true` | Habilita botão de completar campos automaticamente,
suportando atualmente: name, address, district, zipcode, number, phone.
```
{{talent-input-cnpj
  value=value
  name=cnpjName
  address=cnpjAddress
  district=cnpjDistrict
  zipcode=cnpjZipcode
  number=cnpjNumber
  phone=cnpjPhone
  buttonComplete=true
  onUpdateStatus='updateStatus'
  placeholder='CNPJ'}}
```
* `loadCity='nomeDaAction'` | Para o preenchimento automatico do campo CIDADE é necessário informar uma action
para o componente, a mesma será acionada após clicar no botão de preencher automatico recebendo as informações da cidade ficando a critério do desenvolvedor a manipulação desses dados.

## Input Select2
##### Exemplo usando Ember Data:
```
{{talent-input-select2
  modelName='city'
  endpoint='/cities/ajax'
  placeholder='Selecionar Cidade'
  label='Cidade'
  showProperties='id| - |name'
  optional=true
  selected=modelTest.city
  startValue=modelTest.city.name}}
```
##### Exemplo usando Ajax:
```
{{talent-input-select2
  ajax=true
  endpoint='/cities/ajax'
  placeholder='Selecionar Cidade'
  label='Cidade'
  showProperties='id| - |name'
  optional=true
  selected=modelTest.city
  startValue=modelTest.city.name}}
```
##### Propriedades:
* `disabled=true`
* `ajax=true` | Informa que o componente vai utilizar Ajax "puro" ao invés do Ember Data.
* `modelName='nomeDoModel'` | Caso o componente esteja usando Ember Data, informar o nome do model.
* `endpoint='/exemplo/cidades'` | Informar o endpoint o qual o componente buscará os registros.
* `optional=true` | Exibe um "X" permitindo desselecionar o valor atual do select clicando no mesmo.
* `startValue=modelTest.city.name` |
* `showProperties='property'` | Informar a propriedade que será mostrada no select, pode ser usado o "|" para separar duas ou mais propriedades.
* `onButtonNew='nomeDaAction'` | Caso essa propriedade for informada, aparecerá um botão ao lado do select que ao ser clicado invocará a action cujo nome foi passado no 'onButtonNew'. Utilizar esse recurso quando for necessario abrir um modal ou levar para outra tela para criar um novo registro.

## Input Datetime
##### Exemplo:
```
{{talent-input-datetime
  placeholder='Data inicial'
  format='DD/MM/YYYY HH:mm'
  value=datetimeValue}}
```
##### Outras opções:
* `mask='99/99/9999 99:99'` | Permite informar uma máscara para o campo
* `formatToDate=true` | Esta opção faz com que a data e/ou hora selecionada no input seja transformado de string para  formato de data.

## Input Datepair
##### Exemplo com formato DATE (DD/MM/YYYY):
```
<div id="datepair-exemplo">
  {{#talent-input-datepair
    id="datepair-exemplo"
    startDate=startDate
    endDate=endDate
  }}
    <div class="col-md-6">
      <div class="form-group">
        {{input
          value=startDate
          class="form-control date start"}}
      </div>
    </div>
    <div class="col-md-6">
      <div class="form-group">
        {{input
          value=endDate
          class="form-control date end"}}
      </div>
    </div>
  {{/talent-input-datepair}}
</div>
```
##### Exemplo com formato TIME (HH:mm):
```
<div id="datepair-exemplo">
  {{#talent-input-datepair
    id="datepair-exemplo"
    startTime=startTime
    endTime=endTime
  }}
    <div class="col-md-6">
      <div class="form-group">
        {{input
          value=startTime
          class="form-control time start"}}
      </div>
    </div>
    <div class="col-md-6">
      <div class="form-group">
        {{input
          value=endTime
          class="form-control time end"}}
      </div>
    </div>
  {{/talent-input-datepair}}
</div>
```
##### Exemplo com formato DATETIME (DD/MM/YYYY HH:mm):
```
<div id="datepair-exemplo">
  {{#talent-input-datepair
    id="datepair-exemplo"
    startDatetime=startDatetime
    endDatetime=endDatetime
  }}
    <div class="col-md-6">
      <div class="form-group">
        {{input
          value=startDatetime
          class="form-control datetime start"}}
      </div>
    </div>
    <div class="col-md-6">
      <div class="form-group">
        {{input
          value=endDatetime
          class="form-control datetime end"}}
      </div>
    </div>
  {{/talent-input-datepair}}
</div>
```

## Input Phone
##### Exemplo:
```
{{talent-input-phone
  placeholder='Telefone'
  value=modelExemplo.telefone}}
```
##### Outras opções:
* `formatToNumber=true` | Esta opção faz com que o telefone presente no input seja transformado de string para formato de número.

## Helper CEP
##### Exemplo:
```
{{talent-format-cep model.cep}}
```

## Helper CNPJ
##### Exemplo:
```
{{talent-format-cnpj model.cnpj}}
```

## Helper CPF
##### Exemplo:
```
{{talent-format-cpf model.cpf}}
```

## Helper Phone
##### Exemplo:
```
{{talent-format-phone model.phone}}
```

3 - Como Desenvolver
======
* 1- `git clone`.
* 2- `cd talentrh-components`.
* 3- Instalar as dependência executando `npm install && bower install`.
* 4- Remover comentario do método `isDevelopingAddon` em talentrh-components/index.js.
* 5- Executar o comando `npm link` para gerar um link do módulo.
* 6- No projeto em que será testado o addon, executar o comando `npm link talentrh-components`.
* 7- No arquivo package.json do projeto em que será testado o addon, adicionar a dependência: `"talentrh-components": "*"`.
* 8- Write your code.
