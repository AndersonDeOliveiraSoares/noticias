# CRUD de Notícias

Utilizando Python com Flask para desenvolvimento da API com autenticação, React para desenvolver a interface
e MongoDB como banco de dados nosql


## Pré-requisitos

* Python 3.7 ou superior (com virtualenv e pip)
* NodeJS
* Docker

## Instalação

1) Clonar o repositório com o comando abaixo:

	git clone XXXXXXXXXXX

2) Baixar a imagem do MongoDB (Docker), com o seguinte comando:

	docker pull mongo

3) Criar um container com a imagem baixada:

	docker create -it --name Mongo -p 27017:27017 mongo

4) Inicializar o container criado:

	docker start Mongo

5) Ir para a pasta do projeto noticias_python e criar uma virtualenv

```
virtualenv NOTICIAS_ENV
```

6) Ativar a virtual ENV

```
source NOTICIAS_ENV/bin/activate
```

7)Instalar as dependencias

```
pip install -r requirements.txt
```

8) Criar na raíz do projeto noticias_python um arquivo chamado **.env** e atribuir a ele o seguinte conteúdo

```
PORT=8000
DEBUG=False
JWT_SECRET_KEY = gfcM90FRye2uhjUytfR5mwTtcot2nss
SECRET_KEY = 9oq49j2us6hgR65wY2712
DB_NAME=noticia
DB_HOST=127.0.0.1
DB_PORT=27017
```

9) Subir a API Python do cadastro de notícias:

```
python app.py
```

10) Ir para a pasta do projeto "noticias_front" e instalar suas dependencias

```
npm install
```

11) Subir a interface gráfica do cadastro de notícias

```
npm start
```

12) Acessar o endereço abaixo

```
localhost:3000
```
