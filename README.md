# PJe KZ - Módulo de Front-end
Este repositório armazena os recursos de interface do PJe KZ.

## Tecnologias Envolvidas
* Angular 2
* Angular Material 2

## Requisitos do ambiente de desenvolvimento

* [GIT](http://www.git-scm.org)
* [NodeJS 8.9+](https://nodejs.org/en/)
* [NPM (the package manager for JavaScript) 3.0+](https://www.npmjs.com)
* [Angular CLI 1.0.0+](https://github.com/angular/angular-cli)

* Rodar a bat do proxy local (e deixar aberta) (instruções na aba "Dicas úteis" do FAQ da construção - https://docs.google.com/spreadsheets/d/1_WfZTKouBBAdQe_D9v7cUQoBlNsXXwXZtGXIh8ayuko/edit?usp=sharing)

* Executar o npm install da aplicação
---------------------------
Comandos para colocar o sistema para executar na máquina e desenvolver o projeto:
1 - O backend precisa estar rodando, sem ele o sistema não irá passar da tela de login. O ip do backend fica configurado no arquivo environment.ts do frontend;
2 - Abrir o cmd e acessar a pasta do projeto para executar os comandos abaixo

Comando que serve para subir o projeto e liberar acesso para qualquer maquina acessar a aplicação pelo IP da máquina que esta rodando o sistema. 
ng serve --host 0.0.0.0 --disable-host-check

Comanda que serve somente para gerar o build
ng build 

---------------------------

*	Abrir o terminal (como administrador), entrar na pasta do projeto e digitar npm install (lembrar que o proxy tem que estar habilitado, pois o terminal ira baixar vários arquivos na net)

OBS: Caso o erro para baixar o phantomjs persista, tente o comando: npm config set strict-ssl false

npm config set proxy http://USUARIO:SENHAproxy1.trt15.jus.br:3128
npm config set https-proxy http://localhost:3128

--------------------------

Obs (Eliete): 
Na minha máquina (nodejs versão 8.11.2) após algumas tentativas consegui fazendo o seguinte:
- exclui a pasta: (caminho do projeto)\node_modules
- exclui o arquivo: (caminho do projeto)\package-lock.json (Este arquivo foi recriado após executar o npm install)
- configurei o proxy com os comandos:
	npm config set proxy http://"usuario:senha"@proxy1.trt15.jus.br:3128
	npm config set https-proxy http://"usuario:senha"@proxy1.trt15.jus.br:3128
- executei o comando npm install 	

--------- Para gerar o pacote de produção -----------------

Passo 1:
Depois de baixar o código do SVN, navegar no console até a pasta raiz do projeto.

Passo 2:
executar npm install

Passo 3:
Executar o comando "npm run-script build-prod" para gerar o pacote otimizado de produção.

Obs: O run-script executa o comando que está configurado no arquivo "package.json" na chave "build-prod", caso precise rodar para homologação, basta trocar para "build-homolog"
Ex: "npm run-script build-homolog".

Obs: Este comando já seleciona o environment correto a ser utilizado. Dentro do environment os caminhos são relativos, porém o caminho para os serviços do Pje precisão estar com o caminho completo.

Após o build os arquivos gerados serão colocados dentro da pasta /sustentacao-oral

A aplicação está configurada para ser acessada pela url relativa /sustentacao-oral. Para mais informações ver o passo Deploy no Jboss (está abaixo).

-------- Deploy no JBoss ----------------------------

Para fazer o deploy no jboss:
Copiar a pasta '/sustentacao-oral' do build para dentro do diretório '/welcome-content' do jboss (/welcome-content/sustentacao-oral).

Incluir no arquivo de configuração (e.g. /standalone/configuration/standalone.xml) os seguintes parâmetros:
  - Adicionar location com filter (<location><filter-ref></filter-ref></location>)
<host name="default-host" alias="localhost">
<location name="/sustentacao-oral" handler="welcome-content-sustentacao-oral">
  <filter-ref name="angular-html5"/>
</location>
</host>

  - Adicionar file handler (<file>)
<handlers>
  <file name="welcome-content-sustentacao-oral" path="${jboss.home.dir}/welcome-content/sustentacao-oral"/>
</handlers>

  - Adicionar filter (<expression-filter>) (se não existir)
<filters>
  <expression-filter name="angular-html5" expression="regex('^') and not regex(pattern='.*(?:js|html|css|png|gif|jpe?g|svg|ico|txt|woff2?|eot)', value=%U, full-match=true) -> rewrite('index.html')"/>
</filters>



------------------------------------------- Observações -----------------------------------------------------------

Para que o pacote de produção (com uglify) funcione no firefox, foi a adotado o seguinte "workaround":
https://github.com/angular/angular-cli/issues/9340
"
Spanja commented May 16, 2018

Indeed it's working if I install these deps :

"rimraf": "2.6.2",
"uglify-es": "3.2.2",
"uglifyjs-webpack-plugin": "1.1.5"

and this postinstall script :

"postinstall": "rimraf node_modules/@angular-devkit/build-angular/node_modules/uglify-es && rimraf node_modules/@angular-devkit/build-angular/node_modules/uglifyjs-webpack-plugin"

Thanks @DavidBowdoin
"

No script de postinstall, foram adicionados novos diretórios que estavam interferindo neste projeto.


------------------------------------------- Versões Utilizadas -----------------------------------------------------------
npm --version
5.3.0

ng --version

    _                      _                 ____ _     ___
   / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
  / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
 / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
/_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
               |___/

Angular CLI: 1.7.4
Node: 7.2.1
OS: win32 x64
Angular: 5.2.10
... animations, common, compiler, compiler-cli, core, forms
... http, language-service, platform-browser
... platform-browser-dynamic, router

@angular/cdk: 5.2.5
@angular/cli: 1.7.4
@angular/material: 5.2.5
@angular-devkit/build-optimizer: 0.3.2
@angular-devkit/core: 0.3.2
@angular-devkit/schematics: 0.3.2
@ngtools/json-schema: 1.2.0
@ngtools/webpack: 1.10.2
@schematics/angular: 0.3.2
@schematics/package-update: 0.3.2
typescript: 2.5.3
webpack: 3.11.0












###### Opcional
* [Yarn Package Manager](https://yarn.org)

## Configurando o ambiente de desenvolvimento

###  Mac OS X

* Gerenciador de pacotes para MacOS:  [Omebrew](http://brew.sh)

* Instalar [NodeJS](https://nodejs.org/en)

```bash
  brew install node
```

###### Opcional
  * Gerenciador de pacotes YARN [Yarn Package Manager](https.yarn.org)

```bash
  npm install -g yarn
```

### Windows

* Download do [NodeJS](https://nodejs.org/en/download/)

### Linux

Para instalar o [NodeJS](https://nodejs.org/en) usando o `apt-get` no Ubuntu 16.04+, adicione o repositório do [NodeJS](https://nodejs.org/en) e sua chave GPG da seguinte forma:

```bash
  echo "deb https://deb.nodesource.com/node_8.x xenial main" | sudo tee -a /etc/apt/sources.list.d/nodesource.list
  echo "deb-src https://deb.nodesource.com/node_8.x xenial main" | sudo tee -a /etc/apt/sources.list.d/nodesource.list
  curl -ks https://deb.nodesource.com/gpgkey/nodesource.gpg.key | sudo apt-key add -
```

Depois, adicione uma exceção de segurança ao apt e execute um update com os seguintes comandos:

```bash
  echo "Acquire::https::deb.nodesource.com::Verify-Peer \"false\";" | sudo tee -a /etc/apt/apt.conf
  sudo apt-get update
```

Verifique se o apt-cache apresenta uma versão 8.9+ do [NodeJS](https://nodejs.org/en)usando o apt-get no Ubuntu 16.04+, adicione o repositório do [NodeJS](https://nodejs.org/en):

```bash
  apt-cache policy nodejs
```

Se sim, instale e verifique a versão do [NodeJS](https://nodejs.org/en)usando o apt-get no Ubuntu 16.04+, adicione o repositório do [NodeJS](https://nodejs.org/en) com os comandos:
  ```bash
    sudo apt-get install nodejs
    nodejs --version
  ```

Configure o proxy, se necessário:
```bash
  nano ~/.npmrc
```

 Se não estiver usando CNTLM, adicione as linhas alterando usuario e senha:

```
  proxy=http://usuario:senha@proxyserver.rede.tst:3128
  https-proxy=http://usuario:senha@proxyserver.rede.tst:3128
  registry = http://registry.npmjs.org
  strict-ssl = false
  https_proxy=http://usuario:senha@proxyserver.rede.tst:3128
```

Se estiver usando CNTLM na porta 3128, adicione as seguintes linhas:

```
  proxy=http://localhost:3128
  https-proxy=http://localhost:3128
  registry = http://registry.npmjs.org
  strict-ssl = false
  https_proxy=http://localhost:3128
```

#### Atualizando o [NPM:](https://www.npmjs.org)

```bash
  sudo npm install -g npm
```

#### Instalando o  [Angular CLI](https://github.com/angular/angular-cli)
Angular CLI é utilitário que fornece funções para auxiliar no desenvolvimento de interfaces com o Angular.
```bash
  npm install -g @angular/cli
```

Em caso de erro de permissão negada, execute o comando abaixo para mudar as permissões de /usr/lib/node_modules/ e repita a operação.

```bash
  sudo chown -R $(id -u):$(id -g) /usr/lib/node_modules/
  npm install -g @angular/cli
```

###### Configuração Opcional:
Utilizar [Yarn](https://yarn.org) como gerenciador de dependências:

```bash
  ng set --global packageManager=yarn
```

## Instalando aplicação PJe Front-end

##### Clonar o repositório PJe-Frontend

```bash
  git clone git@git.pje.csjt.jus.br:pje2/pje-frontend
  cd pje-frontend
```

##### Instalar Dependências do NPM

```bash
  npm install
```
####  Iniciar Servidor de desenvolvimento

```bash
  ~/ng serve #Com AngularCLI

  ~/npm start #Com NPM

  ~/yarn start #Com YARN
```
Navegar para  `http://localhost:4200/`.

####  Compilando o projeto para distribuição

```bash
  ~/ng build  #Com AngularCLI

  ~/npm build  #Com NPM

  ~/yarn build  #Com YARN
```
Para gerar uma build para produção, utilize a flag: `-prod`

A pasta  `/dist` será disponibilizada após a compilação.

### Executando Testes no Front-end

* Executando testes unitários via [Karma](https://karma-runner.github.io).

```bash
  ~/ng test  #Com AngularCLI

  ~/npm test  #Com NPM

  ~/yarn test  #Com YARN
```
* Executando testes end-to-end (ponta a ponta) via [Protractor](http://www.protractortest.org/).

Antes de executar os testes, inicialize a aplicação utilizando `ng serve`.

```bash
  ~/ng e2e  #Com AngularCLI

  ~/npm e2e  #Com NPM

  ~/yarn e2e  #Com YARN
```

##### Maiores informações das opções do Angular CLI:

 Utilizando o comando `ng --help`, é apresentada uma lista de tasks que podem ser utilizadas.


## Estrutura do Projeto

    //Descrever estrutura

### Outros comandos do utilitário Angular-CLI
* Criando componentes:
```
  Execute `ng generate component component-name` para gerar um novo componente.
  Pode-se usar também: `ng generate directive/pipe/service/class/module`.
```

* Infomações adicionais de comandos do Angular CLI:
Use `ng help` ou procure mais informações em: [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

* Configuração de Proxy e outras informações sobre a linha de comando na [Documentação oficial do Angular CLI](https://github.com/angular/angular-cli/wiki/stories).
