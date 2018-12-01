## Nome, Telefone e Morada do Cliente

- Request:
```
POST {{apiUrl}}Base/Clientes/DaValorAtributos/[NOME_EMPRESA]

[
	"Nome",
	"Morada",
	"Telefone"
]
```

- Response: 
```
[
    {
        "Conteudo": "ValorXYZ Lda",
        "Nome": "Nome",
        "Valor": "XYZ Lda",
        "Objecto": null,
        "Tipo": 0,
        "ChaveLog": "Nome",
        "EstadoBE": "",
        "TipoSimplificado": 0
    },
    {
        "Conteudo": "ValorRua A",
        "Nome": "Morada",
        "Valor": "Rua A",
        "Objecto": null,
        "Tipo": 0,
        "ChaveLog": "Nome",
        "EstadoBE": "",
        "TipoSimplificado": 0
    },
    {
        "Conteudo": "Valor212342354",
        "Nome": "Telefone",
        "Valor": "212342354",
        "Objecto": null,
        "Tipo": 0,
        "ChaveLog": "Nome",
        "EstadoBE": "",
        "TipoSimplificado": 0
    }
]
```

## Editar Cliente (e seu vendedor)

- Request
``` 
POST {{apiUrl}}Base/Clientes/Actualiza

{
    "CodigoTabLog": "Cliente",
    "ChaveLog": "Cliente",
    "EstadoBE": "",
    "Cliente": "ALCAD",
    "Nome": "Soluciones Cad de qwerty",
    "NumContribuinte": "989922456",
    "Moeda": "EUR",
    "EmModoEdicao": true
}
```

- Response:

``` 
Status 204 No Content 
```

## Listar Clientes

- Request:

```
GET {{apiUrl}}Base/Clientes/LstClientes
```

- Response:
```
{
    "DataSet": {
        "Table": [
            {
                "Cliente": "C0001",
                "Nome": "XYZ Lda",
                "Fac_Mor": "Rua A",
                "Pais": "PT"
            },
            ...
        ]
    }
}
```

## Criar cliente (e associar o seu vendedor)

- Request
```
POST {{apiUrl}}Base/Clientes/Actualiza

{
    "Cliente": "NUNOA",
    "Nome": "Soluciones Cad de qwerty",
    "Descricao": "qwerty1234",
    "Morada": "PASSEO DE PORTUGAL, 12345",
    "Localidade": "VILANUEVA DE ARRIBA",
    "CodigoPostal": "61001",
    "LocalidadeCodigoPostal": "MADRID",
    "Telefone": "00.034.1.474747447",
    "Fax": "00.034.1.4374747474",
    "EnderecoWeb": "http://alcad.es",
    "Distrito": "",
    "NumContribuinte": "989922456",
    "Pais": "ES",
    "Moeda": "EUR"
}
```

- Response
``` 
Status 204 No Content 
```

## Total de Faturação de todos os Clientes

- Request
```
POST {{apiUrl}}Administrador/Consulta

SELECT CD.Entidade, SUM(CD.TotalDocumento) AS TotalFaturacao FROM
CabecDoc CD INNER JOIN Clientes C ON C.Cliente = CD.Entidade INNER
JOIN DocumentosVenda DV ON DV.Documento = CD.TipoDoc WHERE
DV.TipoDocumento = 4 GROUP BY CD.Entidade
```

- Response
```
{
    "DataSet": {
        "Table": [
            {
                "Entidade": "C0001",
                "TotalFaturacao": 25.839999999999996
            },
            {
                "Entidade": "C0002",
                "TotalFaturacao": 12.3
            },
            {
                "Entidade": "C0003",
                "TotalFaturacao": 12.3
            }
        ]
    },
    "Query": "System.Data.SqlClient.SqlCommand"
}
```

## Pedidos de orçamento de todos os clientes

- Request
```
POST {{apiUrl}}Administrador/Consulta

SELECT CD.Filial, CD.TipoDoc, CD.Serie, CD.NumDoc, CD.TotalDocumento,
CDS.Estado FROM CabecDoc CD INNER JOIN CabecDocStatus CDS ON
CDS.IdCabecDoc = CD.Id WHERE CD.Entidade = '[NOME_EMPRESA]' AND CD.TipoDoc =
'ORC'
```

- Response
``` 
{
    "DataSet": {
        "Table": [
            {
                "Filial": "000",
                "TipoDoc": "ORC",
                "Serie": "A",
                "NumDoc": 1,
                "TotalDocumento": 1.85,
                "Estado": "G"
            }
        ]
    },
    "Query": "System.Data.SqlClient.SqlCommand"
}
``` 

## Notas (Leads)

- Request
```
POST {{apiUrl}}Base/Clientes/DaValorAtributo/[NOME_EMPRESA]/Notas
```

- Response
```
"Nota sobre o cliente"
```

## Obter lista de produtos

- Request
```
POST {{apiUrl}}Base/Artigos/LstArtigos
``` 

- Response
```
{
    "DataSet": {
        "Table": [
            {
                "Artigo": "A0001",
                "Descricao": "Marcador Preto"
            },
            {
                "Artigo": "A0002",
                "Descricao": "Pencil "
            },
            {
                "Artigo": "A0003",
                "Descricao": "Caneta"
            }
        ]
    },
    "Query": "System.Data.SqlClient.SqlCommand"
}
```

## Obter PVP de um produto

- Request
```
POST {{apiUrl}}Base/ArtigosPrecos/Edita/[NOME_ARTIGO]/EUR/UN
```

