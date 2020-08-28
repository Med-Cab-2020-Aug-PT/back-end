const router = require('express').Router();

const Can = require('./cannabis_model');

const restrict = require('../config/restric-mid');



router.get('/', restrict, async (req, res) => {
    const { id } = req.decodedToken
    // console.log('can router token', req.decodedToken)
    try {
        const results = await Can.getPreferrences(id)
        if (results) {
            return res.status(200).json(results)
        } else {
            res.status(404).json({ message: "No results found"})
        }
    }
    catch (err) {
        res.status(500).json({message: "AN error as occured with your request"})
    }
});

router.post('/save', restrict, async (req, res) => {
    const body = req.body
    const user = req.decodedToken

    try {
        const found = await Can.find(body.name).first()
        if (found) {
            const inPref = await Can.checkPrefs(found.index)
            if (inPref.length > 0) {
                return res.status(400).json({ message: `You already have ${body.name} in your preferences`})
            }
            const added = await Can.addPreferrences(user.id, found.index)
            if (added) {
                const results = await Can.getPreferrences(user.id)
                return res.status(200).json(results)
            }
        } else {
            const cannabis_id = await Can.add(body)
            const added = await Can.addPreferrences(user.id, cannabis_id[0])
            if (added) {
                const results = await Can.getPreferrences(user.id)
                return res.status(200).json(results)
            }
        }
        res.status(400).json({message: 'Error adding data'})
    }
    catch (err) {
        res.status(500).json({message:err.toString()})
    }
});

router.delete('/:id', restrict, async (req, res) => {
    const cannabis_id = req.params.id
    const user_id = req.decodedToken.id
    
    try {
        const removed = await Can.remove(cannabis_id, user_id)
        if (removed > 0) {
            const results = await Can.getPreferrences(user_id)
            return res.status(200).json(results)
        }
        res.status(404).json({message: "preferrence not found in database"})
    }
    catch (err) {
        res.status(500).json({message: "request failed"})
    }
})

module.exports = router