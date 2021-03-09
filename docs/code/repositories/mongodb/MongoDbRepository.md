---
title: MongoDbRepository
---

# MongoDbRepository

<a name="MongoDbRepository"></a>

## MongoDbRepository
**Kind**: global class  

* [MongoDbRepository](#MongoDbRepository)
    * [new MongoDbRepository(db, collection)](#new_MongoDbRepository_new)
    * [.list(query)](#MongoDbRepository+list) ⇒
    * [.getById(id)](#MongoDbRepository+getById) ⇒
    * [.insert(doc)](#MongoDbRepository+insert) ⇒
    * [.delete(id)](#MongoDbRepository+delete) ⇒
    * [.update(id, obj)](#MongoDbRepository+update) ⇒

<a name="new_MongoDbRepository_new"></a>

### new MongoDbRepository(db, collection)
Inicia uma nova chamada da classe alunosRepository.


| Param | Type | Description |
| --- | --- | --- |
| db | <code>\*</code> | Instância de banco de dados MongoDb |
| collection | <code>\*</code> | Coleção de dados no banco de dados |

<a name="MongoDbRepository+list"></a>

### mongoDbRepository.list(query) ⇒
Fam um getAll na coleção de alunos no banco de dados.

**Kind**: instance method of [<code>MongoDbRepository</code>](#MongoDbRepository)  
**Returns**: uma lista com todos os alunos cadastrados  

| Param | Type | Description |
| --- | --- | --- |
| query | <code>\*</code> | consulta |

<a name="MongoDbRepository+getById"></a>

### mongoDbRepository.getById(id) ⇒
Faz uma busca de aluno por id.

**Kind**: instance method of [<code>MongoDbRepository</code>](#MongoDbRepository)  
**Returns**: retorna um único aluno referente ao id buscado  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>\*</code> | é o parãmetro passado no cabeçalho da requisição |

<a name="MongoDbRepository+insert"></a>

### mongoDbRepository.insert(doc) ⇒
Cria (cadastra) um novo aluno.

**Kind**: instance method of [<code>MongoDbRepository</code>](#MongoDbRepository)  
**Returns**: O aluno cadastrado na collection  

| Param | Type | Description |
| --- | --- | --- |
| doc | <code>\*</code> | É tudo o que foi passado no body da requisição |

<a name="MongoDbRepository+delete"></a>

### mongoDbRepository.delete(id) ⇒
Apaga um aluno a partir do id.

**Kind**: instance method of [<code>MongoDbRepository</code>](#MongoDbRepository)  
**Returns**: mensagem se foi deletado  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>\*</code> | o parâmetro para trazer um único aluno |

<a name="MongoDbRepository+update"></a>

### mongoDbRepository.update(id, obj) ⇒
Faz alterações no cadastro do aluno a partir do id.

**Kind**: instance method of [<code>MongoDbRepository</code>](#MongoDbRepository)  
**Returns**: O aluno com suas alterções  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>\*</code> | parâmetro para encontrar um único aluno |
| obj | <code>\*</code> | documento aluno |

