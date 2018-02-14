
const transitionService = require('../../services/transitions');

module.exports = async (req, res) => {
    let transitions = await transitionService.all();
    
    let single = transitions.find((transition) => {
        return transition.transitionId === parseInt(req.params.transitionId);
    });

    console.log(single);

    return single ? res.json(single) : res.sendStatus(404);
};
