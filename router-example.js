router.get('/', (req, res) => {
    // db.select().from('posts')
    db('posts')
    .then(posts=> 
        res.json(posts)).catch(err => res.status(500).json({message: "You done did screw up."}))
    })
})

db('posts/:id').where({})
.then(posts=> 
    res.json(posts)).catch(err => res.status(500).json({message: "You done did screw up."}))
})
})

router.get("/:id", (req, res) => {
    const { id } = req.params;
    db.select()
      .from("posts")
      .where({ id })
      .then((post) => res.json(post))
      .catch((err) =>
        res.status(500).json({ message: "error retrieving post with id", err })
      );
  });

  router.get('/:id', (req, res) => {
    db('posts')
      .where({ id: req.params.id })
      .first() 
      .then(post => {
        if(post) {
          res.status(200).json({ data: post });
        } else {
          res.status(400).json({ message: "Post not found" }) // worked on postman
        }
      })
      .catch(error => {
        res.status(500).json({ message: "sorry, ran into an error" });
      });
  });

  router.get('/:id', (req, res) => {const {id} = req.params;
    db.select()
    .from('posts')
    .where({ id })
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).json({  message: err.message }))
});

router.post('/', (req, res)=> {
    const postData = req.body;
    db.('posts')
    .insert(postData)
    .then(post => {
        res.status(201).json(post)
        .catch(err => { res.status(500)}).json({message: "there was an error", err})
    })
})

router.put('/:id', (req. res)=>{
    const {id} = req.params;
    const changes = req.body;
    db('posts')
        .where({id})
        .update(changes)
        .then(count {
            if(count){
                res.json({updated:count});
            } else {
                res.status(404).json({message: 'invalide id'})
            }
        })
        .catch(err =< {
            res.status(500).json({message: 'there was an error. '})
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db('posts')
        .where({id})
        .del()
        .then(deleted => {
            res.status(200).json(deleted)
        })
        .catch(err => {
            res.status(500).json({message: 'post deleted'})
        })
});

router.delete('/:id', (req, res) => {
    db('posts')
    .where({ id: req.params.id })
    .del()
    .then(count => {
    if (count > 0) {
    res.status(200).json({ message: "record deleted successfully" })
    } else {
    res.status(404).json({ message: "Post not found" });
    }
    })
    .catch(error => {
    res.status(500).json({ message: "sorry, ran into an error" });
    });
    }); 

    db("posts")
    .where({ id })
    .del()
    .then((deleted) =>
      deleted
        ? res.status(204).end()
        : res.status(404).json({ message: "id not found" })
    )
    .catch((err) => res.status(404).json({ message: "error deleting", err }));