- Response
```
{
    "CodigoTabLog": "ArtigoMoeda",
    "PropExcluirLog": "",
    "ChaveLog": "Artigo,Moeda,Unidade",
    "EstadoBE": "",
    "Artigo": "A0001",
    "Moeda": "EUR",
    "Unidade": "UN",
    "Descricao": "",
    "PVP1": 1.5,
    "PVP1IvaIncluido": false,
    "PVP2": 0,
    "PVP2IvaIncluido": false,
    "PVP3": 0,
    "PVP3IvaIncluido": false,
    "PVP4": 0,
    "PVP4IvaIncluido": false,
    "PVP5": 0,
    "PVP5IvaIncluido": false,
    "PVP6": 0,
    "PVP6IvaIncluido": false,
    "EmModoEdicao": true,
    "CamposUtil": [],
    "Conteudo": "ArtigoA0001MoedaEURUnidadeUNPVP11,5PVP1IvaIncluidoFalsePVP20PVP2IvaIncluidoFalsePVP30PVP3IvaIncluidoFalsePVP40PVP4IvaIncluidoFalsePVP50PVP5IvaIncluidoFalsePVP60PVP6IvaIncluidoFalse",
    "AbvtApl": "BAS"
}
```

## Obter stock de um produto

- Request
```
POST {{apiUrl}}Administrador/Consulta

"SELECT Artigo, Armazem, ISNULL(StkActual, 0) AS StkActual FROM V_INV_ArtigoArmazem"
```

- Response
```
{
    "DataSet": {
        "Table": [
            {
                "Artigo": "A0001",
                "Armazem": "A1",
                "StkActual": 9
            },
            {
                "Artigo": "A0001",
                "Armazem": "A1",
                "StkActual": 1
            },
            {
                "Artigo": "A0002",
                "Armazem": "A1",
                "StkActual": 2
            },
            {
                "Artigo": "A0003",
                "Armazem": "A1",
                "StkActual": 40
            }
        ]
    },
    "Query": "System.Data.SqlClient.SqlCommand"
}
```

## Obter Descricao de um produto

- Request
```
GET {{apiUrl}}Base/Artigos/DaValorAtributo/[NOME_ARTIGO]/Descricao
```

- Response
```
"Marcador Preto"
```
## Criar encomenda

- Request
```
POST {{apiUrl}}Vendas/Docs/CreateDocument/

{
  "Linhas": [
    {
      "Artigo": "[NOME_ARTIGO]",
      "Quantidade": "[QUANTIDADE]"
    },
    ...
  ],
  "Tipodoc": "ECL",
  "Serie": "A",
  "Entidade": "[NOME_EMPRESA]",
  "TipoEntidade": "C",
  "DataDoc":"12/11/2018",
  "DataVenc":"12/12/2018"
}
```

- Response
```
true
```

## Criar orçamento

- Request
```
POST {{apiUrl}}Vendas/Docs/CreateDocument/

{
  "Linhas": [
    {
      "Artigo": "[NOME_ARTIGO]",
      "Quantidade": "[QUANTIDADE]"
    },
    ...
  ],
  "Tipodoc": "ORC",
  "Serie": "A",
  "Entidade": "[NOME_EMPRESA]",
  "TipoEntidade": "C",
  "DataDoc":"12/11/2018",
  "DataVenc":"12/12/2018"
}
```

- Response
```
true
```

## Lista de encomendas

- Request
```
POST {{apiUrl}}Administrador/Consulta

SELECT CD.Filial, CD.TipoDoc, CD.Serie, CD.NumDoc, CD.TotalDocumento,
CDS.Estado FROM CabecDoc CD INNER JOIN CabecDocStatus CDS ON
CDS.IdCabecDoc = CD.Id WHERE CD.Entidade = '[NOME_EMPRESA]' AND CD.TipoDoc =
'ECL'
```

- Response
```
{
    "DataSet": {
        "Table": [
            {
                "Filial": "000",
                "TipoDoc": "ECL",
                "Serie": "A",
                "NumDoc": 6,
                "TotalDocumento": 2.46,
                "Estado": "P"
            }
        ]
    },
    "Query": "System.Data.SqlClient.SqlCommand"
}
```

## Listar vendedores e clientes associados

- Request

```
POST {{apiUrl}}Administrador/Consulta

SELECT V.Vendedor, V.Nome, C.Cliente FROM Vendedores V INNER JOIN
Clientes C ON C.Vendedor = V.Vendedor ORDER BY V.Vendedor
```

- Response
```
{
    "DataSet": {
        "Table": [
            {
                "Vendedor": "1",
                "Nome": "Paulo Jorge Lopes da Silva",
                "Cliente": "ALCAD"
            }
        ]
    },
    "Query": "System.Data.SqlClient.SqlCommand"
}
``` 

## Listar clientes de um vendedor

- Request
```
POST {{apiUrl}}Administrador/Consulta

"SELECT V.Vendedor, V.Nome, C.Cliente FROM Vendedores V INNER JOIN Clientes C ON C.Vendedor = V.Vendedor WHERE C.Vendedor = [ID_VENDEDOR] ORDER BY V.Vendedor"
```

- Response
```
{
    "DataSet": {
        "Table": [
            {
                "Vendedor": "1",
                "Nome": "Paulo Jorge Lopes da Silva",
                "Cliente": "ALCAD"
            }
        ]
    },
    "Query": "System.Data.SqlClient.SqlCommand"
}
```
