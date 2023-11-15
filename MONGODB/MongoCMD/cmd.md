# Mongosh BASE

- Utiliser Mongosh(Shell) dans le Terminal VSCode

  > mangosh
  > cls ( clear )
  > exit ( sortir de Mongosh )

- Afficher toutes les BDD et Collections

  > show dbs
  > show collections

- Utiliser(Créer) une BDD
  > use db_name
- Créer une Collection
  > db.createCollection("nameOfCollection")
- Supprimer la BDD sur laquelle je suis
  > db.dropDatabase()
  > db.dropDatabase("nameOfDatabase")

# Insert

- Insérer One dans la Database.Collection
  > db.Collection.insertOne({name:"Michel",age:30})
  > db.Collection.find()
- Insérer plusieurs dans la Database.Collection
  > db.Collection.insertMany([ {}, {}, {} ])

# DataType

- Liste de DataType
  > EX : db.students.insertOne({ name: "Brian",
                                   age: 32,
                                   gpa: 2.8,
                                   fullTime: false,
                                   registerDate: new Date(),
                                   graduationDate: null,
                                   courses: ["Biology", "Math","French"],
                                   address: {street:"1 Fake St.",
                                             city:"Brest",
                                             postcode: 29200}
  })

# Sorting and Limiting

- Trier par "Ascending(Croissant|Alphabétique...)" (1)

  > db.students.find().sort({name:1})

- Trier par "Descending(Décroissant|Inversé...)" (-1)

  > db.students.find().sort({name:-1})

- Limité à X nombre de documents (par défaut trié par ID)

  > db.students.find().limit(X)

- Combiné sort() et limit()
  > Exemple : Sorting Highest gpa
  > db.students.find().sort({gpa:-1}).limit(1)

# Find

- find({query}, {projection})
  > db.students.find({}, {name:true})
  > db.students.find({}, {\_id:false, name:true})

# Update

- Update One .updateOne(filter, update)

  > db.students.updateOne({name:"Julien"}, {$set:{name:"Dimitri"}})
  > db.students.updateOne({name:"Julien"}, {$unset:{fullTime:true}})

- Update Many

  > db.students.updateMany({}, {$set:{fullTime:false}})
  > db.students.updateOne({name:"Brian"}, {$unset:{fullTime:""}})

- If many students doesn't have a fullTime field, update it
  > db.students.updateMany({fullTime:{$exists:false}}, {$set:{fullTime:true}})

# Delete

- Delete One
  > db.students.deleteOne({name:"Brian"})
- Delete Many
  > db.students.deleteMany({fullTime:false})
- Delete any document missing registerDate
  > db.students.deleteMany({registerDate:{$exists:false}})

# Comparisons

- Not equal
  > db.students.find({name:{$ne:"Brian"}})
- Less than / less than equal to
  > db.students.find({age:{$lt:50}})
  > db.students.find({age:{$lte:50}})
- greater than / greater than equal to
  > db.students.find({age:{$gt:10}})
  > db.students.find({age:{$gte:20}})
- range
  > db.students.find({age:{$gte:30, $lte:40}})
- comparison operator
    - $in est dans l'array pour la value name
  > db.students.find({name:{$in:["Vincent", "Franck", "Dimitri"]}})
    - $nin n'est pas dans l'array pour la value name
  > db.students.find({name:{$nin:["Vincent", "Franck", "Dimitri"]}})
