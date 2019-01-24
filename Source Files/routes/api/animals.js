import { Router } from 'express';
import { auth } from '../../config/passport';
import Animal from '../../models/Animal';
import User from '../../models/User';

const router = Router();

router.get('/', auth, (req, res) => {
  Animal.find({}, function (err, animalModels) {
    if (err) return res.status(500).send({ err });

    return res.send(animalModels);
  });
});

router.post('/', auth, (req, res) => {
  const { type, name } = req.body;
  if (!type || !name) {
    return res.status(400).send({ err: 'Type and Name are required' });
  }
  const newAnimal = new Animal({
    type: type,
    name: name,
    owner: req.user._id
  });

  newAnimal.save(function (err, savedAnimal) {
    if (err) return res.status(400).send({ err });

    User.findByIdAndUpdate(req.user._id, { $push: { animals: savedAnimal._id } },
      function (err) {
        return res.send(savedAnimal);
      });
  });
});

router.delete('/:id', auth, (req, res) => {
  const { id } = req.params;

  Animal.remove({ _id: id }, function (err) {
    if (err) return res.status(400).send({ err });

    return res.status(204).send();
  });
});

router.put('/:id', auth, (req, res) => {
  const { id } = req.params;
  const { name, type, owner } = req.body;

  if (!name || !type) {
    return res.status(400).send({ err: 'name and type are required' });
  }

  Animal.findByIdAndUpdate(id, { name: name, type: type, owner: owner }, { new: true },
    function (err, updatedAnimal) {
      if (err) return res.status(400).send({ err });

      return res.send(updatedAnimal);
    });
});

router.patch('/:id', auth, (req, res) => {
  const { id } = req.params;
  const { name, type, owner } = req.body;

  if (!name || !type) {
    return res.status(400).send({ err: 'name and type are required' });
  }

  const updated = { name: name, type: type };
  if (owner) {
    updated.owner = owner;
  }

  Animal.findByIdAndUpdate(id, updated, { new: true }, function (err, updatedAnimal) {
    if(err) return res.status(400).send({err})

    return res.send(updatedAnimal);
  });
});

export default router;