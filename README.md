# CRUD de Notícia

Com base no desafio proposto foi criado um CRUD de noticias para exemplificar a utilização de Python (Flask) para desenvolvimento de uma API com autenticação JWT, React para implementação da aplicação cliente (UI) e MongoDB como banco de dados nosql


## Pré-requisitos

Possuir Python (versão 3.7+), NodeJS (versão 12+) e Docker instalados e dividamente configurados


## Execução

1) Clonar o repositório com o comando abaixo:

```
git clone https://github.com/AndersonDeOliveiraSoares/noticias
```

2) Executar o dowload da imagem do MongoDB que será como base de dados do sitema, criar seu container e inicializa-lo:

```
docker pull mongo
docker create -it --name Mongo -p 27017:27017 mongo
docker start Mongo
```

3) Ir para a pasta do projeto noticias_python e criar uma virtualenv

```
virtualenv NOTICIAS_ENV
```

4) Ativar a virtual ENV

```
source NOTICIAS_ENV/bin/activate
```

5) Instalar as dependencias

```
pip install -r requirements.txt
```

6) Criar na raíz do projeto noticias_python um arquivo chamado **.env** e atribuir a ele o seguinte conteúdo

```
PORT=8000
DEBUG=False
JWT_SECRET_KEY = gfcM90FRye2uhjUytfR5mwTtcot2nss
SECRET_KEY = 9oq49j2us6hgR65wY2712
DB_NAME=noticia
DB_HOST=127.0.0.1
DB_PORT=27017
```

7) Subir a API Python do cadastro de notícias:

```
python app.py
```

8) Ir para a pasta do projeto "noticias_front" e instalar suas dependencias

```
npm install
```

9) Subir a interface gráfica do cadastro de notícias

```
npm start
```

10) Acessar o endereço abaixo

```
http://localhost:3000
```
