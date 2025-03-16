const PronounIdMap = {
    "aeaer": "Ae",
    "any": "Any",
    "eem": "E",
    "faefaer": "Fae",
    "hehim": "He",
    "itits": "It",
    "other": "Other",
    "perper": "Per",
    "sheher": "She",
    "theythem": "They",
    "vever": "Ve",
    "xexem": "Xe",
    "ziehir": "Zie",
} ;

const client = new StreamerbotClient();

async function GetPronoun(user) {
    const alejoPronouns = await _getPronounJson(user);
    if(alejoPronouns === undefined || alejoPronouns === "") { return ""; }
    if(alejoPronouns.alt_pronoun_id === null){
        const sbPronouns = await client.getUserPronouns('twitch', user);
        return sbPronouns.pronoun.pronouns;
    } else {
        return `(${PronounIdMap[alejoPronouns.pronoun_id]}/${PronounIdMap[alejoPronouns.alt_pronoun_id]})`;
    }
}

async function GetPronounPadStart(user) {
    const pronoun = await GetPronoun(user);
    if(pronoun === "") { return ""; }
    return ` ${pronoun}`;
}

async function GetPronounPadEnd(user,) {
    const pronoun = await GetPronoun(user);
    if(pronoun === "") { return ""; }
    return `${pronoun} `;
}

async function _getPronounJson(userId) {
    const json = await fetch(`https://api.pronouns.alejo.io/v1/users/${userId}`, {cache: "default"})
        .then(res => 
        {
            if(res.ok){
                return res.json();
            }
            else { return "";}
        })
        .then(json => json)
        .catch(_ => "");

    if(json != null) {
        return json;
    }
    else return undefined;
}