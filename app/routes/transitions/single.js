
const transitionService = require('../../services/transitions');

module.exports = async (req, res) => {
    let transitions;
    try {
        transitions = await transitionService.all();
    }
    catch (error) {
        next(error);
        return;
    }
    
    let single = transitions.find((transition) => {
        return transition.transitionId === parseInt(req.params.transitionId);
    });

    return single ? res.json(single) : res.sendStatus(404);
};
