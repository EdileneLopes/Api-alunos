exports.fileTree=[{"name":"controllers","children":[]},{"name":"middlewares","children":[]},{"name":"repositories","children":[{"name":"mongodb","children":[{"name":"AlunosRepository","path":"/AlunosRepository","fullPath":"repositories/mongodb/AlunosRepository"},{"name":"MongoDbRepository","path":"/MongoDbRepository","fullPath":"repositories/mongodb/MongoDbRepository"}]},{"name":"rest","children":[{"name":"AlunosRepository","path":"/AlunosRepository","fullPath":"repositories/rest/AlunosRepository"},{"name":"RestRepository","path":"/RestRepository","fullPath":"repositories/rest/RestRepository"}]}]}];exports.sidebarTree = (title = 'Mainpage') => ({"/code/":[{"title":"Api","collapsable":false,"children":[["",""+title+""]]},{"title":"repositories","collapsable":false,"children":["repositories/mongodb/AlunosRepository","repositories/mongodb/MongoDbRepository","repositories/rest/AlunosRepository","repositories/rest/RestRepository"]}]});