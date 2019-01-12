const Core = require('./core');

class Kspdmp extends Core {
    async run(state) {
        const body = await this.request({
            uri: 'http://'+this.options.address+':'+this.options.port
        });

        const json = JSON.parse(body);
        for (const one of json.players) {
            state.players.push({name:one.nickname,team:one.team});
        }

        for (const key of Object.keys(json)) {
            state.raw[key] = json[key];
        }
        state.name = json.server_name;
        state.maxplayers = json.max_players;
        if (json.players) {
            const split = json.players.split(', ');
            for (const name of split) {
                state.players.push({name:name});
            }
        }
    }
}

module.exports = Kspdmp;
